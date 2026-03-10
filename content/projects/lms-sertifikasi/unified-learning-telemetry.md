---
title: "Unifying learning telemetry across content types"
description: "How I built a backend telemetry and progress-mapping layer that kept completion logic consistent across video, quizzes, PDFs, and third-party learning packages."
date: 2026-03-10
tags: ["xapi", "telemetry", "progress-tracking", "learning-record-store"]
category: "Backend Architecture"
---

### Different content types still need one progress model
A certification platform rarely gets one clean telemetry format.

Videos emit heartbeat-style updates. Quizzes and exams have completion events. PDFs behave differently again. Third-party learning packages bring their own event shapes. Users do not care about any of that. They want one consistent answer to a basic question: what have I completed, and what still blocks certification?

That pushed progress logic into the backend.

### The telemetry mapping layer
![Unified Learning Telemetry Architecture](/projects/lms-sertifikasi/telemetry-infographic.png)

The platform accepts learning statements from both internal experiences and third-party tools, then maps those raw events into the domain model used by certifications, modules, and enrollments.

I used the backend as the ingestion and calculation boundary. Statements are validated and persisted first. From there, server-side progress logic updates module progress and rolls those changes upward into enrollment-level state.

That means completion is not inferred from browser state alone. It is calculated from durable events the backend can process consistently.

### Why the backend had to own this
If completion logic mostly lives in the client, it gets fragile fast.

A tab closes. A network drops in the middle of a session. A third-party package sends delayed completion events. Those are normal conditions in learning software, and none of them should create a different definition of progress.

By centralizing telemetry mapping in the backend, I kept the rules for module completion and certification eligibility in one place. The frontend still handles high-frequency local updates for responsiveness, but the business truth stays server-side.

### What this unlocked
This gave the platform a cleaner interoperability story.

Internal players, quizzes, PDFs, and packaged learning tools can all feed the same certification engine without each format inventing its own progress model. That cuts down branching logic and makes reporting more consistent.

It also paired well with the platform's real-time update path. Once backend state changes, the frontend can sync to it quickly without becoming the authority for whether something is complete.

### The result
Progress tracking became more reliable across all learning formats.

The system can accept mixed telemetry sources, calculate completion centrally, and keep certification eligibility current without trusting the browser to be the final judge.
