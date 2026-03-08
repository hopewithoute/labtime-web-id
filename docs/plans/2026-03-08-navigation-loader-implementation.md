# Navigation Loader Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement a terminal-themed navigation loader that provides visual feedback while the next page is loading (waiting for async data/requests).

**Architecture:** Create a custom component using Nuxt 3's `useLoadingIndicator` and integrate it into the global layout.

**Tech Stack:** Nuxt 3, Vue 3, Tailwind CSS.

---

### Task 1: Create NavigationLoader Component

**Files:**
- Create: `app/components/NavigationLoader.vue`

**Step 1: Write the component code**
```vue
<script setup lang="ts">
const { progress, isLoading } = useLoadingIndicator()

// Create a visual ASCII-style bar
const barLength = 20
const filledLength = computed(() => Math.floor((progress.value / 100) * barLength))
const barDisplay = computed(() => {
  const filled = '█'.repeat(filledLength.value)
  const empty = '░'.repeat(barLength - filledLength.value)
  return `[${filled}${empty}]`
})
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-500"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed top-0 left-0 w-full z-[100] bg-background border-b border-foreground p-2 px-6 flex items-center gap-4 font-mono text-xs uppercase"
    >
      <div class="flex items-center gap-2">
        <span class="text-accent animate-blink">></span>
        <span class="font-bold">EXEC:</span>
        <span class="text-muted-foreground">FETCHING_MODULE...</span>
      </div>
      <div class="flex-1 flex items-center gap-3">
        <span class="tracking-tighter">{{ barDisplay }}</span>
        <span class="min-w-[3rem]">{{ Math.round(progress) }}%</span>
      </div>
      <div class="text-[10px] opacity-70 hidden sm:block">
        STATUS: IN_PROGRESS
      </div>
    </div>
  </Transition>
</template>
```

**Step 2: Commit**
```bash
git add app/components/NavigationLoader.vue
git commit -m "feat: add terminal-styled navigation loader component"
```

### Task 2: Integrate Loader into Main Layout

**Files:**
- Modify: `app/layouts/default.vue`

**Step 1: Add NavigationLoader to layout**
Insert `<NavigationLoader />` at the top of the template.

```vue
<- Modify: app/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <NavigationLoader />
    <- Modify: ... rest of layout -->
```

**Step 2: Commit**
```bash
git add app/layouts/default.vue
git commit -m "feat: integrate navigation loader into main layout"
```

### Task 3: Verification

**Step 1: Manual Verification**
1. Run `npm run dev`.
2. Navigate between pages (e.g., Home -> Projects -> Articles).
3. Observe the top of the screen. A blocky progress bar should appear if the navigation is not instantaneous.
*Note: You might need to throttle the network in browser devtools to see it clearly if the server is fast.*

**Step 2: E2E Test (Optional Check)**
Run existing navigation tests to ensure no regressions.
`npx playwright test tests/e2e/navigation.spec.ts`

