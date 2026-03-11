# Automatic Scheduling Modeling Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Write a detailed technical article explaining how the automatic school scheduling problem is modeled and normalized in Laravel before being handed off to a pure optimization solver.

**Architecture:** We will create a new markdown file in `content/projects/digital-school/automatic-scheduling-modeling.md`. The content will follow the previously approved design doc, detailing the extraction of state (Time/Space, Demand, Supply), the Busy Mask pattern, and the asynchronous pipeline execution.

**Tech Stack:** Markdown, Nuxt Content.

---

### Task 1: Create the Article Markdown File

**Files:**
- Create: `content/projects/digital-school/automatic-scheduling-modeling.md`

**Step 1: Write the file content**

```markdown
---
title: "Modeling the mess"
description: "How Digital School normalizes complex real-world scheduling constraints into a clean mathematical payload before hitting the optimizer."
date: 2026-03-09
tags: ["domain-driven-design", "laravel", "scheduling", "optimization", "architecture"]
category: "Backend"
---

### The messy reality of school scheduling
Scheduling is never as simple as "put a teacher in a room."

In a real school, teachers cannot be in two places at once. Specific subjects require specific rooms (like a physics lab). There is a strict, undeniable required number of learning hours per subject. And no one wants a schedule with impossibly fragmented gaps.

If you try to make Laravel solve the actual math problem—evaluating millions of permutations—the request will timeout, the memory will exhaust, and the code will become an unmaintainable knot of nested loops.

### The Application Boundary vs. The Solver Boundary
I wanted the main application to handle what it does best: business logic and state management. The actual heavy lifting of permutation and optimization belongs in a dedicated solver runtime (in this case, Python).

But a pure math solver knows nothing about Eloquent models. It doesn’t know what a `Rombel` (Class Route) or a `KurikulumPelajaran` (Curriculum Subject) is.

The bridge between these two worlds is the **Unified Input Payload**. In Digital School, `SolverRunner::extractUnifiedInput()` acts as an explicit contract. It translates messy domain rules into pure integer constraints.

### Extracting State: The Need for Normalization
Before the solver starts, the application must extract and normalize three things:

1. **Time & Space**: We fetch all available periods (`Waktu`) and active rooms (`Ruangan`). We also identify "rare rooms" to enforce specialized placement constraints.
2. **Demand (The Need)**: This is calculated by joining the class groups with the curriculum and subtracting any hours that are already scheduled. The result is a simple integer constraint for the solver: "This class still needs 4 hours of math."
3. **Supply (The Teachers)**: We map teaching assignments (`Pengajaran`) to their capacities and distribute them to fulfill the demand.

By doing the subtraction and grouping in SQL and PHP, the solver never has to guess. It only receives exactly what is left to do.

### The Busy Mask Pattern
One of the hardest parts of scheduling is incremental solving. Sometimes a school has already manually locked in a few critical classes, and the solver needs to fill in the rest without overwriting them.

Instead of forcing the solver to query the database to check if a slot is free, the application generates a `busy_mask`. It loops through the existing schedule and builds three simple arrays: busy teachers, busy classes, and busy rooms.

The solver simply sees "Teacher 5 is forbidden at Slot 12." It doesn't need to know *why* they are busy. It just respects the mask.

### Execution: The Pipeline Job
Extracting the data and running the solver takes time. It cannot happen in a standard HTTP request.

The extraction and execution are wrapped in `RunSolverPipelineJob`, a background queue worker. The job compiles the unified payload, kicks off the Python process asynchronously via standard I/O, and caches the result (`'solver-result-'.$jobId`). The frontend can poll for the result at its own pace.

### The result
By forcing a strict normalization phase, the application domain stays clean, and the math solver stays fast.

Laravel doesn't try to be an optimizer, and the optimizer doesn't try to understand Eloquent. They meet at the boundary of a typed JSON payload. That separation is what makes the scheduling feature both possible and maintainable.
```

**Step 2: Commit the new article**

```bash
git add content/projects/digital-school/automatic-scheduling-modeling.md
git commit -m "docs(digital-school): add article on automatic scheduling modeling"
```

### Task 2: Verify the Article Renders

**Step 1: Open the article locally**
Since `npm run dev` is running, visit the corresponding route for projects/digital-school/automatic-scheduling-modeling in the browser to ensure Nuxt Content renders it perfectly.
