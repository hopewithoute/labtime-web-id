# Project Entry Structure — Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Restructure the project entry format to support grouped tech stacks, optional screenshot galleries, and combined Technical Highlights & Decisions with optional deep-dive links.

**Architecture:** Hybrid approach — structured metadata (grouped tech_stack, screenshots) in frontmatter, narrative content (highlights & decisions) in markdown body. Flatten helper for backward-compatible badge display on list pages.

**Tech Stack:** Nuxt Content, Vue 3, Tailwind CSS

---

### Task 1: Update Content — `lms-sertifikasi/index.md`

**Files:**
- Modify: `content/projects/lms-sertifikasi/index.md`

**Step 1: Restructure frontmatter**

Replace the flat `tech_stack` array with grouped object and add `screenshots` (empty for now):

```yaml
---
title: "LMS Sertifikasi"
description: "A full-stack learning management system for professional certification with real-time tracking and assessment."
date: 2026-01-15
tags: ["elixir", "react", "websockets", "postgresql"]
role: "Lead Full-Stack Developer"
problem: "Organizations needed a scalable platform to manage certification programs, track learning progress in real-time, and deliver reliable assessments to thousands of concurrent learners."
approach: "Built a modular system using Ash Framework for domain logic, Phoenix Channels for real-time sync, and a React 19 frontend with granular progress tracking via xAPI."
outcome: "Serving 5,000+ concurrent learners with 99.9% uptime, 70% reduction in WebSocket CPU load, and sub-second progress synchronization."
tech_stack:
  frontend:
    - name: "React 19"
      reason: "Server components & concurrent rendering for complex learning UIs"
    - name: "TanStack Router/Query"
      reason: "Type-safe routing with built-in cache invalidation via WebSocket"
  backend:
    - name: "Elixir/Phoenix"
      reason: "Fault-tolerant concurrency for real-time learning sync"
    - name: "Ash Framework"
      reason: "Declarative domain modeling with built-in authorization"
  infrastructure:
    - name: "PostgreSQL"
      reason: "JSONB for flexible content schemas + full-text search"
screenshots: []
---
```

**Step 2: Update body content**

Replace `## Overview` and `## Key Technical Highlights` with combined `## Technical Highlights & Decisions`:

```markdown
## Technical Highlights & Decisions

### Real-time Learning Sync
Phoenix Channels with multiplexed room model for efficient fan-out. Moved from per-user topics to shared rooms, reducing WebSocket CPU load by 70% during concurrent quiz sessions.
[Deep Dive →](/projects/lms-sertifikasi/optimizing-websocket-fanout)

### Granular Progress Tracking
Vanilla TypeScript External Store paired with React 18's `useSyncExternalStore` for O(1) UI updates. Chose this over Context API to avoid full-tree re-renders in courses with 200+ items.

### Assessment Engine
Timed exams with snapshot-based grading and remedial cooldown logic. Snapshots ensure grading integrity even if questions are modified after submission.

### xAPI Integration
Full LRS compliance for learning analytics and session resumption. Implemented exit-only persistence strategy to reduce network noise while maintaining reliable session state via terminal browser events.
```

**Step 3: Commit**

```bash
git add content/projects/lms-sertifikasi/index.md
git commit -m "content: restructure lms-sertifikasi project entry format"
```

---

### Task 2: Create `flattenTechStack` utility

**Files:**
- Create: `app/utils/flattenTechStack.ts`

**Step 1: Create the utility**

```typescript
interface TechItem {
  name: string
  reason: string
}

type TechStack = Record<string, TechItem[]>

/**
 * Flatten a grouped tech_stack object into an array of tech names.
 * Used for badge rendering on project list/card views.
 */
export function flattenTechStack(techStack: TechStack | string[] | undefined): string[] {
  if (!techStack) return []
  // Backward compat: if already a flat array, return as-is
  if (Array.isArray(techStack)) return techStack
  return Object.values(techStack).flatMap(items =>
    items.map(item => item.name)
  )
}
```

> **Note:** Nuxt auto-imports from `app/utils/`, so no import needed in templates.

**Step 2: Commit**

```bash
git add app/utils/flattenTechStack.ts
git commit -m "feat: add flattenTechStack utility for grouped tech_stack"
```

---

### Task 3: Update project list pages — homepage & `/projects`

**Files:**
- Modify: `app/pages/index.vue` (lines 106-118 — tech badge rendering)
- Modify: `app/pages/projects/index.vue` (lines 20-29 — tech badge rendering)

**Step 1: Update homepage badge loop**

In `app/pages/index.vue`, replace direct `tech_stack` iteration with flattened version:

