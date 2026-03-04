<template>
  <div class="space-y-12">
    <div>
      <h1 class="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4">Projects</h1>
      <p class="text-xl max-w-4xl">Deep dives into systems I've built — the problems, the decisions, and the implementations that shaped them.</p>
    </div>

    <div v-if="projects?.length" class="grid grid-cols-1 gap-0 border-y border-foreground">
      <NuxtLink
        v-for="project in projects"
        :key="project.path"
        :to="project.path"
        class="block p-6 md:p-8 border-b border-foreground last:border-b-0 group transition-none"
      >
        <div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 md:gap-4 mb-3">
          <h2 class="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-accent">{{ project.title }}</h2>
          <span v-if="project.role" class="text-sm font-mono uppercase shrink-0 text-muted-foreground group-hover:text-current">{{ project.role }}</span>
        </div>
        <p class="max-w-3xl mb-4 text-lg">{{ project.description }}</p>
        <div class="flex gap-2 flex-wrap">
          <Badge
            v-for="tech in flattenTechStack(project.meta?.tech_stack)"
            :key="tech"
            variant="outline"
            class="font-mono uppercase rounded-none border-current text-current text-xs"
          >
            {{ tech }}
          </Badge>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Projects | System.Log',
  meta: [
    { name: 'description', content: 'Deep dives into systems I\'ve built — the problems, the decisions, and the implementations.' }
  ]
})

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects')
    .order('date', 'DESC')
    .all()
)
</script>

