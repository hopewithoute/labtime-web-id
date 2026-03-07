---
title: "LMS Sertifikasi"
description: "A certification platform I independently architected and shipped, covering real-time assessments, immutable certification workflows, xAPI telemetry, and edge-based media delivery."
date: 2026-01-15
tags: ["elixir", "ash-framework", "react", "phoenix-channels", "xapi", "cloudflare-workers", "postgresql"]
role: "Senior Software Engineer"
problem: "Certification platforms need more than course delivery. They have to enforce high-stakes assessment rules, keep learner progress accurate across devices, issue verifiable certificates, and handle large media workloads without letting the backend become the bottleneck."
approach: "I designed and delivered the platform as a full-stack system built on Elixir, Ash Framework, Phoenix WebSockets, React 19, and TanStack. The backend owns lifecycle rules, progress calculation, and asynchronous processing, while the frontend stays responsive through targeted real-time updates. Media upload and delivery move to the Cloudflare edge through Workers and R2."
outcome: "Delivered 21 user stories across 7 domains. Batched Ecto writes replaced N+1 notification fan-out, O(1) progress updates kept the UI responsive under heavy event volume, immutable versioning protected active learners from live curriculum edits, and edge-offloaded media delivery reduced backend load while keeping streaming secure and cost-efficient."
tech_stack:
  frontend:
    - name: "React 19"
      reason: "Concurrent rendering for dense learning surfaces such as the course player, assessment engine, and admin workflows"
    - name: "TypeScript"
      reason: "End-to-end type safety across frontend state, API contracts, and domain-driven UI flows"
    - name: "Tailwind CSS 4.0"
      reason: "Fast iteration across complex product surfaces without losing consistency"
    - name: "TanStack Router, Query, Form"
      reason: "Type-safe routing, surgical cache invalidation, and predictable form state for real-time workflows"
  backend:
    - name: "Elixir"
      reason: "Fault-tolerant concurrency for real-time messaging, progress sync, and background coordination"
    - name: "Ash Framework"
      reason: "Declarative domain modeling with lifecycle validation, authorization rules, and strong resource boundaries"
    - name: "Phoenix WebSockets"
      reason: "Low-latency synchronization for chat, notifications, and cross-device progress updates"
    - name: "Oban"
      reason: "Background execution for transcoding, transcription, exam automation, and document generation"
  infrastructure:
    - name: "PostgreSQL"
      reason: "Durable transactional storage with JSONB-backed learning telemetry and domain indexing"
    - name: "Hono"
      reason: "Lightweight edge and service-layer request handling where a smaller runtime footprint made sense"
    - name: "Cloudflare Workers + R2"
      reason: "Edge-authenticated media delivery, resumable ingestion, and lower storage plus egress costs"
    - name: "xAPI"
      reason: "Standardized telemetry ingestion and interoperability across internal and third-party learning content"
screenshots: []
---

I independently architected and shipped this certification platform end to end.

The core challenge was keeping several hard requirements working together: high-stakes assessments, accurate cross-device progress, verifiable certificate issuance, and media-heavy learning content. That drove a system design where correctness stayed in the backend, real-time updates stayed targeted, and media traffic stayed off the core application path.

**Frontend and real-time UX.** React 19, TypeScript, Tailwind CSS 4.0, and TanStack power the client. Phoenix WebSockets handle progress, chat, notifications, and assessment updates without polling. For high-frequency events like video progress and unread state, I used targeted invalidation and O(1) local updates so the UI stayed responsive under load.

**Backend integrity and certification rules.** Elixir and Ash Framework handle lifecycle policy, progress calculation, and assessment state. Published certifications are versioned instead of edited in place, which protects in-flight learners from silent rule changes. The backend also stays the source of truth for telemetry, eligibility, and completion logic.

**Telemetry and interoperability.** The platform ingests xAPI statements from internal and third-party learning tools, then maps them into a unified progress model. That keeps completion logic consistent across videos, quizzes, PDFs, and packaged learning content.

**Media pipeline and delivery.** Video ingestion, transcoding, transcription, and HLS delivery run through Cloudflare Workers, R2, and Oban-based background processing. That keeps large media workloads off the main Elixir request path and makes delivery cheaper and easier to scale.

A few implementation details had outsized impact. Chat and notification fan-out were split into room and user channels. High-volume unread writes dropped from N inserts to a single batched write on the hot path. Curriculum changes moved through deep-clone versioning instead of live mutation. Progress synchronization became backend-driven, so the product stayed fast without making the browser the authority.

The result is a system built for certification workflows, not just course pages. It handles real-time interaction, strict domain rules, and media-heavy delivery without letting one part of the product destabilize the rest.

The supporting writeups below break down the major architectural decisions in more detail.
