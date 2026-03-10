<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-[24rem_1fr] xl:grid-cols-[26rem_1fr] gap-12 items-start"
  >
    <!-- LEFT PANEL: Sticky Operator Profile -->
    <aside class="lg:sticky lg:top-24 space-y-8 relative group/crt">
      <CornerFrame>
        <section class="p-6 md:p-8 border-foreground overflow-hidden font-mono">
          <div class="mb-8">
            <div class="text-accent font-bold opacity-80 mb-2">~ $ whoami</div>
            <div class="space-y-1">
              <div>
                <span class="text-muted-foreground mr-2">USER:</span>
                Anggi Wibiyanto
              </div>
              <div>
                <span class="text-muted-foreground mr-2">ROLE:</span>
                Senior System Builder
              </div>
              <div>
                <span class="text-muted-foreground mr-2">SYS_UPTIME:</span>
                <span class="text-accent">ONLINE</span>
              </div>
            </div>
          </div>

          <!-- Terminal Boot Sequence Block -->
          <div class="space-y-6">
            <div>
              <div class="text-xs uppercase text-muted-foreground mb-3 opacity-60">
                -- Initialize Core Modules
              </div>
              <div class="space-y-1.5 text-sm min-h-24">
                <div
                  v-for="cmd in activeCommands"
                  :key="cmd"
                  class="animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  <span class="text-accent font-bold">[ OK ]</span>
                  {{ cmd }}
                </div>
              </div>
            </div>

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
                :href="githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center gap-2 text-sm px-2 py-2 group hover:bg-foreground hover:text-background transition-colors"
              >
                <span class="text-accent group-hover:text-background opacity-70">~ $</span>
                <span class="font-bold">ping {{ githubDisplay }}</span>
                <span
                  class="ml-auto font-normal opacity-50 group-hover:opacity-100 group-hover:text-background transition-opacity text-xs"
                >
                  ttl=50
                </span>
              </a>
            </div>

            <!-- Static System Dump (Decorative) -->
            <div
              class="mt-8 pt-4 border-t border-dashed border-foreground/20 text-[10px] leading-tight text-muted-foreground opacity-50 select-none"
            >
              <div>> mem_alloc: {{ memAlloc }}</div>
              <div>> thread_pool: {{ threadPoolState }}</div>
              <div>> bind_socket: HTTP/3</div>
              <div>
                > sys_status: AWAITING_INPUT
                <span class="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </section>
      </CornerFrame>
    </aside>

    <!-- RIGHT PANEL: Scrollable Proof of Work -->
    <main class="space-y-16">
      <!-- Projects Section -->
      <section>
        <div class="flex items-baseline justify-between border-b border-foreground pb-4 mb-8">
          <div class="flex items-center gap-3">
            <h2 class="text-3xl font-black uppercase tracking-tight">Systems Built</h2>
            <span class="font-mono text-xs text-muted-foreground uppercase hidden sm:inline-block">
              [Featured_Projects]
            </span>
          </div>
          <NuxtLink
            to="/projects"
            class="text-sm font-bold uppercase hover:text-accent underline underline-offset-4"
          >
            View All
          </NuxtLink>
        </div>

        <div v-if="projects?.length" class="space-y-8">
          <NuxtLink
            v-for="project in projects"
            :key="project.path"
            v-motion
            :to="project.path"
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 400, ease: 'easeOut' } }"
            class="block group cursor-crosshair border-2 border-foreground hover:bg-foreground hover:text-background transition-colors relative crt-hover bg-background w-full"
          >
            <div class="p-6 md:p-8 relative z-10 flex flex-col h-full">
              <!-- Corner Accents -->
              <div
                class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-foreground group-hover:border-background transition-colors -translate-x-0.5 -translate-y-0.5"
              ></div>
              <div
                class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-foreground group-hover:border-background transition-colors translate-x-0.5 -translate-y-0.5"
              ></div>
              <div
                class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-foreground group-hover:border-background transition-colors -translate-x-0.5 translate-y-0.5"
              ></div>
              <div
                class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-foreground group-hover:border-background transition-colors translate-x-0.5 translate-y-0.5"
              ></div>

              <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div class="w-full">
                  <div class="flex items-center gap-3 mb-3">
                    <span
                      class="text-accent group-hover:text-background font-bold font-mono text-sm bg-accent/10 group-hover:bg-background/20 px-2 py-0.5 transition-colors"
                    >
                      [
                      <span class="inline-block w-2 text-center">
                        {{ project.path ? 'x' : ' ' }}
                      </span>
                      ]
                    </span>
                    <span
                      v-if="project.role"
                      class="font-mono text-[10px] md:text-xs uppercase opacity-60 font-bold tracking-widest group-hover:opacity-80 transition-opacity"
                    >
                      {{ project.role }}
                    </span>
                  </div>
                  <h3
                    class="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none group-hover:underline underline-offset-4 decoration-2 wrap-break-word text-foreground group-hover:text-background transition-colors"
                  >
                    {{ project.title }}
                  </h3>
                </div>
              </div>

              <p
                class="text-base md:text-lg mb-8 max-w-2xl leading-relaxed opacity-80 group-hover:opacity-90 transition-opacity"
              >
                {{ project.description }}
              </p>

              <div
                class="flex flex-col sm:flex-row sm:items-end justify-between mt-auto pt-6 border-t-2 border-dashed border-foreground/20 group-hover:border-background/30 transition-colors gap-6 relative"
              >
                <div
                  class="flex flex-wrap gap-2 text-[10px] md:text-xs font-mono items-center uppercase max-w-[70%]"
                >
                  <span
                    class="opacity-60 font-bold tracking-widest bg-foreground text-background group-hover:bg-background group-hover:text-foreground px-2 py-1 transition-colors"
                  >
                    DEPS
                  </span>
                  <span
                    v-for="tech in flattenTechStack(project.tech_stack)?.slice(0, 4)"
                    :key="tech"
                    class="border border-foreground/30 group-hover:border-background/30 px-2 py-0.5 transition-colors opacity-80"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="flattenTechStack(project.tech_stack)?.length > 4"
                    class="opacity-50 px-2 flex items-center font-bold"
                  >
                    +{{ flattenTechStack(project.tech_stack).length - 4 }}
                  </span>
                </div>
                <div
                  class="text-xs md:text-sm font-bold uppercase flex items-center gap-1.5 transition-colors bg-accent/10 sm:bg-transparent px-3 py-1 border-2 border-transparent group-hover:border-background/20 group-hover:text-accent"
                >
                  <span>ENTER</span>
                  <span class="group-hover:translate-x-1 transition-transform">-></span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Articles Section -->
      <section>
        <div class="flex items-baseline justify-between border-b border-foreground pb-4 mb-6 mt-16">
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-black uppercase tracking-tight">Recent Logs</h2>
            <span class="font-mono text-xs text-muted-foreground uppercase hidden sm:inline-block">
              [Articles]
            </span>
          </div>
          <NuxtLink
            to="/articles"
            class="text-sm font-bold uppercase hover:text-accent underline underline-offset-4"
          >
            View All
          </NuxtLink>
        </div>

        <div class="space-y-0 border-2 border-foreground bg-background">
          <NuxtLink
            v-for="(article, index) in recentArticles"
            :key="article.path"
            :to="article.path"
            class="group flex w-full max-w-full hover:bg-foreground hover:text-background transition-colors relative crt-hover border-b-2 last:border-b-0 border-foreground/20 group-hover:border-background/20"
          >
            <!-- Number sidebar -->
            <div
              class="w-12 sm:w-16 shrink-0 border-r-2 border-foreground/20 group-hover:border-background/20 flex flex-col items-center justify-center bg-foreground/5 group-hover:bg-transparent overflow-hidden relative z-10 transition-colors"
            >
              <span
                class="text-accent group-hover:text-background font-black text-xl sm:text-2xl transform -rotate-90 tracking-tighter whitespace-nowrap transition-colors"
              >
                #{{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <div class="grow p-4 md:p-6 flex flex-col relative z-10 justify-center">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3
                  class="text-lg md:text-xl font-black uppercase tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-2 wrap-break-word"
                >
                  {{ article.title }}
                </h3>

                <div
                  class="flex items-center gap-3 md:gap-4 justify-between sm:justify-end shrink-0 w-full sm:w-auto mt-2 sm:mt-0 border-t border-dashed border-foreground/20 sm:border-t-0 pt-3 sm:pt-0 group-hover:border-background/30 transition-colors"
                >
                  <div class="flex gap-2 items-center">
                    <span
                      class="bg-foreground text-background group-hover:bg-background group-hover:text-foreground px-2 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-widest shrink-0"
                    >
                      {{ article.category || article.tags?.[0] || 'LOG' }}
                    </span>
                  </div>
                  <div
                    v-if="!article.path?.startsWith('/projects/')"
                    class="text-[10px] md:text-xs font-mono border border-foreground/20 group-hover:border-background/20 px-2 py-0.5 transition-colors whitespace-nowrap shrink-0 opacity-80 group-hover:opacity-100"
                  >
                    {{ article.date }}
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const githubUrl = computed(() => (appConfig.github ? String(appConfig.github) : '#'))
const githubDisplay = computed(
  () =>
    githubUrl.value
      .replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
      .replace(/\/$/, '') || 'github.com'
)

