---
title: "Designing immutable certification versioning"
description: "How I used Ash lifecycle rules and transactional deep cloning so instructors could revise certifications without breaking active learner progress."
date: 2026-03-15
tags: ["ash-framework", "versioning", "immutability", "certification"]
category: "Backend Architecture"
---

### Published certifications couldn't drift under active learners
Certification content changes over time. Passing grades move, modules get restructured, final exams get replaced.

That becomes a data integrity problem once learners are already in flight. If an instructor edits a published certification directly, the system can end up recalculating progress and eligibility against rules the learner never actually started with.

I didn't want the admin UI to be responsible for preventing that. The domain model had to enforce it.

### The lifecycle rules
![Immutable Certification Engine](/projects/lms-sertifikasi/certification-engine-infographic.png)

The first step was treating published certifications as immutable at the resource layer.

Once a certification reaches `published`, Ash validations block structural mutations to the parts of the record that define learning logic. Delete behavior is also constrained. Instead of hard deletion, archived records remain available for historical enrollments and auditability.

That gives the system a clean rule: published state is stable, and revisions happen by creating a new version.

### Deep cloning instead of live editing
When instructors need to change a curriculum, they create a new certification version rather than mutating the existing one.

I implemented that as a transactional deep-clone flow that copies the certification hierarchy, including modules, module items, and related exam structures. The main technical challenge wasn't duplication itself. It was referential remapping.

As new records are created inside the transaction, relationships that pointed at the original exam tree have to be rewired to the correct new records before commit. I handled that with in-memory ID maps so cloned module items and final exam references always point to the right versioned entities.

### Why this mattered
This design let the platform support two things at the same time: safe curriculum iteration for instructors and stable historical truth for learners.

The system can evolve without retroactively changing what an enrolled learner was asked to complete. That reduces a whole class of support issues and makes certification state easier to trust later during verification, renewal, and reporting.

### The result
Published certifications behave like stable records, and revisions become explicit versioned changes.

That gave instructors room to improve programs while protecting in-flight learners from silent rule changes. For this product, that wasn't a nice property. It was required.