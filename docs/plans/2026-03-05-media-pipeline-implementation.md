# Media Pipeline Sub-Article Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create a new markdown sub-article `media-pipeline.md` in the `content/projects/lms-sertifikasi` directory detailing the architecture of the media pipeline using Cloudflare R2 and Workers.

**Architecture:** We will translate the approved design document (`docs/plans/2026-03-05-media-pipeline-design.md`) into a Nuxt Content markdown file, complete with frontmatter and the embedded 'Nano Banana' infographic.

**Tech Stack:** Nuxt Content (Markdown), Vue (Frontend)

---

### Task 1: Create the Sub-Article Content File

**Files:**
- Create: `content/projects/lms-sertifikasi/media-pipeline.md`

**Step 1: Write the implementation**

```markdown
---
title: "Building a Resilient Media Pipeline at the Edge"
description: "How we ingested, processed, and delivered multi-gigabyte video files securely using Cloudflare R2, Workers, and Elixir."
date: 2026-03-05
category: "Content Architecture"
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
4. **Secure Edge Delivery**: Processed assets are stored in a secondary R2 bucket. A dedicated **Cloudflare Worker acts as the Media Gateway**, enforcing strict short-lived token authorization before serving any HLS chunks or subtitles to the player.

**The Result**  
Zero failed uploads, automated accessibility via VTT subtitles, and dynamic adaptive streaming—all coordinated asynchronously and delivered globally via Cloudflare's edge with zero egress taxation.
```

**Step 2: Commit**

```bash
git add content/projects/lms-sertifikasi/media-pipeline.md public/projects/lms-sertifikasi/media-pipeline-cloudflare-infographic.png
git commit -m "docs(portfolio): add media pipeline sub-article and infographic"
```
