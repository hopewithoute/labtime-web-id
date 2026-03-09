---
title: "One system, two runtimes"
description: "Why I separate business orchestration and timetable optimization into an application runtime and a dedicated solver runtime, with a narrow contract between them."
date: 2026-03-09
tags: ["laravel", "python", "or-tools", "scheduling", "architecture"]
category: "Infrastructure"
---

### The product runtime and the solver runtime should not pretend to be the same thing
The main application runtime is good at business workflows, validation, queue orchestration, and operator-facing product logic. The optimization runtime is good at search.

I wanted Digital School to respect that split instead of hiding it. The application owns schools, academic years, class groups, teaching assignments, room types, access control, and scheduling workflow. The optimization runtime owns timetable placement.

![Hybrid App & Solver Runtimes Architecture](/projects/digital-school/hybrid-solver.png)

### The boundary is the real architecture
The important move is the handoff contract.

Before anything crosses into the optimization runtime, the application builds one normalized scheduling payload from live state. That payload includes time slots, class groups, teaching demand, room constraints, busy periods, and placement preferences.

The optimizer does not need to know about web middleware, session state, ORM models, or page delivery. It receives one explicit scheduling input and returns one explicit scheduling output.

Digital School also supports more than one execution path. The application can dispatch queued solver runs and retrieve results later, or call the optimization service more directly when the workflow benefits from tighter feedback. Different execution modes, same contract.

### Why hybrid works here
This is not a language split for its own sake. The product has two different responsibilities.

One side preserves institutional truth and operator workflow. The other computes feasible timetable placements under constraints. Those are different jobs, so I give them different runtimes and keep the handoff narrow.

I also keep rule ownership on the application side. Preferences around contiguity, daily caps, and placement behavior are product decisions first. The optimizer enforces them, but their meaning still belongs to the product.

### The result
The runtime split strengthens the system instead of fragmenting it.

The application stays focused on product logic. The optimization runtime stays focused on search. The contract between them is explicit enough that the boundary is easy to reason about and evolve.
