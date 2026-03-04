---
title: "LMS Sertifikasi"
description: "A full-stack learning management system for professional certification with real-time tracking and assessment."
date: 2026-01-15
tags: ["elixir", "react", "websockets", "postgresql"]
role: "Lead Full-Stack Developer"
problem: "Organizations needed a scalable platform to manage certification programs, track learning progress in real-time, and deliver reliable assessments to thousands of concurrent learners."
approach: "Built a modular system using Ash Framework for domain logic, Phoenix Channels for real-time sync, and a React 19 frontend with granular progress tracking via xAPI."
outcome: "Serving 5,000+ concurrent learners with 99.9% uptime, 70% reduction in WebSocket CPU load, and sub-second progress synchronization."
tech_stack:
  frontend:
    - name: "React 19"
      reason: "Server components & concurrent rendering for complex learning UIs"
    - name: "TanStack Router/Query"
      reason: "Type-safe routing with built-in cache invalidation via WebSocket"
  backend:
    - name: "Elixir/Phoenix"
      reason: "Fault-tolerant concurrency for real-time learning sync"
    - name: "Ash Framework"
      reason: "Declarative domain modeling with built-in authorization"
  infrastructure:
    - name: "PostgreSQL"
      reason: "JSONB for flexible content schemas + full-text search"
screenshots: []
---

## Technical Highlights & Decisions

### Real-time Learning Sync
Phoenix Channels with multiplexed room model for efficient fan-out. Moved from per-user topics to shared rooms, reducing WebSocket CPU load by 70% during concurrent quiz sessions.
[Deep Dive →](/projects/lms-sertifikasi/optimizing-websocket-fanout)

### Granular Progress Tracking
Vanilla TypeScript External Store paired with React 18's `useSyncExternalStore` for O(1) UI updates. Chose this over Context API to avoid full-tree re-renders in courses with 200+ items.

### Assessment Engine
Timed exams with snapshot-based grading and remedial cooldown logic. Snapshots ensure grading integrity even if questions are modified after submission.

### xAPI Integration
Full LRS compliance for learning analytics and session resumption. Implemented exit-only persistence strategy to reduce network noise while maintaining reliable session state via terminal browser events.
