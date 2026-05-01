<template>
  <div class="relative min-h-[80vh] flex flex-col font-sans">
    <div class="flex items-end justify-between pb-4">
      <div>
        <div class="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground-secondary mb-1">
          <YorhaScramble text="[ /ARCHIVE/LOGS ]" />
        </div>
        <h1 class="text-4xl md:text-5xl font-display font-bold uppercase tracking-wider text-foreground">
          <YorhaScramble text="System Logs" />
        </h1>
      </div>
      <div class="text-right hidden sm:block">
        <div class="font-bold text-lg text-foreground"><YorhaScramble :text="String(articles?.length || 0)" /> RECS</div>
        <div class="text-[10px] uppercase tracking-widest text-foreground-secondary"><YorhaScramble text="MODE : READ_ONLY" /></div>
      </div>
    </div>
    <div class="yorha-divider-double mb-10"></div>

    <!-- Content Layout -->
    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px] gap-8 xl:gap-16 grow items-start pb-24"
    >
      <!-- Main Log List -->
      <main class="space-y-6 relative z-10">
        <div
          class="text-[10px] uppercase text-foreground-secondary mb-8 border-b border-yorha-faint pb-2 flex justify-between tracking-widest font-mono"
        >
          <span><YorhaScramble text="[ INDEX_TABLE ]" /></span>
          <span class="hidden sm:inline-block">/var/log/entries/*</span>
        </div>

        <YorhaPanel
          v-for="(article, index) in articles"
          :key="article.path"
          as="NuxtLink"
          v-motion
          :to="article.path"
          :initial="{ opacity: 0, y: 15 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 400, delay: index * 60, ease: 'linear' },
          }"
          variant="simple"
          hover
          padding="p-0"
          class="group flex w-full max-w-full relative"
          :class="{ 'sm:ml-auto sm:mr-8 lg:mr-12': index % 2 === 1 }"
        >
          <div
            class="w-12 sm:w-16 shrink-0 border-r border-yorha-faint flex flex-col items-center justify-start pt-12 bg-transparent relative"
          >
            <span
              class="text-foreground font-display font-bold text-xl sm:text-2xl transform rotate-90 tracking-widest whitespace-nowrap group-hover:text-background transition-colors"
            >
              No.{{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>

          <div class="grow p-6 lg:p-12 flex flex-col relative z-10 justify-between">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
              <h2
                class="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider leading-none wrap-break-word group-hover:text-background transition-colors"
              >
                {{ article.title }}
              </h2>
              <div
                v-if="!article.isProjectArticle"
                class="text-[10px] uppercase font-bold tracking-widest opacity-60 text-left sm:text-right shrink-0 whitespace-nowrap mt-1 border border-yorha-faint px-2 py-0.5 group-hover:text-background group-hover:border-background/50 group-hover:opacity-100 transition-all"
              >
                {{ article.date }}
              </div>
            </div>

            <p
              class="text-sm md:text-base opacity-80 mb-8 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl mt-auto group-hover:text-background/80 transition-colors"
            >
              {{ article.description }}
            </p>

            <div
              class="flex items-end justify-between mt-auto pt-4 border-t border-yorha-faint"
            >
              <div class="flex gap-2 items-center flex-wrap">
                <!-- Project Article Marker -->
                <span
                  v-if="article.isProjectArticle"
                  class="bg-foreground text-background border border-transparent px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest group-hover:bg-background group-hover:text-foreground transition-colors"
                >
                  PROJECT → {{ article.projectSlug?.replace(/-/g, ' ').toUpperCase() }}
                </span>
                <span
                  v-if="!article.isProjectArticle"
                  class="bg-foreground text-background border border-transparent px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest group-hover:bg-background group-hover:text-foreground transition-colors"
                >
                  {{ article.category || article.tags?.[0] || 'DATA' }}
                </span>
                <span
                  class="text-[10px] hidden sm:flex items-center opacity-50 px-2 py-0.5 border border-yorha-faint font-bold uppercase tracking-widest group-hover:text-background group-hover:border-background/50 group-hover:opacity-100 transition-colors"
                >
                  {{ getArchiveSizeLabel(article, index) }}
                </span>
              </div>
              <div class="text-[10px] font-bold uppercase flex items-center gap-1.5 px-2 py-0.5 tracking-widest group-hover:text-background transition-colors">
                <span>[ READ ]</span>
              </div>
            </div>
          </div>
        </YorhaPanel>
      </main>

      <!-- Right Side Diagnostic Panel -->
      <aside class="hidden lg:block relative z-10 w-full min-w-0">
        <YorhaPanel brackets variant="panel" class="sticky top-24">
          <div class="text-[10px] uppercase font-mono tracking-[0.2em] mb-6 flex items-center gap-2 border-b border-yorha-faint pb-3 text-foreground-secondary">
            <YorhaScramble text="[ SYS_MONITOR ]" />
          </div>

          <div class="space-y-3 text-xs font-sans font-bold uppercase tracking-widest">
            <div class="flex justify-between border-b border-yorha-faint pb-1.5">
              <span class="text-foreground-secondary"><YorhaScramble text="MEM_ALLOC" /></span>
              <span class="text-foreground"><YorhaScramble :text="memAlloc" /></span>
            </div>
            <div class="flex justify-between border-b border-yorha-faint pb-1.5">
              <span class="text-foreground-secondary"><YorhaScramble text="UPLINK" /></span>
              <span class="text-yorha-green"><YorhaScramble text="SECURE" /></span>
            </div>
            <div class="flex justify-between border-b border-yorha-faint pb-1.5">
              <span class="text-foreground-secondary"><YorhaScramble text="THREADS" /></span>
              <span><YorhaScramble :text="threadPoolState" /></span>
            </div>

            <div class="pt-4">
              <div class="text-foreground-secondary mb-2 text-[10px]">
                <YorhaScramble text="[ BUFFER_STATUS ]" />
              </div>
              <div class="h-2 w-full border border-yorha-strong p-0.5">
                <div
                  class="h-full bg-foreground opacity-80"
                  :style="{ width: bufferWidth + '%' }"
                ></div>
              </div>
            </div>

            <!-- Terminal Boot Sequence -->
            <div class="pt-6 space-y-1.5 min-h-35">
              <div
                class="text-foreground-secondary mb-3 text-[10px] border-b border-yorha-faint pb-1"
              >
                <YorhaScramble text="[ ACTIVITY_LOG ]" />
              </div>
              <div
                v-for="cmd in activeCommands"
                :key="cmd"
                class="flex items-center gap-2 text-[10px]"
              >
                <span class="text-foreground font-black">></span>
                <span class="truncate"><YorhaScramble :text="cmd" /></span>
              </div>
            </div>
          </div>
        </YorhaPanel>
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

  return allItems.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime()
    const dateB = new Date(b.date || 0).getTime()
    return dateB - dateA
  })
})

const memAlloc = '0x00FFa1'
const threadPoolState = 'ACTIVE [8/8]'
const bufferWidth = 85

const bootCommands = [
  'QUERYING ARCHIVE SHARDS...',
  'MANIFEST VALIDATION: OK',
  'DECRYPTING HEADERS...',
  'INDEX COMPILED.',
  'AWAITING INPUT_',
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
