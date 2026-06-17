---
title: "SIMSARPRAS"
description: "Enterprise-grade university asset management platform designed to track, govern, and audit the entire lifecycle of institutional assets. Engineered a unified polymorphic data model, role-aware state machine, and automated depreciation engine."
date: 2026-03-06
tags: ["laravel", "vue", "inertiajs", "php", "mysql", "tailwind"]
role: "Lead Architect / Senior Full-Stack Engineer"
problem:
  - "The institution operated without any centralized digital system to catalog 8 structurally distinct asset types (Land, Buildings, Vehicles, Software, Consumables), resulting in an entirely manual and severely fragmented administration."
  - "Asset lifecycles—spanning from initial procurement drafts, inter-departmental distributions, to final disposals—were tracked exclusively via disconnected spreadsheets, risking major compliance failures."
  - "State auditors (BPK) required absolute precision and immutable audit trails for every transaction, while finance teams were relying on error-prone manual recalculations for over 80,000+ assets."
approach:
  - "Modeled a massive polymorphic relational schema to unify 8 distinct government asset classifications (KIB A-F) under a single overarching, strictly-typed catalog."
  - "Architected a dynamic State Machine Engine with Contextual RBAC to securely govern the entire asset lifecycle, ensuring every distribution requires mandatory digital handshakes."
  - "Engineered an asynchronous financial calculation engine backed by Double-Entry Ledger models and Model Event Trackers to guarantee 100% accurate, tamper-proof accounting."
outcome:
  - "Deployed a centralized system that currently catalogs over 80,000+ assets across 8 specific categories, significantly reducing manual reporting effort."
  - "Replaced disconnected spreadsheet tracking with a role-based approval workflow, ensuring strict accountability for all inter-departmental asset transfers."
  - "Provided finance teams with automated depreciation and audit-ready historical logs, actively supporting compliance with state accounting standards."
tech_stack:
  frontend:
    - name: "Vue 3 & Inertia.js"
      reason: "Modern Monolith architecture for complex operational dashboards without the overhead of a separate API layer."
    - name: "Tailwind CSS"
      reason: "Rapid UI iteration and consistent design system implementation across dense data tables and modal flows."
  backend:
    - name: "Laravel 11 (PHP 8.3)"
      reason: "Robust ecosystem for building complex enterprise logic and Action-Based Domain Controllers."
    - name: "Strict DTO & Query Pipeline"
      reason: "Type-Safe Data Transfer Objects and dynamic high-performance API querying."
    - name: "Asynchronous Queue Workers"
      reason: "Background processing for bulk imports and mass depreciation calculations without blocking the UI."
  infrastructure:
    - name: "MySQL Database"
      reason: "Ensured ACID compliance and strict referential integrity for critical financial and asset data."
    - name: "CAS Identity Federation"
      reason: "Enterprise Centralized Authentication (SSO) mapped to the university's central identity provider."
screenshots:
  - src: /projects/simsarpras/state-machine-infographic.jpg
    title: "Role-Aware Transactional State Machine"
    description: "Designed a dynamic workflow engine to solve arbitrary state manipulation and race conditions during cross-department asset mutations."
    bullets:
      - "Implemented a dynamic RBAC engine for Contextual Ownership Validation."
      - "Asset distributions and mutations require dynamic approval between Source Owner and Target Owner."
      - "Eliminated physical asset ownership disputes by locking state transitions securely."
  - src: /projects/simsarpras/polymorphic-model-infographic.jpg
    title: "Unified Polymorphic Data Model"
    description: "Consolidated siloed data from various procurement channels into one flexible, centralized database schema."
    bullets:
      - "Mapped 8 structurally distinct asset categories (e.g., Land, Vehicles, Buildings) into a unified PENGADAAN flow using Polymorphic Relations."
      - "Eliminated query redundancy and fragmented tables."
      - "Established a true Single Source of Truth for the entire university's procurement pipelines."
  - src: /projects/simsarpras/depreciation-engine-infographic.jpg
    title: "Automated Straight-Line Depreciation Engine"
    description: "Built an automated calculation engine to eliminate error-prone spreadsheet-based monthly depreciation tasks."
    bullets:
      - "Executed mass depreciation for 80,000+ assets using in-memory asynchronous queue workers."
      - "Reduced monthly financial reconciliation time from weeks to mere minutes."
      - "Ran entirely in the background, ensuring zero performance degradation on the main UI threads."
  - src: /projects/simsarpras/audit-trail-infographic.jpg
    title: "Immutable Audit Trail & Bookkeeping"
    description: "A permanent logging architecture guaranteeing bookkeeping validity in compliance with strict external auditor standards."
    bullets:
      - "Combined a Double-Entry Ledger approach with automated Model Event Trackers."
      - "All UPDATE and DELETE actions create immutable snapshots of old_values and new_values."
      - "Achieved a Write-Once Read-Many (WORM) equivalent architecture at the ORM layer, guaranteeing 100% auditability."
  - src: /projects/simsarpras/modern-monolith-infographic.jpg
    title: "The Modern Monolith Architecture"
    description: "A unified stack that combines backend robustness with frontend reactivity without the overhead of maintaining a separate JSON API."
    bullets:
      - "Adopted a tightly-coupled SPA architecture to build a seamless application."
      - "Discarded complex dual routing and isolated state management stores."
      - "Delivered modern user experiences with the development velocity of a traditional server-rendered application."
  - src: /projects/simsarpras/action-logic-infographic.jpg
    title: "Action-Based Domain Logic (Thin Controllers)"
    description: "Decoupled business logic for maximum reusability, testability, and code cleanliness."
    bullets:
      - "Implemented the Action Pattern to house all core business and transactional logic."
      - "Maintained extremely thin controllers focused purely on HTTP request routing and UI rendering."
      - "Ensured transaction logic is secure and fully reusable across Web, external APIs, or CLI commands."
  - src: /projects/simsarpras/dto-validation-infographic.jpg
    title: "Strict Type-Safe Data Transfer Objects (DTOs)"
    description: "Guaranteed data integrity between HTTP boundaries and Domain boundaries."
    bullets:
      - "Implemented strict DTOs to replace generic HTTP request validation payloads."
      - "Automatically casted incoming requests into robust, native data types before reaching the database layer."
      - "Fortified the system against garbage data injections and type mismatch failures."
  - src: /projects/simsarpras/dynamic-query-infographic.jpg
    title: "Dynamic Querying & High-Performance Pagination"
    description: "Scalable reporting engine designed to handle massive, ever-growing datatables gracefully."
    bullets:
      - "Leveraged a dynamic query resolution pipeline to allow frontend-driven filtering and sorting."
      - "Integrated deferred join pagination techniques to resolve performance degradation common in standard SQL offsets."
      - "Effortlessly handled queries on tables containing millions of historical financial journals."
  - src: /projects/simsarpras/sso-auth-infographic.jpg
    title: "Enterprise Centralized Authentication (SSO)"
    description: "Seamless and secure identity federation across the broader university ecosystem."
    bullets:
      - "Integrated natively with the institution's Central Authentication Service (CAS) protocol."
      - "Delegated user identity validation entirely to the primary identity server."
      - "Eliminated local password management vulnerabilities and redundant account data silos."
---
