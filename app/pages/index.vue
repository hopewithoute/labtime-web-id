<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <CornerFrame>
      <section class="p-8 md:p-12 border-b-4 border-foreground overflow-hidden">
        <h1 
          v-motion
          :initial="{ y: 100, opacity: 0 }"
          :enter="{ y: 0, opacity: 1, transition: { duration: 600, ease: 'easeOut' } }"
          class="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6"
        >
          LabTime<span class="text-accent">.init()</span>
        </h1>
        <p 
          v-motion
          :initial="{ y: 20, opacity: 0 }"
          :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 600, ease: 'easeOut' } }"
          class="text-2xl md:text-3xl max-w-3xl font-medium leading-tight"
        >
          A technical journal documenting architectural decisions, performance optimizations, and the pursuit of elegant systems.
        </p>
        
        <div class="mt-8 flex gap-4 items-center">
          <MetricTag label="OS" value="Nuxt_v4" />
          <MetricTag label="Status" value="Ready" variant="status" />
        </div>
      </section>
    </CornerFrame>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Latest Articles -->
      <section class="space-y-8">
        <div class="flex items-baseline justify-between border-b border-foreground pb-2">
          <h2 class="text-2xl font-black uppercase tracking-tight">Latest Articles</h2>
          <NuxtLink to="/articles" class="text-sm font-bold uppercase hover:text-accent underline underline-offset-4">View All</NuxtLink>
        </div>

        <ContentList
          v-slot="{ list }"
          path="/articles"
          :query="{ limit: 3, sort: [{ date: -1 }] }"
        >
          <div class="space-y-6">
            <NuxtLink
              v-for="article in list"
              :key="article._path"
              v-motion
              :to="article._path"
              :hovered="{ x: 8, transition: { duration: 200 } }"
              class="block p-5 border border-foreground hover:bg-accent hover:text-white transition-none group cursor-crosshair"
            >
              <div class="flex justify-between items-start mb-2">
                <span class="font-mono text-xs uppercase opacity-70 group-hover:opacity-100 flex items-center gap-2">
                  <span class="text-accent group-hover:text-white">[<span class="inline-block w-2 text-center">{{ article._path ? 'x' : ' ' }}</span>]</span>
                  {{ article.tags?.[0] || 'Note' }}
                </span>
                <time class="font-mono text-xs opacity-70 group-hover:opacity-100">{{ article.date }}</time>
              </div>
              <h3 class="text-xl font-bold uppercase tracking-tight">{{ article.title }}</h3>
            </NuxtLink>
          </div>
        </ContentList>
      </section>

      <!-- Projects -->
      <section class="space-y-8">
        <div class="flex items-baseline justify-between border-b border-foreground pb-2">
          <h2 class="text-2xl font-black uppercase tracking-tight">Projects</h2>
          <NuxtLink to="/projects" class="text-sm font-bold uppercase hover:text-accent underline underline-offset-4">View All</NuxtLink>
        </div>

        <div v-if="projects?.length" class="space-y-6">
          <NuxtLink
            v-for="project in projects"
            :key="project._path"
            v-motion
            :to="project._path"
            :hovered="{ x: 8, transition: { duration: 200 } }"
            class="block border-l-4 border-foreground pl-6 py-2 hover:border-accent group transition-none cursor-crosshair"
          >
            <div class="flex items-center gap-2 mb-1">
              <span class="text-accent font-bold font-mono text-xs">[<span class="inline-block w-2 text-center">{{ project._path ? 'x' : ' ' }}</span>]</span>
              <span v-if="project.role" class="font-mono text-xs uppercase text-muted-foreground group-hover:text-accent">{{ project.role }}</span>
            </div>
            <h3 class="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-accent">{{ project.title }}</h3>
            <p class="mt-2 text-sm line-clamp-2">{{ project.description }}</p>
            <div class="mt-2 flex gap-1.5 flex-wrap">
              <Badge
                v-for="tech in project.tech_stack?.slice(0, 3)"
                :key="tech"
                variant="outline"
                class="font-mono uppercase text-[10px] rounded-none border-current px-1.5 py-0"
              >
                {{ tech }}
              </Badge>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>

    <!-- Status Section -->
    <section class="pt-12 border-t border-foreground flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="flex items-center gap-3 font-mono text-sm uppercase">
        <span class="w-3 h-3 bg-accent animate-pulse"></span>
        <span>System Operational</span>
      </div>
      <div class="font-mono text-xs text-muted-foreground uppercase">
        Last Sync: {{ new Date().toISOString() }}
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home | LabTime',
  meta: [
    { name: 'description', content: 'A technical blog and portfolio focusing on software architecture and performance.' }
  ]
})

const { data: projects } = await useAsyncData('home-projects', () =>
  queryContent('/projects')
    .where({ _file: 'index' })
    .sort({ date: -1 })
    .limit(2)
    .find()
)
</script>
