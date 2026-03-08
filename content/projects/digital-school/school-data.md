---
title: "Modeling the school first"
description: "How I designed the academic and financial model so scheduling, exams, billing, and daily operations could share the same institutional truth."
date: 2026-03-09
tags: ["data-modeling", "laravel", "education", "architecture"]
category: "Architecture"
---

### The system has to model the institution before it can automate anything
School software falls apart when scheduling, exams, billing, and attendance all carry different versions of the same reality.

I wanted Digital School to work from one institutional graph. That is why the core model starts with `sekolah`, `ajaran`, `rombel`, `pengajaran`, `jadwal`, `ujian`, `invoice`, and `pembayaran`. Those records are not just storage. They define how the product thinks.

### The academic graph is the backbone
The key chain is school, academic year, class group, teaching assignment, schedule, and time slot.

That chain gives the rest of the platform something stable to stand on. Scheduling can read live teaching demand. Exams inherit real academic ownership. Billing stays attached to the same student and school context as attendance and learning workflows. Filters and permissions also get simpler because school and academic year are first-class parts of the model.

I also treat `pengajaran` as planning data, not just a teacher assignment record. `kapasitas_jp` carries weekly load capacity, which means feasibility starts in the model instead of being guessed later inside the solver.

```php
Schema::create('pengajaran', static function (Blueprint $table) {
    $table->id();
    $table->foreignId('kurikulum_pelajaran_id')->constrained('kurikulum_pelajaran');
    $table->foreignId('ajaran_id')->constrained('ajaran');
    $table->foreignId('sekolah_id')->constrained('sekolah');
    $table->integer('kapasitas_jp')->default(0);
    $table->timestamps();
});
```

### Schedule definition and placement are different concerns
I keep `jadwal` separate from `waktu_jadwal` because schedule definition and final placement are not the same thing.

That split matters. It lets the application reason about teaching containers before they are fully placed, compare current and proposed placement, and support reviewable solve flows without overloading one table with too many jobs.

The same idea shows up in read models. `RombelView` exists because planning and operational queries need a stable read surface. I don't see that as a compromise. I see it as a practical boundary between the write model and the query model.

### Why this model fits the product
Digital School is not a set of unrelated modules. It is one operational surface for schools.

That means finance can't drift away from student identity, exams can't float free from teaching structure, and scheduling can't treat curriculum data as optional input. I would rather pay for a stronger model early than spend the next year stitching modules back together with fragile glue code.

### The result
The data model does more than persist records. It carries institutional truth across scheduling, exams, attendance, billing, and academic operations.

That is why the rest of the system can stay coherent. The application is not trying to reconcile five different interpretations of the same school.
