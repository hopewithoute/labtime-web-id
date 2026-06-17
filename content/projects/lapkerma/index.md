---
title: "LAPKERMA - Enterprise Partnership"
description: "A centralized University Partnership Management System handling hierarchical documents (MoU, MoA, IA), complex contextual ownership, and continuous data synchronization with national ministry databases."
date: 2026-03-08
tags: ["laravel", "vue", "inertiajs", "saloonphp", "mysql"]
role: "Lead Architect / Solo Full-Stack Engineer"
problem:
  - "The university managed hundreds of domestic and international partnerships using scattered physical documents and isolated Excel tracking sheets."
  - "Tracking the implementation of agreements (MoA) down to specific Faculty activities (IA) and mapping them to the university's Key Performance Indicators (IKU) was nearly impossible."
  - "There was a constant risk of data desynchronization with the Ministry of Education's central reporting system, which required strict audit trails and regular updates."
approach:
  - "Architected a hierarchical relational database to track the lineage of every document (MoU -> MoA -> IA) and tightly coupled them to specific University Faculties and Key Performance Indicators (IKU)."
  - "Implemented a Contextual Ownership and RBAC layer, ensuring that highly sensitive partnership documents could only be accessed or modified by directly involved initiators or implementers."
  - "Engineered a robust outbound integration layer using Saloon PHP and Redis Horizon queues to manage continuous, asynchronous data synchronization with external government APIs."
outcome:
  - "Delivered a Single Source of Truth for all institutional partnerships, allowing executives to immediately see which faculties are actively collaborating and generating revenue."
  - "Eliminated unauthorized document tampering via an immutable Write-Once Read-Many (WORM) audit trail."
  - "Automated the grueling process of national reporting by maintaining synchronized, DTO-validated remote data states directly within the application."
tech_stack:
  frontend:
    - name: "Vue 3 & Inertia.js"
      reason: "Provided a seamless, reactive SPA experience for complex data-entry forms without building a disconnected API layer."
  backend:
    - name: "Laravel 10 (PHP 8.2+)"
      reason: "Core framework handling complex hierarchical business rules and contextual model scoping."
    - name: "Saloon PHP"
      reason: "Object-oriented API integration layer to securely communicate with external Ministry endpoints."
    - name: "Strict DTOs & Dynamic Queries"
      reason: "Ensured payload integrity via spatie/laravel-data and optimized deep relational queries using eloquent-power-joins."
  infrastructure:
    - name: "MySQL & Redis Horizon"
      reason: "ACID compliant storage paired with high-performance background queues for remote data synchronization."
screenshots:
  - src: /projects/lapkerma/lap-hierarchy-infographic.jpg
    title: "Hierarchical Document Engine"
    description: "Tracking the complex lineage of legal partnerships."
    bullets:
      - "Engineered a recursive database schema mapping overarching MoUs down to faculty-specific Implementation Arrangements (IA)."
      - "Enforced strict hierarchical dependencies, preventing orphaned documents."
  - src: /projects/lapkerma/lap-rbac-infographic.jpg
    title: "Contextual Ownership & RBAC"
    description: "Dynamic security scoping based on institutional involvement."
    bullets:
      - "Implemented dynamic Eloquent Scopes (scopeOwned) restricting data visibility."
      - "Access is granted automatically if a user's Faculty is tagged as an Initiator, Collaborator, or Executor."
  - src: /projects/lapkerma/lap-sync-infographic.jpg
    title: "Cross-Platform Data Synchronization"
    description: "Maintaining parity with National Ministry databases."
    bullets:
      - "Built an API client layer using Saloon PHP for structured HTTP communication."
      - "Implemented 'Remote Data Flags' to prevent local users from hard-deleting records that have already been synchronized globally."
  - src: /projects/lapkerma/lap-worm-infographic.jpg
    title: "Immutable Audit Logging (WORM)"
    description: "Enterprise-grade accountability for legal documents."
    bullets:
      - "Integrated automated model event trackers at the ORM layer."
      - "Captured comprehensive snapshots (old_values vs new_values) for every state change."
  - src: /projects/lapkerma/lap-media-infographic.jpg
    title: "Polymorphic Media Management"
    description: "Centralized file storage for disparate attachment types."
    bullets:
      - "Utilized Polymorphic relations to attach scanned legal PDFs to any hierarchical level of the agreement."
  - src: /projects/lapkerma/lap-kpi-infographic.jpg
    title: "KPI (IKU) Mapping Engine"
    description: "Bridging administrative documents with academic performance metrics."
    bullets:
      - "Built a relational matrix mapping concrete activities (Kegiatan) to national Key Performance Indicators (IKU)."
---
