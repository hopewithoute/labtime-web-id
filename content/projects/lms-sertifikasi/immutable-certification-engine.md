---
title: "Building an Immutable Certification Engine"
description: "Protecting data integrity at scale using Ash Framework strict locking and deep clone versioning."
date: 2026-02-22
category: "Backend Architecture"
---

**The Mutability Trap**  
In an LMS processing thousands of progress metrics simultaneously, data mutability is dangerous. Allowing administrators to directly edit a live certification—such as raising a passing grade, swapping out a final exam, or deleting a mandatory module—can silently corrupt the progress calculations and historical validity for hundreds of active learners.

**The Architecture**  
![Immutable Certification Engine](/projects/lms-sertifikasi/certification-engine-infographic.png)

To guarantee 100% data integrity for inflight learning, we treated published state as an immutable ledger and leveraged the power of Ash Framework to enforce strict lifecycle rules.

### 1. Strict Locking via Ash Policies
We enforce structural immutability at the domain layer. Once a Certification’s status is set to `published`, the Ash resource utilizes custom validations to strictly reject any mutations to critical learning logic attributes (`passing_grade`, `validity_years`, `target_role`). 

Similarly, the standard backend `destroy` action is completely blocked. Administrative deletions are rerouted to a soft `archive` action using `AshArchival`, ensuring historical enrollments never encounter catastrophic foreign-key failures or cascading deletes.

### 2. The Solution: Deep Cloning (Versioning)
If an instructor must update a curriculum, they cannot edit the live `V1`; they must forge a `V2`.

We implemented an atomic Elixir `clone` action that wraps the entire duplication process in a robust `Ash.DataLayer.transaction`. When initiated, the backend dynamically traverses and reproduces the entire hierarchical syllabus:
1. Copies the parent `Certification` (incrementing a `version_number`).
2. Iterates over and clones all nested `Modules`.
3. Re-maps the individual `ModuleItems`.
4. Executes isolated recursive clones of related `Exam` resources (including their `QuestionBanks` and `Options`).

### Guaranteed Referential Integrity
The greatest technical challenge during a Deep Clone is maintaining relational mapping within the same transaction bounds. As the transaction recursively generates new UUIDs, we constructed an in-memory `exam_id_map` dictionary that instantly maps original `V1` Exam UUIDs to their freshly minted `V2` counterparts. This mapping allows us to instantly hot-link the cloned `ModuleItems` and `final_exam_id` to the correct newly generated records before the transaction successfully commits.

**The Result**  
A versioning system that treats published certifications as sacred, immutable records. Instructors gain the power to iterate on curricula freely via deep cloning, while active learners are guaranteed absolute data consistency throughout their entire certification journey.
