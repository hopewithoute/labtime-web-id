# Landing Page Aesthetic Enhancements Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement the "Live" Terminal Interactivity and Matrix/Glitch Visual Polish on the landing page (`pages/index.vue`).

**Architecture:** We will use native Vue `ref` and `onMounted` intervals to simulate a live terminal boot sequence and dynamic telemetry. CSS `repeating-linear-gradient` and custom `@keyframes` will provide the CRT overlay and glitch effects without external libraries.

**Tech Stack:** Vue 3 (Composition API), Nuxt 3, Tailwind CSS, Nuxt UI.

---

### Task 1: Setup Boot Sequence Logic

**Files:**
- Modify: `app/pages/index.vue`

**Step 1: Write the component logic**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const appConfig = useAppConfig()

const sysUptime = ref<string>('ONLINE')
let uptimeInterval: ReturnType<typeof setInterval> | null = null

// --- NEW COMMAND SEQUENCE LOGIC ---
const bootCommands = [
  'load_module "elixir_ash"',
  'load_module "vue_nuxt"',
  'load_module "react"',
  'load_module "laravel"'
]
const activeCommands = ref<string[]>([])

const startBootSequence = () => {
  bootCommands.forEach((cmd, index) => {
    setTimeout(() => {
      activeCommands.value.push(cmd)
    }, (index + 1) * 400 + Math.random() * 200) // Staggered delay
  })
}
// -----------------------------------

onMounted(() => {
  uptimeInterval = setInterval(() => {
    sysUptime.value = new Date().toISOString()
  }, 1000)
  
  startBootSequence()
})

onUnmounted(() => {
  if (uptimeInterval) clearInterval(uptimeInterval)
})
// ... rest of script
</script>
```

**Step 2: Update the template to use the reactive array**

```vue
<!-- Replace lines 24-32 in app/pages/index.vue -->
            <div>
              <div class="text-xs uppercase text-muted-foreground mb-3 opacity-60">-- Initialize Core Modules</div>
              <div class="space-y-1.5 text-sm min-h-[96px]"> <!-- min-h prevents layout shift -->
                <div v-for="cmd in activeCommands" :key="cmd" class="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <span class="text-accent font-bold">[ OK ]</span> {{ cmd }}
                </div>
              </div>
            </div>
```

**Step 3: Run dev server to verify visually**
Run: `npm run dev`
Expected: The "Initialize Core Modules" list starts empty and renders items one by one.

**Step 4: Commit**
```bash
git add app/pages/index.vue
git commit -m "feat(landing): implement sequential boot sequence animation"
```

---

### Task 2: Implement Dynamic Telemetry

**Files:**
- Modify: `app/pages/index.vue`

**Step 1: Write the reactive telemetry logic**

```vue
<script setup lang="ts">
// ... existing imports

// --- NEW TELEMETRY LOGIC ---
const memAlloc = ref<string>('0x00FFa1')
const threadPoolState = ref<string>('init [8]')
let telemetryInterval: ReturnType<typeof setInterval> | null = null

const updateTelemetry = () => {
    // Randomize memory hex
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
    memAlloc.value = `0x${randomHex}`
    
    // Jitter thread pool
    const states = ['idle [8]', 'active [6/8]', 'wait [2/8]', 'init [8]']
    threadPoolState.value = states[Math.floor(Math.random() * states.length)]
}

onMounted(() => {
  // ... existing onMounted inside
  telemetryInterval = setInterval(updateTelemetry, 2500)
})

onUnmounted(() => {
  // ... existing onUnmounted inside
  if (telemetryInterval) clearInterval(telemetryInterval)
})
// ---------------------------
</script>
```

**Step 2: Update the template to use telemetry refs**

```vue
<!-- Replace lines 55-61 in app/pages/index.vue -->
            <!-- Static System Dump (Decorative) -->
            <div class="mt-8 pt-4 border-t border-dashed border-foreground/20 text-[10px] leading-tight text-muted-foreground opacity-50 select-none">
                 <div>> mem_alloc: {{ memAlloc }}</div>
                 <div>> thread_pool: {{ threadPoolState }}</div>
                 <div>> bind_socket: HTTP/3</div>
                 <div>> sys_status: AWAITING_INPUT<span class="animate-pulse">_</span></div>
            </div>
