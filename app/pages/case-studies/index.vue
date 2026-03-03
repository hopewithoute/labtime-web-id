<template>
  <div class="space-y-12">
    <div>
      <h1 class="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4">Case Studies</h1>
      <p class="text-xl max-w-2xl">Deep dives into hard technical problems, architectural decisions, and the resulting systems.</p>
    </div>

    <ContentList
      v-slot="{ list }"
      path="/case-studies"
    >
      <div class="grid grid-cols-1 gap-0 border-y border-foreground">
        <NuxtLink 
          v-for="article in list" 
          :key="article._path" 
          :to="article._path"
          class="block p-4 md:p-6 border-b border-foreground last:border-b-0 hover:bg-black hover:text-white group transition-none"
        >
          <div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 md:gap-4 mb-4">
            <h2 class="text-2xl font-bold group-hover:text-accent">{{ article.title }}</h2>
            <time class="text-sm font-mono shrink-0">{{ article.date }}</time>
          </div>
          <p class="max-w-3xl mb-4">{{ article.description }}</p>
          <div class="flex gap-2 flex-wrap">
            <Badge v-for="tag in article.tags" :key="tag" variant="outline" class="font-mono uppercase rounded-none border-current text-current">
              {{ tag }}
            </Badge>
          </div>
        </NuxtLink>
      </div>
    </ContentList>
  </div>
</template>


