---
title: "Scheduling before solving"
description: "Why the scheduling workflow begins with preflight validation and staged execution instead of trusting the solver to discover every failure case on its own."
date: 2026-03-09
order: 7
tags: ["scheduling", "or-tools", "preflight", "laravel", "architecture"]
category: "Operations"
---

### The solver should not be the first place the system discovers broken school data
Automatic scheduling gets blamed for failures that are really data and readiness failures.

![Preflight Solver Pipeline Architecture](/projects/digital-school/preflight-solver.png)

I wanted Digital School to surface those problems before search begins. That is why scheduling starts with a preflight layer, not a solver button.

### Preflight is part of the product
Before the optimizer runs, the application checks whether the school is actually schedulable. It validates teaching capacity, teacher presence, scarce-room availability, class overload, time-slot readiness, parity feasibility, and core data sanity.

Those findings are grouped into clear severity levels so operators can see what must be fixed first and what is merely a warning. That changes the experience. Instead of throwing everything into a search process and hoping the failure is interpretable later, the platform reports structural problems while they are still actionable.

### The solve itself is staged
The pipeline is deliberately split.

Rare-resource placement runs before broader placement. Compaction happens after the main scheduling pressure has been handled. I prefer that shape because scarce resources and general resources behave differently, and the system is easier to debug when those pressures are visible instead of buried inside one giant search pass.

The output also moves through separate steps: solve, preview, then commit. That keeps the operator in control of the final state instead of treating the first generated timetable as something that should immediately become live data.

### Why this design held up
The preflight layer does more than prevent wasted compute. It gives the scheduling workflow a clearer product shape.

Users do not need a black-box failure. They need a report they can act on. Once that is in place, the optimizer becomes one step in a broader scheduling workflow rather than the only place where the system reveals whether the input made sense.

### The result
Bad input gets caught earlier. Hard constraints are handled in a controllable order. The final timetable stays reviewable before it becomes committed state.
