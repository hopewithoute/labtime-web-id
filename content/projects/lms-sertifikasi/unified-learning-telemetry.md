---
title: "Unified Learning Telemetry Tracker"
description: "High-performance xAPI telemetry syncing across devices with O(1) React UI updates and Phoenix Channels."
date: 2026-03-05
category: "Content Architecture"
---

**The Problem**  
Tracking learning progress across wildly different mediums (Interactive Videos, SCORM Quizzes, PDFs) usually results in fragmented, messy data tables. Furthermore, tracking this progress in real-time across multiple devices—without self-inflicting a DDoS attack on the backend—requires careful state management and network prioritization.

**The Architecture**  
![Unified Learning Telemetry Architecture](/projects/lms-sertifikasi/telemetry-infographic.png)

We solved this through a dual-strategy approach: standardizing the data format and decoupling the UI state from the network synchronizer.

1. **The xAPI Standard**: Instead of custom `video_progress` or `quiz_scores` tables, every interaction is standardized into the xAPI (Experience API) format: **Actor -> Verb -> Object** (e.g., *John -> Watched -> React Hooks Video*). This allows agnostic progress calculation and seamless integration with any Learning Record Store (LRS).
2. **O(1) UI Updates**: The Player UI generates high-frequency streams (e.g., firing events every second a video plays). To prevent React re-render thrashing, we built a `ProgressStore` using Vanilla TS and `useSyncExternalStore`. The UI reacts to progress instantly in O(1) time without triggering up-tree renders.
3. **Decoupled Network Sync**: The high-frequency UI state is buffered. A secondary React Hook periodically flushes these xAPI statements to the backend using an "Exit-only" or interval strategy, protecting the Elixir API from excess load.
4. **Real-time Fanout via WebSockets**: To support seamless multi-device resumption, the Elixir backend utilizes a `QueryInvalidationBroadcaster` over Phoenix Channels. When progress is saved on a mobile device, a surgical cache-invalidation payload is pushed via WebSocket to the user's desktop session, immediately syncing the UI.

**The Result**  
A unified, high-performance telemetry pipeline. Instructors get standardized, deeply granular analytics across all content types, while learners get a flawless, real-time "continue where you left off" experience across all their devices—all achieved with zero database bottlenecking.
