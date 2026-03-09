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

I independently architected and shipped this platform end to end.

The hard part was never adding modules. The hard part was keeping scheduling, attendance, learning workflows, billing, and access control aligned to the same school model. That drove a system shape where Laravel owns institutional truth, operator context, and product workflows, while Python owns the timetable search problem.

**Data model and shared context.** I centered the platform on schools, academic years, class groups, teaching assignments, schedules, exams, invoices, and payments. That lets scheduling, finance, and learning workflows operate on the same institutional graph instead of passing partial context between disconnected modules.

**Backend boundaries.** Requests enter through DTOs, controllers stay thin, action classes own write-heavy workflows, and services handle orchestration. That keeps state changes explicit across academic setup, finance, attendance, and scheduling.

**Access and deployment shape.** Users don't just log in. They select a workspace made up of role, school, and academic context. I keep the product as a modular monolith because most of the expensive problems still come from shared domain context, not from a need to distribute every feature.

**Scheduling and operational guardrails.** Automatic timetable generation runs through a separate optimization runtime fed by normalized application payloads. The workflow starts with preflight validation, supports queued and direct execution paths, and separates solve, preview, and commit. Around that, queue visibility, retrieval paths, device-ingestion flows, and narrow webhook boundaries keep noisy operational traffic away from the main request path.

To respect prior employer confidentiality, some identifiers and implementation details in the supporting writeups are intentionally generalized while keeping the architectural decisions and trade-offs intact.

The result is a school platform that behaves like one system instead of a collection of admin pages. It supports academic planning, attendance, LMS flows, assignments, exams, grading, billing, announcements, and timetable generation without letting one subsystem distort the rest.

The supporting writeups below break down the architectural decisions behind that shape.
