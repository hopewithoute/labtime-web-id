<template>
  <div class="relative w-full max-w-full">
    <!-- Main structural wrapper to allow grid breaking -->
    <div class="grid grid-cols-1 xl:grid-cols-[24rem_minmax(0,1fr)] gap-8 xl:gap-14 items-start relative z-10">
      
      <!-- OPERATOR DOSSIER (Sidebar) -->
      <aside class="xl:sticky xl:top-24 flex flex-col gap-6 relative z-30">
        <!-- Module 1: Identity -->
        <YorhaPanel brackets variant="panel" padding="p-6" class="relative group">
          <div class="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground-secondary">
            <YorhaScramble text="[ OPERATOR DOSSIER ]" :duration="300" />
          </div>

          <div class="mt-5 space-y-4">
            <div class="font-display text-4xl md:text-4xl font-bold uppercase tracking-[0.08em] leading-none text-foreground">
              Anggi Wibiyanto
            </div>
            <p class="text-sm md:text-[0.95rem] leading-relaxed text-foreground-secondary">
              Senior full-stack engineer focused on architecture, realtime behavior, and
              operational systems that still make sense under load.
            </p>
          </div>
        </YorhaPanel>

        <!-- Module 2: Stats (Overlapping) -->
        <div class="grid grid-cols-2 gap-3 xl:-mt-2 xl:ml-4 relative z-20">
          <YorhaPanel
            v-for="(tile, i) in operatorTiles"
            :key="tile.label"
            variant="simple"
            padding="p-4"
            class="min-h-[6rem] flex flex-col justify-between bg-background border-border hover:bg-foreground hover:text-background transition-all"
            :style="{ animationDelay: `${i * 100}ms` }"
            @mouseenter="playHover"
          >
            <div class="text-[10px] font-mono tracking-[0.24em] uppercase text-foreground-secondary transition-colors group-hover:text-background/70">
              {{ tile.label }}
            </div>
            <div class="text-xs md:text-[0.85rem] font-sans font-bold uppercase tracking-[0.12em] leading-tight mt-2">
              {{ tile.value }}
            </div>
          </YorhaPanel>
        </div>

        <!-- Module 3: Active Modules -->
        <YorhaPanel variant="panel" padding="p-5" class="bg-background-secondary/10 border-yorha-faint relative transform transition-transform hover:-translate-y-1">
          <div class="space-y-4">
            <div class="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground-secondary flex items-center justify-between">
              <YorhaScramble text="[ ACTIVE MODULES ]" :duration="300" />
              <span class="w-1.5 h-1.5 bg-yorha-green animate-blink"></span>
            </div>

            <div class="space-y-2">
              <div
                v-for="cmd in activeCommands"
                :key="cmd"
                class="flex items-start gap-2 border-b border-yorha-faint pb-2 text-[11px] uppercase tracking-[0.2em] hover:pl-2 transition-all cursor-crosshair group/cmd"
                @mouseenter="playHover"
              >
                <span class="font-mono font-bold text-yorha-green shrink-0 group-hover/cmd:opacity-50">[OK]</span>
                <span class="font-sans text-foreground group-hover/cmd:font-bold">{{ cmd }}</span>
              </div>
            </div>
          </div>
        </YorhaPanel>

        <!-- Module 4: Actions -->
        <div class="flex flex-col gap-3 relative z-10 xl:-ml-2">
          <NuxtLink
            to="/resume"
            class="yorha-btn relative py-3 px-4 text-left justify-start! flex items-center font-bold tracking-[0.2em] group border-border hover:border-foreground transition-all"
            @mouseenter="playHover"
          >
            <span class="text-xs md:text-sm"><YorhaScramble text="EXECUTE : RESUME" /></span>
            <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">--&gt;</span>
          </NuxtLink>

          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="yorha-btn relative py-3 px-4 text-left justify-start! flex items-center font-bold tracking-[0.2em] group border-border hover:border-foreground transition-all"
            @mouseenter="playHover"
          >
            <span class="text-xs md:text-sm"><YorhaScramble text="LINK : GITHUB" /></span>
            <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">--&gt;</span>
          </a>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="space-y-16 md:space-y-24 relative z-20 pb-20 mt-8 xl:mt-0">
        
        <!-- HERO SECTION: TACTICAL DOSSIER -->
        <section class="relative pt-4 md:pt-8">
          <div class="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground-secondary mb-6 border-l-2 pl-3 border-foreground">
            Tactical Dossier
          </div>

          <h1 class="max-w-[45rem] text-4xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-[0.04em] leading-[1.1] text-foreground relative z-10">
            Building systems that survive operational pressure.
          </h1>

          <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_18rem] mt-8 gap-8 items-start relative z-20">
            <div>
              <p class="max-w-xl text-base md:text-lg leading-relaxed text-foreground border-l-4 border-foreground/20 pl-4 py-1">
                Senior Full-Stack Engineer with over a decade of experience designing and operating business-critical platforms. Proven track record of turning ambiguous requirements into production-ready systems with strong cost discipline and reliable cross-functional delivery.
              </p>

              <div class="mt-8 flex flex-wrap gap-3">
                <MetricTag
                  v-for="signal in tacticalSignals"
                  :key="signal.label"
                  :label="signal.label"
                  :value="signal.value"
                />
              </div>
            </div>

            <!-- Operational Insights -->
            <div class="border border-border bg-background-secondary/10 p-6 relative">
              <div class="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground">
                <YorhaScramble text="OPERATIONAL INSIGHTS" />
              </div>

              <div class="mt-5 space-y-5">
                <div
                  v-for="highlight in operationalHighlights"
                  :key="highlight.title"
                  class="relative"
                >
                  <div class="text-[11px] font-mono tracking-[0.24em] uppercase font-bold text-foreground flex items-center gap-2">
                    <span class="w-2 h-[1px] bg-foreground"></span>
                    {{ highlight.title }}
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-foreground-secondary ml-4 border-l border-yorha-faint pl-3">
                    {{ highlight.body }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="yorha-divider-double my-10 opacity-50"></div>

        <!-- SECTION: SYSTEMS BUILT -->
        <section>
          <div class="flex items-end justify-between border-b-[3px] border-foreground pb-2 relative">
            <h2 class="text-4xl md:text-5xl font-display font-bold uppercase tracking-[0.08em] text-foreground mix-blend-multiply dark:mix-blend-normal">
              <YorhaScramble text="Systems Built" />
            </h2>
            <NuxtLink
              to="/projects"
              class="text-xs font-sans font-bold tracking-[0.24em] uppercase bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all px-3 py-1.5"
              @mouseenter="playHover"
            >
              [ VIEW_ALL ]
            </NuxtLink>
            
            <div class="absolute -bottom-1 left-0 w-1/3 h-1 bg-yorha-red"></div>
          </div>

          <div v-if="showcaseProjects.length" class="mt-8 space-y-6">
            <NuxtLink
              v-for="(project, index) in showcaseProjects"
              :key="project.path"
              :to="project.path"
              class="group block relative border border-border bg-background transition-colors hover:bg-foreground hover:text-background"
              @mouseenter="playHover"
            >
              <div class="p-6 md:p-8 flex flex-col gap-4">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span class="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-foreground-secondary group-hover:text-background/70">
                    {{ project.role || 'Core System Ownership' }}
                  </span>
                  <span class="text-[10px] font-mono uppercase tracking-[0.18em] border border-border px-2 py-0.5 group-hover:border-background/50">
                    {{ formatDate(project.date) }}
                  </span>
                </div>
                
                <h3 class="text-2xl md:text-3xl font-display font-bold uppercase tracking-[0.02em] leading-tight mt-1 mb-2">
                  <YorhaScramble :text="project.title" />
                </h3>
                
                <p class="text-sm md:text-base leading-relaxed text-foreground-secondary group-hover:text-background/80 max-w-3xl">
                  {{ project.description }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="tech in flattenTechStack(project.tech_stack)?.slice(0, 5)"
                    :key="tech"
                    class="bg-background-secondary/40 px-2 py-1 text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-foreground group-hover:bg-background/20 group-hover:text-background transition-colors border border-transparent group-hover:border-background/40"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </section>

        <!-- SECTION: RECENT LOGS -->
        <section>
          <div class="flex items-end justify-between border-b pb-2 mb-8 border-foreground">
            <h2 class="text-3xl md:text-4xl font-display font-bold uppercase tracking-[0.08em] text-foreground">
              <YorhaScramble text="Recent Logs" />
            </h2>
            <NuxtLink
              to="/articles"
              class="text-xs font-sans font-bold tracking-[0.24em] uppercase text-foreground-secondary hover:text-foreground transition-colors"
              @mouseenter="playHover"
            >
              [ VIEW_ALL ]
            </NuxtLink>
          </div>

          <div class="space-y-4">
            <NuxtLink
              v-for="(article, index) in recentArticles"
              :key="article.path"
              :to="article.path"
              class="group flex flex-col md:flex-row justify-between relative bg-transparent hover:bg-foreground/5 p-4 md:p-6 border border-border border-b-2 hover:border-foreground transition-all duration-300"
              @mouseenter="playHover"
            >
              <div class="flex-1 md:pr-8">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-[10px] font-mono tracking-[0.24em] uppercase border border-border px-1.5 py-0.5 text-foreground-secondary group-hover:border-foreground group-hover:text-foreground transition-colors">
                    {{ formatDate(article.date) || 'Recent Entry' }}
                  </span>
                </div>

                <h3 class="text-xl md:text-2xl font-display font-bold uppercase tracking-[0.06em] leading-tight text-foreground group-hover:underline underline-offset-4 decoration-2 decoration-foreground/30">
                  <YorhaScramble :text="article.title" :duration="400" />
                </h3>

                <p class="mt-3 text-sm leading-relaxed text-foreground-secondary max-w-2xl group-hover:text-foreground transition-colors">
                  {{ article.description || 'Detailed engineering notes, trade-offs, and implementation decisions from the field.' }}
                </p>
              </div>

              <div class="mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-yorha-faint md:pl-6 w-full md:w-48 flex flex-col justify-center">
                <div class="text-[10px] font-mono tracking-[0.24em] uppercase text-foreground-secondary mb-2">
                  Signal Type
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-foreground text-background px-2 py-1 text-[10px] font-sans font-bold uppercase tracking-[0.18em]">
                    {{ article.category || article.tags?.[0] || 'LOG' }}
                  </span>
                  <span v-if="article.tags?.[1]" class="border border-border px-2 py-1 text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-foreground group-hover:border-foreground">
                    {{ article.tags[1] }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { flattenTechStack } from '~/utils/flattenTechStack'
import { formatDate } from '~/utils/formatDate'
import { useYorhaAudio } from '~/composables/useYorhaAudio'

const { playHover } = useYorhaAudio()

const appConfig = useAppConfig()

const githubUrl = computed(() => (appConfig.github ? String(appConfig.github) : '#'))

const activeCommands = [
  'Elixir_Ash_Framework',
  'Vue_Nuxt',
  'React_Tanstack',
  'Laravel_Inertia',
]

const operatorTiles = [
  { label: 'Role', value: 'Senior Full-Stack Engineer' },
  { label: 'Status', value: 'Operational' },
  { label: 'Bias', value: 'Architecture First' },
  { label: 'Mode', value: 'End-to-End Delivery' },
]

const tacticalSignals = [
  { label: 'Time In Field', value: '10+ YEARS' },
]

const operationalHighlights = [
  {
    title: 'Peak Load Stability',
    body: 'Sustaining online exams for 2,000 concurrent students while keeping infrastructure footprints extremely lean.',
  },
  {
    title: 'Scale & Governance',
    body: 'Designing workflows to govern 80,000+ asset lifecycles across 68 distinct organizational units with full auditability.',
  },
]

useHead({
  title: 'Home | LabTime',
  meta: [
    {
      name: 'description',
      content: 'A technical portfolio and engineering journal focused on software architecture, realtime workflows, and operationally durable systems.',
    },
  ],
})

const { data: projects } = await useAsyncData('home-projects', () =>
  queryCollection('projects').order('date', 'DESC').limit(2).all()
)

const { data: recentArticles } = await useAsyncData('home-recent-articles', async () => {
  const [generalArticles, projectLogs] = await Promise.all([
    queryCollection('articles').order('date', 'DESC').limit(4).all(),
    queryCollection('projectArticles').order('date', 'DESC').limit(4).all(),
  ])

  return [...generalArticles, ...projectLogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
})

const showcaseProjects = computed(() => projects.value ?? [])
</script>
