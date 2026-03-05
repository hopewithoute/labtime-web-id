# Landing Page Left Panel Refinement Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Refine the left panel of the landing page to feature a Terminal / System Diagnostic aesthetic, removing the duplicated logo and replacing generic badges with terminal-style load logs.

**Architecture:** Modify `app/pages/index.vue` to replace the `<h1>` with a terminal prompt (`> whoami`), convert the skills section into module loading logs, and morph the links into executable shell scripts or network diagnostics. We'll leverage existing Tailwind classes (`font-mono`, `text-accent`, etc.) and basic Vue composition API for live uptime.

**Tech Stack:** Vue 3 (Composition API), Nuxt 3, Tailwind CSS.

---

### Task 1: Add Live Uptime Logic and Replace Header

**Files:**
- Modify: `app/pages/index.vue:6-18` (approx)
- Modify: `app/pages/index.vue:164-189` (approx, `<script setup>`)

**Step 1: Write minimal implementation**

Add the `sysUptime` ref and `onMounted` interval to the `<script setup>`. Update the `<section>` at the top of the `<aside>` to use the new terminal readouts instead of the `<h1>LabTime.init()</h1>`.

In `app/pages/index.vue` (Script):
```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const appConfig = useAppConfig()

// ... existing useHead and useAsyncData ...

const sysUptime = ref<string>('ONLINE')
let uptimeInterval: ReturnType<typeof setInterval>

onMounted(() => {
  uptimeInterval = setInterval(() => {
    sysUptime.value = new Date().toISOString()
  }, 1000)
})

onUnmounted(() => {
  if (uptimeInterval) clearInterval(uptimeInterval)
})
</script>
```

In `app/pages/index.vue` (Template - replacing the H1 and Status tag block):
```vue
        <section class="p-6 md:p-8 border-foreground overflow-hidden font-mono">
          <div class="mb-8">
            <div class="text-accent font-bold opacity-80 mb-2">~ $ whoami</div>
            <div class="space-y-1">
              <div><span class="text-muted-foreground mr-2">USER:</span>Anggi Wibiyanto</div>
              <div><span class="text-muted-foreground mr-2">ROLE:</span>Senior System Builder</div>
              <div>
                <span class="text-muted-foreground mr-2">SYS_UPTIME:</span>
                <ClientOnly>
                  <span class="text-accent">{{ sysUptime }}</span>
                  <template #fallback><span>ONLINE</span></template>
                </ClientOnly>
              </div>
            </div>
          </div>
```

**Step 2: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat(landing): replace h1 with terminal whoami readout and live uptime"
```

---

### Task 2: Replace Skill Badges with Boot Logs

**Files:**
- Modify: `app/pages/index.vue` (The Bento Resume Block area, lines 20-38 approx)

**Step 1: Write minimal implementation**

Replace the generic badge tags with terminal module loading syntax.

In `app/pages/index.vue` (Template):
```vue
          <!-- Terminal Boot Sequence Block -->
          <div class="space-y-6">
            <div>
              <div class="text-xs uppercase text-muted-foreground mb-3 opacity-60">-- Initialize Core Modules</div>
              <div class="space-y-1.5 text-sm">
                <div><span class="text-accent font-bold">[ OK ]</span> load_module "elixir_ash"</div>
                <div><span class="text-accent font-bold">[ OK ]</span> load_module "vue_nuxt"</div>
                <div><span class="text-accent font-bold">[ OK ]</span> load_module "react"</div>
                <div><span class="text-accent font-bold">[ OK ]</span> load_module "laravel"</div>
              </div>
            </div>
```

**Step 2: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat(landing): convert skill badges to terminal module boot logs"
```

---

### Task 3: Restyle Links as Executables & Add Decoration

**Files:**
- Modify: `app/pages/index.vue` (The Links block, lines 39-56 approx)

**Step 1: Write minimal implementation**

Change the NuxtLink and `<a>` tag to look like raw shell commands. Add a fast-scrolling/glitching decoration block at the bottom to complete the look.

