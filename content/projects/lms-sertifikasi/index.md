---
title: "LMS Sertifikasi"
description: "A full-stack learning management system for professional certification—covering course authoring, proctored assessments, xAPI telemetry, and automated certificate issuance."
date: 2026-01-15
tags: ["elixir", "ash-framework", "react", "phoenix-channels", "xapi", "cloudflare-workers", "postgresql"]
role: "Lead Full-Stack Developer"
problem: "Professional certification programs require managing the entire lifecycle—from multi-format content authoring (video, PDF, xAPI packages) and hierarchical course structures, through secure proctored assessments with anti-cheat monitoring, to verifiable certificate issuance with expiry tracking and renewal workflows."
approach: "Built a modular monolith on Ash Framework for declarative domain modeling with strict lifecycle policies. Phoenix Channels provide real-time multi-device synchronization, while a React 19 + TanStack frontend drives granular progress tracking via a custom xAPI Learning Record Store. Media delivery is pushed entirely to the Cloudflare edge via stateless JWT-authenticated Workers."
outcome: "Implemented 21 user stories across 7 domains. Engineered for high-concurrency scenarios—edge-offloaded media delivery eliminates backend load from video traffic, batched Ecto writes replace N+1 notification storms, and O(1) progress store updates keep the UI responsive under predicted peak loads of thousands of simultaneous learners. Architecture enforces zero-trust media access, surgical cross-device cache invalidation, and immutable certification guarantees that protect active learners from live curriculum edits."
tech_stack:
  frontend:
    - name: "React 19"
      reason: "Concurrent rendering for complex learning UIs (Course Player, Exam Engine)"
    - name: "TanStack Router/Query"
      reason: "Type-safe routing with real-time cache invalidation via Phoenix Channels"
    - name: "TypeScript"
      reason: "End-to-end type safety from Ash RPC schema to UI components"
  backend:
    - name: "Elixir/Phoenix"
      reason: "Fault-tolerant concurrency for real-time WebSocket sync and background job orchestration"
    - name: "Ash Framework"
      reason: "Declarative domain modeling with built-in authorization policies and lifecycle validations"
    - name: "Oban"
      reason: "Background job processing for exam auto-completion, video transcoding, and PDF generation"
  infrastructure:
    - name: "PostgreSQL"
      reason: "JSONB for flexible xAPI statements and content schemas with strategic composite indexes"
    - name: "Cloudflare R2 + Workers"
      reason: "Zero-egress media storage with stateless JWT gateway for secure HLS streaming"
    - name: "ChromicPDF"
      reason: "Server-side headless Chrome rendering for pixel-perfect certificate PDFs"
screenshots: []
---

The system is organized around four architectural pillars, each explored in depth through the accompanying decision records.

**Domain Integrity & Real-time Sync.** At the core, Ash Framework enforces strict lifecycle rules—published certifications become immutable ledgers, protecting active learners from curriculum edits via deep-clone versioning. Phoenix Channels bridge the Elixir backend and React frontend through a singleton WebSocket provider with reference-counted channel multiplexing, enabling surgical TanStack Query invalidation that eliminates REST polling entirely.

**Content Pipeline & Secure Delivery.** Multi-gigabyte video uploads flow through a resumable TUS endpoint into Cloudflare R2, where Oban workers orchestrate parallel FFmpeg transcoding (adaptive HLS) and AI-powered VTT transcription. A stateless Cloudflare Worker acts as the media gateway, performing cryptographic JWT verification at the edge so the Elixir backend never handles media traffic. Certificate PDFs follow the same async pattern—structured JSON configs rendered server-side via HEEx templates and ChromicPDF, then stored on R2.

