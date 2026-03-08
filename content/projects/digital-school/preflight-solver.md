---
title: "Scheduling before solving"
description: "Why the scheduling workflow begins with preflight validation and staged execution instead of trusting the solver to discover every failure case on its own."
date: 2026-03-09
tags: ["scheduling", "or-tools", "preflight", "laravel", "architecture"]
category: "Problem Solving"
---

### The solver should not be the first place the system discovers broken school data
Automatic scheduling gets blamed for failures that are really data and readiness failures.

I wanted Digital School to surface those problems before search begins. That is why scheduling starts with a preflight layer, not with a solver button.

### Preflight is part of the product
`PreflightService` checks whether the school is actually schedulable. It validates teaching capacity, teacher presence, rare-room availability, class overload, time-slot readiness, parity feasibility, and core data sanity before the engine starts placing anything.

```php
$summary = ['pass' => 0, 'warn' => 0, 'fail' => 0];

if ($waktuCount <= 0) {
    $issuesGlobal[] = [
        'code' => 'NO_WAKTU',
        'level' => 'FAIL',
        'message' => 'Tidak ada slot waktu aktif untuk sekolah ini.',
    ];
}
```

That changes the operator experience. Instead of throwing everything into a search process and hoping the failure is interpretable later, the platform reports structural problems while they are still actionable. PASS, WARN, and FAIL semantics matter here because the user needs to know what to fix, not just that the run did not work.

### The solve itself is staged
The pipeline is deliberately split.

Stage 0 assigns providers. Stage 1 places rare-room sessions first. Stage 2 handles general placement. Stage 3 compacts the result. I prefer that shape because rare resources and general resources behave differently, and the system is easier to debug when those pressures are visible instead of buried inside one giant search pass.

The output also moves through separate steps: solve, preview, then commit. A generated timetable is not production state until an operator reviews it.

### Why this is the real problem-solving layer
The hard part is not only solving constraints. It is building a workflow around the solver that operators can trust.

That means trusted input from live school data, structural checks before execution, staged search, reviewable output, and deliberate commit paths. The solver is one part of that. The surrounding workflow is what makes the feature safe enough to use in a real school environment.

### The result
Scheduling behaves like an operational system, not like an isolated optimization demo.

Bad input gets caught earlier, hard constraints are handled in a controllable order, and the final timetable stays reviewable before it becomes committed state.
