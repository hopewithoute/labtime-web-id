<template>
  <div class="relative min-h-[80vh] group/crt font-mono text-foreground flex flex-col">
    <!-- Header Area -->
    <DiagnosticHeader
      title="System Logs"
      system-request="/ARCHIVE/LOGS"
      :count="articles?.length || 0"
      count-label="RECORDS"
      context-label="MODE"
      context-value="READ_ONLY"
      status="LIVE"
    />

    <!-- Content Layout -->
    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px] gap-8 xl:gap-16 flex-grow items-start pb-24"
    >
      <!-- Main Log List -->
      <main class="space-y-6 relative z-10">
        <div
          class="text-xs uppercase text-muted-foreground mb-8 opacity-60 border-b border-dashed border-foreground/30 pb-2 flex justify-between"
        >
          <span>[INDEX_TABLE]</span>
          <span class="hidden sm:inline-block">/var/log/entries/*</span>
        </div>

        <NuxtLink
          v-for="(article, index) in articles"
          :key="article.path"
          v-motion
          :to="article.path"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 450, delay: index * 80, ease: 'easeOut' },
          }"
          class="group flex w-full max-w-full border-2 border-foreground hover:bg-foreground hover:text-background transition-colors relative crt-hover bg-background"
          :class="{ 'sm:ml-auto sm:mr-8 lg:mr-12': index % 2 === 1 }"
        >
          <!-- Number sidebar -->
          <div
            class="w-12 sm:w-16 shrink-0 border-r-2 border-foreground group-hover:border-background flex flex-col items-center justify-center bg-foreground/5 group-hover:bg-transparent overflow-hidden relative z-10 transition-colors"
          >
            <span
              class="text-accent group-hover:text-background font-black text-xl sm:text-2xl transform -rotate-90 tracking-tighter whitespace-nowrap transition-colors"
            >
              #{{ String(index).padStart(2, '0') }}
            </span>
          </div>

          <div class="grow p-5 lg:p-8 flex flex-col relative z-10">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
              <h2
                class="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none group-hover:underline underline-offset-4 decoration-2 break-words"
              >
                {{ article.title }}
              </h2>
              <div
                v-if="!article.isProjectArticle"
                class="text-xs font-mono opacity-60 group-hover:opacity-100 text-left sm:text-right shrink-0 whitespace-nowrap mt-1 border border-foreground/20 group-hover:border-background/20 px-2 py-0.5 transition-colors"
              >
                {{ article.date }}
              </div>
            </div>

            <p
              class="text-sm md:text-base opacity-80 mb-8 line-clamp-2 sm:line-clamp-3 leading-relaxed font-sans max-w-2xl mt-auto"
            >
              {{ article.description }}
            </p>

            <div
              class="flex items-end justify-between mt-auto pt-4 border-t-2 border-dashed border-foreground/20 group-hover:border-background/30"
            >
              <div class="flex gap-2 items-center flex-wrap">
                <!-- Project Article Marker -->
                <span
                  v-if="article.isProjectArticle"
                  class="bg-accent text-background px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest"
                >
                  PROJECT → {{ article.projectSlug?.replace(/-/g, ' ').toUpperCase() }}
                </span>
                <span
                  class="bg-foreground text-background group-hover:bg-background group-hover:text-foreground px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest"
                >
                  {{ article.category || article.tags?.[0] || 'DATA' }}
                </span>
                <span
                  class="text-[10px] hidden sm:flex items-center opacity-50 px-2 py-1 border border-foreground/30 group-hover:border-background/30 font-bold"
                >
                  {{ getArchiveSizeLabel(article, index) }}
                </span>
              </div>
              <div
                class="text-xs md:text-sm font-bold uppercase group-hover:text-accent flex items-center gap-1.5 transition-colors bg-accent/10 px-3 py-1 group-hover:bg-transparent"
              >
                <span>OPEN</span>
                <span class="group-hover:translate-x-1 transition-transform">-></span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </main>

      <!-- Right Side Diagnostic Panel -->
      <aside class="hidden lg:block relative z-10 w-full min-w-0">
        <CornerFrame class="sticky top-24 bg-background">
          <div class="p-6 md:p-8">
            <div
              class="text-accent font-black tracking-tight text-xl mb-6 flex items-center gap-3 border-b-2 border-foreground pb-4"
            >
              <span class="w-2.5 h-2.5 bg-accent inline-block animate-pulse"></span>
              SYS_MONITOR
            </div>

            <div class="space-y-4 text-xs font-bold">
              <div class="flex justify-between border-b border-dashed border-foreground/20 pb-2">
                <span class="opacity-60">MEM_ALLOC</span>
                <span class="font-mono text-accent">{{ memAlloc }}</span>
              </div>
              <div class="flex justify-between border-b border-dashed border-foreground/20 pb-2">
                <span class="opacity-60">UPLINK</span>
                <span class="text-green-500">SECURE</span>
              </div>
              <div class="flex justify-between border-b border-dashed border-foreground/20 pb-2">
                <span class="opacity-60">THREADS</span>
                <span>{{ threadPoolState }}</span>
              </div>

              <div class="pt-6">
                <div class="opacity-60 mb-2 text-[10px] uppercase tracking-widest">
                  Buffer Status
                </div>
                <div class="h-3 w-full border-2 border-foreground p-0.5">
                  <div
                    class="h-full bg-accent animate-pulse opacity-80"
                    :style="{ width: bufferWidth + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Terminal Boot Sequence -->
              <div class="pt-8 space-y-2 min-h-[140px] text-[11px] leading-tight">
                <div
                  class="opacity-50 mb-3 uppercase tracking-widest border-b border-foreground/20 pb-1"
                >
                  Activity Log
                </div>
                <div
                  v-for="cmd in activeCommands"
                  :key="cmd"
                  class="animate-in fade-in slide-in-from-bottom-2 duration-300 opacity-80 break-words"
                >
                  <span class="text-accent font-black mr-1">></span>
                  {{ cmd }}
                </div>
              </div>
            </div>
          </div>
        </CornerFrame>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ArticleItem {
  path: string
  title?: string
  description?: string
  date?: string
  tags?: string[]
  category?: string
  isProjectArticle?: boolean
  projectSlug?: string
}

const { data: articles } = await useAsyncData('all-articles', async () => {
  const [regularArticles, projectArticles] = await Promise.all([
    queryCollection('articles').all(),
    queryCollection('projectArticles').all(),
  ])

  // Transform and merge both collections
  const allItems: ArticleItem[] = [
    ...regularArticles.map((a) => ({
      path: a.path,
      title: a.title,
      description: a.description,
      date: a.date,
      tags: a.tags,
      category: a.category,
      isProjectArticle: false,
    })),
    ...projectArticles.map((a) => {
      // Extract project slug from path like /projects/digital-school/hybrid-solver
      const pathParts = a.path?.split('/') || []
      const projectSlug = pathParts[2] || ''
      return {
        path: a.path,
        title: a.title,
        description: a.description,
        date: a.date,
        tags: a.tags,
        category: a.category,
        isProjectArticle: true,
        projectSlug,
      }
    }),
  ]

  // Sort by date descending
  return allItems.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime()
    const dateB = new Date(b.date || 0).getTime()
    return dateB - dateA
  })
})

// Telemetry state
const memAlloc = '0x00FFa1'
const threadPoolState = 'active [8/8]'
const bufferWidth = 85

// Commands sequence
const bootCommands = [
  'Querying archive shards...',
  'Manifest validation: OK',
  'Decrypting metadata headers...',
  'Index compilation successful.',
  'Awaiting operator input_',
] as const
const activeCommands = computed(() => [...bootCommands])

const getArchiveSizeLabel = (
  article: ArticleItem,
  index: number
) => {
  const seed = `${article.title ?? ''}:${article.category ?? article.tags?.[0] ?? ''}:${index}`
  const hash = Array.from(seed).reduce((total, character) => total + character.charCodeAt(0), 0)

  return `${200 + (hash % 800)}KB`
}

useHead({
  title: 'System Logs | LabTime',
  meta: [{ name: 'description', content: 'Short-form notes, tutorials, and development logs.' }],
})
</script>

<style scoped>
.group\/crt::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%);
  background-size: 100% 8px;
  z-index: 50;
  pointer-events: none;
}
.crt-hover:hover::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 50%);
  background-size: 100% 4px;
  z-index: 50;
  pointer-events: none;
}
</style>
