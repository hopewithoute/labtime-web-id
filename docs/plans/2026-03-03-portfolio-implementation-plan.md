# Labtime Web ID (Portfolio) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement a minimalist, text-first portfolio showcasing technical case studies and articles using Nuxt 4, Tailwind V4, and @nuxt/content.

**Architecture:** We will set up the foundational Nuxt configuration and integrate `@nuxt/content` for Markdown parsing. Then, we will create the core "Brutalist-lite" UI components in Tailwind CSS. Following this, we'll build the main layouts and the dynamic routing pages for case studies and articles. Finally, we establish the basic content structure in the `content/` directory.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS 4, @nuxt/content, Shadcn Vue.

---

### Task 1: Setup Nuxt Content and Base Configuration

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `package.json`

**Step 1: Install @nuxt/content dependency**

Run: `pnpm add @nuxt/content`
Expected: Installation successful.

**Step 2: Update Nuxt configuration**

Modify `nuxt.config.ts` to include the content module.

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/eslint',
    '@nuxt/content'
  ],
  content: {
    // Basic content configuration
    highlight: {
      theme: 'github-dark'
    }
  },
  // ... rest of config
})
```

**Step 3: Run dev server to verify setup**

Run: `pnpm run build`
Expected: Build succeeds without module errors.

**Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml nuxt.config.ts
git commit -m "chore: add and configure @nuxt/content"
```

---

### Task 2: Implement Brutalist-lite Design Tokens

**Files:**
- Modify: `assets/css/tailwind.css` (or wherever main CSS is located)

**Step 1: Define CSS variables for Brutalist theme**

Modify the main CSS file to include strict monochrome variables and the bold accent.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 60 10% 98%; /* #F9F9F6 Bone White */
    --foreground: 0 0% 0%; /* Pure Black */
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;
    --primary: 0 0% 0%;
    --primary-foreground: 60 10% 98%;
    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 0%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    --accent: 348 83% 47%; /* #DC143C Crimson Red for CTA */
    --accent-foreground: 60 10% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 10% 98%;
    --border: 0 0% 0%; /* Stark borders */
    --input: 0 0% 0%;
    --ring: 348 83% 47%;
    --radius: 0rem; /* No rounded corners */
  }

  .dark {
    /* Implement dark mode inverted version if needed, or enforce light mode purely */
    --background: 0 0% 4%;
    --foreground: 60 10% 98%;
    --border: 60 10% 98%;
    /* ... inverse variables */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
  /* Typography overrides for Brutalist feel */
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold tracking-tight;
  }
}
```

**Step 2: Commit**

```bash
git add assets/css/tailwind.css (or actual path)
git commit -m "style: implement brutalist-lite design tokens"
```

---

### Task 3: Create Core Layout

**Files:**
- Create/Modify: `layouts/default.vue`

**Step 1: Build the default layout shell**

Create `layouts/default.vue`:

```vue
<template>
  <div class="min-h-screen border-x 2xl:border-x-2 border-foreground max-w-5xl mx-auto flex flex-col">
    <header class="border-b border-foreground p-4 md:p-6 flex justify-between items-center bg-background z-10 sticky top-0">
      <NuxtLink to="/" class="font-bold text-xl uppercase tracking-tighter hover:text-accent transition-none">
        System.Log
      </NuxtLink>
      <nav class="flex gap-6 text-sm font-medium uppercase">
        <NuxtLink to="/case-studies" class="hover:text-accent transition-none hover:underline underline-offset-4 decoration-2">Case Studies</NuxtLink>
        <NuxtLink to="/articles" class="hover:text-accent transition-none hover:underline underline-offset-4 decoration-2">Articles</NuxtLink>
      </nav>
    </header>

    <main class="flex-1 p-4 md:p-6 md:p-8 lg:p-12">
      <slot />
    </main>

    <footer class="border-t border-foreground p-4 md:p-6 text-sm flex justify-between uppercase">
      <span>© {{ new Date().getFullYear() }}</span>
      <span class="text-muted-foreground">End of Transmission</span>
    </footer>
  </div>
