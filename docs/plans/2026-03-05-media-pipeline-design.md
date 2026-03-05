# Design: LMS Sertifikasi Media Pipeline Sub-Article

## Problem Statement
The user needs a focused, engineer-to-engineer write-up for their portfolio project (LMS Sertifikasi) covering the "Content Architecture", specifically the media processing pipeline. The goal is to highlight advanced engineering decisions (TUS, Cloudflare R2, Cloudflare Workers, HLS Transcoding, Auto-transcription) without relying on AI-generated fluff or overwhelming the reader with too many features at once.

## Selected Approach
We will create a dedicated "Deep Dive" markdown file (`content/projects/lms-sertifikasi/media-pipeline.md`) that acts as a related writing/sub-article for the main LMS Sertifikasi project page. 

The article will follow a **Problem -> Architecture -> Result** structure.
It will include a custom-styled technical infographic (already generated via Nano Banana / AI Image Gen and placed in `public/projects/lms-sertifikasi/media-pipeline-cloudflare-infographic.png`).

## Content Draft

### Building a Resilient Media Pipeline at the Edge

**The Problem**  
Handling multi-gigabyte video uploads on unreliable connections guarantees timeouts. Once ingested, serving raw MP4s to thousands of concurrent users is a fast track to bandwidth exhaustion and buffering. We needed guaranteed ingestion, automated video processing, and adaptive delivery with minimal latency and egress costs.

**The Architecture**  
![Media Pipeline Architecture with Cloudflare](/projects/lms-sertifikasi/media-pipeline-cloudflare-infographic.png)

1. **Edge Ingestion via TUS**: We deployed a chunked, resumable upload server using **Cloudflare Workers**. If an instructor's connection drops, the upload resumes seamlessly without hitting the core application backend.
2. **Zero-Egress Storage**: Raw uploads land in a **Cloudflare R2** bucket, eliminating traditional S3 egress fees when moving data to processors.
3. **Asynchronous Worker Cycle**: A completed upload triggers a background job (via Oban in Elixir), unblocking the UI while coordinating parallel heavy computation:
   - **HLS Transcoding**: FFmpeg slices the raw video into adaptive multi-bitrate chunks (1080p, 720p, 480p).
   - **Auto-Transcription**: The audio track is extracted and passed to an AI transcription service to automatically generate VTT subtitles.
4. **Secure Edge Delivery**: Processed assets are stored in a secondary R2 bucket. A dedicated **Cloudflare Worker acts as the Media Gateway**, enforcing strict short-lived token authorization before serving any HLS chunks or subtitles to the player.

**The Result**  
Zero failed uploads, automated accessibility via VTT subtitles, and dynamic adaptive streaming—all coordinated asynchronously and delivered globally via Cloudflare's edge with zero egress taxation.

## Validation Plan
1. Ensure the markdown file is created at `content/projects/lms-sertifikasi/media-pipeline.md`.
2. Ensure the frontmatter matches the expected schema for the labtime-web-id portfolio.
3. Ensure the image path resolves correctly in the Nuxt Content rendering.
