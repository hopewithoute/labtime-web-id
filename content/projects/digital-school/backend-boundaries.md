---
title: "Where the controller stops"
description: "Why I use DTOs, action classes, and services to keep application boundaries explicit as the platform grows across scheduling, finance, and academic workflows."
date: 2026-03-09
tags: ["laravel", "dto", "service-layer", "actions", "architecture"]
category: "Backend"
---

### The controller can't be the application layer
Laravel codebases usually get messy when request handling, orchestration, and state changes all collapse into one place.

I wanted a clearer boundary than that. In Digital School, controllers receive input, delegate, and exit. DTOs define the contract, action classes own write-heavy operations, and services handle orchestration or read composition.

### The boundary split
`PengajaranData` and `SolverInputData` are good examples of the first step. They make the accepted payload visible before business logic starts mutating anything.

```php
class PengajaranData extends Data
{
    public function __construct(
        public ?int $kurikulum_pelajaran_id,
        public ?int $ajaran_id,
        public ?int $sekolah_id,
        public ?int $kapasitas_jp,
        public ?array $guru,
        public ?array $media,
    ) {}
}
```

That helps in two places. Inside Laravel, it keeps controllers from re-parsing raw request state. Across runtimes, it gives the scheduling pipeline an explicit contract before data leaves the application and enters Python.

For writes, I prefer named operations over generic helpers. `PengajaranCreateAction`, `PengajaranUpdateAction`, `InvoiceUpdateAction`, and `JadwalAssignAction` each own a business transaction with its own failure surface. That makes the write path easier to reason about, test, and extend.

Services stay on the orchestration side. `JadwalService` prepares scheduling views and teaching context. `InvoiceService` handles narrower read-side composition. The important part is not service size. It is ownership clarity.

### Why I use DTOs, actions, and services together
Each layer removes a different kind of ambiguity.

DTOs make input shape explicit. Actions make state changes explicit. Services make orchestration explicit. Once those three boundaries are in place, controllers stop absorbing logic they were never meant to own.

That matters in a product that spans academic planning, attendance, finance, exams, and solver integration. Without clear ownership, transactions scatter, external payloads become implicit, and business rules end up buried in convenience methods.

### The result
The backend stays readable even as the workflow count grows.

When I revisit a feature months later, I can still answer the important questions quickly: what enters the system, where the state change lives, and which layer owns orchestration. For this product, that clarity is an architectural requirement, not a stylistic preference.
