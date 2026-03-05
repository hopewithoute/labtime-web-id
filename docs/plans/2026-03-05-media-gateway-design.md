# Article 8: Securing Edge Media Delivery with a Stateless Gateway

## Title
Securing Edge Media Delivery with a Stateless Gateway

## Narrative Angle
**The Thundering Herd of Video Chunks**
Delivering premium video content presents a dual-sided problem: you must absolutely prevent piracy/hotlinking, but if you authenticate every single 2-second HLS `.ts` chunk against your primary database, a single class of 100 students will DDOS your own backend. This article explains how we built a stateless Edge Media Gateway using Cloudflare Workers to solve the HLS authentication dilemma.

## Outline
1. **The Hotlinking & HLS Dilemma**
   - You can't put premium LMS videos in an open bucket. 
   - However, native video players (like iOS Safari or Vidstack) cannot easily attach `Authorization: Bearer` headers to the hundreds of background requests made for HLS playlist (`.m3u8`) and segment (`.ts`) files.
2. **The Stateless Edge Gateway**
   - We deployed a custom Cloudflare Worker acting as a reverse proxy in front of a strictly private R2 bucket.
   - Instead of querying the Elixir database, the Worker performs instantaneous, stateless cryptographic verification of a JWT token signed by our backend.
3. **The Cookie-Priming Strategy**
   - To bypass the HLS header limitation, the frontend makes a single initial request to the gateway to "prime" an HTTP-Only, `SameSite=Lax` cookie (`lms_media_token`).
   - The browser automatically attaches this secure cookie to every subsequent background request for video chunks, providing seamless, unhackable authentication.
4. **Zero-Egress Proxying**
   - Once the JWT is verified at the edge, the Worker fetches the raw stream directly from the private R2 bucket and streams it to the user. Because the Worker and R2 exist on the same internal network, egress costs to the processor are zero.

## Image Prompt Concept (Nano Banana Style)
A horizontal sequence showing the Media Gateway architecture:
1. Left Box: 'Video Player' firing multiple arrows labeled '.ts segments + Cookie'.
2. Center Glowing Hexagon: 'Edge Media Gateway (Worker)' containing a 'JWT Validator' shield icon.
3. Right Box: 'Private R2 Bucket' with a lock icon.
An arrow flows from the Player to the Gateway, then from the Gateway to R2, with a return arrow labeled 'Zero-Egress Stream'.
