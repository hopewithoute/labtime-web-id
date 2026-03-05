<template>
  <div class="grid grid-cols-1 lg:grid-cols-[24rem_1fr] xl:grid-cols-[26rem_1fr] gap-12 items-start">
    <!-- LEFT PANEL: Sticky Operator Profile -->
    <aside class="lg:sticky lg:top-24 space-y-8">
      <CornerFrame>
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
                <span class="font-bold">ping {{ String(appConfig.github).replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/$/, '') || 'github.com' }}</span>
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
    </aside>

    <!-- RIGHT PANEL: Scrollable Proof of Work -->
    <main class="space-y-16">
      <!-- Projects Section -->
      <section>
        <div class="flex items-baseline justify-between border-b border-foreground pb-4 mb-8">
          <div class="flex items-center gap-3">
            <h2 class="text-3xl font-black uppercase tracking-tight">Systems Built</h2>
            <span class="font-mono text-xs text-muted-foreground uppercase hidden sm:inline-block">[Featured_Projects]</span>
          </div>
          <NuxtLink to="/projects" class="text-sm font-bold uppercase hover:text-accent underline underline-offset-4">View All</NuxtLink>
        </div>

        <div v-if="projects?.length" class="space-y-8">
          <NuxtLink
            v-for="project in projects"
            :key="project.path"
            v-motion
            :to="project.path"
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 400, ease: 'easeOut' } }"
            class="block group cursor-crosshair"
          >
            <div class="border-2 border-foreground p-6 md:p-8 hover:border-accent transition-colors relative bg-card">
              <!-- Corner Accents -->
              <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current -translate-x-0.5 -translate-y-0.5"></div>
              <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current translate-x-0.5 -translate-y-0.5"></div>
              <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current -translate-x-0.5 translate-y-0.5"></div>
              <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current translate-x-0.5 translate-y-0.5"></div>

              <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <div class="flex items-center gap-3 mb-3">
                    <span class="text-accent font-bold font-mono text-sm">[<span class="inline-block w-2 text-center">{{ project.path ? 'x' : ' ' }}</span>]</span>
                    <span v-if="project.role" class="font-mono text-xs uppercase text-muted-foreground font-bold tracking-wider">{{ project.role }}</span>
                  </div>
                  <h3 class="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">{{ project.title }}</h3>
                </div>
                <div v-if="project.date" class="font-mono text-xs opacity-60 text-right whitespace-nowrap">
                  VER: {{ new Date(project.date).getFullYear() }}
                </div>
              </div>

              <p class="text-base md:text-lg mb-8 max-w-2xl leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">{{ project.description }}</p>

              <div class="flex items-center justify-between pt-6 border-t border-foreground/20">
                <div class="flex gap-2 flex-wrap max-w-[70%]">
                  <Badge
                    v-for="tech in flattenTechStack(project.tech_stack)?.slice(0, 4)"
                    :key="tech"
                    variant="outline"
                    class="font-mono uppercase text-[10px] md:text-xs rounded-none border-foreground/30 px-2 py-0.5"
                  >
                    {{ tech }}
                  </Badge>
                  <span v-if="flattenTechStack(project.tech_stack)?.length > 4" class="font-mono text-xs opacity-50 px-2 flex items-center">
                    +{{ flattenTechStack(project.tech_stack).length - 4 }}
                  </span>
                </div>
                <div class="font-mono text-xs font-bold uppercase group-hover:text-accent flex items-center gap-2">
                  <span>Enter</span>
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
            <span class="font-mono text-xs text-muted-foreground uppercase hidden sm:inline-block">[Articles]</span>
          </div>
          <NuxtLink to="/articles" class="text-sm font-bold uppercase hover:text-accent underline underline-offset-4">View All</NuxtLink>
        </div>

        <div class="space-y-0 border border-foreground bg-card">
          <NuxtLink
            v-for="(article, index) in recentArticles"
            :key="article.path"
            :to="article.path"
            class="flex flex-col sm:flex-row sm:items-center justify-between p-4 transition-none group border-b last:border-b-0 border-foreground/20"
          >
            <div class="flex items-center gap-4 mb-2 sm:mb-0">
              <span class="font-mono text-xs text-muted-foreground group-hover:text-accent w-8">
                {{ String(index + 1).padStart(2, '0') }}.
              </span>
              <h3 class="text-lg font-bold uppercase tracking-tight">{{ article.title }}</h3>
            </div>
            <div class="flex items-center gap-4 text-xs font-mono opacity-60 group-hover:opacity-100 sm:w-1/3 sm:justify-end">
              <span class="truncate max-w-30 hidden sm:inline-block">[{{ article.category || article.tags?.[0] || 'Note' }}]</span>
              <time class="whitespace-nowrap">{{ article.date }}</time>
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const appConfig = useAppConfig()

const sysUptime = ref<string>('ONLINE')
let uptimeInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  uptimeInterval = setInterval(() => {
    sysUptime.value = new Date().toISOString()
  }, 1000)
})

onUnmounted(() => {
  if (uptimeInterval) clearInterval(uptimeInterval)
})

useHead({
  title: 'Home | LabTime',
  meta: [
    { name: 'description', content: 'A technical blog and portfolio focusing on software architecture and performance.' }
  ]
})

const { data: projects } = await useAsyncData('home-projects', () =>
  queryCollection('projects')
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const { data: recentArticles } = await useAsyncData('home-recent-articles', () =>
  queryCollection('content')
    .where('stem', 'NOT LIKE', 'projects/%/index')
    .order('date', 'DESC')
    .limit(4)
    .all()
)
</script>

