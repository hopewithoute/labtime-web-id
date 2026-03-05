# ADR Right Sidebar Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Increase visibility of Architecture Decision Records (ADRs) by moving them from the bottom of the project page to a sticky right sidebar on desktop screens.

**Architecture:** We will convert the main content area of `app/pages/projects/[slug]/index.vue` into a CSS Grid (`lg:grid-cols-12`). The main article will occupy `lg:col-span-8`, and the ADR section will occupy `lg:col-span-4` with `position: sticky` so it follows the user as they scroll. Mobile layout remains unchanged (stacked).

**Tech Stack:** Vue 3, Nuxt 3, Tailwind CSS

---

### Task 1: Update main layout container to CSS Grid

**Files:**
- Modify: `app/pages/projects/[slug]/index.vue`

**Step 1: Apply CSS Grid to the content wrapper**
Wrap the `<!-- Technical Brief -->`, `<!-- Tech Stack Detail -->`, `<!-- Screenshots Gallery -->`, and `<!-- Project body content -->` inside a new div that uses CSS Grid on desktop.

```vue
<!-- BEFORE -->
<section class="mb-16 space-y-8 max-w-4xl">...
<!-- ... other sections ... -->
<div v-if="project.body" class="max-w-4xl mb-16 prose...">...

<!-- AFTER -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
  <!-- Left Column: Main Content -->
  <div class="lg:col-span-8 xl:col-span-9">
    <section class="mb-16 space-y-8 max-w-full">...
    <!-- ... other sections ... -->
    <div v-if="project.body" class="max-w-full mb-16 prose...">...
  </div>
```
*(Note: Change `max-w-4xl` to `max-w-full` on the inner sections since the grid column now constrains the width).*

**Step 2: Commit**
```bash
git add app/pages/projects/\[slug\]/index.vue
git commit -m "refactor(ui): setup css grid for project article layout"
```

---

### Task 2: Move ADR section to the right column and make it sticky

**Files:**
- Modify: `app/pages/projects/[slug]/index.vue`

**Step 1: Move and style the ADR section**
Move the `<!-- Architecture Decision Records -->` section into the right column of the new grid and apply the `sticky` positioning.

```vue
<!-- AFTER the Left Column div closes -->
  <!-- Right Column: ADR Sidebar -->
  <aside class="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
    <section v-if="articles?.length" class="border-t-4 lg:border-t-0 border-foreground pt-8 lg:pt-0">
      <h2 class="text-xl lg:text-lg font-black uppercase tracking-tight mb-6 mt-2">Architecture Decision Records</h2>
      <div class="grid grid-cols-1 gap-0 border-y border-foreground">
        <!-- NuxtLink loop remains exactly the same -->
        <NuxtLink v-for="article in articles" :key="article.path" :to="article.path" class="block p-5 lg:p-4 border-b border-foreground last:border-b-0 group transition-none">
          <!-- inner content remains same, maybe tweak text sizes slightly for sidebar if needed, e.g. text-xl -> text-lg -->
...
```

**Step 2: Commit**
```bash
git add app/pages/projects/\[slug\]/index.vue
git commit -m "feat(ui): implement sticky right sidebar for ADRs"
```

---

### Task 3: Visual Audit and Cleanup

**Step 1: Check rendering in development server**
Run the dev server and verify the layout on both mobile and desktop views, specifically checking the sticky behavior.
Run: `npm run dev` (in background)

**Step 2: Verify Linting/Formatting**
Run: `npm run lint`

**Step 3: Commit any final tweaks**
```bash
git add app/pages/projects/\[slug\]/index.vue
git commit -m "style(ui): finalize ADR sidebar spacing and typography"
```
