---
title: "Authenticating HLS streaming at the edge"
description: "How I designed a stateless media gateway that secures segmented video playback with edge-side token verification instead of per-request backend authorization."
date: 2026-03-18
tags: ["cloudflare-workers", "hls", "streaming", "jwt"]
category: "Infrastructure"
---

### HLS authentication breaks if the backend stays in the hot path
Segmented video playback creates a request pattern that doesn't fit normal application authorization.

Players fetch playlists and media chunks in the background, often without a clean way to attach custom headers on every request. If each of those requests had to round-trip through the application and database for authorization, the system would spend too much time proving access instead of delivering content.

I wanted the authorization check closer to the media itself.

### The gateway design
![Edge Media Gateway Streaming Architecture](/projects/lms-sertifikasi/media-gateway-infographic.png)

I put a Cloudflare Worker in front of a private R2 bucket and used it as a stateless verification layer.

The backend issues short-lived signed tokens for media access. The Worker validates those tokens at the edge before proxying playlist or segment requests to the private bucket. That removes the application and database from the request path for every `.m3u8` and `.ts` fetch.

### Why cookie priming mattered
One protocol constraint shaped the rest of the design.

Many video players don't make it easy to attach bearer tokens consistently across segmented requests. So the frontend performs an initial request that sets an HTTP-only cookie for the media gateway. After that, the browser attaches the credential automatically while the player keeps working with ordinary media URLs.

That wasn't a gimmick. It was the compatibility layer that made edge-side authorization work with real browser behavior.

### Why this was worth doing
The main gain wasn't just security. It was removing media authorization fan-out from the application backend.

Once the edge can validate access on its own, Elixir is free to focus on learning telemetry, assessments, certification state, and the rest of the product logic. Streaming traffic stops competing with the core system for the same resources.

### The result
The media path stays authenticated without turning every segment request into a backend concern.

That made playback cheaper to serve, easier to scale, and more isolated from the rest of the platform. For this workload, pushing auth to the edge was the right boundary.