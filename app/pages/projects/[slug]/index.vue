<template>
  <main>
    <div v-if="project">
      <article>
        <!-- Header -->
        <header class="mb-12 border-b-4 border-foreground pb-8">
          <div class="flex items-center gap-4 mb-6 font-mono text-sm uppercase">
            <NuxtLink to="/projects" class="hover:text-accent flex items-center gap-1">
              <span class="text-lg leading-none">&larr;</span> Projects
            </NuxtLink>
            <span>/</span>
            <time>{{ project.date }}</time>
          </div>
          <h1 class="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {{ project.title }}
          </h1>
          <p class="text-xl md:text-2xl max-w-4xl border-l-[6px] border-accent pl-4 py-2 bg-muted/30">
            {{ project.description }}
          </p>
          <div class="mt-6 flex items-center gap-4 flex-wrap">
            <span v-if="project.role" class="font-mono text-sm uppercase text-muted-foreground">{{ project.role }}</span>
            <div class="flex gap-2 flex-wrap">
              <Badge
                v-for="tech in flattenTechStack(project.tech_stack)"
                :key="tech"
                variant="outline"
                class="font-mono uppercase px-3 py-1 rounded-none border-foreground"
              >
                {{ tech }}
              </Badge>
            </div>
          </div>
        </header>

        <!-- Technical Brief: Problem → Approach → Outcome -->
        <section class="mb-16 space-y-8 max-w-3xl">
          <div v-if="project.problem" class="border-l-4 border-accent pl-6">
            <h2 class="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2">Problem</h2>
            <p class="text-lg">{{ project.problem }}</p>
          </div>
          <div v-if="project.approach" class="border-l-4 border-foreground pl-6">
            <h2 class="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2">Approach</h2>
            <p class="text-lg">{{ project.approach }}</p>
          </div>
          <div v-if="project.outcome" class="border-l-4 border-accent pl-6">
            <h2 class="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2">Outcome</h2>
            <p class="text-lg">{{ project.outcome }}</p>
          </div>
        </section>

        <!-- Tech Stack Detail -->
        <section v-if="project.tech_stack && typeof project.tech_stack === 'object' && !Array.isArray(project.tech_stack)" class="mb-16 max-w-3xl">
          <h2 class="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6 border-b border-foreground pb-2">
            Tech Stack
          </h2>
          <div class="space-y-6">
            <div v-for="(items, category) in project.tech_stack" :key="category">
              <h3 class="font-mono text-xs uppercase tracking-wider text-accent mb-3">{{ category }}</h3>
              <div class="space-y-3">
                <div v-for="tech in items" :key="tech.name" class="border-l-2 border-foreground/20 pl-4">
                  <span class="font-bold">{{ tech.name }}</span>
                  <span class="text-muted-foreground"> — {{ tech.reason }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Screenshots Gallery -->
        <section v-if="project.screenshots?.length" class="mb-16 max-w-4xl">
          <h2 class="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6 border-b border-foreground pb-2">
            Screenshots
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <figure v-for="(screenshot, index) in project.screenshots" :key="index" class="border border-foreground">
              <img :src="screenshot.src" :alt="screenshot.alt" class="w-full" loading="lazy" />
              <figcaption v-if="screenshot.alt" class="px-3 py-2 text-xs font-mono uppercase text-muted-foreground border-t border-foreground">
                {{ screenshot.alt }}
              </figcaption>
            </figure>
          </div>
        </section>

        <!-- Project body content -->
        <div
          v-if="project.body?.children?.length"
          class="max-w-3xl mb-16 prose prose-neutral prose-lg dark:prose-invert
                      prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter
                      prose-a:text-accent prose-a:border-b prose-a:border-accent prose-a:no-underline
                      hover:prose-a:bg-accent hover:prose-a:text-white
                      prose-pre:border prose-pre:border-foreground prose-pre:rounded-none
                      prose-img:border prose-img:border-foreground prose-img:rounded-none"
        >
          <ContentRenderer :value="project" />
        </div>

        <!-- Related Writings -->
        <section v-if="articles?.length" class="border-t-4 border-foreground pt-8">
          <h2 class="text-2xl font-black uppercase tracking-tight mb-8">Related Writings</h2>
          <div class="grid grid-cols-1 gap-0 border-y border-foreground">
            <NuxtLink
              v-for="article in articles"
              :key="article._path"
              :to="article._path"
              class="block p-5 border-b border-foreground last:border-b-0 group transition-none"
            >
              <div class="flex justify-between items-start mb-2">
                <Badge
                  v-if="article.category"
                  variant="outline"
                  class="font-mono uppercase text-xs rounded-none border-current"
                >
                  {{ article.category }}
                </Badge>
                <time class="font-mono text-xs opacity-70 group-hover:opacity-100">{{ article.date }}</time>
              </div>
              <h3 class="text-xl font-bold uppercase tracking-tight group-hover:text-accent">{{ article.title }}</h3>
              <p v-if="article.description" class="mt-1 text-sm text-muted-foreground group-hover:text-current line-clamp-2">{{ article.description }}</p>
            </NuxtLink>
          </div>
        </section>
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
const route = useRoute()
const slug = route.params.slug as string

const { data: project } = await useAsyncData(`project-${slug}`, () =>
  queryContent(`/projects/${slug}`)
    .where({ _path: `/projects/${slug}` })
    .findOne()
)

const { data: articles } = await useAsyncData(`project-${slug}-articles`, () =>
  queryContent(`/projects/${slug}`)
    .where({ _path: { $ne: `/projects/${slug}` } })
    .sort({ date: -1 })
    .find()
)

useHead({
  title: () => project.value ? `${project.value.title} | LabTime` : 'Project | LabTime',
  meta: [
    { name: 'description', content: () => project.value?.description || '' }
  ]
})
</script>
