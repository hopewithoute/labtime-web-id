# Project-Centric Portfolio Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Evolve the flat Case Studies collection into a project-centric portfolio with nested articles, while keeping standalone articles intact.

**Architecture:** Replace `content/case-studies/` with `content/projects/<slug>/` folders. Each project folder has an `index.md` (overview) and article `.md` files. New Nuxt pages handle the `/projects`, `/projects/[slug]`, and `/projects/[slug]/[article]` routes. The nav, home page, and existing case-studies pages are updated/removed accordingly.

**Tech Stack:** Nuxt 4, @nuxt/content, Vue 3, Tailwind CSS, Shadcn Vue

---

### Task 1: Scaffold Project Content

**Files:**
- Delete: `content/case-studies/01-example-case.md`
- Create: `content/projects/lms-sertifikasi/index.md`
- Create: `content/projects/lms-sertifikasi/optimizing-websocket-fanout.md`

**Step 1: Create project overview content**

Create `content/projects/lms-sertifikasi/index.md`:

```markdown
---
title: "LMS Sertifikasi"
description: "A full-stack learning management system for professional certification with real-time tracking and assessment."
date: 2026-01-15
tags: ["elixir", "react", "websockets", "postgresql"]
role: "Lead Full-Stack Developer"
tech_stack: ["Elixir/Phoenix", "React 19", "TanStack Router/Query", "PostgreSQL"]
problem: "Organizations needed a scalable platform to manage certification programs, track learning progress in real-time, and deliver reliable assessments to thousands of concurrent learners."
approach: "Built a modular system using Ash Framework for domain logic, Phoenix Channels for real-time sync, and a React 19 frontend with granular progress tracking via xAPI."
outcome: "Serving 5,000+ concurrent learners with 99.9% uptime, 70% reduction in WebSocket CPU load, and sub-second progress synchronization."
---

## Overview

A comprehensive learning management system designed for professional certification bodies. The platform handles the full certification lifecycle — from course content delivery and real-time progress tracking to timed assessments and automated grading.

## Key Technical Highlights

- **Real-time Learning Sync** — Phoenix Channels with multiplexed room model for efficient fan-out
- **Granular Progress Tracking** — Vanilla TypeScript External Store with O(1) UI updates
- **Assessment Engine** — Timed exams with snapshot-based grading and remedial cooldown logic
- **xAPI Integration** — Full LRS compliance for learning analytics and session resumption
```

**Step 2: Create first project article**

Create `content/projects/lms-sertifikasi/optimizing-websocket-fanout.md`:

```markdown
---
title: "Optimizing WebSocket Fan-out for 5,000 Concurrent Learners"
description: "How we reduced CPU load by 70% by moving from per-user topics to a multiplexed room model."
date: 2026-02-14
tags: ["websockets", "performance", "elixir"]
category: "challenge"
---

## The Problem

When 5,000 students joined a live quiz simultaneously, the application server CPU spiked to 100%. The bottleneck was in how individual socket connections iterated over channel topics.

## The Approach

We profiled the message broker and identified that the per-user topic model created O(n) fan-out for every broadcast message.

## The Solution

We moved from a per-user topic model to a multiplexed room model, where a single channel handles all subscribers for a given context (e.g., a quiz session).

## The Result

CPU load stabilized at ~30% during identical load tests — a 70% reduction.
```

**Step 3: Delete old case study**

```bash
rm content/case-studies/01-example-case.md
rmdir content/case-studies
```

**Step 4: Commit**

```bash
git add content/
git commit -m "feat: scaffold project content structure with LMS Sertifikasi"
```

---

### Task 2: Create Project Index Page

**Files:**
- Create: `app/pages/projects/index.vue`

**Step 1: Create the projects index page**

Create `app/pages/projects/index.vue` — lists all projects by querying `content/projects/*/index.md`. Display each project as a card with title, description, role, and tech stack badges. Style consistent with existing brutalist-lite aesthetic (1px borders, uppercase headings, hover:bg-accent).

Use `queryContent('/projects')` filtered to only `index.md` files via `.where({ _file: 'index' })` or equivalent path-based filtering.

**Step 2: Verify page renders**

Run: `pnpm run dev`, navigate to `http://localhost:3000/projects`
Expected: Project cards visible with LMS Sertifikasi data.

