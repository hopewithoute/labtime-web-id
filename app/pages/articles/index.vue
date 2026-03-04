<template>
  <div class="space-y-12">
    <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-foreground pb-4 mb-8">
      <div>
        <h1 class="text-4xl font-extrabold uppercase tracking-tighter mb-2">Articles</h1>
        <p class="text-lg max-w-xl text-muted-foreground">Short-form notes, tutorials, and development logs.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <NuxtLink 
        v-for="article in articles" 
        :key="article._path" 
        :to="article._path"
        class="flex flex-col p-6 border border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-card text-card-foreground group"
      >
        <div class="flex justify-between items-start mb-4">
          <Badge variant="secondary" class="font-mono uppercase rounded-none">
            {{ article.category || article.tags?.[0] || 'Note' }}
          </Badge>
          <time class="text-sm font-mono text-muted-foreground">{{ article.date }}</time>
        </div>
        <h2 class="text-xl font-bold mb-3 group-hover:text-accent">{{ article.title }}</h2>
        <p class="text-sm grow">{{ article.description }}</p>
        <div class="mt-6">
          <Button variant="outline" class="w-full rounded-none border-foreground group-hover:bg-accent group-hover:text-white group-hover:border-accent">
            Read Article
          </Button>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: articles } = await useAsyncData('all-articles', () =>
  queryContent()
    .where({
      _extension: 'md',
      $or: [
        { _dir: 'articles' },
        { _path: { $contains: '/projects/' }, _dir: { $ne: 'projects' } }
      ]
    })
    .sort({ date: -1 })
    .find()
)

useHead({
  title: 'Articles | LabTime',
  meta: [
    { name: 'description', content: 'Short-form notes, tutorials, and development logs.' }
  ]
})
</script>


