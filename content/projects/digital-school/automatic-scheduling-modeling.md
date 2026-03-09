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

If you force a web application to solve this math problem—evaluating millions of permutations—the request will time out, memory will exhaust, and the code will degrade into an unmaintainable knot of nested loops.

![Automatic Scheduling Architecture](/projects/digital-school/automatic-scheduling-infographic.png)

### The Application Boundary vs. The Solver Boundary
I designed the main application to handle what it does best: business logic and state management. The heavy lifting of permutation and optimization belongs in a dedicated solver runtime.

However, a pure math solver knows nothing about the application's domain models. It does not understand concepts like a "Class Group" or a "Curriculum Subject."

The bridge between these two worlds is the **Unified Input Payload**. The application boundary acts as an explicit contract. It translates messy, interconnected domain rules into pure integer constraints that a solver can digest.

### Extracting State: The Need for Normalization
Before the solver starts, the application extracts and normalizes three core components:

1. **Time & Space**: The system fetches all available time periods and active physical spaces. It also flags specialized rooms (like laboratories or art studios) to enforce strict placement constraints early.
2. **Demand (The Need)**: The system calculates the exact demand by comparing the required curriculum hours for a class group against any hours that are already scheduled. This yields a simple integer constraint for the solver: *"This class requires exactly 4 more hours of math."*
3. **Supply (The Teachers)**: The system maps teacher assignments to their available capacities and distributes them to satisfy the calculated demand.

By performing this subtraction and grouping at the database level, the solver never has to guess or query. It receives exactly what remains to be solved.

### The Busy Mask Pattern
Incremental solving is one of the hardest challenges in scheduling. Schools often manually lock in critical classes early, and the solver must fill the remaining gaps without overwriting those locked slots.

Instead of forcing the solver to constantly query the database to verify if a slot is free, the application generates a **Busy Mask**. It loops through the existing, locked-in schedule and builds three simple arrays indicating occupied time slots: one for busy teachers, one for busy classes, and one for busy rooms.

The solver simply sees *"Teacher A is forbidden at Period 4."* It does not need to know *why* they are busy. It just respects the mask.

### Execution: The Asynchronous Pipeline
Extracting the complex state and running the mathematical optimization takes time. This process cannot safely execute within a standard HTTP request lifecycle.

A background queue worker wraps the entire extraction and execution flow. The job compiles the unified payload, asynchronously kicks off the external solver process, and permanently stores the final result structure. The frontend can then poll for the result securely and reliably without freezing the user interface.

### The result
By enforcing a strict normalization phase, the application domain stays clean, and the math solver stays fast.

The application framework does not try to be an optimizer, and the optimizer does not try to understand the application framework. They meet at the boundary of a typed data payload. That separation is what makes the scheduling feature both powerful and maintainable.
