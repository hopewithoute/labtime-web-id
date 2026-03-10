---
title: "Authenticating HLS streaming at the edge"
description: "How I built an edge-side media gateway to secure HLS playback without sending every playlist and segment request back through the application."
date: 2026-03-10
tags: ["cloudflare-workers", "hls", "streaming", "jwt"]
category: "Infrastructure"
---

### HLS authentication falls apart if the backend stays in the hot path
Segmented video playback creates a request pattern that does not fit normal application authorization.

Players fetch playlists and media chunks in the background, often without a reliable way to attach custom headers on every request. If each of those requests had to round-trip through the application and database for authorization, the system would spend too much effort proving access instead of delivering content.

I wanted that check closer to the media itself.

### The gateway design
![Edge Media Gateway Streaming Architecture](/projects/lms-sertifikasi/media-gateway-infographic.png)

I put an edge-side verification layer in front of private object storage and used it as a stateless media gate.

The application issues a short-lived media credential. The edge layer validates that credential before proxying playlist or segment requests to protected storage. That removes the core application and database from the request path for every playback fetch.

### The browser compatibility constraint
One protocol detail shaped the whole design.

A lot of players do not make it easy to attach custom credentials consistently across segmented requests. So the playback flow starts with a browser-compatible credential handoff before segmented streaming begins. After that, the normal media requests can continue without asking the UI to re-authorize every chunk.

That was the piece that made edge-side authorization practical in actual browsers instead of just on a diagram.

### Why it was worth the extra boundary
The main win was not only security. It was getting media authorization fan-out out of the application backend.

Once the edge can validate access on its own, the core system can spend its time on telemetry, assessments, certification state, and the rest of the product logic. Streaming traffic stops competing with the business system for the same resources.

### The result
The media path stays authenticated without turning every segment request into an application concern.

Playback became easier to scale, and media traffic became much less likely to disturb the rest of the platform.
