---
title: "Digital School"
description: "A school operations platform I architected as a modular Laravel system with a separate optimization runtime, contextual workspace access, and operational guardrails for high-friction academic workflows."
date: 2026-03-09
tags: ["laravel", "vue", "inertiajs", "python", "or-tools", "architecture", "education"]
role: "System Architect / Lead Engineer"
problem: "School software usually breaks where academic planning, attendance, billing, and access control need to share the same institutional truth. Timetables drift into spreadsheets, finance loses academic context, and permissions become brittle once one person can operate across more than one school or responsibility."
approach: "I designed Digital School as a modular Laravel application with a separate optimization runtime behind an explicit contract. The main application owns domain context, workspace selection, business workflows, and operational controls. The optimization layer consumes normalized scheduling input, returns reviewable results, and stays outside the main web runtime."
outcome: "Delivered one coherent operational platform for academic setup, scheduling, attendance, learning workflows, assessments, grading, billing, announcements, and integrations. The architecture keeps shared school context local, pushes optimization into the right runtime, and adds validation, asynchronous execution, retrieval paths, and narrow integration boundaries so the system stays usable under ordinary operational pressure."
tech_stack:
  frontend:
    - name: "Vue 3"
      reason: "Composable UI architecture for dense operational surfaces such as scheduling, grading, academic planning, and finance"
    - name: "Inertia.js"
      reason: "Tight alignment between backend routing, authorization, and frontend delivery without introducing a second product-shaped API layer"
    - name: "PrimeVue"
      reason: "Fast delivery of admin-heavy tables, dialogs, filters, and workflow forms"
    - name: "Tailwind CSS"
      reason: "Consistent design iteration across many domain modules with low styling friction"
  backend:
    - name: "Laravel 12"
      reason: "Primary application runtime for domain orchestration, middleware, queues, integrations, and operator workflows"
    - name: "Spatie Laravel Data"
      reason: "Typed boundaries between requests, actions, services, and solver contracts"
    - name: "Laravel Horizon"
      reason: "Queue execution and visibility for long-running workflows such as scheduling and attendance processing"
    - name: "Laravel Sanctum"
      reason: "Reliable session-backed authentication for a contextual internal web application"
  infrastructure:
    - name: "Python + OR-Tools"
      reason: "Constraint-solving runtime for staged timetable generation and compaction"
    - name: "Redis"
      reason: "Queue and cache support for asynchronous work and retrieval of expensive scheduling results"
    - name: "AWS S3"
      reason: "External file and media storage integration"
    - name: "Telegram and Moota"
      reason: "Webhook-based notification and payment-event integration"
screenshots: []
---

I built this platform end to end, independently.

The hard part was not adding features. The hard part was keeping scheduling, attendance, learning workflows, billing, and access control attached to the same institutional truth. That shaped the whole system. Laravel owns the domain, the operator context, and the product workflows. Python owns the search problem.

I structured the platform around a few deliberate boundaries:

- **One institutional graph.** Schools, academic years, class groups, teaching assignments, schedules, exams, invoices, and payments live in one model. Scheduling, finance, and learning workflows read from the same graph instead of stitching context together from separate modules.

- **Explicit backend boundaries.** Requests enter through typed inputs. Controllers stay thin. Named operations own state changes. Services handle orchestration. That separation keeps the write path legible across academic setup, finance, attendance, and scheduling.

- **Workspace-based access.** Users do not just log in. They activate a workspace made of role, school, and academic context. That makes authorization concrete instead of abstract, and it gives every request a clear operating position before feature code runs.

- **A separate optimization runtime.** Automatic scheduling runs in Python, not inside the web request. The application normalizes school state into a typed payload, the solver searches, and the results come back for preview and commit. That split keeps the application focused on product logic and the solver focused on search.

- **Operational guardrails.** Long-running workflows go through queues with retrieval paths. Integration endpoints stay narrow. Device traffic and webhooks do not get to reshape the main application path.

To respect prior employer confidentiality, some identifiers and implementation details in the supporting writeups are intentionally generalized. The architectural decisions and trade-offs remain intact.

The writeups below go deeper into each of those boundaries.
