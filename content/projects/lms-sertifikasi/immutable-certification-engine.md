---
title: "Designing versioned certification workflows"
description: "How I used lifecycle rules and explicit versioning so instructors could revise certifications without rewriting the rules for learners already in progress."
date: 2026-03-13
tags: ["ash-framework", "versioning", "immutability", "certification"]
category: "Backend Architecture"
---

### Published certifications could not shift under active learners
Certification content changes. Passing grades move, modules get reorganized, exams get replaced.

That becomes a data integrity problem the moment learners are already in flight. If an instructor edits a published certification directly, the system can end up recalculating progress and eligibility against rules the learner never actually started with.

I did not want the admin UI carrying that responsibility. The domain model needed to enforce it.

### The lifecycle rules
![Immutable Certification Engine](/projects/lms-sertifikasi/certification-engine-infographic.png)

The first step was treating published learning structures as stable at the resource layer.

Once a certification reaches its live state, structural mutations to the parts that define learning logic are blocked. Delete behavior is constrained too. Historical records remain available for enrollments and audits instead of disappearing from the system.

That gives the platform a simple rule: live state stays stable, and revisions happen through a new version.

### Versioning instead of live editing
When instructors need to change a curriculum, they create a new certification version rather than mutating the existing one.

I implemented that as a transactional duplication flow that recreates the relevant certification hierarchy and rewires internal references before commit. Copying the records was not the interesting part. The hard part was making sure the new version still pointed at the right related structures after the duplication finished.

### Why this mattered
This let the system support two truths at once: instructors can improve a program, and enrolled learners keep the rules they actually started with.

That cuts off a whole category of support issues. It also makes certification state easier to trust later when someone needs verification, renewal, or reporting against historical progress.

### The result
Published certifications behave like stable records, and revisions become explicit versioned changes.

That gave instructors room to improve programs without silently moving in-flight learners onto a different contract.
