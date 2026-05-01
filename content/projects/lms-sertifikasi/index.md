---
title: "LMS Certification Platform"
description: "I architected and shipped this certification platform end to end, with real-time assessments, versioned certification workflows, centralized telemetry, and edge-based media delivery."
date: 2026-03-19
tags: ["elixir", "ash-framework", "react", "phoenix-channels", "xapi", "cloudflare-workers", "postgresql"]
role: "Senior Full-Stack Engineer / Long-Term Core Engineer"
problem: "Certification platforms need more than course delivery. They have to preserve exam integrity, keep learner progress accurate across devices, issue trustworthy certificates, and handle media-heavy delivery without letting the core application become the bottleneck."
approach: "I designed and delivered the platform as a full-stack system where the backend owns lifecycle rules, progress calculation, and asynchronous processing, while the frontend stays responsive through targeted real-time updates. Media ingestion and delivery move toward the edge so large transfers and segmented playback do not dominate the application runtime."
outcome: "Delivered a certification platform with stronger real-time behavior, safer versioned learning rules, more reliable progress calculation, and a media path that no longer competes directly with the core business system. The product stayed responsive under operational pressure without moving business truth into the browser."
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

I architected and shipped this certification platform end to end.

The hard part was not building course pages. It was getting several strict requirements to coexist: high-stakes assessments, accurate cross-device progress, verifiable certificate issuance, and media-heavy learning delivery. That pushed the system in a clear direction. Business truth stayed in the backend, real-time updates stayed narrow, and media traffic stayed off the core application path whenever possible.

On the frontend, React and targeted real-time updates keep progress, chat, notifications, and assessment views in sync without falling back to coarse polling. For high-frequency events, the client updates only the state that actually changed, which kept dense learning screens responsive.

On the backend, lifecycle rules, progress calculation, and assessment state all live on the server. Published certifications are versioned instead of edited in place, so learners already in progress are not silently moved onto a different set of rules. The backend also remains the source of truth for telemetry, eligibility, and completion logic.

Telemetry had to work across both internal tools and third-party learning content. The platform ingests those events, normalizes them into one progress model, and uses that model to drive completion across videos, quizzes, PDFs, and packaged content.

Media needed its own boundary. Uploads, processing, transcription, and segmented delivery run through edge-oriented services and background workers, which keeps large media workloads out of the main request path.

A few implementation details ended up mattering more than they first appeared. Real-time delivery paths were split by audience. High-volume notification writes were collapsed into a batched hot path. Curriculum changes moved through explicit versioning instead of live mutation. Progress synchronization became backend-driven so the product could feel immediate without making the browser the authority.

To respect prior employer confidentiality, some identifiers, metrics, and implementation details in the supporting writeups are intentionally generalized. The architectural decisions and trade-offs are still real.

This was a certification system, not a course catalog with an exam feature taped onto it. It had to hold up under real operational pressure: live learners, changing curricula, media traffic, and strict completion rules. The supporting writeups below break down the parts that mattered most.