```vue
<!-- Before -->
<Badge v-for="tech in project.tech_stack?.slice(0, 4)" :key="tech" ...>{{ tech }}</Badge>
<span v-if="project.tech_stack?.length > 4" ...>+{{ project.tech_stack.length - 4 }}</span>

<!-- After -->
<Badge v-for="tech in flattenTechStack(project.tech_stack)?.slice(0, 4)" :key="tech" ...>{{ tech }}</Badge>
<span v-if="flattenTechStack(project.tech_stack)?.length > 4" ...>+{{ flattenTechStack(project.tech_stack).length - 4 }}</span>
```

**Step 2: Update projects list page badge loop**

In `app/pages/projects/index.vue`, same pattern:

```vue
<!-- Before -->
<Badge v-for="tech in project.tech_stack" :key="tech" ...>{{ tech }}</Badge>

<!-- After -->
<Badge v-for="tech in flattenTechStack(project.tech_stack)" :key="tech" ...>{{ tech }}</Badge>
```

**Step 3: Commit**

```bash
git add app/pages/index.vue app/pages/projects/index.vue
git commit -m "feat: use flattenTechStack for project badges on list pages"
```

---

### Task 4: Update project detail page — `[slug]/index.vue`

**Files:**
- Modify: `app/pages/projects/[slug]/index.vue`

**Step 1: Replace flat tech badge section with grouped Tech Stack cards**

Replace the header badges section (lines 22-31) with grouped rendering:

```vue
<!-- Tech Stack Grouped -->
<div class="mt-6 space-y-1">
  <div v-for="(items, category) in project.tech_stack" :key="category" class="flex items-start gap-3">
    <span class="font-mono text-xs uppercase text-muted-foreground w-28 shrink-0 pt-1">{{ category }}</span>
    <div class="flex gap-2 flex-wrap">
      <Badge
        v-for="tech in items"
        :key="tech.name"
        variant="outline"
        class="font-mono uppercase px-3 py-1 rounded-none border-foreground"
        :title="tech.reason"
      >
        {{ tech.name }}
      </Badge>
    </div>
  </div>
</div>
```

**Step 2: Add Tech Stack detail section (after Summary, before Screenshots)**

Add a new section after the Problem/Approach/Outcome block that shows each tech with its reason:

```vue
<!-- Tech Stack Detail -->
<section v-if="project.tech_stack && typeof project.tech_stack === 'object'" class="mb-16 max-w-3xl">
  <h2 class="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6 border-b border-foreground pb-2">
    Tech Stack
  </h2>
  <div class="space-y-6">
    <div v-for="(items, category) in project.tech_stack" :key="category">
      <h3 class="font-mono text-xs uppercase tracking-wider text-accent mb-3">{{ category }}</h3>
      <div class="space-y-3">
        <div v-for="tech in items" :key="tech.name" class="border-l-2 border-foreground/20 pl-4">
          <span class="font-bold">{{ tech.name }}</span>
          <span class="text-muted-foreground"> — {{ tech.reason }}</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 3: Add optional Screenshots gallery section**

Add after the Tech Stack detail section:

```vue
<!-- Screenshots Gallery -->
<section v-if="project.screenshots?.length" class="mb-16 max-w-4xl">
  <h2 class="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6 border-b border-foreground pb-2">
    Screenshots
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <figure v-for="(screenshot, index) in project.screenshots" :key="index" class="border border-foreground">
      <img :src="screenshot.src" :alt="screenshot.alt" class="w-full" loading="lazy" />
      <figcaption v-if="screenshot.alt" class="px-3 py-2 text-xs font-mono uppercase text-muted-foreground border-t border-foreground">
        {{ screenshot.alt }}
      </figcaption>
    </figure>
  </div>
</section>
```

**Step 4: Commit**

```bash
git add app/pages/projects/[slug]/index.vue
git commit -m "feat: grouped tech stack, screenshots gallery on project detail page"
```

---

## Verification Plan

### Manual Verification

No automated tests exist in this project. Verify manually:

1. **Start dev server:** `npm run dev`
2. **Homepage (`/`):** Check that project cards still show tech badges correctly (flattened from grouped data)
3. **Projects list (`/projects`):** Same — badges should render as before
4. **Project detail (`/projects/lms-sertifikasi`):**
   - Summary section (Problem/Approach/Outcome) — unchanged, still visible
   - Tech Stack section — shows grouped categories (frontend, backend, infrastructure) with name + reason
   - Screenshots section — not visible (empty array, section should be hidden)
   - Technical Highlights & Decisions — renders from body markdown, each highlight has title + description, first one has "Deep Dive →" link
   - Related Writings — still lists sub-articles
5. **Deep Dive link:** Click "Deep Dive →" link — should navigate to `/projects/lms-sertifikasi/optimizing-websocket-fanout`
