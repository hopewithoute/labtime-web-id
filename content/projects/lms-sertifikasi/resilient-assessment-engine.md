---
title: "Building a reliable assessment engine"
description: "How I combined attempt snapshots, optimistic locking, and background time enforcement so timed exams stayed consistent under concurrency and failure cases."
date: 2026-03-16
tags: ["assessment", "ash-framework", "optimistic-locking", "background-jobs"]
category: "Backend Architecture"
---

### Timed exams need backend ownership
An assessment engine cannot rely on the browser to keep the rules honest.

In a certification product, the system has to preserve exam integrity even when users refresh, disconnect, double-submit, or when instructors update question banks after attempts have already started. That pushed the important logic into the backend.

### The three controls that mattered most
![Resilient Assessment Engine](/projects/lms-sertifikasi/assessment-engine-infographic.png)

I relied on three controls to keep exam attempts stable.

**Attempt snapshots.** When an exam starts, the backend captures the question set, options, and grading basis tied to that attempt. The learner is graded against the version they actually received, even if the source material changes later.

**Optimistic concurrency control.** Submit and grade flows use a guarded write path so duplicate requests cannot both mutate the same attempt successfully. That protects against accidental double submits, overlapping requests, and races between autosave and final submission.

**Background time enforcement.** Time limits are enforced in backend jobs instead of trusting the client's countdown timer. A scheduled enforcement path checks for attempts that have crossed their allowed duration, applies a small grace window for normal network instability, and finalizes them through the same server-owned flow.

### Why this shape held up
Each piece covered a different failure mode.

Snapshotting protects correctness when source data changes. Concurrency control protects correctness when multiple writes happen at once. Background enforcement protects correctness when the client disappears.

Put together, those rules make the exam lifecycle much easier to reason about. An attempt has a fixed question set, a controlled write path, and a server-owned end state.

That also helps in support. Edge cases are easier to explain when the system has firmer rules about what an attempt is allowed to do.

### The result
The assessment engine behaved better under real user behavior, not just ideal demo flows.

Learners were graded against stable snapshots, duplicate submissions stopped creating inconsistent state, and time limits still held even when the browser stopped cooperating.
