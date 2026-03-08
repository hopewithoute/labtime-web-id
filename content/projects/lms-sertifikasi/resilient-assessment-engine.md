---
title: "Building a reliable assessment engine"
description: "How I combined question snapshots, optimistic locking, and background enforcement so timed exams stayed consistent under concurrency and time-based edge cases."
date: 2026-03-16
tags: ["assessment", "ash-framework", "optimistic-locking", "background-jobs"]
category: "Backend Architecture"
---

### Timed exams need backend ownership
An assessment engine can't rely on the browser to keep the rules honest.

In a certification product, the system has to preserve exam integrity even when users refresh, disconnect, double-submit, or when instructors update question banks after attempts have already started. That pushed the important logic into the backend.

### The three controls that mattered most
![Resilient Assessment Engine](/projects/lms-sertifikasi/assessment-engine-infographic.png)

I used three main controls to keep exam attempts stable.

**Question snapshots.** When an `ExamAttempt` starts, the backend captures the question set, options, and correct answers into a snapshot stored with the attempt itself. That means the learner is graded against the version they actually received, even if the source question bank changes later.

**Optimistic locking.** Submit and grade flows use Ash optimistic locking so duplicate requests can't both mutate the same attempt successfully. That protects against accidental double submits, overlapping requests, and race conditions between autosave and final submission.

**Background time enforcement.** Time limits are enforced in backend jobs rather than trusting the client's countdown timer. A scheduled sweep checks for attempts that have crossed their allowed duration, applies a small grace window for network instability, and finalizes them through the same server-side flow.

### Why I chose this shape
Each piece solves a different failure mode.

Snapshotting protects correctness when source data changes. Locking protects correctness when multiple writes happen at once. Background enforcement protects correctness when the client disappears.

Together they make the exam lifecycle easier to reason about. An attempt has a fixed question set, a controlled write path, and a server-owned end state.

That matters in support and operations too. Edge cases become easier to explain because the system has firmer rules about what an attempt is allowed to do.

### The result
The assessment engine behaves more predictably under real user behavior, not just ideal demos.

Learners are graded against a stable snapshot, duplicate submissions don't create inconsistent state, and time limits still hold even if the browser stops cooperating. That's the level of backend control the product needed.