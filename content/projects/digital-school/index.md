---
title: "DISC - Digital School Platform"
description: "An Enterprise-Grade Multi-Tenant SaaS blending Comprehensive School Management with an Advanced LMS. Architected as a modular Laravel monolith, it unifies 11 core educational domains—spanning from IoT biometric attendance and AI-driven timetable scheduling, to High-Security CBT exams and automated financial reconciliation."
date: 2026-03-09
tags: ["laravel", "vue", "inertiajs", "python", "or-tools", "iot", "saas"]
role: "Lead Architect / Senior Full-Stack Engineer"
problem:
  - "Educational foundations struggled to manage core school administration (student data, scheduling, and billing) alongside daily academic learning (LMS assignments and report cards) using fragmented, disconnected software."
  - "Off-the-shelf platforms lacked robust multi-tenancy and failed to integrate natively with physical hardware (IoT Biometrics), forcing schools back into manual spreadsheet reconciliation."
  - "Executing high-stakes online exams (CBT) was plagued by proxy cheating (joki) and high server costs, while generating conflict-free master schedules manually took weeks of exhaustive administrative effort."
approach:
  - "Architected a strictly-typed Multi-Tenant SaaS foundation using a Contextual Workspace pattern, allowing central foundations to seamlessly oversee both School Management operations and LMS academic progress across multiple branches."
  - "Engineered a massive modular monolith unifying 11 core domains: integrating direct ADMS hardware protocols for physical attendance, dynamic taxonomy mappers for E-Raport, and Moota-powered headless auto-reconciliation for finance."
  - "Secured the academic pipeline by developing a High-Concurrency CBT engine with Device Fingerprinting, and offloaded complex class scheduling to a Constraint Satisfaction Problem (CSP) solver pipeline powered by Python."
outcome:
  - "Successfully delivered a holistic Enterprise SaaS ERP that completely eliminates data drift by centralizing core School Management, Interactive LMS pipelines, Zero-Fraud CBT exams, and automated billing into a single institutional graph."
  - "Reduced complex, multi-branch timetable generation and financial bank reconciliations from weeks of manual, error-prone effort down to mere seconds via AI and API integrations."
  - "Secured the academic assessment pipeline with hardware-locked online exams and transformed daily physical attendance into real-time biometric-to-WhatsApp broadcasts."
tech_stack:
  frontend:
    - name: "Vue 3 & PrimeVue"
      reason: "Reactive, component-driven UI leveraging PrimeVue for rich, enterprise-grade data grids, complex scheduling calendars, and dynamic E-Raport matrices."
    - name: "Inertia.js"
      reason: "Bridged the frontend SPA directly to the backend routing, eliminating the need for complex state management and REST API overhead."
  backend:
    - name: "Laravel 12 & Octane"
      reason: "High-performance application server utilizing Octane to keep the framework bootstrapped in memory, crucial for high-concurrency CBT exams."
    - name: "Spatie & Horizon"
      reason: "Strict typed boundaries via Spatie Data and robust background queue orchestration (Horizon) for heavy tasks like financial auto-reconciliation."
  infrastructure:
    - name: "Python & Google OR-Tools"
      reason: "Dedicated mathematical solver pipeline utilizing Constraint Programming to resolve millions of scheduling permutations without blocking the web server."
    - name: "IoT & Payment Integrations"
      reason: "Direct ADMS listeners for ZKTeco physical fingerprint machines and Moota Webhook APIs for headless mutation matching."
screenshots:
  - src: /projects/digital-school/ds-multi-tenancy-infographic.jpg
    title: "Multi-Tenancy & SaaS Architecture"
    description: "The foundational engine supporting unlimited institutions within a single unified codebase."
    bullets:
      - "Implemented a Contextual Workspace Pattern allowing Super Admins to manage isolated logic, databases, and subscriptions per school branch."
      - "Eliminated the need for separate servers for SD, SMP, and SMA branches."
      - "Allowed real-time consolidated financial and attendance reporting at the Foundation (Yayasan) level."
  - src: /projects/digital-school/ds-iot-biometric-infographic.jpg
    title: "Hardware Integration (IoT Biometrics)"
    description: "Direct cloud integration with standalone physical attendance machines."
    bullets:
      - "Built an API listener utilizing ADMS protocols to connect directly to ZKTeco fingerprint machines."
      - "Synchronized biometric events to the cloud in milliseconds, triggering immediate WhatsApp broadcasts to parents."
      - "Eliminated the need for manual flash-drive data extraction at the end of the month."
  - src: /projects/digital-school/ds-smart-scheduling-infographic.jpg
    title: "AI-Driven Smart Scheduling"
    description: "Constraint Satisfaction Problem (CSP) solver algorithm for conflict-free timetables."
    bullets:
      - "Offloaded complex scheduling constraints to an isolated Python and Google OR-Tools pipeline."
      - "Automatically maps time slots, teachers, rooms, and subjects while mathematically preventing overlaps."
      - "Reduced academic timetable generation from weeks of manual work down to hours with 0% conflict rate."
  - src: /projects/digital-school/ds-auto-reconciliation-infographic.jpg
    title: "Smart Billing & Auto-Reconciliation"
    description: "Enterprise-grade financial engine mimicking mid-tier banking systems."
    bullets:
      - "Generated automated monthly invoices utilizing unique identifiers (Kode Unik)."
      - "Integrated with Moota for headless, real-time bank mutation matching."
      - "Achieved Zero-Touch reconciliation: balances are updated instantly upon parent transfer without manual approval."
  - src: /projects/digital-school/ds-cbt-infographic.jpg
    title: "Advanced CBT & Soft Proctoring"
    description: "Highly accessible exam engine supporting rich question varieties and strict academic integrity."
    bullets:
      - "Delivered a frictionless exam experience that effortlessly scales to thousands of concurrent student sessions."
      - "Supported diverse question varieties (Audio, Video, Rich Text) mapped natively to curriculum competencies."
      - "Enforced Soft Proctoring via strict browser behavior tracking (tab switches, focus loss) alongside Device Fingerprinting."
  - src: /projects/digital-school/ds-eraport-infographic.jpg
    title: "Dynamic E-Raport & Taxonomy Engine"
    description: "Automated conversion of raw scores into formal academic report cards."
    bullets:
      - "Engineered a dynamic curriculum taxonomy mapper (Capaian Pembelajaran, KI-KD)."
      - "Automatically classified daily CBT and assignment scores into the final matrix."
      - "Eliminated double data entry for homeroom teachers at the end of the semester."
  - src: /projects/digital-school/ds-psychometric-infographic.jpg
    title: "Psychometric & Aptitude Assessment"
    description: "Integrated counseling tools (BK) directly into the academic pipeline."
    bullets:
      - "Developed specialized instruments and questionnaire engines to capture psychological tendencies."
      - "Mapped raw assessment data into a holistic student profile combining cognitive and psychometric traits."
      - "Provided counselors with data-driven insights for university major recommendations."
  - src: /projects/digital-school/ds-unified-comm-infographic.jpg
    title: "Unified Communication Pipeline"
    description: "Centralized broadcasting infrastructure for institutional announcements."
    bullets:
      - "Built a multi-channel delivery system utilizing In-App notifications, Telegram bots, and Push Notifications."
      - "Bypassed noisy WhatsApp groups to ensure high-priority school announcements reach targets reliably."
      - "Maintained an immutable log of all outbound institutional communications."
---
