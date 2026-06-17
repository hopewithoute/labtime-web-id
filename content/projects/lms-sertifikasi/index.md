---
title: "LMS Sertifikasi"
description: "A high-concurrency learning platform built for zero-downtime assessments. I engineered the entire architecture from the ground up, tackling complex curriculum immutability, surgical real-time synchronization, and zero-egress edge media delivery."
date: 2026-03-19
tags: ["elixir", "ash-framework", "react", "phoenix-channels", "xapi", "cloudflare-workers", "postgresql"]
role: "Senior Full-Stack Engineer / Lead Architect"
problem:
  - "Curriculum updates often corrupt the progress of active learners if not versioned correctly."
  - "Delivering protected HLS video at scale via traditional cloud providers incurs massive bandwidth (egress) costs."
  - "Complex state synchronization (chat, exam progress) requires low-latency infrastructure that doesn't bog down the database with constant polling."
approach:
  - "Modeled an immutable, 'Let it Ride' certification engine using Ash Framework, ensuring strict locking and safe maintenance modes to prevent data corruption."
  - "Designed a custom, self-hosted video transcoding pipeline using Elixir Oban and FFmpeg, delivering byte-range HLS via Cloudflare R2 and Workers to eliminate egress fees."
  - "Built a surgical real-time bridge using Phoenix WebSockets and React to broadcast targeted state changes across devices instantly."
outcome:
  - "Designed a domain model that guarantees absolute data integrity; past enrollments remain mathematically isolated from future curriculum mutations."
  - "Architected a zero-egress media pipeline, reducing projected streaming bandwidth costs by over 99% compared to traditional cloud storage."
  - "Engineered a polling-free, real-time synchronization layer built to maintain strict responsiveness under heavy operational load."
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
      reason: "Declarative domain modeling with strict lifecycle validation, authorization rules, and immutable resource boundaries"
    - name: "Phoenix WebSockets"
      reason: "Low-latency synchronization for chat, notifications, and cross-device progress updates"
    - name: "Oban"
      reason: "Reliable background execution for FFmpeg video transcoding, exam automation, and PDF generation"
  infrastructure:
    - name: "PostgreSQL"
      reason: "Durable transactional storage with partitioned indexing for high-volume xAPI telemetry"
    - name: "Hono"
      reason: "Lightweight edge-layer request handling for authenticating media streams at the Cloudflare edge"
    - name: "Cloudflare Workers + R2"
      reason: "Edge-authenticated media delivery and zero-egress HLS video storage"
    - name: "xAPI"
      reason: "Standardized telemetry ingestion and interoperability across diverse learning content"
screenshots:
  - src: /projects/lms-sertifikasi/certification-engine-infographic.png
    title: "Immutable Certification Engine"
    description: "Architected a 'Let it Ride' versioning strategy using Ash Framework to prevent data corruption during curriculum updates."
    bullets:
      - "Enforced strict locking on published courses so active learners are never disrupted by structural changes."
      - "Engineered a safe 'hotfix' mode allowing minor cosmetic corrections without triggering full version migrations."
      - "Utilized a pointer-based content cloning strategy to maximize storage efficiency while preserving historical integrity."
  - src: /projects/lms-sertifikasi/assessment-engine-infographic.png
    title: "Resilient Assessment Engine"
    description: "Ensuring exam integrity and uninterrupted delivery under high concurrency."
    bullets:
      - "Engineered a fault-tolerant assessment delivery mechanism designed to scale for thousands of concurrent users."
      - "Moved exam state evaluation exclusively to the server to prevent client-side tampering."
      - "Automated document generation and grading through background Oban workers."
  - src: /projects/lms-sertifikasi/media-pipeline-cloudflare-infographic.png
    title: "Zero-Egress Edge Media Pipeline"
    description: "Designed a self-hosted HLS transcoding and delivery architecture to eliminate massive bandwidth costs."
    bullets:
      - "Offloaded heavy FFmpeg video transcoding to robust background queues using Elixir Oban."
      - "Stored byte-range HLS segments in Cloudflare R2, effectively reducing projected egress costs by over 99% compared to traditional cloud storage."
      - "Isolated heavy media traffic from the core Elixir application, ensuring business logic stays fast."
  - src: /projects/lms-sertifikasi/telemetry-infographic.png
    title: "Unified Learning Telemetry"
    description: "A centralized xAPI event ingestion engine optimized for high-volume analytics."
    bullets:
      - "Designed a Unified xAPI Player to normalize telemetry from video, audio, PDF, and interactive quizzes."
      - "Architected a high-volume PostgreSQL LRS using table partitioning by month to ensure fast insertions and easy data archival."
      - "Implemented strategic composite indexes (actor, object, verb timelines) to query millions of telemetry events without degrading database performance."
  - src: /projects/lms-sertifikasi/websocket-sync-infographic.png
    title: "Surgical Real-time Synchronization"
    description: "Low-latency state syncing across devices using Phoenix WebSockets and React."
    bullets:
      - "Established an end-to-end type-safe bridge between the Elixir backend and React frontend."
      - "Implemented targeted payload updates to avoid coarse polling and maintain responsiveness."
      - "Managed live chat, notifications, and cross-device progress sync flawlessly."
  - src: /projects/lms-sertifikasi/media-gateway-infographic.png
    title: "Authenticating HLS Streaming at the Edge"
    description: "How I built an edge-side media gateway using Hono to secure HLS playback without bottlenecking the main application."
    bullets:
      - "Designed an edge-based media gateway using Cloudflare Workers to authenticate chunked HLS streaming."
      - "Prevented thousands of video segment requests from hammering the core Elixir application."
      - "Secured paid certification content with signed JWTs evaluated entirely at the edge."
  - src: /projects/lms-sertifikasi/chat-architecture-infographic.png
    title: "Scaling Chat for Certification Workflows"
    description: "How I split chat into room delivery and user-scoped unread updates so notifications stayed fast under load."
    bullets:
      - "Separated high-volume chat delivery from personalized unread state updates."
      - "Used Phoenix Channels to broadcast messages instantly with low write amplification."
      - "Eliminated polling by keeping unread counts synced via targeted WebSocket events."
  - src: /projects/lms-sertifikasi/websocket-integration-infographic.png
    title: "Building a Stable Phoenix WebSocket Layer"
    description: "How I handled connection auth, lifecycle, and subscription reuse."
    bullets:
      - "Engineered a robust React-to-Phoenix WebSocket bridge handling reconnects and lifecycle management."
      - "Reused channel subscriptions efficiently across complex UI navigation flows."
      - "Ensured a stable real-time foundation for chat, notifications, and exam progress sync."
  - src: /projects/lms-sertifikasi/pdf-engine-infographic.png
    title: "Server-Driven Certificate PDF Pipeline"
    description: "How I split certificate configuration, server-side rendering, and background PDF generation."
    bullets:
      - "Offloaded certificate generation entirely to a background server-rendered pipeline."
      - "Ensured pixel-perfect document consistency regardless of the user's browser or device."
      - "Utilized Oban background queues to generate and store PDF certificates asynchronously."
---
