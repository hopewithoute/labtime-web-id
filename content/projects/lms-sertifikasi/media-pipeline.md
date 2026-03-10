---
title: "Designing an edge-based media pipeline"
description: "How I moved large video upload, processing, and delivery off the core application path with edge storage and asynchronous background jobs."
date: 2026-03-11
tags: ["cloudflare-r2", "media-pipeline", "hls", "oban"]
category: "Content Delivery"
---

### Media traffic needed its own path
Video delivery can quietly become the noisiest and most expensive part of a learning platform.

Large uploads arrive over unstable connections. Processed assets need transcoding and subtitles. Playback generates a stream of requests that has very little to do with certification logic, assessments, or progress tracking.

I did not want the main application carrying that load.

### The pipeline split
![Media Pipeline Architecture with Cloudflare](/projects/lms-sertifikasi/media-pipeline-cloudflare-infographic.png)

I split media handling into separate stages.

Uploads enter through a resumable edge path so instructors can recover from unreliable networks without routing multi-gigabyte transfers through the application backend. Raw assets land in object storage that is a better fit for heavy media workloads.

Once an upload completes, background workers coordinate the expensive work asynchronously. That includes adaptive transcoding and subtitle generation. None of that blocks the UI.

Processed assets then move into a secure delivery path at the edge, where playback can happen without making the application responsible for every media request.

### Why this fit the product
The LMS needed strong media support, but it was not a media product.

That distinction mattered. The goal was not just to make uploads and playback work. The goal was to stop video traffic from dominating the rest of the system.

By pushing ingestion and delivery toward the edge and keeping heavy processing in background jobs, I left the core backend free for product logic: assessments, telemetry, certification workflows, and real-time state.

### The result
The platform ended up with a media pipeline that handled unreliable upload conditions better, fit asynchronous processing naturally, and stayed more isolated from the rest of the product.

Just as importantly, media traffic stopped competing directly with the business system.
