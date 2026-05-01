<template>
  <main class="relative min-h-screen">
    <!-- Reading Progress Bar -->
    <Teleport to="body">
      <div class="fixed top-0 left-0 right-0 h-1.5 z-50 bg-foreground/10 pointer-events-none">
        <div
          class="h-full bg-foreground transition-[width] duration-150 ease-out"
          :style="{ width: `${scrollProgress}%` }"
        />
      </div>
    </Teleport>

    <div v-if="article" ref="articleRef">
      <article>
        <!-- Breadcrumb -->
        <nav
          class="flex items-center gap-2 mb-8 font-mono text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex-wrap"
        >
          <NuxtLink
            to="/projects"
            class="px-1 border border-transparent"
          >
            PRJ_ROOT
          </NuxtLink>
          <span class="opacity-50">/</span>
          <NuxtLink
            :to="`/projects/${slug}`"
            class="px-1 border border-transparent"
          >
            {{ parentProject?.title || slug }}
          </NuxtLink>
          <span class="opacity-50">/</span>
          <span
            class="text-foreground border border-foreground px-1 truncate max-w-50 md:max-w-none"
          >
            {{ article.title }}
          </span>
        </nav>

        <YorhaPanel
          as="article"
          variant="panel"
          brackets
          padding="p-0 mt-8 mb-16"
        >
          <!-- Header Area -->
          <header class="p-6 md:p-8 lg:p-12 border-b border-yorha-faint">
            <div class="flex justify-between items-start mb-6">
              <span
                v-if="article.category"
                class="font-mono text-xs uppercase font-bold tracking-widest bg-foreground text-background px-3 py-1"
              >
                {{ article.category }}
              </span>
              <span
                v-else
                class="font-mono text-xs uppercase font-bold tracking-widest bg-foreground text-background px-3 py-1"
              >
                LOG
              </span>
            </div>

            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6"
            >
              {{ article.title }}
            </h1>

            <div class="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-2">
              RECORD_DESC //
            </div>
            <p
              v-if="article.description"
              class="text-lg md:text-xl max-w-4xl border-l-[6px] border-accent pl-6 py-2 bg-accent/5 font-medium mb-8"
            >
              {{ article.description }}
            </p>

            <div
              class="flex items-center justify-between mt-auto"
            >
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="font-mono text-[10px] uppercase px-2 py-1 border border-foreground font-bold"
                >
                  {{ tag }}
                </span>
              </div>
              <span
                v-if="estimatedReadTime"
                class="font-mono text-[10px] uppercase font-bold tracking-widest text-accent ml-4 shrink-0"
              >
                [ {{ estimatedReadTime }} MIN_READ ]
              </span>
            </div>
          </header>

          <!-- Content Area -->
          <div class="p-6 md:p-10 lg:p-12">
            <div
              class="article-prose prose prose-neutral prose-lg dark:prose-invert prose-link-fill max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-h2:border-b-2 prose-h2:border-foreground/20 prose-h2:pb-2 prose-a:no-underline prose-a:font-bold prose-a:text-foreground prose-a:px-1 prose-pre:border-2 prose-pre:border-foreground prose-pre:rounded-none prose-pre:bg-muted/30 prose-img:border-4 prose-img:border-foreground prose-img:rounded-none"
            >
              <ContentRenderer :value="article" />
            </div>
          </div>
        </YorhaPanel>

        <!-- Prev / Next Navigation -->
        <nav v-if="prevArticle || nextArticle" class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            v-if="prevArticle"
            :to="prevArticle.path"
            class="block p-6 yorha-panel group hover:bg-foreground/5 transition-colors relative"
          >
            <span
              class="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block border-b border-border pb-2"
            >
              &lt;&lt; PROC_PREV
            </span>
            <p
              class="font-black text-xl uppercase tracking-tight mt-2"
            >
              {{ prevArticle.title }}
            </p>
          </NuxtLink>
          <div v-else />
          <NuxtLink
            v-if="nextArticle"
            :to="nextArticle.path"
            class="block p-6 yorha-panel group hover:bg-foreground/5 transition-colors relative text-right"
          >
            <span
              class="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block border-b border-border pb-2"
            >
              PROC_NEXT &gt;&gt;
            </span>
            <p
              class="font-black text-xl uppercase tracking-tight mt-2"
            >
              {{ nextArticle.title }}
            </p>
          </NuxtLink>
        </nav>

        <!-- Back to top -->
        <div class="mt-16 text-center pt-8">
          <div class="yorha-divider-double mb-12"></div>
          <button
            class="font-mono text-sm uppercase font-bold tracking-widest text-muted-foreground"
            @click="scrollToTop"
          >
            [&uarr; SYS_TOP]
          </button>
        </div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const slug = route.params.slug as string
const articleSlug = route.params.article as string

// Fetch the article
const { data: article } = await useAsyncData(`project-article-${slug}-${articleSlug}`, () =>
  queryCollection('projectArticles').path(`/projects/${slug}/${articleSlug}`).first()
)

// Fetch parent project for breadcrumb
const { data: parentProject } = await useAsyncData(`project-parent-${slug}`, () =>
  queryCollection('projectArticles').path(`/projects/${slug}`).first()
)

// Fetch sibling articles for prev/next navigation
const { data: siblings } = await useAsyncData(`project-siblings-${slug}`, () =>
  queryCollection('projectArticles')
    .where('path', 'LIKE', `/projects/${slug}/%`)
    .where('path', '<>', `/projects/${slug}`)
    .order('date', 'ASC')
    .all()
)

const currentIndex = computed(
  () => siblings.value?.findIndex((s) => s.path === article.value?.path) ?? -1
)
const prevArticle = computed(() =>
  currentIndex.value > 0 ? siblings.value?.[currentIndex.value - 1] : null
)
const nextArticle = computed(() =>
  siblings.value && currentIndex.value < siblings.value.length - 1
    ? siblings.value[currentIndex.value + 1]
    : null
)

// Estimated read time (avg 200 words/min for technical content)
const estimatedReadTime = computed(() => {
  if (!article.value?.body) return null
  const text = JSON.stringify(article.value.body)
  const wordCount = text.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return minutes
})

// Scroll progress tracking
const scrollProgress = ref(0)
const articleRef = ref<HTMLElement | null>(null)

function updateProgress() {
  if (!articleRef.value) return
  const el = articleRef.value
  const rect = el.getBoundingClientRect()
  const total = el.scrollHeight - window.innerHeight
  const scrolled = -rect.top
  scrollProgress.value = Math.min(100, Math.max(0, (scrolled / total) * 100))
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})

useHead({
  title: () => (article.value ? `${article.value.title} | LabTime` : 'Article | LabTime'),
  meta: [{ name: 'description', content: () => article.value?.description || '' }],
})
</script>

