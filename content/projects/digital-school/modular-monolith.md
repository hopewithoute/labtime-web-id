---
title: "Why this stays one app"
description: "Why I kept Digital School as a modular monolith instead of splitting shared school workflows across service boundaries too early."
date: 2026-03-09
tags: ["monolith", "laravel", "architecture", "vue", "inertiajs"]
category: "Architecture"
---

### The hardest problems here still come from shared context
Digital School covers scheduling, attendance, LMS workflows, assignments, exams, grading, billing, announcements, and integrations.

That footprint is large enough to make a microservices diagram look tempting. I still keep the product as one application because the expensive problems are not isolated compute problems. They are shared-context problems. Academic year, school, class group, teaching assignment, student identity, and billing state overlap too heavily to push across network boundaries by default.

### The product stays monolithic, the internals do not
I treat the deployment unit and the internal structure as separate decisions.

Routes are loaded by feature through `RouteHelper::loadRoutesFromDirectory`. Vue pages follow domain paths. Features carry their own controllers, DTOs, actions, services, pages, and components. That gives each module local ownership without forcing the business to pay distributed-systems cost too early.

```php
Route::get('/', function () {
    return redirect()->route('dashboard.index');
})->name('home');

RouteHelper::loadRoutesFromDirectory(__DIR__.'/web');
```

This is the part people often miss about a modular monolith. One deployment unit does not mean one code pile. It means local boundaries stay inside the application until there is a real operational reason to move them out.

### Why this trade-off fits the product
Most changes in a school platform cut across several domains. Scheduling touches teaching assignments, room types, and academic year. Billing depends on student and school context. Access control affects nearly every operational surface.

Inside one application, those changes stay local. Across distributed services, they become schema negotiation, API coordination, retries, and more operational drag. I don't want that cost unless the boundary has become undeniably real.

### The result
The platform keeps strong internal slices without pretending every module needs its own deployment unit.

That gives me the speed of a monolith where shared context matters most, while leaving room to split at the few boundaries that actually deserve it.
