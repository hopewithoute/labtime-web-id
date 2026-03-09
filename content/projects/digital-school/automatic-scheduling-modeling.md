---
title: "Modeling the mess"
description: "How Digital School normalizes complex real-world scheduling constraints into a clean mathematical payload before hitting the optimizer."
date: 2026-03-09
tags: ["domain-driven-design", "laravel", "scheduling", "optimization", "architecture"]
category: "Backend"
---

### The messy reality of school scheduling
Scheduling is never as simple as "put a teacher in a room."

In a real school, teachers cannot be in two places at once. Specific subjects require specific rooms (like a physics lab). The curriculum demands a strict number of learning hours per subject. Moreover, administrators reject schedules with fragmented gaps.

If you force Laravel to solve this math problem—evaluating millions of permutations—the request will time out, memory will exhaust, and the code will degrade into an unmaintainable knot of nested loops.

![Automatic Scheduling Architecture](/projects/digital-school/automatic-scheduling-infographic.png)

### The Application Boundary vs. The Solver Boundary
I designed the main application to handle what it does best: business logic and state management. The heavy lifting of permutation and optimization belongs in a dedicated solver runtime (in this case, Python).

However, a pure math solver knows nothing about Eloquent models. It does not understand domain concepts like `Rombel` (Class Route) or `KurikulumPelajaran` (Curriculum Subject).

The bridge between these two worlds is the **Unified Input Payload**. In Digital School, `SolverRunner::extractUnifiedInput()` acts as an explicit contract. It translates messy domain rules into pure integer constraints.

### Extracting State: The Need for Normalization
Before the solver starts, the application extracts and normalizes three core components:

1. **Time & Space**: The system fetches all available periods (`Waktu`) and active rooms (`Ruangan`). It also flags "rare rooms" to enforce specialized placement constraints early.
2. **Demand (The Need)**: The system calculates demand by joining class groups with the curriculum and subtracting any already-scheduled hours. This yields a simple integer constraint for the solver: *"This class requires exactly 4 more hours of math."*
3. **Supply (The Teachers)**: The system maps teaching assignments (`Pengajaran`) to their capacities and distributes them to satisfy the demand.

By performing this subtraction and grouping in SQL and PHP, the solver never has to guess. It receives exactly what remains to be solved.

### The Busy Mask Pattern
Incremental solving is one of the hardest challenges in scheduling. Schools often manually lock in critical classes, and the solver must fill the remaining gaps without overwriting those locked slots.

Instead of forcing the solver to query the database to verify if a slot is free, the application generates a `busy_mask`. It loops through the existing schedule and builds three simple arrays: busy teachers, busy classes, and busy rooms.

The solver simply sees *"Teacher 5 is forbidden at Slot 12."* It does not need to know *why* they are busy. It just respects the mask.

### Execution: The Pipeline Job
Extracting the data and running the optimization takes time. This process cannot safely execute within a standard HTTP request lifecycle.

`RunSolverPipelineJob`, a background queue worker, wraps the entire extraction and execution flow. The job compiles the unified payload, asynchronously kicks off the Python process via standard I/O, and caches the final result (`'solver-result-'.$jobId`). The frontend can then poll for the result securely and reliably.

### The result
By enforcing a strict normalization phase, the application domain stays clean, and the math solver stays fast.

Laravel does not try to be an optimizer, and the optimizer does not try to understand Eloquent. They meet at the boundary of a typed JSON payload. That separation is what makes the scheduling feature both powerful and maintainable.
