---
title: "Designing an edge-based media pipeline"
description: "How I moved large-video upload, processing, and delivery off the core application path using Cloudflare Workers, R2, and asynchronous Elixir jobs."
date: 2026-02-01
tags: ["cloudflare-r2", "media-pipeline", "hls", "oban"]
category: "Content Delivery"
---

### Media traffic needed its own path
Video delivery can quietly become the most expensive and operationally noisy part of a learning platform.

Large uploads arrive over unstable connections. Processed assets need transcoding and subtitles. Playback generates a stream of requests that has nothing to do with the core business logic of certification, assessments, or progress tracking.

I didn't want the main Elixir application carrying that load.

### The pipeline split
![Media Pipeline Architecture with Cloudflare](/projects/lms-sertifikasi/media-pipeline-cloudflare-infographic.png)

I split media handling into separate stages.

Uploads enter through a resumable edge path so instructors can recover from unreliable networks without routing multi-gigabyte transfers through the application backend. Raw assets land in Cloudflare R2, which keeps storage and transfer economics better aligned with heavy media workloads.

Once an upload completes, Oban coordinates the expensive work asynchronously. That includes HLS transcoding for adaptive playback and transcription for VTT subtitle generation. The UI doesn't wait for any of this synchronously.

Processed assets then move into a secure delivery path at the edge, where playback can happen without making the application responsible for every media request.

### Why this architecture fit the product
The LMS needed media support, but it wasn't a media product.

That distinction mattered. The goal wasn't just to make uploads and playback work. The goal was to make them work without letting video traffic dominate the rest of the system.

By pushing ingestion and delivery toward Cloudflare and keeping heavy processing in background jobs, I preserved the application backend for product logic: assessments, telemetry, certification workflows, and real-time state.

### The result
The platform got a media pipeline that was more reliable under poor upload conditions, easier to operate asynchronously, and cheaper to deliver at scale.

Just as important, media traffic stopped competing directly with the rest of the product. That separation was the real win.