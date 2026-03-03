# Project-Centric Portfolio Design

**Date:** 2026-03-03
**Status:** Approved

## Overview

Evolve the portfolio from two flat collections (Case Studies + Articles) into a **project-centric** format. Each project has an overview page ("Technical Brief") with nested articles covering challenges, technical decisions, and implementation details. Standalone articles remain for content not tied to a specific project.

## Decisions

| Decision | Choice |
|---|---|
| Relationship to existing structure | Evolve Case Studies → Projects; keep standalone Articles |
| Navigation pattern | Hub & Spoke, controlled from project page |
| Content directory structure | Folder-based nesting |
| Project overview style | Technical Brief (Problem → Approach → Outcome + article list) |

## Content Structure

```
content/
├── projects/
│   └── lms-sertifikasi/
│       ├── index.md                        ← Project overview
│       ├── optimizing-websocket-fanout.md   ← Article: challenge
│       ├── choosing-ash-framework.md        ← Article: decision
│       └── granular-progress-tracking.md    ← Article: implementation
└── articles/                               ← Standalone (unchanged)
    └── understanding-css-frameworks.md
```

## URL Routing

| Route | Purpose |
|---|---|
| `/projects` | Project index |
| `/projects/[slug]` | Project overview + article list |
| `/projects/[slug]/[article]` | Article within project |
| `/articles` | Standalone article index |
| `/articles/[slug]` | Standalone article detail |

## Frontmatter Schema

### Project Overview (`index.md`)

```yaml
title: "LMS Sertifikasi"
description: "A full-stack learning management system..."
date: 2026-01-15
tags: ["elixir", "react", "websockets"]
role: "Lead Full-Stack Developer"
tech_stack: ["Elixir/Phoenix", "React 19", "PostgreSQL"]
problem: "Organizations needed a scalable certification platform..."
approach: "Built a modular system with real-time tracking..."
outcome: "Serving 5,000+ concurrent learners with 99.9% uptime."
```

### Project Article

```yaml
title: "Optimizing WebSocket Fan-out"
description: "How we reduced CPU load by 70%..."
date: 2026-02-14
tags: ["websockets", "performance"]
category: "challenge"  # challenge | decision | implementation
```

## Page Layouts

### Project Overview (`/projects/[slug]`)

1. Header: large title + description + role + tech stack badges
2. Brief section: Problem → Approach → Outcome (3 blocks, border-left accent)
3. Related Writings: article list from same folder, with category badges

### Project Article (`/projects/[slug]/[article]`)

1. Breadcrumb: `Projects / LMS Sertifikasi / Article Title`
2. Category badge above title
3. Article prose content
4. Footer: prev/next within same project

### Home Page

Replace "Case Studies" section with "Projects" section showing project cards.
