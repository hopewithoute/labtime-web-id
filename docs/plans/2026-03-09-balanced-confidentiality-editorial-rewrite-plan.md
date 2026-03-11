# Balanced Confidentiality Editorial Rewrite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite employer-derived project case studies so they remain technically credible while sounding clearly confidentiality-aware and recruiter-safe.

**Architecture:** The rewrite keeps the existing project structure and frontmatter intact while replacing employer-style implementation artifacts with generalized technical language. High-risk pages lose concrete code, identifiers, metrics, and security details first; medium-risk pages are then adjusted to align tone and framing across the portfolio.

**Tech Stack:** Markdown, Nuxt Content, portfolio case-study writing, confidentiality-aware technical documentation

---

### Task 1: Add editorial documentation

**Files:**
- Create: `docs/plans/2026-03-09-balanced-confidentiality-editorial-design.md`
- Create: `docs/plans/2026-03-09-balanced-confidentiality-editorial-rewrite-plan.md`

**Step 1:** Record the approved editorial direction and risk model.

**Step 2:** Save the execution plan in `docs/plans/` for future reference.

**Step 3:** Proceed in the current session as explicitly requested by the user.

### Task 2: Rewrite Digital School pages

**Files:**
- Modify: `content/projects/digital-school/index.md`
- Modify: `content/projects/digital-school/school-data.md`
- Modify: `content/projects/digital-school/backend-boundaries.md`
- Modify: `content/projects/digital-school/hybrid-solver.md`
- Modify: `content/projects/digital-school/modular-monolith.md`
- Modify: `content/projects/digital-school/ops-guardrails.md`
- Modify: `content/projects/digital-school/preflight-solver.md`
- Modify: `content/projects/digital-school/workspace-pattern.md`

**Step 1:** Remove code snippets, internal identifiers, and operationally specific examples.

**Step 2:** Rewrite each file around problem, constraint, decision, trade-off, and outcome.

**Step 3:** Add a brief confidentiality-aware framing note to the project overview page.

### Task 3: Rewrite LMS Sertifikasi pages

**Files:**
- Modify: `content/projects/lms-sertifikasi/index.md`
- Modify: `content/projects/lms-sertifikasi/chat-architecture-scaling.md`
- Modify: `content/projects/lms-sertifikasi/dynamic-pdf-engine.md`
- Modify: `content/projects/lms-sertifikasi/immutable-certification-engine.md`
- Modify: `content/projects/lms-sertifikasi/media-gateway-architecture.md`
- Modify: `content/projects/lms-sertifikasi/media-pipeline.md`
- Modify: `content/projects/lms-sertifikasi/phoenix-react-websocket-bridge.md`
- Modify: `content/projects/lms-sertifikasi/resilient-assessment-engine.md`
- Modify: `content/projects/lms-sertifikasi/surgical-realtime-sync.md`
- Modify: `content/projects/lms-sertifikasi/unified-learning-telemetry.md`

**Step 1:** Remove code snippets, explicit internal channel names, and sensitive metrics.

**Step 2:** Generalize security, caching, and delivery mechanics where the exact implementation is not necessary for the reader.

**Step 3:** Add a brief confidentiality-aware framing note to the project overview page.

### Task 4: Verify recruiter-safe consistency

**Files:**
- Verify: `content/projects/`

**Step 1:** Search for remaining fenced code blocks in project case studies.

Run: `rg -n '^```' content/projects`

**Step 2:** Search for leftover internal-style identifiers and exact helper names.

Run: `rg -n 'Schema::create|Repo\.insert_all|Ash\.create|Session::get|RoleAuth|RouteHelper|MootaController|PengajaranData|SolverRunner|queryClient\.invalidateQueries' content/projects`

**Step 3:** Review the resulting diff for tone and consistency.

Run: `git diff -- content/projects docs/plans`

**Step 4:** Report only verified results.

