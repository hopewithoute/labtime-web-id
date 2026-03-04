# Project Entry Structure — Design Doc

## Goal

Define an ideal project entry format for LabTime portfolio, then update the existing `lms-sertifikasi` entry to match. The format should support four core sections: **Summary**, **Tech Stack** (grouped), **Technical Highlights & Decisions** (with optional deep-dive links), and **Screenshots** (optional gallery).

## Approach: Hybrid (Structured Frontmatter + Narrative Body)

Queryable metadata lives in frontmatter. Rich narrative content lives in the markdown body. This balances structure with authoring flexibility.

---

## Content Format (`content/projects/<slug>/index.md`)

### Frontmatter Schema

```yaml
---
title: string           # Project name
description: string     # One-line summary for cards/SEO
date: YYYY-MM-DD        # Project date/version
tags: string[]           # Searchable tags
role: string             # Your role in the project

# Summary — Problem/Approach/Outcome
problem: string          # What problem was solved
approach: string         # How you solved it
outcome: string          # Measurable results

# Tech Stack — grouped by category
tech_stack:
  frontend:
    - name: string
      reason: string     # Why this choice
  backend:
    - name: string
      reason: string
  infrastructure:
    - name: string
      reason: string

# Screenshots — optional gallery
screenshots:             # Omit entirely if no screenshots
  - src: string          # Path relative to /public
    alt: string          # Alt text / caption
---
```

### Body — Technical Highlights & Decisions

Written as markdown `## Technical Highlights & Decisions` with `### SubHeading` per highlight. Each highlight has:
- Description of what it is and why it was chosen
- Optional `[Deep Dive →](link)` to a sub-article

```markdown
## Technical Highlights & Decisions

### Real-time Learning Sync
Phoenix Channels with multiplexed room model for efficient fan-out.
Moved from per-user topics to shared rooms, reducing CPU by 70%.
[Deep Dive →](/projects/lms-sertifikasi/optimizing-websocket-fanout)

### Granular Progress Tracking
Vanilla TypeScript External Store with O(1) UI updates.
Chose useSyncExternalStore over Context to avoid full-tree re-renders.
```

---

## Template Rendering Order (`[slug]/index.vue`)

1. **Header** — title, description, role, date
2. **Summary** — Problem / Approach / Outcome (existing section, unchanged)
3. **Tech Stack** — Grouped cards: Frontend, Backend, Infrastructure. Each item shows name + reason
4. **Screenshots** — Gallery/carousel (only rendered if `screenshots` array exists)
5. **Technical Highlights & Decisions** — Rendered from body markdown (ContentRenderer)
6. **Related Writings** — Existing sub-articles list (unchanged)

---

## Breaking Changes

### `tech_stack` format change

**Before:** flat array `["Elixir/Phoenix", "React 19", ...]`
**After:** grouped object `{ frontend: [{name, reason}], backend: [...], ... }`

Affected files:
- `app/pages/index.vue` — homepage project card badges need to flatten grouped tech_stack
- `app/pages/projects/[slug]/index.vue` — tech stack rendering becomes grouped cards
- `content/projects/lms-sertifikasi/index.md` — frontmatter restructured

### Helper needed

A utility to flatten `tech_stack` grouped object into a flat array of names for badge rendering on homepage cards (backward-compatible display).

---

## Sample Project Entry (lms-sertifikasi)

Will update the existing `content/projects/lms-sertifikasi/index.md` to match the new format as the canonical example.
