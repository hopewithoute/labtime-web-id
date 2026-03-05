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

### 1. Unified Learning Telemetry (xAPI)
Built a custom, fully compliant Learning Record Store (LRS) integrated into the Elixir backend. Instead of relying on fragmented frontend logic, an Ash Notifier (`ModuleCompletionVerifier`) processes a unified stream of xAPI statements from both native tools (Articulate/Captivate) and custom adapters, guaranteeing 100% accurate progress calculation.  
[Read the Architecture Deep Dive →](/projects/lms-sertifikasi/unified-learning-telemetry)

### 2. Surgical Real-time Synchronization
Completely eliminated REST polling for progress updates. Repurposed Phoenix Channels as a "Backchannel" where backend Ash Notifiers broadcast precise TanStack Query invalidation keys to the React frontend, instantly syncing learning state across multiple devices in O(1) time.  
[Read the Implementation Deep Dive →](/projects/lms-sertifikasi/surgical-realtime-sync)

### 3. High-Performance Media Pipeline
Engineered a secure, multi-stage media pipeline using Cloudflare Stream and TUS. Implemented a robust architecture featuring secure pre-signed uploads (TUS), automated webhook-driven transcription via Elixir workers, and authenticated HLS playback using short-lived JWTs.  
[Read the Engineering Deep Dive →](/projects/lms-sertifikasi/media-pipeline)

### 4. Dynamic PDF Certificate Engine
Replaced an unmaintainable React WYSIWYG editor with a declarative, server-rendered HEEx template approach. Leveraged Elixir's `PdfGenerator` and Chromium headless to generate pixel-perfect, dynamic certificates at scale, drastically simplifying the frontend and improving reliability.  
[Read the System Deep Dive →](/projects/lms-sertifikasi/dynamic-pdf-engine)

### 5. Resilient Elixir-React WebSocket Bridge
Architected a bulletproof real-time connection lifecycle between React 19 and Phoenix. Implemented secure token-exchange via Ash RPC, a React Singleton Provider for persistent TCP connections, and a custom Reference Counting Multiplexer to prevent zombie connections and drastically reduce backend channel mounting overhead.  
[Read the Architecture Deep Dive →](/projects/lms-sertifikasi/phoenix-react-websocket-bridge)