In `app/pages/index.vue` (Template):
```vue
            <div class="pt-6 flex flex-col gap-3 border-t border-foreground/10">
              <NuxtLink 
                to="/resume" 
                class="w-full inline-flex items-center gap-2 text-sm px-2 py-2 group hover:bg-foreground hover:text-background transition-colors"
              >
                <span class="text-accent group-hover:text-background opacity-70">~ $</span>
                <span class="font-bold">./execute_resume.sh</span>
                <span class="ml-auto opacity-0 group-hover:opacity-100 animate-pulse">_</span>
              </NuxtLink>
              <a 
                :href="appConfig.github ? String(appConfig.github) : '#'" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-full inline-flex items-center gap-2 text-sm px-2 py-2 group hover:bg-foreground hover:text-background transition-colors"
              >
                <span class="text-accent group-hover:text-background opacity-70">~ $</span>
                <span class="font-bold">ping {{ String(appConfig.github).replace('https://', '').replace(/\/$/, '') || 'github.com' }}</span>
                <span class="ml-auto font-normal opacity-50 group-hover:opacity-100 group-hover:text-background transition-opacity text-xs">> /dev/null</span>
              </a>
            </div>

            <!-- Optional: Decorative Memory Dump -->
            <div class="mt-8 pt-4 border-t border-dashed border-foreground/20 text-[10px] text-muted-foreground opacity-40 h-16 overflow-hidden relative">
               <div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-b from-transparent to-card pointer-events-none z-10"></div>
               <div class="animate-marquee-vertical">
                 <div>mem_alloc: 0x00FFa1</div>
                 <div>thread_pool: initialized [8]</div>
                 <div>socket: bind(0.0.0.0)</div>
                 <div>mount: /dev/sda1 -> /var/data</div>
                 <div>kernel: syncing nodes</div>
                 <div>auth: verify key_ring OK</div>
                 <div>sys: ready...</div>
               </div>
            </div>
          </div>
        </section>
      </CornerFrame>
```

*(Note: We will need to add the `animate-marquee-vertical` to `tailwind.config.js` or `app.css` if it doesn't exist, or just use a static block if we want to avoid extra CSS setup. For this plan, we'll keep it static or use standard Tailwind utility if possible. Actually, simpler is better, let's just make it a static block of text that looks like a log tail snippet without needing custom CSS animations right now to stay strictly within `index.vue` modifications.)*

**Revised Step 1 (Without custom tailwind animation):**

```vue
            <div class="pt-6 flex flex-col gap-3 border-t border-foreground/10">
              <NuxtLink 
                to="/resume" 
                class="w-full inline-flex items-center gap-2 text-sm px-2 py-2 group hover:bg-foreground hover:text-background transition-colors"
              >
                <span class="text-accent group-hover:text-background opacity-70">~ $</span>
                <span class="font-bold">./execute_resume.sh</span>
                <span class="ml-auto opacity-0 group-hover:opacity-100 animate-pulse">_</span>
              </NuxtLink>
              <a 
                :href="appConfig.github ? String(appConfig.github) : '#'" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-full inline-flex items-center gap-2 text-sm px-2 py-2 group hover:bg-foreground hover:text-background transition-colors"
              >
                <span class="text-accent group-hover:text-background opacity-70">~ $</span>
                <span class="font-bold">ping {{ String(appConfig.github).replace('https://', '') || 'github' }}</span>
                <span class="ml-auto font-normal opacity-50 group-hover:opacity-100 group-hover:text-background transition-opacity text-xs">ttl=50</span>
              </a>
            </div>

            <!-- Static System Dump (Decorative) -->
            <div class="mt-8 pt-4 border-t border-dashed border-foreground/20 text-[10px] leading-tight text-muted-foreground opacity-50 select-none">
                 <div>> mem_alloc: 0x00FFa1</div>
                 <div>> thread_pool: init [8]</div>
                 <div>> bind_socket: HTTP/3</div>
                 <div>> sys_status: AWAITING_INPUT</div>
            </div>
          </div>
        </section>
      </CornerFrame>
```

**Step 2: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat(landing): restyle links as terminal commands and add sys dump decorative block"
```
