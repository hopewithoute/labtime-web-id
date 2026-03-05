# Article 6: Building an Immutable Certification Engine

## Title
Building an Immutable Certification Engine

## Narrative Angle
**Protecting Data Integrity at Scale**
In an LMS with thousands of concurrent learners, allowing administrators to willy-nilly edit published certification requirements (like raising passing grades or deleting modules) is a recipe for silent data corruption. This article explores how we used Ash Framework to enforce strict lifecycle immutability and architected a robust hierarchical "Deep Clone" operation.

## Outline
1. **The Mutability Trap**
   - The danger of mutating a live certification: inflight learners suddenly failing, missing modules, or corrupted progress calculation.
   - The decision to treat `[status: :published]` as an immutable ledger entry.
2. **Strict Locking via Ash Framework Validations**
   - Showcasing the Ash Framework policy and custom validations that block updates to `passing_grade`, `validity_years`, and `target_role` once published.
   - Replacing the standard `destroy` action with a soft `archive` action.
3. **The Solution: Deep Cloning (Versioning)**
   - If an instructor wants to update a live certification, they must create a new version.
   - Deep dive into the Elixir `clone` action: using `Ash.DataLayer.transaction` to recursively duplicate the Certification -> Modules -> ModuleItems -> Exams.
   - Mapping relational IDs dynamically in memory during the clone to maintain referential integrity without foreign key violations.

## Image Prompt Concept (Nano Banana Style)
Two sides. Left: 'Instructor Edit Request' hitting a shield 'Strict Locking Policy (Ash)'. Right: A 'Deep Clone' operation showing a V1 Certification (locked) cloning into a V2 Certification (draft), with cascading arrows to Modules and Exams.