const activeCommands = [
  'load_module "elixir_ash"',
  'load_module "vue_nuxt"',
  'load_module "react"',
  'load_module "laravel"',
]

const memAlloc = '0x00FFA1'
const threadPoolState = 'idle [8]'

useHead({
  title: 'Home | LabTime',
  meta: [
    {
      name: 'description',
      content: 'A technical blog and portfolio focusing on software architecture and performance.',
    },
  ],
})

const { data: projects } = await useAsyncData('home-projects', () =>
  queryCollection('projects').order('date', 'DESC').limit(3).all()
)

const { data: recentArticles } = await useAsyncData('home-recent-articles', async () => {
  // Ambil maksimal 4 artikel dari masing-masing koleksi secara paralel
  const [generalArticles, projectLogs] = await Promise.all([
    queryCollection('articles').order('date', 'DESC').limit(4).all(),
    queryCollection('projectArticles').order('date', 'DESC').limit(4).all(),
  ])

  // Gabungkan hasil dari kedua koleksi dan urutkan ulang berdasarkan waktu terbaru
  return [...generalArticles, ...projectLogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4) // Ambil hanya 4 artikel teratas
})
</script>

<style scoped>
.group\/crt::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%);
  background-size: 100% 8px; /* 8px scanlines to prevent fuzziness */
  z-index: 50;
  pointer-events: none; /* Crucial so links still work */
  border-radius: inherit; /* Match CornerFrame borders */
}
.crt-hover:hover::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 50%);
  background-size: 100% 4px;
  z-index: 50;
  pointer-events: none;
}
</style>
