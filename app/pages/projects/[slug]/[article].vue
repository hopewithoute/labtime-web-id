<template>
  <main>
    <div v-if="article">
      <article>
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 mb-8 font-mono text-sm uppercase flex-wrap">
          <NuxtLink to="/projects" class="hover:text-accent">Projects</NuxtLink>
          <span>/</span>
          <NuxtLink :to="`/projects/${slug}`" class="hover:text-accent">{{ parentProject?.title || slug }}</NuxtLink>
          <span>/</span>
          <span class="text-muted-foreground truncate">{{ article.title }}</span>
        </nav>

        <!-- Header -->
        <header class="mb-10 border-b-4 border-foreground pb-8">
          <Badge
            v-if="article.category"
            variant="secondary"
            class="font-mono uppercase mb-4 rounded-none text-xs"
          >
            {{ article.category }}
          </Badge>
          <h1 class="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            {{ article.title }}
          </h1>
          <p v-if="article.description" class="text-xl max-w-3xl text-muted-foreground">
            {{ article.description }}
          </p>
          <div class="mt-6 flex items-center gap-4">
            <time class="font-mono text-sm text-muted-foreground">{{ article.date }}</time>
            <div class="flex gap-2 flex-wrap">
              <Badge
                v-for="tag in article.tags"
                :key="tag"
                variant="outline"
                class="font-mono uppercase px-2 py-0.5 rounded-none border-foreground text-xs"
              >
                {{ tag }}
              </Badge>
            </div>
          </div>
        </header>

        <!-- Content -->
        <div
          class="max-w-3xl prose prose-neutral prose-lg dark:prose-invert prose-link-fill
                      prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter
                      prose-a:no-underline
                      prose-pre:border prose-pre:border-foreground prose-pre:rounded-none
                      prose-img:border prose-img:border-foreground prose-img:rounded-none"
        >
          <ContentRenderer :value="article" />
        </div>

        <!-- Prev / Next Navigation -->
        <nav v-if="prevArticle || nextArticle" class="mt-16 border-t-4 border-foreground pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            v-if="prevArticle"
            :to="prevArticle.path"
            class="block p-4 border border-foreground group transition-none"
          >
            <span class="font-mono text-xs uppercase text-muted-foreground group-hover:text-current">&larr; Previous</span>
            <p class="font-bold uppercase tracking-tight mt-1 group-hover:text-accent">{{ prevArticle.title }}</p>
          </NuxtLink>
          <div v-else />
          <NuxtLink
            v-if="nextArticle"
            :to="nextArticle.path"
            class="block p-4 border border-foreground group transition-none text-right"
          >
            <span class="font-mono text-xs uppercase text-muted-foreground group-hover:text-current">Next &rarr;</span>
            <p class="font-bold uppercase tracking-tight mt-1 group-hover:text-accent">{{ nextArticle.title }}</p>
          </NuxtLink>
        </nav>
      </article>
    </div>

    <!-- 404 -->
    <div v-else class="py-20 text-center">
      <h1 class="text-8xl font-black mb-4 uppercase">404</h1>
      <p class="text-xl mb-8">Article not found.</p>
      <Button as-child variant="default" class="rounded-none uppercase font-bold tracking-tight">
        <NuxtLink :to="`/projects/${slug}`">Return to Project</NuxtLink>
      </Button>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const articleSlug = route.params.article as string

// Fetch the article
const { data: article } = await useAsyncData(`project-article-${slug}-${articleSlug}`, () =>
  queryCollection('projectArticles')
    .path(`/projects/${slug}/${articleSlug}`)
    .first()
)

// Fetch parent project for breadcrumb
const { data: parentProject } = await useAsyncData(`project-parent-${slug}`, () =>
  queryCollection('projectArticles')
    .path(`/projects/${slug}`)
    .first()
)

// Fetch sibling articles for prev/next navigation
const { data: siblings } = await useAsyncData(`project-siblings-${slug}`, () =>
  queryCollection('projectArticles')
    .where('path', 'LIKE', `/projects/${slug}/%`)
    .where('path', '<>', `/projects/${slug}`)
    .order('date', 'ASC')
    .all()
)

const currentIndex = computed(() =>
  siblings.value?.findIndex(s => s.path === article.value?.path) ?? -1
)
const prevArticle = computed(() =>
  currentIndex.value > 0 ? siblings.value?.[currentIndex.value - 1] : null
)
const nextArticle = computed(() =>
  siblings.value && currentIndex.value < siblings.value.length - 1
    ? siblings.value[currentIndex.value + 1]
    : null
)

useHead({
  title: () => article.value ? `${article.value.title} | LabTime` : 'Article | LabTime',
  meta: [
    { name: 'description', content: () => article.value?.description || '' }
  ]
})
</script>

