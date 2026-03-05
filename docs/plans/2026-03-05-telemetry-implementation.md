# Telemetry Sub-Article Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create a new markdown sub-article `unified-learning-telemetry.md` in the `content/projects/lms-sertifikasi` directory detailing the architecture of the xAPI telemetry system using React Vanilla Stores, WebSockets, and Elixir.

**Architecture:** We will translate the approved design document (`docs/plans/2026-03-05-telemetry-design.md`) into a Nuxt Content markdown file, complete with frontmatter and the embedded 'Nano Banana' infographic.

**Tech Stack:** Nuxt Content (Markdown), Vue (Frontend)

---

### Task 1: Create the Sub-Article Content File

**Files:**
- Create: `content/projects/lms-sertifikasi/unified-learning-telemetry.md`

**Step 1: Write the implementation**

```markdown
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

We solved this by building a **Unified Telemetry Mapping** layer that resides in our Elixir/Ash backend, turning raw xAPI streams into actionable progress metrics:

1. **The Backend LRS Sink**: The platform acts as a native Learning Record Store (LRS). Whether a statement comes from internal players or third-party tools like **Articulate Storyline** or **Adobe Captivate**, it hits a unified `LrsController` that validates and persists standard xAPI statements.
2. **Asynchronous Completion Notifiers**: We implemented an **Ash Notifier (`ModuleCompletionVerifier`)** that reactively watches the `XapiStatement` resource. When a `COMPLETED` verb arrives—even from an opaque Articulate package—the notifier automatically triggers the business logic to update the user's `ModuleProgress`.
3. **Multi-Level Progress Calculation**: Instead of a "God table" for progress, we use a cascading calculation logic. The `ModuleCompletionVerifier` ensures that once a module is marked complete via xAPI, it immediately triggers a `sync_progress` action on the parent `Enrollment`, providing real-time certification eligibility checks.
4. **Decoupled Local State**: On the frontend, we use a **Vanilla TypeScript External Store** (ProgressStore) to handle high-frequency events (like 1s video heartbeats) in O(1) time. This ensures the user feels a zero-lag UI while the heavy lifting of mapping and verification happens reliably on the backend.

**The Result**  
A "Zero-Trust" progress engine. By centralizing the calculation logic in backend notifiers rather than relying on frontend calls, we ensured that completion remains 100% accurate even if a user closes their browser mid-session or uses an offline-capable xAPI player.

*(Note: Real-time multi-device synchronization via WebSockets is covered in a separate architectural deep-dive.)*

**The Result**  
A unified, high-performance telemetry pipeline. Instructors get standardized, deeply granular analytics across all content types, while learners get a flawless, real-time "continue where you left off" experience across all their devices—all achieved with zero database bottlenecking.
```

**Step 2: Commit**

```bash
git add content/projects/lms-sertifikasi/unified-learning-telemetry.md public/projects/lms-sertifikasi/telemetry-infographic.png
git commit -m "docs(portfolio): add unified learning telemetry sub-article and infographic"
```
