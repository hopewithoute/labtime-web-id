# Page Transition Loader Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement a terminal-themed page navigation transition (a fast "Command Execution" blur effect) across the Nuxt application.

**Architecture:** We will use Vue's `<Transition>` component configured globally via `nuxt.config.ts` (`app.pageTransition`) and add the necessary CSS classes in `app.vue` (or global CSS) to trigger a quick blur and opacity shift during route changes.

**Tech Stack:** Nuxt 3, Vue 3 Transitions, Tailwind CSS.

---

### Task 1: Configure Global Page Transition in Nuxt

**Files:**
- Modify: `nuxt.config.ts`

**Step 1: Write the configuration**
Add the `pageTransition` configuration inside the `app` object in `nuxt.config.ts`.

```typescript
// inside export default defineNuxtConfig({ ...
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    // ... existing head config
  },
```

**Step 2: Commit**

```bash
git add nuxt.config.ts
git commit -m "chore: configure global page transition in nuxt config"
```

### Task 2: Implement Transition CSS

**Files:**
- Modify: `app.vue` (or `assets/css/tailwind.css` if preferred, but `app.vue` is central for app-level styles). We will use `app.vue` with a `<style>` block.

**Step 1: Add transition CSS classes**
Add a `<style>` block to `app/app.vue`.

```vue
<- Modify: `app.vue` ( or `assets/css/tailwind.css` if preferred, but `app.vue` is central for app-level styles ) . We will use `app.vue` with a `<style>` app.vue -->
<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Page Transition: Command Execution Blur */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(4px);
}
.page-enter-from {
  transform: translateY(4px);
}
.page-leave-to {
  transform: translateY(-4px);
}
</style>
```

**Step 2: Commit**

```bash
git add app/app.vue
git commit -m "feat: implement command execution blur transition css"
```

### Task 3: E2E Test Review (Optional/Pre-computation)
Since animations can sometimes affect E2E tests (Playwright might click before animation finishes if not waiting for state), we verify if `navigation.spec.ts` needs adjustment. Usually, Playwright auto-waits for actionability, but if it fails, we might need to disable transitions in test environment or use `.waitForLoadState()`. 
*Note: No code change planned here unless tests fail during execution.*