**Step 3: Commit**

```bash
git add app/pages/projects/
git commit -m "feat: add projects index page"
```

---

### Task 3: Create Project Overview Page

**Files:**
- Create: `app/pages/projects/[slug]/index.vue`

**Step 1: Create the project overview page**

Create `app/pages/projects/[slug]/index.vue`. This page:
1. Loads the project `index.md` from `content/projects/<slug>/index.md` using `queryContent`
2. Renders the "Technical Brief" header (title, description, role, tech stack badges)
3. Renders the Problem → Approach → Outcome blocks (border-left accent style)
4. Queries all other `.md` files in the same folder (excluding `index.md`) and renders them as "Related Writings" — a list of article links with category badges and dates
5. Renders any additional markdown body content from the `index.md`

**Step 2: Verify page renders**

Navigate to `http://localhost:3000/projects/lms-sertifikasi`
Expected: Technical Brief with overview content and one article listed under "Related Writings".

**Step 3: Commit**

```bash
git add app/pages/projects/
git commit -m "feat: add project overview page with technical brief layout"
```

---

### Task 4: Create Project Article Page

**Files:**
- Create: `app/pages/projects/[slug]/[article].vue`

**Step 1: Create the project article page**

Create `app/pages/projects/[slug]/[article].vue`. This page:
1. Loads the article markdown from `content/projects/<slug>/<article>.md`
2. Breadcrumb: `Projects / <Project Title> / <Article Title>` — project title fetched from sibling `index.md`
3. Category badge above title (challenge/decision/implementation)
4. Prose content rendering (reuse existing prose classes)
5. Prev/Next navigation: query sibling articles in same project folder, show links

**Step 2: Verify page renders**

Navigate to `http://localhost:3000/projects/lms-sertifikasi/optimizing-websocket-fanout`
Expected: Article with breadcrumb, category badge, content, and navigation.

**Step 3: Commit**

```bash
git add app/pages/projects/
git commit -m "feat: add project article page with breadcrumb and prev/next nav"
```

---

### Task 5: Update Navigation and Home Page

**Files:**
- Modify: `app/layouts/default.vue`
- Modify: `app/pages/index.vue`

**Step 1: Update navigation**

In `app/layouts/default.vue`:
- Change "Case Studies" nav link to "Projects" pointing to `/projects`

**Step 2: Update home page**

In `app/pages/index.vue`:
- Replace "Case Studies" section with "Projects" section
- Query `content/projects/*/index.md` and render project cards
- Keep "Latest Articles" section unchanged

**Step 3: Verify navigation flow**

- Home page shows Projects section with LMS Sertifikasi
- Clicking navigates to `/projects/lms-sertifikasi`
- Nav header shows "Projects" link
- "Articles" still works

**Step 4: Commit**

```bash
git add app/layouts/ app/pages/index.vue
git commit -m "feat: update nav and home page for project-centric layout"
```

---

### Task 6: Remove Old Case Studies Pages

**Files:**
- Delete: `app/pages/case-studies/index.vue`
- Delete: `app/pages/case-studies/[slug].vue`

**Step 1: Delete old case studies pages**

```bash
rm app/pages/case-studies/index.vue
rm app/pages/case-studies/\[slug\].vue
rmdir app/pages/case-studies
```

**Step 2: Verify no broken links**

Navigate to `/`, `/projects`, `/projects/lms-sertifikasi`, `/articles`
Expected: All pages work. `/case-studies` returns 404 (expected).

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old case-studies pages"
```

---

## Verification Plan

### Manual Verification (browser)

After all tasks complete, verify these flows:

1. **Home page** (`/`) — Shows "Projects" section with project cards, "Latest Articles" unchanged
2. **Projects index** (`/projects`) — Lists all projects with title, description, tech stack
3. **Project overview** (`/projects/lms-sertifikasi`) — Technical Brief layout with Problem/Approach/Outcome + article list
4. **Project article** (`/projects/lms-sertifikasi/optimizing-websocket-fanout`) — Breadcrumb, category badge, prose content, prev/next nav
5. **Standalone articles** (`/articles`) — Still works, unchanged
6. **Navigation** — Header shows "Projects" and "Articles" links
7. **404 handling** — `/case-studies` returns 404 or redirect
