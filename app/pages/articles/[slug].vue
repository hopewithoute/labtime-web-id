<template>
  <main class="group/crt relative min-h-screen">
    <!-- Reading Progress Bar -->
    <Teleport to="body">
      <div class="fixed top-0 left-0 right-0 h-1.5 z-50 bg-foreground/10 pointer-events-none">
        <div
          class="h-full bg-foreground transition-[width] duration-150 ease-out"
          :style="{ width: `${scrollProgress}%` }"
        />
      </div>
    </Teleport>

    <div v-if="article" ref="articleRef" class="max-w-5xl mx-auto px-4">
      <article>
        <YorhaPanel
          as="article"
          variant="panel"
          brackets
          padding="p-0 mt-8 mb-32"
        >
          <!-- Header Area -->
          <header class="p-6 md:p-12 border-b border-yorha-faint">
            <div class="flex justify-between items-start mb-8">
              <span
                v-if="article.tags && article.tags.length > 0"
                class="font-mono text-xs uppercase font-bold tracking-widest bg-foreground text-background px-3 py-1"
              >
                {{ article.tags[0] }}
              </span>
              <span v-else class="font-mono text-xs uppercase font-bold tracking-widest bg-foreground text-background px-3 py-1">
                ARTICLE
              </span>
              <time class="font-mono text-xs font-bold tracking-widest text-muted-foreground">[{{ article.date }}]</time>
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              {{ article.title }}
            </h1>
            
            <div class="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-2">DOC_DESC //</div>
            <p v-if="article.description" class="text-xl md:text-2xl max-w-4xl border-l-[6px] border-accent pl-4 md:pl-8 py-4 bg-accent/5 font-medium mb-10 leading-relaxed">
              {{ article.description }}
            </p>
            
            <div class="flex items-center justify-between mt-auto">
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="tag in (article.tags || []).slice(1)"
                  :key="tag"
                  class="font-mono text-[10px] uppercase px-2 py-1 border border-foreground font-bold"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </header>

          <!-- Content Area -->
          <div class="p-6 md:p-12 lg:p-16">
            <div class="article-prose">
              <ContentRenderer :value="article" />
            </div>
          </div>
        </YorhaPanel>
      </article>
    </div>

    <!-- 404 -->
    <div v-else class="py-20 text-center border-4 border-foreground mt-8 bg-foreground text-background">
      <h1 class="text-8xl font-black mb-4 uppercase">404</h1>
      <p class="text-xl mb-8 font-mono tracking-widest uppercase">SYS_ERR // Article not found.</p>
      <NuxtLink to="/articles" class="text-accent underline font-mono uppercase tracking-widest font-bold">Return to Index</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useAsyncData(`article-${slug}`, () =>
  queryCollection('articles')
    .path(`/articles/${slug}`)
    .first()
)

// Scroll progress tracking
const scrollProgress = ref(0)
const articleRef = ref<HTMLElement | null>(null)

function updateProgress() {
  if (!articleRef.value) return
  const el = articleRef.value
  const rect = el.getBoundingClientRect()
  const total = el.scrollHeight - window.innerHeight
  if (total <= 0) {
    scrollProgress.value = 0
    return
  }
  const scrolled = -rect.top
  scrollProgress.value = Math.min(100, Math.max(0, (scrolled / total) * 100))
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})

useHead({
  title: () => article.value ? `${article.value.title} | LabTime` : 'Article | LabTime',
  meta: [
    { name: 'description', content: () => article.value?.description || '' }
  ]
})
</script>

<style scoped>
.group\/crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.05) 50%
  );
  background-size: 100% 8px;
  z-index: 50;
  pointer-events: none;
}
.crt-hover:hover::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.05) 50%
  );
  background-size: 100% 4px;
  z-index: 50;
  pointer-events: none;
}
</style>
