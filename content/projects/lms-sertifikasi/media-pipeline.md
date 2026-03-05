---
title: "High-Performance Media Pipeline at the Edge"
description: "How we ingested, processed, and delivered multi-gigabyte video files securely using Cloudflare R2, Workers, and Elixir."
date: 2026-02-01
category: "Content Delivery"
---

**The Problem**  
Handling multi-gigabyte video uploads on unreliable connections guarantees timeouts. Once ingested, serving raw MP4s to thousands of concurrent users is a fast track to bandwidth exhaustion and buffering. We needed guaranteed ingestion, automated video processing, and adaptive delivery with minimal latency and egress costs.

**The Architecture**  
![Media Pipeline Architecture with Cloudflare](/projects/lms-sertifikasi/media-pipeline-cloudflare-infographic.png)

1. **Edge Ingestion via TUS**: We deployed a chunked, resumable upload server using **Cloudflare Workers**. If an instructor's connection drops, the upload resumes seamlessly without hitting the core application backend.
2. **Zero-Egress Storage**: Raw uploads land in a **Cloudflare R2** bucket, eliminating traditional S3 egress fees when moving data to processors.
3. **Asynchronous Worker Cycle**: A completed upload triggers a background job (via Oban in Elixir), unblocking the UI while coordinating parallel heavy computation:
   - **HLS Transcoding**: FFmpeg slices the raw video into adaptive multi-bitrate chunks (1080p, 720p, 480p).
   - **Auto-Transcription**: The audio track is extracted and passed to an AI transcription service to automatically generate VTT subtitles.
4. **Secure Edge Delivery**: Processed assets are stored in a secondary R2 bucket. A dedicated **Cloudflare Worker acts as the Media Gateway**, enforcing strict short-lived token authorization before serving any HLS chunks or subtitles to the player. *(The Gateway's authentication architecture is detailed in a [dedicated deep-dive](/projects/lms-sertifikasi/media-gateway-architecture).)*

**The Result**  
Zero failed uploads, automated accessibility via VTT subtitles, and dynamic adaptive streaming—all coordinated asynchronously and delivered globally via Cloudflare's edge with zero egress taxation.
