---
title: "Architecting a Concurrent Assessment Engine"
description: "Handling concurrency, preventing temporal manipulation, and orchestrating background jobs in an Exam system."
date: 2026-03-01
category: "Backend Architecture"
---

**State Management & Concurrency**  
Building a reliable assessment engine goes beyond simply rendering a form and recording a score. It requires guarding against temporal edge cases (like an instructor altering an answer key mid-exam), thwarting concurrent submission manipulations, and securely enforcing time limits outside the client's browser environment.

**The Architecture**  
![Resilient Assessment Engine](/projects/lms-sertifikasi/assessment-engine-infographic.png)

Our exam engine relies on three core backend strategies—Snapshotting, Optimistic Locking, and Cron Workers—to maintain an impenetrable state.

### 1. Point-in-Time Integrity (Question Snapshotting)
To decouple active exam sessions from the volatility of the master Question Bank, our Elixir backend executes a "Snapshot" operation the exact microsecond an `ExamAttempt` is started. 

We serialize the entire active syllabus of questions, options, and correct answers into an immutable JSONB column (`questions_snapshot`) directly on the attempt payload. The user’s eventual submission is strictly graded against this static snapshot, natively immunizing inflight exams against live administrative edits to the global Question Bank.

### 2. Preventing Race Conditions (Optimistic Locking)
A common attack vector (or simple UI bug) involves a user rapidly double-clicking the submit button or firing sequential API requests simultaneously to alter grading logic. 

We defend the Elixir `submit` and `grade` actions using Ash Framework's `optimistic_lock(:version)`. A lightweight integer version counter is attached to the attempt payload. If two requests attempt to mutate the attempt concurrently, the first request bumps the version number, causing the second request to instantly crash on a version mismatch, cleanly avoiding duplicate grading operations or lost updates.

### 3. The Invisible Hand (AshOban Cron Workers)
We cannot rely on the React frontend to trigger a submission sequence when an exam timer hits zero (a user could simply close their laptop lid to "pause" time).

To guarantee strict compliance with duration bounds, we integrated `AshOban` as an orchestrator. A lightweight background worker is triggered by a cron scheduler (`* * * * *`) every 60 seconds. It sweeps the database looking for `in_progress` attempts where the `started_at` plus `duration_minutes` (plus a 5-minute network grace period) has eclipsed the current UTC time. 

If flagged, the `auto_complete` action forcefully scoops the user's latest autosaved drafts, halts the session, triggers the synchronous grading engine, and finalizes the attempt, ensuring absolute administrative time fidelity.
