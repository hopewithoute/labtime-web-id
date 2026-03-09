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

![Automatic Scheduling Architecture](/projects/digital-school/automatic-scheduling-infographic.png)

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
