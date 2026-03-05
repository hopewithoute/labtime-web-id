---
title: "Securing Edge Media Delivery with a Stateless Gateway"
description: "How we prevented HLS piracy and backend DDOS using Cloudflare Workers and Cookie Priming."
date: 2026-03-05
category: "Infrastructure"
---

**The Thundering Herd of Video Chunks**  
Delivering premium video content presents a dual-sided problem: you must absolutely prevent hotlinking and piracy, but if you authenticate every single 2-second HLS `.ts` chunk against your primary database, a single class of 100 students will inadvertently DDOS your own backend. 

Furthermore, native video players (like iOS Safari) cannot easily attach `Authorization: Bearer` headers to the hundreds of dynamic background requests made for HLS playlist (`.m3u8`) and segment (`.ts`) files.

**The Architecture**  
![Edge Media Gateway Streaming Architecture](/projects/lms-sertifikasi/media-gateway-infographic.png)

To solve the HLS authentication dilemma without sacrificing backend stability, we built a Stateless Edge Media Gateway.

### 1. The Stateless Cloudflare Worker
We deployed a custom Cloudflare Worker acting as a reverse proxy directly in front of a strictly private Cloudflare R2 bucket. 

Instead of querying the Elixir database to validate every incoming video chunk request, the Worker performs instantaneous, stateless cryptographic verification of a JWT token signed by our Elixir backend. If the token is cryptographically sound and hasn't expired, the Worker acts as a massive decentralized bouncer.

### 2. The Cookie-Priming Strategy
Because video players struggle with custom Bearer tokens for segmented streams, the React frontend executes a single initial request to the gateway to "prime" an HTTP-Only, `SameSite=Lax` cookie (`lms_media_token`).

Once that initial handshake is complete, the browser automatically and securely attaches this cookie to every subsequent background request for video chunks. The video player simply requests the raw URL, and the browser handles the secure session layer natively, providing seamless, unhackable authentication.

### 3. Zero-Egress Proxying
Once the JWT is verified at the edge, the Worker fetches the raw `.ts` stream directly from the private R2 bucket and pipes it immediately to the end user. Because the Worker and R2 exist on the same internal Cloudflare network, egress costs to the processor are effectively zero. 

By pushing authentication entirely to the Edge via stateless JWTs, our Elixir backend is completely shielded from media delivery traffic, allowing it to focus exclusively on tracking learning telemetry and calculating granular progress metrics.
