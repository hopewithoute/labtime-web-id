---
title: "Digital School"
description: "A school operations platform I architected as a modular Laravel system with a separate optimization runtime, contextual workspace access, and operational guardrails for high-friction academic workflows."
date: 2026-03-09
tags: ["laravel", "vue", "inertiajs", "python", "or-tools", "architecture", "education"]
role: "Senior Full-Stack Engineer / Long-Term Core Engineer"
problem:
  - "School software usually breaks where academic planning, attendance, billing, and access control need to share the same institutional truth."
  - "Timetables drift into spreadsheets, and finance loses academic context."
  - "Permissions become brittle once one person can operate across more than one school or responsibility."
approach:
  - "I designed Digital School as a modular Laravel application with a separate optimization runtime behind an explicit contract."
  - "The main application owns domain context, workspace selection, business workflows, and operational controls."
  - "The optimization layer consumes normalized scheduling input, returns reviewable results, and stays outside the main web runtime."
outcome:
  - "Delivered one coherent operational platform for academic setup, scheduling, attendance, learning workflows, assessments, and billing."
  - "The architecture keeps shared school context local and pushes optimization into the right runtime."
  - "Adds validation, asynchronous execution, retrieval paths, and narrow integration boundaries so the system stays usable under pressure."
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
screenshots:
  - src: /projects/digital-school/automatic-scheduling-infographic.png
    title: Automatic Scheduling Pipeline
    description: Normalizes complex real-world scheduling constraints into a clean mathematical payload.
    bullets:
      - Extracted heavy constraint-solving logic into an isolated Python/OR-Tools process.
      - Designed a 'busy mask' pattern to prevent the solver from hitting the database during execution.
      - Reduced a 2-week manual timetable generation process down to 5 minutes.
  - src: /projects/digital-school/modular-monolith.png
    title: Modular Monolith Architecture
    description: Domain-driven design to enforce clean boundaries without microservice overhead.
    bullets:
      - Kept related logic (Billing, Academic, Attendance) within explicit modular boundaries.
      - Prevented tangled dependencies by enforcing strict DTO and interface contracts.
      - Maintained deployment simplicity while scaling to handle complex school operations.
  - src: /projects/digital-school/school-data.png
    title: One Institutional Graph
    description: A single source of truth for all school data, preventing fragmented spreadsheets.
    bullets:
      - Unified students, teachers, classes, and billing into a cohesive relational model.
      - Eliminated data drift between academic operations and the finance department.
      - Enabled cross-domain reporting directly from a normalized database.
  - src: /projects/digital-school/backend-boundaries.png
    title: Where the controller stops
    description: Why I use typed inputs, named write operations, and orchestration services to keep application boundaries explicit as the platform grows.
    bullets:
      - Extracted logic out of controllers into dedicated action and service layers.
      - Enforced strong typed boundaries using Spatie Laravel Data for inputs.
      - Prevented orchestration logic from tangling with HTTP handling as the platform scaled.
  - src: /projects/digital-school/hybrid-solver.png
    title: One system, two runtimes
    description: Why I separate business orchestration and timetable optimization into an application runtime and a dedicated solver runtime.
    bullets:
      - Isolated heavy timetable optimization into an independent solver runtime.
      - Maintained strict separation between business orchestration and constraint solving.
      - Kept the main web application highly responsive under massive solving workloads.
  - src: /projects/digital-school/ops-guardrails.png
    title: Guardrails, not hope
    description: How I use queue-backed workflows, retrieval paths, and background processing to keep the platform stable under ordinary operational pressure.
    bullets:
      - Shifted heavy, unpredictable operations into robust queue-backed background jobs.
      - Built fail-safes and retrieval paths for third-party integrations like billing.
      - Ensured the core scheduling platform remained stable despite noisy operational pressure.
  - src: /projects/digital-school/preflight-solver.png
    title: Catching errors before the solver runs
    description: How I built a preflight constraint checker to validate academic data before sending it to the heavy Python solver.
    bullets:
      - Implemented a preflight check to identify invalid academic constraints instantly.
      - Prevented the constraint solver from wasting resources on unsolvable states.
      - Provided clear, actionable error messages to operators instead of cryptic failures.
  - src: /projects/digital-school/workspace-pattern.png
    title: Contextual Workspace Pattern
    description: How I built a workspace authorization pattern to handle teachers and staff operating across multiple branches and roles.
    bullets:
      - Designed a dynamic workspace system allowing users to switch between institutional contexts.
      - Separated global authentication from localized role-based permissions.
      - Eliminated brittle permission checks across diverse school branches.
---
