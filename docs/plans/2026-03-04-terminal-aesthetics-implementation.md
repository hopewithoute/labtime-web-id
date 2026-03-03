# Terminal Aesthetics Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement a cohesive "Terminal/OS" aesthetic to the LabTime.init() portfolio website using Tailwind CSS and Vue 3 features, without sacrificing performance.

**Architecture:** We will implement the effects primarily via Tailwind CSS animations and Vue local state (`sessionStorage` for the boot sequence so it plays only once per session). All styling is utility-first, extending the existing Brutalist-lite theme.

**Tech Stack:** Nuxt 3, Vue 3, Tailwind CSS v4, TypeScript

---

### Task 1: CSS Foundations & Animations

**Files:**
- Modify: `app/assets/css/tailwind.css`

**Step 1: Write the implementation**

Add the `@theme inline` extensions or `@layer utilities` for the blink animation and typing keyframes.
Add the styles for `.prose` inline code (`:not(pre) > code`) and active navigation state.

```css
@theme inline {
  --animate-blink: blink 1s step-end infinite;
  --animate-typewriter: typing 2s steps(40, end);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@layer base {
  .prose :where(:not(pre) > code) {
    @apply bg-foreground/10 text-foreground px-1 py-0.5 rounded-none border border-foreground/20;
  }
}
```

**Step 2: Commit**

```bash
git add app/assets/css/tailwind.css
git commit -m "feat(ui): add terminal animation keyframes and prose code styles"
```

---

### Task 2: Boot Sequence Overlay

**Files:**
- Modify: `app/layouts/default.vue`

**Step 1: Write the implementation**

Add local state to check if `sessionStorage.getItem('booted')` exists.
If not, display a full-screen `fixed z-50` overlay that prints 3 lines progressively, then sets the item and fades out. Use Nuxt `onMounted` to access `sessionStorage` safely.

**Step 2: Commit**

```bash
git add app/layouts/default.vue
git commit -m "feat(ui): add system boot sequence on initial load"
```

---

### Task 3: Header, Logo, and Navigation Updates

**Files:**
- Modify: `app/layouts/default.vue`

**Step 1: Write the implementation**

- Logo: Append a blinking cursor block `<span class="animate-blink">▮</span>`.
- Subtitle (`// by Anggi Wibiyanto`): Apply `overflow-hidden whitespace-nowrap border-r-2 border-transparent animate-typewriter` or similar.
- Nav links: Update `NuxtLink` active class. Since Nuxt automatically applies `.router-link-active`, add a global style or use Nuxt `activeClass="before:content-['>_'] active-terminal-link"` so it renders the prefix.

**Step 2: Commit**

```bash
git add app/layouts/default.vue
git commit -m "feat(ui): apply terminal aesthetic to header logo and navigation"
```

---

### Task 4: Hero Section Typing Effect

**Files:**
- Modify: `app/pages/index.vue`

**Step 1: Write the implementation**

Add typing animation to the main `H1` ("LabTime.init()"). Use a dynamic CSS class or a Vue `onMounted` timeout to trigger the subheading paragraph fading in or typing out after the H1 finishes.

**Step 2: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat(ui): animate hero title with staggered typing effect"
```

---

### Task 5: Status Bar Footer

**Files:**
- Modify: `app/layouts/default.vue`

**Step 1: Write the implementation**

Replace the existing sticky footer with the new status bar layout. Left side: pulsing badge and "SYSTEM OPERATIONAL". Right side: "[✓] Connected" and "PING 12ms" (static or mock dynamic).

**Step 2: Commit**

```bash
git add app/layouts/default.vue
git commit -m "feat(ui): replace standard footer with terminal status bar"
```

---

### Task 6: Feed Interactions (Hover States)

**Files:**
- Modify: `app/pages/index.vue`
- Modify: `app/pages/projects/index.vue` (if applicable)
- Modify: `app/pages/articles/index.vue` (if applicable)

**Step 1: Write the implementation**

Update feed iteration elements. Add a `[ ]` prefix before the title. On `.group-hover`, change it to `[x]`. Add `cursor-crosshair` (or similar) to the component, and `group-hover:translate-x-1` for the shift effect along with `transition-transform duration-75`.

**Step 2: Commit**

```bash
git add app/pages/index.vue app/pages/projects/index.vue app/pages/articles/index.vue
git commit -m "feat(ui): add terminal selection hover effects to index feeds"
```
