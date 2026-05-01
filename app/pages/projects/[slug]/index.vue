<template>
  <main class="relative min-h-screen">
    <div v-if="project">
      <article>
        <!-- Header -->
        <YorhaPanel as="header" brackets variant="panel" padding="p-6 md:p-8 lg:p-12 mt-8">
          <div
            class="flex items-center gap-4 mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-4"
          >
            <NuxtLink
              to="/projects"
              class="flex items-center gap-2 border border-foreground/20 px-2 py-1"
            >
              <span class="leading-none mt-0.5">&larr;</span>
              <span>PRJ_INDEX</span>
            </NuxtLink>
          </div>

          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-8"
          >
            {{ project.title }}
          </h1>

          <div class="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-2">
            SYS_DESC //
          </div>
          <p
            class="text-xl md:text-2xl max-w-4xl border-l-[6px] border-accent pl-8 py-4 bg-accent/5 font-medium mb-8 leading-relaxed"
          >
            {{ project.description }}
          </p>

          <div class="mt-8 flex items-center gap-4 flex-wrap border-t border-border pt-6">
            <span
              v-if="project.role"
              class="font-mono text-xs uppercase font-bold tracking-widest bg-foreground text-background px-3 py-1"
            >
              role: {{ project.role }}
            </span>
            <div class="flex gap-2 flex-wrap">
              <span
                v-for="tech in flattenTechStack(project.tech_stack)"
                :key="tech"
                class="font-mono text-xs uppercase px-2 py-1 border border-foreground font-bold"
                title="stack_module"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </YorhaPanel>

        <!-- Two-column layout: Main content (left) + ADR sidebar (right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-start mt-16 md:mt-24">
          <!-- Left Column: Main Content -->
          <div class="lg:col-span-7 xl:col-span-8">
            <!-- Technical Brief: Problem → Approach → Outcome -->
            <section class="mb-24">
              <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2 mb-10">
                <h2 class="text-3xl font-display font-bold uppercase tracking-wider text-foreground transition-colors hover:text-accent">
                  System Diagnostics
                </h2>
                <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1 hidden md:block">
                  [ PRJ_TECH_EVAL ]
                </div>
              </div>
              <div
                class="grid grid-cols-1 md:grid-cols-3 gap-0.5 border border-border bg-border"
              >
                <div v-if="project.problem" class="bg-background p-8 group relative yorha-cut">
                  <div
                    class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-border pb-2"
                  >
                    PROC_01 // Problem
                  </div>
                  <p class="text-base font-medium leading-relaxed">{{ project.problem }}</p>
                </div>
                <div v-if="project.approach" class="bg-background p-8 group relative yorha-cut">
                  <div
                    class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-border pb-2"
                  >
                    PROC_02 // Approach
                  </div>
                  <p class="text-base font-medium leading-relaxed">{{ project.approach }}</p>
                </div>
                <div v-if="project.outcome" class="bg-background p-8 group relative yorha-cut">
                  <div
                    class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-border pb-2"
                  >
                    PROC_03 // Outcome
                  </div>
                  <p class="text-base font-medium leading-relaxed">{{ project.outcome }}</p>
                </div>
              </div>
            </section>

            <!-- Tech Stack Detail -->
            <section v-if="project.tech_stack" class="mb-24">
              <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2 mb-10">
                <h2 class="text-3xl font-display font-bold uppercase tracking-wider text-foreground transition-colors hover:text-accent">
                  System Components
                </h2>
                <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1 hidden md:block">
                  [ SYS_COMP_LIST ]
                </div>
              </div>
              <div class="space-y-0 border border-border bg-background">
                <div
                  v-for="(items, category) in project.tech_stack"
                  :key="category"
                  class="relative group p-6 md:p-8 border-b border-border last:border-b-0"
                >
                  <h3
                    class="font-mono text-[10px] uppercase tracking-widest text-accent mb-4 border-b border-border pb-2"
                  >
                    MOD // {{ category }}
                  </h3>
                  <div class="space-y-4">
                    <div
                      v-for="tech in items"
                      :key="tech.name"
                      class="flex flex-col md:flex-row md:items-baseline gap-2"
                    >
                      <span class="font-bold uppercase tracking-tight text-lg w-48 shrink-0">
                        {{ tech.name }}
                      </span>
                      <span class="text-sm font-medium text-muted-foreground leading-relaxed">
                        <span class="text-accent hidden md:inline mr-2">>></span>
                        {{ tech.reason }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Screenshots Gallery -->
            <section v-if="project.screenshots?.length" class="mb-24">
              <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2 mb-10">
                <h2 class="text-3xl font-display font-bold uppercase tracking-wider text-foreground transition-colors hover:text-accent">
                  Artifact Captures
                </h2>
                <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1 hidden md:block">
                  [ DATA_IMG_GALLERY ]
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <YorhaPanel
                  v-for="(screenshot, index) in project.screenshots"
                  :key="index"
                  as="figure"
                  brackets
                  variant="none"
                  padding="p-0"
                >


                  <div class="overflow-hidden bg-foreground">
                    <img
                      :src="screenshot.src"
                      :alt="screenshot.alt"
                      class="w-full opacity-90 group-hover:opacity-100 transition-opacity mix-blend-luminosity group-hover:mix-blend-normal"
                      loading="lazy"
                    />
                  </div>
                  <figcaption
                    v-if="screenshot.alt"
                    class="px-4 py-3 text-[10px] font-mono uppercase tracking-widest bg-foreground text-background transition-colors"
                  >
                    <span class="opacity-50 mr-2">_IMG_METADATA:</span>
                    {{ screenshot.alt }}
                  </figcaption>
                </YorhaPanel>
              </div>
            </section>

            <!-- Project body content -->
            <YorhaPanel
              v-if="project.body"
              as="section"
              variant="panel"
              brackets
              padding="p-6 md:p-10 lg:p-12 mb-32"
            >
              <div class="article-prose">
                <ContentRenderer :value="project" />
              </div>
            </YorhaPanel>

            <!-- Related Writings: shown below content on mobile only (when sidebar not visible) -->
            <section v-if="articles?.length" class="lg:hidden border-t-4 border-border pt-12 mt-12 mb-12">
              <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2 mb-8">
                <h2 class="text-2xl font-display font-bold uppercase tracking-wider text-foreground">
                  Arch_Decision_Records
                </h2>
                <span class="font-mono text-xs text-accent font-bold mb-1">[{{ articles.length }}]</span>
              </div>
              <div class="grid grid-cols-1 border border-border bg-border gap-0.5">
                <NuxtLink
                  v-for="(article, idx) in articles"
                  :key="article.path"
                  :to="article.path"
                  class="bg-background flex flex-row group hover:bg-foreground/5 transition-colors p-5 relative yorha-cut"
                >
                  <div
                    class="w-12 shrink-0 flex items-start justify-center pt-1 border-r border-dashed border-foreground/20 mr-6"
                  >
                    <span
                      class="font-mono text-sm font-bold text-accent -rotate-90 origin-center whitespace-nowrap inline-block mt-4 tracking-tighter"
                    >
                      #{{ String(idx + 1).padStart(2, '0') }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-start mb-4">
                      <span
                        class="font-mono text-[10px] uppercase font-bold tracking-widest bg-foreground text-background px-2 py-0.5 transition-colors"
                      >
                        {{ article.category || 'LOG' }}
                      </span>
                    </div>
                    <h3
                      class="text-xl font-black uppercase tracking-tight leading-snug mb-2"
                    >
                      {{ article.title }}
                    </h3>
                    <p
                      v-if="article.description"
                      class="text-sm font-medium text-muted-foreground leading-relaxed"
                    >
                      {{ article.description }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </section>
          </div>

          <aside
            v-if="articles?.length"
            class="hidden lg:block lg:col-span-5 xl:col-span-4 lg:sticky lg:top-12 mt-0"
          >
            <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2 mb-8">
              <h2 class="text-sm font-display font-bold uppercase tracking-widest text-foreground">
                Arch_Decision_Records
              </h2>
              <span class="font-mono text-[10px] text-accent font-bold mb-0.5">[{{ articles.length }}]</span>
            </div>

            <div class="border border-border bg-border grid grid-cols-1 gap-0.5">
              <NuxtLink
                v-for="(article, idx) in articles"
                :key="article.path"
                :to="article.path"
                class="bg-background flex flex-row group hover:bg-foreground/5 transition-colors p-4 relative yorha-cut"
              >
                <div
                  class="w-8 shrink-0 items-start justify-center pt-1 border-r border-dashed border-foreground/20 mr-3 hidden xl:flex"
                >
                  <span
                    class="font-mono text-xs font-bold text-accent -rotate-90 origin-center whitespace-nowrap inline-block mt-3 tracking-tighter"
                  >
                    #{{ String(idx + 1).padStart(2, '0') }}
                  </span>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-3">
                    <span
                      class="font-mono text-[9px] uppercase font-bold tracking-widest bg-foreground text-background px-1.5 py-px transition-colors line-clamp-1 max-w-[60%]"
                    >
                      {{ article.category || 'LOG' }}
                    </span>
                  </div>
                  <h3
                    class="text-sm border-l-2 border-accent pl-2 font-bold uppercase tracking-tight leading-snug mb-1.5"
                  >
                    {{ article.title }}
                  </h3>
                  <p
                    v-if="article.description"
                    class="text-xs font-medium text-muted-foreground leading-relaxed line-clamp-2"
                  >
                    {{ article.description }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </aside>
        </div>
      </article>
    </div>

    <!-- 404 -->
    <div v-else class="py-20 text-center">
      <h1 class="text-8xl font-black mb-4 uppercase">404</h1>
      <p class="text-xl mb-8">Project not found.</p>
      <Button as-child variant="default" class="rounded-none uppercase font-bold tracking-tight">
        <NuxtLink to="/projects">Return to Projects</NuxtLink>
      </Button>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { ProjectArticlesCollectionItem } from '@nuxt/content'

const route = useRoute()
const slug = route.params.slug as string

const { data: project } = await useAsyncData<ProjectArticlesCollectionItem | null>(
  `project-${slug}`,
  () => queryCollection('projects').path(`/projects/${slug}`).first()
)

const { data: articles } = await useAsyncData<ProjectArticlesCollectionItem[]>(
  `project-${slug}-articles`,
  () =>
    queryCollection('projectArticles')
      .where('path', 'LIKE', `/projects/${slug}/%`)
      .where('path', '<>', `/projects/${slug}`)
      .order('order', 'ASC')
      .all()
)

useHead({
  title: () => (project.value ? `${project.value.title} | LabTime` : 'Project | LabTime'),
  meta: [{ name: 'description', content: () => project.value?.description || '' }],
})
</script>

