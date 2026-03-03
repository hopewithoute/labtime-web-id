# Dark Mode Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement a terminal-style dark mode toggle with keyboard shortcuts using `@nuxtjs/color-mode`.

**Architecture:**
- Uses `@nuxtjs/color-mode` for state management and SSR compatibility.
- Tailwind CSS v4 handles the styling via the `.dark` class.
- A new `ThemeToggle` component provides the terminal-style UI in the footer.
- A global keyboard shortcut listener in the default layout handles `Ctrl+K` / `Cmd+K`.

**Tech Stack:** Nuxt 4, Tailwind CSS v4, `@nuxtjs/color-mode`, VueUse.

---

### Task 1: Setup Dependencies and Configuration

**Files:**
- Modify: `package.json`
- Modify: `nuxt.config.ts`

**Step 1: Install `@nuxtjs/color-mode`**
Run: `pnpm add -D @nuxtjs/color-mode`

**Step 2: Add module to `nuxt.config.ts`**
```typescript
// nuxt.config.ts
modules: [
  // ... existing modules
  '@nuxtjs/color-mode'
],
colorMode: {
  classSuffix: ''
}
```

**Step 3: Commit**
```bash
git add package.json pnpm-lock.yaml nuxt.config.ts
git commit -m "chore: add @nuxtjs/color-mode dependency and config"
```

---

### Task 2: Create ThemeToggle Component

**Files:**
- Create: `app/components/ui/ThemeToggle.vue`

**Step 1: Implement ThemeToggle component**
```vue
<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

defineExpose({ toggleTheme })
</script>

<template>
  <button 
    @click="toggleTheme"
    class="hover:text-accent transition-none hover:underline underline-offset-4 decoration-2 relative group flex items-center gap-1"
  >
    <span class="opacity-0 group-hover:opacity-100 transition-opacity">[</span>
    <span>> TOGGLE_THEME --{{ colorMode.value === 'dark' ? 'LIGHT' : 'DARK' }}</span>
    <span class="opacity-0 group-hover:opacity-100 transition-opacity">]</span>
  </button>
</template>
```

**Step 2: Commit**
```bash
git add app/components/ui/ThemeToggle.vue
git commit -m "feat: add ThemeToggle component"
```

---

### Task 3: Integrate Toggle and Keyboard Shortcut

**Files:**
- Modify: `app/layouts/default.vue`

**Step 1: Add shortcut listener and integrate toggle**
- Add `onKeyStroke` from `@vueuse/core` to handle `Ctrl+K` and `Cmd+K`.
- Place `ThemeToggle` in the footer.

**Step 2: Commit**
```bash
git add app/layouts/default.vue
git commit -m "feat: integrate theme toggle and add keyboard shortcut"
```

---

### Verification Plan

#### Manual Verification
1. **Initial Load**: Verify the site reflects the system theme on first load.
2. **Footer Toggle**:
   - Scroll to footer.
   - Click `> TOGGLE_THEME`.
   - Verify theme changes and persistence on refresh.
3. **Keyboard Shortcut**:
   - Press `Ctrl+K` (or `Cmd+K` on Mac).
   - Verify theme toggles instantly.
4. **UI Consistency**:
   - Check if brackets appear on hover.
   - Verify the command label updates (`--dark` to `--light` and vice versa).
