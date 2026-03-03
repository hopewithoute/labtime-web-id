# Neo-Technical Decorative Refinements Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement "Metric Corner" decorative refinements including `MetricTag` and `CornerFrame` components, button hover effects, and cursor animations.

**Architecture:** Use Vue components for reusable decorative elements and Tailwind CSS for animations and hover effects. Components will be placed in `app/components/ui` to align with the existing Shadcn-like structure.

**Tech Stack:** Nuxt 4, Tailwind CSS 4, @vueuse/motion (already installed).

---

### Task 1: Create `MetricTag` Component

**Files:**
- Create: `app/components/ui/MetricTag.vue`

**Step 1: Write implementation**
Create a component that accepts `label`, `value`, and `variant` (status, info).

```vue
<script setup lang="ts">
defineProps<{
  label?: string
  value?: string
  variant?: 'status' | 'info'
}>()
</script>

<template>
  <div class="inline-flex items-center gap-2 px-1.5 py-0.5 border border-foreground/20 bg-foreground/5 font-mono text-[10px] uppercase tracking-wider">
    <span v-if="label" class="opacity-50 line-clamp-1">{{ label }}</span>
    <span v-if="label" class="opacity-20">|</span>
    <span v-if="value" class="font-bold flex items-center gap-1.5">
      <span v-if="variant === 'status'" class="w-1.5 h-1.5 bg-accent animate-pulse"></span>
      {{ value }}
    </span>
  </div>
</template>
```

**Step 2: Verify visually**
Add temporarily to `app/app.vue` and run `npm run dev`.
Run: `npm run dev`

**Step 3: Commit**
```bash
git add app/components/ui/MetricTag.vue
git commit -m "feat: add MetricTag component"
```

### Task 2: Create `CornerFrame` Component

**Files:**
- Create: `app/components/ui/CornerFrame.vue`

**Step 1: Write implementation**
A wrapper component that adds absolute-positioned L-shapes to the corners.

```vue
<template>
  <div class="relative group/frame">
    <!-- Corners -->
    <div class="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-foreground z-10"></div>
    <div class="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-foreground z-10"></div>
    <div class="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-foreground z-10"></div>
    <div class="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-foreground z-10"></div>
    
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
```

**Step 2: Verify visually**
Wrap a section in `app/pages/index.vue` with `<CornerFrame>`.
Run: `npm run dev`

**Step 3: Commit**
```bash
git add app/components/ui/CornerFrame.vue
git commit -m "feat: add CornerFrame component"
```

### Task 3: Implement Refined Button Hover Effects

**Files:**
- Modify: `app/components/ui/button/index.ts` (or wherever styles are defined)
- Modify: `app/assets/css/tailwind.css`

**Step 1: Add hover style to Tailwind**
Add a utility or variant for the `[` `]` bracket effect.

```css
@layer utilities {
  .hover-brackets:hover::before { content: '['; @apply mr-1 opacity-100; }
  .hover-brackets::before { content: '['; @apply mr-1 opacity-0 transition-opacity; }
  .hover-brackets:hover::after { content: ']'; @apply ml-1 opacity-100; }
  .hover-brackets::after { content: ']'; @apply ml-1 opacity-0 transition-opacity; }
}
```

**Step 2: Update Button component**
Add the class to the base button variants.

**Step 3: Verify**
Run: `npm run dev` and hover over buttons.

**Step 4: Commit**
```bash
git add app/assets/css/tailwind.css app/components/ui/button/Button.vue
git commit -m "style: add bracket hover effect to buttons"
```

### Task 4: Add Cursor Flicker Animation

**Files:**
- Modify: `app/assets/css/tailwind.css`

**Step 1: Define flicker animation**
```css
@keyframes flicker {
  0% { opacity: 1; }
  3% { opacity: 0.4; }
  6% { opacity: 1; }
  7% { opacity: 0.4; }
  8% { opacity: 1; }
  9% { opacity: 0.4; }
  10% { opacity: 1; }
  89% { opacity: 1; }
  90% { opacity: 0.4; }
  100% { opacity: 1; }
}
.animate-flicker {
  animation: flicker 3s infinite;
}
```

**Step 2: Apply to cursor in Layout**
Modify `app/layouts/default.vue` to use `animate-flicker` on the `▮` element.

**Step 3: Verify**
Run: `npm run dev` and watch the cursor in the header.

**Step 4: Commit**
```bash
git add app/assets/css/tailwind.css app/layouts/default.vue
git commit -m "style: add flicker animation to terminal cursor"
```

### Task 5: Final Layout Integration

**Files:**
- Modify: `app/layouts/default.vue`
- Modify: `app/pages/index.vue`

**Step 1: Add Metrics to Header/Footer**
Add `MetricTag` for "SYS_STATUS", "PING", etc.

**Step 2: Add CornerFrame to Hero**
Wrap the hero section in `app/pages/index.vue` with `CornerFrame`.

**Step 3: Verify**
Run: `npm run dev` and check the overall layout.

**Step 4: Commit**
```bash
git add app/layouts/default.vue app/pages/index.vue
git commit -m "feat: integrate decorative refinements into layouts"
```