```
*(Note the added `animate-pulse` underscore to the `sys_status` line as our blinking cursor anchor)*

**Step 3: Run dev server to verify visually**
Run: `npm run dev`
Expected: The hex values and thread status randomly change every 2.5 seconds, and a blinking cursor appears next to AWAITING_INPUT.

**Step 4: Commit**
```bash
git add app/pages/index.vue
git commit -m "feat(landing): add dynamic telemetry and blinking cursor"
```

---

### Task 3: CRT Scanline Overlay

**Files:**
- Modify: `app/pages/index.vue`

**Step 1: Add the CRT class to the sticky sidebar container**

```vue
<!-- Modify line 4 in app/pages/index.vue -->
    <!-- LEFT PANEL: Sticky Operator Profile -->
    <aside class="lg:sticky lg:top-24 space-y-8 relative group/crt">
```

**Step 2: Add the custom CSS for the scanline overlay**

Add this to the bottom of the file:
```vue
<style scoped>
.group\/crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.1) 50%
  );
  background-size: 100% 4px; /* 4px scanlines */
  z-index: 50;
  pointer-events: none; /* Crucial so links still work */
  border-radius: inherit; /* Match CornerFrame borders */
}
</style>
```

**Step 3: Run dev server to verify visually**
Run: `npm run dev`
Expected: A faint horizontal striped texture covers the sticky left panel. Links are still clickable.

**Step 4: Commit**
```bash
git add app/pages/index.vue
git commit -m "style(landing): add CRT scanline overlay to terminal panel"
```

---

### Task 4: Project Card Glitch Effect

**Files:**
- Modify: `app/pages/index.vue`

**Step 1: Add Glitch classes to the title in the template**

```vue
<!-- Modify line 102 in app/pages/index.vue -->
                  <h3 class="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-accent transition-colors relative inline-block glitch-hover group-hover:animate-glitch-jerk">
                      <span class="relative z-10">{{ project.title }}</span>
                      <span class="absolute top-0 left-[-2px] -z-10 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-layer-1" aria-hidden="true">{{ project.title }}</span>
                      <span class="absolute top-0 left-[2px] -z-10 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-layer-2" aria-hidden="true">{{ project.title }}</span>
                  </h3>
```

**Step 2: Add custom CSS for glitch keyframes**
Append to the `<style scoped>` block:

```vue
/* Glitch Effect Keyframes */
@keyframes glitch-layer-1 {
  0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); color: theme('colors.accent.DEFAULT'); }
  20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
  40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
  60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
  80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); color: theme('colors.foreground'); }
  100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
}

@keyframes glitch-layer-2 {
  0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); color: theme('colors.background'); }
  20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
  40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
  60% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, 1px); }
  80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, -1px); color: theme('colors.muted.foreground'); }
  100% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 1px); }
}

@keyframes glitch-jerk {
  0% { transform: skew(0deg); }
  20% { transform: skew(-10deg); }
  40% { transform: skew(10deg); }
  60% { transform: skew(-5deg); }
  80% { transform: skew(5deg); }
  100% { transform: skew(0deg); }
}

.animate-glitch-layer-1 { animation: glitch-layer-1 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both alternate; }
.animate-glitch-layer-2 { animation: glitch-layer-2 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both alternate-reverse; }
.animate-glitch-jerk { animation: glitch-jerk 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite; }
```

**Step 3: Run dev server to verify visually**
Run: `npm run dev`
Expected: Hovering over project cards causes the title to rapidly glitch (separate layers, skew, clip paths).

**Step 4: Commit**
```bash
git add app/pages/index.vue
git commit -m "style(landing): add glitch hover effect to project cards"
```

---

Plan complete and saved to `docs/plans/2026-03-06-landing-page-improvements-plan.md`.
Next step: run `.agent/workflows/execute-plan.md` to execute this plan task-by-task in single-flow mode.