</template>
```

**Step 2: Commit**

```bash
git add layouts/default.vue
git commit -m "feat(layout): create main brutalist layout"
```

---

### Task 4: Scaffold Content Directories

**Files:**
- Create: `content/case-studies/01-example-case.md`
- Create: `content/articles/01-example-article.md`

**Step 1: Create sample case study**

```markdown
---
title: "Optimizing High-Volume WebSocket Subscriptions"
description: "How we reduced CPU load by 70% in a real-time learning platform."
date: 2026-02-14
tags: ["websockets", "performance", "elixir"]
problem_statement: "The application server was crashing during peak load due to an inefficient fan-out architecture for real-time quiz updates."
---

## The Problem
When 5,000 students joined a live quiz simultaneously, the application server CPU spiked to 100%.

## The Approach
We profiled the message broker and identified the bottleneck in how individual socket connections were iterating over channel topics.

## The Solution
We moved from a per-user topic model to a multiplexed room model.

## The Result
CPU load stabilized at ~30% during identical load tests.
```

**Step 2: Commit**

```bash
git add content/
git commit -m "chore: scaffold initial content structure and placeholders"
```

---

### Task 5: Implement Content Index Pages

**Files:**
- Create: `pages/case-studies/index.vue`
- Create: `pages/articles/index.vue`

**Step 1: Build Case Studies Index**

Create `pages/case-studies/index.vue` using `<ContentList>`:

```vue
<template>
  <div class="space-y-12">
    <div>
      <h1 class="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4">Case Studies</h1>
      <p class="text-xl max-w-2xl">Deep dives into hard technical problems, architectural decisions, and the resulting systems.</p>
    </div>

    <ContentList path="/case-studies" v-slot="{ list }">
      <div class="grid grid-cols-1 gap-0 border-y border-foreground">
        <NuxtLink 
          v-for="article in list" 
          :key="article._path" 
          :to="article._path"
          class="block p-6 border-b border-foreground last:border-b-0 hover:bg-black hover:text-white group transition-none"
        >
          <div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4 mb-4">
            <h2 class="text-2xl font-bold group-hover:text-accent">{{ article.title }}</h2>
            <time class="text-sm font-mono shrink-0">{{ article.date }}</time>
          </div>
          <p class="max-w-3xl">{{ article.description }}</p>
          <div class="mt-4 flex gap-2">
            <span v-for="tag in article.tags" :key="tag" class="text-xs font-mono uppercase border border-current px-2 py-0.5">
              {{ tag }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </ContentList>
  </div>
</template>
```

**Step 2: Commit**

```bash
git add pages/case-studies/index.vue
git commit -m "feat(pages): implement case studies index"
```

---

### Task 6: Implement Content Detail Pages (Dynamic Routes)

**Files:**
- Create: `pages/case-studies/[slug].vue`
- Create: `components/content/ProseH2.vue` (and other prose overrides for brutalist typography)

**Step 1: Build dynamic route for case studies**

Create `pages/case-studies/[slug].vue`:

```vue
<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <article>
        <header class="mb-12 border-b-4 border-foreground pb-8">
          <div class="flex items-center gap-4 mb-6 font-mono text-sm uppercase">
            <NuxtLink to="/case-studies" class="hover:text-accent">← Back</NuxtLink>
            <span>/</span>
            <time>{{ doc.date }}</time>
          </div>
          <h1 class="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {{ doc.title }}
          </h1>
          <p class="text-xl md:text-2xl max-w-4xl border-l-[6px] border-accent pl-4 py-2">
            {{ doc.description }}
          </p>
        </header>

        <!-- Provide a brutalist prose styling class here once typography is fully refined -->
        <div class="max-w-3xl prose prose-neutral prose-lg dark:prose-invert prose-headings:font-bold prose-headings:uppercase prose-a:text-accent prose-a:border-b prose-a:border-accent prose-a:no-underline hover:prose-a:bg-accent hover:prose-a:text-white">
          <ContentRenderer :value="doc" />
        </div>
      </article>
    </ContentDoc>
  </main>
</template>
```

**Step 2: Run local build/dev to verify dynamic routes**

Run: `pnpm run build`
Expected: Build passes. Pages render correctly from markdown.

**Step 3: Commit**

```bash
git add pages/case-studies/[slug].vue
git commit -m "feat(pages): implement article detail rendering view"
```
