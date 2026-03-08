---
title: "One system, two runtimes"
description: "Why I separate business orchestration and timetable optimization into Laravel and Python, with a narrow contract between them."
date: 2026-03-09
tags: ["laravel", "python", "or-tools", "scheduling", "architecture"]
category: "Infrastructure"
---

### The product runtime and the solver runtime should not pretend to be the same thing
Laravel is good at business workflows, validation, queue orchestration, and operator-facing product logic. OR-Tools is good at search.

I wanted Digital School to respect that split instead of hiding it. Laravel owns schools, academic years, class groups, teaching assignments, room types, access control, and scheduling workflow. Python owns the timetable optimization problem.

### The boundary is the real architecture
`SolverRunner` builds a normalized payload from live application state before anything crosses into Python. That payload includes time slots, class groups, teaching assignments, room constraints, busy masks, and scheduling preferences such as `general_contiguity`.

```php
$waktu = Waktu::query()
    ->where('sekolah_id', $sekolahId)
    ->orderBy('hari')->orderBy('jam')
    ->get(['id', 'hari', 'jam']);

$rombel = RombelView::query()
    ->where('ajaran_id', $ajaranId)
    ->where('sekolah_id', $sekolahId)
    ->get(['id', 'siswa_rombel_count']);
```

That contract is the important move. The solver does not need to know about Eloquent models, middleware, sessions, or Inertia pages. It receives one explicit scheduling input and returns one explicit scheduling output.

Digital School also supports more than one execution path. Laravel can dispatch queued solver runs and retrieve results later, or call the gRPC solver service directly for streaming-style progress. Different execution modes, same contract.

### Why hybrid works here
This is not a language split for its own sake. The product has two different responsibilities.

One side preserves institutional truth and operator workflow. The other side computes feasible timetable placements under constraints. Those are different jobs, so I give them different runtimes and keep the handoff narrow.

I also keep rule ownership on the Laravel side. Preferences around contiguity, daily caps, and placement behavior are product decisions first. Python enforces them, but the meaning of those rules still belongs to the application.

### The result
The runtime split strengthens the system instead of fragmenting it.

Laravel stays cleanly focused on product logic. Python stays focused on optimization. The contract between them is explicit enough that the boundary is easy to reason about and evolve.
