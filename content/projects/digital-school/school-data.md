---
title: "Modeling the school first"
description: "How I designed the academic and financial model so scheduling, exams, billing, and daily operations could share the same institutional truth."
date: 2026-03-09
order: 1
tags: ["data-modeling", "laravel", "education", "architecture"]
category: "Architecture"
---

### The system has to model the institution before it can automate anything
School software falls apart when scheduling, exams, billing, and attendance all carry different versions of the same reality.

![One Institutional Graph Architecture](/projects/digital-school/school-data.png)

I wanted Digital School to work from one institutional graph. The core model starts with shared records for school context, academic periods, class groups, teaching assignments, schedules, exams, invoices, and payments. Those records are not just storage. They define how the product thinks.

### The academic graph is the backbone
The key chain is school, academic year, class group, teaching assignment, schedule, and time slot.

That chain gives the rest of the platform something stable to stand on. Scheduling reads live teaching demand. Exams inherit real academic ownership. Billing stays attached to the same student and school context as attendance and learning workflows. Filters and permissions also get simpler because school and academic year are first-class parts of the model.

I also treat teaching assignments as planning data, not just teacher links. Weekly teaching capacity lives directly in that model, which means schedule feasibility starts in the application data rather than being guessed later inside the optimizer.

At the storage layer, planning records stay anchored to curriculum, institution, and academic period with explicit capacity and ownership fields. I care less about the exact table shape than about the fact that the model makes the scheduling problem legible before any solver runs.

### Schedule definition and placement are different concerns
I keep schedule definition separate from final placement because those are not the same job.

That split matters. It lets the application reason about teaching containers before they are fully placed, compare current and proposed placement, and support reviewable solve flows without overloading one record type with too many responsibilities.

The same idea shows up in the read side. Planning and operational queries use dedicated read models where that makes the workflow clearer. That is not a compromise. It is a practical boundary between the write model and the query model.

### Why this model fits the product
Digital School is not a set of unrelated modules. It is one operational surface for schools.

That means finance cannot drift away from student identity, exams cannot float free from teaching structure, and scheduling cannot treat curriculum data as optional input. I would rather pay for a stronger model early than spend the next year stitching modules back together with fragile glue code.

### The result
The data model carries institutional truth across scheduling, exams, attendance, billing, and academic operations.

That is why the rest of the system stays coherent. The application is not trying to reconcile five different interpretations of the same school.
