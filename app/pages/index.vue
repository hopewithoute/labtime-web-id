<template>
  <div class="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <main class="space-y-16 md:space-y-24 relative z-20 pb-20 pt-12 md:pt-20">
      
      <!-- HERO SECTION -->
      <section class="relative">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-[0.04em] leading-[1.1] text-foreground relative z-10">
          Senior Full-Stack AI Engineer.
        </h1>
        
        <div class="mt-8">
           <p class="max-w-3xl text-base md:text-lg leading-relaxed text-foreground border-l-4 border-foreground/20 pl-4 py-1">
            Shipping and maintaining production-grade software since 2013. Specializing in end-to-end ownership and resilient system architecture. Now focused on bridging traditional engineering with Applied AI to build reliable, real-world intelligent systems.
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
             <NuxtLink
              to="/resume"
              class="text-sm font-sans font-bold tracking-[0.2em] uppercase bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all px-6 py-3"
              @mouseenter="playHover"
            >
              [ VIEW_RESUME ]
            </NuxtLink>
            <a
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm font-sans font-bold tracking-[0.2em] uppercase text-foreground bg-transparent hover:bg-foreground/5 border border-border hover:border-foreground transition-all px-6 py-3"
              @mouseenter="playHover"
            >
              [ GITHUB ]
            </a>
          </div>
        </div>
      </section>

      <div class="h-px w-full bg-border"></div>

      <!-- CV MATCHED PROJECTS SECTION -->
      <section>
        <div class="flex items-end justify-between border-b-[3px] border-foreground pb-2 mb-8 relative">
          <h2 class="text-3xl md:text-4xl font-display font-bold uppercase tracking-[0.08em] text-foreground mix-blend-multiply dark:mix-blend-normal">
            <YorhaScramble text="Case Studies" />
          </h2>
          <div class="text-xs font-mono uppercase tracking-[0.18em] text-foreground-secondary hidden sm:block">
            [ PRODUCTION_SYSTEMS ]
          </div>
        </div>

        <div class="space-y-6">
          <ProjectCaseStudyCard 
            v-for="project in showcaseProjects" 
            :key="project.path" 
            :project="project"
            @open="openProject"
          />
        </div>
      </section>

      <div class="h-px w-full bg-border opacity-50"></div>

      <!-- RECENT LOGS SECTION (Condensed) -->
      <section>
        <div class="flex items-end justify-between border-b-[3px] border-border pb-2 mb-8 relative">
          <h2 class="text-2xl md:text-3xl font-display font-bold uppercase tracking-[0.08em] text-foreground-secondary">
            Engineering Logs
          </h2>
          <NuxtLink
            to="/articles"
            class="text-xs font-sans font-bold tracking-[0.24em] uppercase text-foreground-secondary hover:text-foreground transition-colors"
            @mouseenter="playHover"
          >
            [ VIEW_ALL ]
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            v-for="article in recentArticles"
            :key="article.path"
            :to="article.path"
            class="group block p-5 border border-border hover:border-foreground bg-background transition-all duration-300"
            @mouseenter="playHover"
          >
             <div class="text-xs font-mono tracking-[0.24em] uppercase text-foreground-secondary mb-3 group-hover:text-foreground transition-colors">
              {{ formatDate(article.date) || 'Recent Entry' }}
            </div>
            <h3 class="text-lg font-display font-bold uppercase tracking-[0.06em] leading-tight text-foreground group-hover:underline underline-offset-4 decoration-2 decoration-foreground/30 line-clamp-2 h-[2.5em] overflow-hidden">
              <YorhaScramble :text="article.title" :duration="400" />
            </h3>
          </NuxtLink>
        </div>
      </section>

    </main>

    <!-- Project Details Modal -->
    <ProjectDetailsModal
      v-if="route.query.project"
      :slug="route.query.project as string"
      @close="closeProject"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '~/utils/formatDate'
import { useYorhaAudio } from '~/composables/useYorhaAudio'

const route = useRoute()
const router = useRouter()

const { playHover } = useYorhaAudio()
const appConfig = useAppConfig()
const githubUrl = computed(() => (appConfig.github ? String(appConfig.github) : '#'))

useHead({
  title: 'Home | LabTime',
  meta: [
    {
      name: 'description',
      content: 'A technical portfolio and engineering journal focused on software architecture, realtime workflows, and operationally durable systems.',
    },
  ],
})

// Fetch all projects for the case studies
const { data: projects } = await useAsyncData('home-projects', () =>
  queryCollection('projects').order('date', 'DESC').all()
)

// Fetch recent articles
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

const openProject = (slug: string | undefined) => {
  if (!slug) return
  router.push({ query: { project: slug } })
}

const closeProject = () => {
  const query = { ...route.query }
  delete query.project
  router.push({ query })
}
</script>
