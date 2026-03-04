<template>
  <div class="grid grid-cols-1 lg:grid-cols-[22rem_1fr] xl:grid-cols-[24rem_1fr] gap-12 items-start">
    <!-- LEFT PANEL: Sticky Operator Profile -->
    <aside class="lg:sticky lg:top-24 space-y-8">
      <CornerFrame>
        <section class="p-6 md:p-8 border-foreground overflow-hidden">
          <h1 
            class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 inline-flex items-baseline animate-typewriter border-r-4 border-foreground pr-2"
          >
            LabTime<span class="text-accent">.init()</span>
          </h1>
          <p class="text-sm md:text-base font-medium leading-relaxed mb-6">
            A technical journal documenting architectural decisions, performance optimizations, and the pursuit of elegant systems.
          </p>
          
          <div class="flex gap-4 items-center mb-8 border-b border-foreground/10 pb-6">
            <MetricTag label="Status" value="Ready" variant="status" />
          </div>

          <!-- Bento Resume Block -->
          <div class="space-y-6">
            <div>
              <div class="font-mono text-xs uppercase text-muted-foreground mb-2">[CURRENT_ROLE]</div>
              <div class="font-bold">Senior System Builder</div>
              <div class="text-sm opacity-80">AI-Augmented Engineer</div>
            </div>

            <div>
              <div class="font-mono text-xs uppercase text-muted-foreground mb-2">[CORE_STACK]</div>
              <div class="flex flex-wrap gap-1.5">
                <Badge variant="outline" class="font-mono uppercase text-[10px] rounded-none border-current px-1.5 py-0">Elixir/Ash</Badge>
                <Badge variant="outline" class="font-mono uppercase text-[10px] rounded-none border-current px-1.5 py-0">Vue/Nuxt</Badge>
                <Badge variant="outline" class="font-mono uppercase text-[10px] rounded-none border-current px-1.5 py-0">React</Badge>
                <Badge variant="outline" class="font-mono uppercase text-[10px] rounded-none border-current px-1.5 py-0">Laravel</Badge>
                <Badge variant="outline" class="font-mono uppercase text-[10px] rounded-none border-current px-1.5 py-0">AI-Augmented</Badge>
              </div>
            </div>

            <div class="pt-4 flex flex-col gap-3">
              <NuxtLink 
                to="/resume" 
                class="w-full inline-flex justify-between items-center bg-foreground text-background font-bold uppercase text-sm px-4 py-3 transition-colors group"
              >
                <span>Execute /resume</span>
                <span class="font-mono opacity-70 group-hover:opacity-100 transition-opacity">-></span>
              </NuxtLink>
              <a 
                :href="appConfig.github ? String(appConfig.github) : '#'" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-full inline-flex justify-between items-center border border-foreground font-bold uppercase text-sm px-4 py-3 hover:border-accent hover:text-accent transition-colors group"
              >
                <span>GitHub Profile</span>
                <span class="font-mono opacity-70 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
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
                    v-for="tech in flattenTechStack(project.meta?.tech_stack)?.slice(0, 4)"
                    :key="tech"
                    variant="outline"
                    class="font-mono uppercase text-[10px] md:text-xs rounded-none border-foreground/30 px-2 py-0.5"
                  >
                    {{ tech }}
                  </Badge>
                  <span v-if="flattenTechStack(project.meta?.tech_stack)?.length > 4" class="font-mono text-xs opacity-50 px-2 flex items-center">
                    +{{ flattenTechStack(project.meta?.tech_stack).length - 4 }}
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
const appConfig = useAppConfig()

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

