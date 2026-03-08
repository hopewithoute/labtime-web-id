# Navigation Animation Refinement Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement a "Kernel Panic/Refresh" navigation animation that aligns with the terminal aesthetic.

**Architecture:** Replace smooth transitions with sharp CSS flicker and clip-path reveal animations. Enhance the `NavigationLoader` with technical status messages and a final flicker.

**Tech Stack:** Vue 3, Nuxt 3, Tailwind CSS.

---

### Task 1: Implement Kernel Refresh CSS in app.vue

**Files:**
- Modify: `app/app.vue`

**Step 1: Replace existing page transitions**
Update `<style>` in `app/app.vue` with sharp animations.

```css
/* Page Transition: Kernel Refresh */
@keyframes terminal-flicker {
  0% { opacity: 1; }
  25% { opacity: 0.7; }
  50% { opacity: 0.9; }
  75% { opacity: 0.4; }
  100% { opacity: 1; }
}

@keyframes terminal-reveal {
  from { clip-path: inset(0 0 100% 0); }
  to { clip-path: inset(0 0 0 0); }
}

.page-enter-active {
  animation: terminal-reveal 0.3s cubic-bezier(0.19, 1, 0.22, 1),
             terminal-flicker 0.15s steps(2);
}

.page-leave-active {
  animation: terminal-flicker 0.2s steps(4) reverse;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
```

**Step 2: Commit**

```bash
git add app/app.vue
git commit -m "feat: implement kernel refresh page transitions"
```

---

### Task 2: Enhance NavigationLoader Component

**Files:**
- Modify: `app/components/NavigationLoader.vue`

**Step 1: Add dynamic status messages**
Modify the script to rotate through technical messages.

```typescript
const statusMessages = [
  'FETCH_PAGE_BUFFER',
  'COMPILING_VNODE',
  'MOUNTING_DOM',
  'SYNC_STATE'
]
const currentStatus = computed(() => {
  const index = Math.min(
    Math.floor((progress.value / 100) * statusMessages.length),
    statusMessages.length - 1
  )
  return statusMessages[index]
})
```

**Step 2: Add completion flicker**
Implement the final flicker when `isLoading` becomes false.

**Step 3: Commit**

```bash
git add app/components/NavigationLoader.vue
git commit -m "feat: enhance navigation loader with technical status and flicker"
```

---

### Task 3: Verification

**Step 1: Run Navigation E2E Tests**
Ensure navigation still works from a functional perspective.

Run: `npx playwright test tests/e2e/navigation.spec.ts`
Expected: All tests PASS.

**Step 2: Manual Visual Verification**
1. Click a link (e.g., "Projects").
2. Observe the loader status messages.
3. Observe the sharp "Kernel Refresh" transition.
4. Verify no blurs are visible during navigation.
