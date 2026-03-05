---
title: "Unified Learning Telemetry Tracker"
description: "High-performance xAPI telemetry sync across all content types with backend Ash mapping and calculation."
date: 2026-01-20
category: "Backend Architecture"
---

**The Problem**  
Tracking learning progress across wildly different mediums (Interactive Videos, Interactive Quizzes, PDFs) usually results in fragmented, messy data tables. Furthermore, relying on the frontend to calculate "completion" is inherently unreliable due to network drops or browser closures.

**The Architecture**  
![Unified Learning Telemetry Architecture](/projects/lms-sertifikasi/telemetry-infographic.png)

We solved this by building a **Unified Telemetry Mapping** layer that resides in our Elixir/Ash backend, turning raw xAPI streams into actionable progress metrics:

1. **The Backend LRS Sink**: The platform acts as a native Learning Record Store (LRS). Whether a statement comes from internal players or third-party tools like **Articulate Storyline** or **Adobe Captivate**, it hits a unified `LrsController` that validates and persists standard xAPI statements.
2. **Asynchronous Completion Notifiers**: We implemented an **Ash Notifier (`ModuleCompletionVerifier`)** that reactively watches the `XapiStatement` resource. When a `COMPLETED` verb arrives—even from an opaque Articulate package—the notifier automatically triggers the business logic to update the user's `ModuleProgress`.
3. **Multi-Level Progress Calculation**: Instead of a "God table" for progress, we use a cascading calculation logic. The `ModuleCompletionVerifier` ensures that once a module is marked complete via xAPI, it immediately triggers a `sync_progress` action on the parent `Enrollment`, providing real-time certification eligibility checks.
4. **Decoupled Local State**: On the frontend, we use a **Vanilla TypeScript External Store** (ProgressStore) to handle high-frequency events (like 1s video heartbeats) in O(1) time. This ensures the user feels a zero-lag UI while the heavy lifting of mapping and verification happens reliably on the backend.

**The Result**  
A "Zero-Trust" progress engine. By centralizing the calculation logic in backend notifiers rather than relying on frontend calls, we ensured that completion remains 100% accurate even if a user closes their browser mid-session or uses an offline-capable xAPI player.

*(Note: Real-time multi-device synchronization via WebSockets is covered in a separate architectural deep-dive.)*
