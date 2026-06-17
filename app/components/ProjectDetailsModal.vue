<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100] bg-background/95 backdrop-blur overflow-y-auto w-full hide-scrollbar">
      <div v-if="project" class="min-h-screen relative bg-background/50">
        
        <!-- Sticky Close Button -->
        <button 
          class="fixed top-4 right-4 md:top-8 md:right-8 z-[110] text-[10px] font-mono font-bold uppercase tracking-widest text-background bg-foreground border border-foreground hover:bg-background hover:text-foreground px-4 py-2 transition-colors flex items-center shadow-lg"
          @click="$emit('close')"
        >
          [ CLOSE ]
        </button>

        <article class="pt-8 md:pt-16 px-4 md:px-8 pb-32">
          <div class="max-w-5xl mx-auto w-full border border-border bg-background mb-16 shadow-2xl">
            <!-- Header Area -->
          <div class="w-full text-left p-6 md:p-8 flex flex-col gap-4">
            <div class="flex flex-wrap items-center justify-between gap-4 w-full">
              <div class="flex flex-wrap items-center gap-3">
                <span class="text-[11px] md:text-xs font-sans font-bold uppercase tracking-[0.24em] text-foreground bg-foreground/10 px-2 py-1">
                  {{ project.role || 'Core System Ownership' }}
                </span>
              </div>
              
              <!-- Back to Projects Button (Now Close Modal) -->
              <button
                class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border px-3 py-1 hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                @click="$emit('close')"
              >
                <span>&larr;</span> BACK
              </button>
            </div>
            
            <div>
              <h1 class="text-3xl md:text-5xl font-display font-bold uppercase tracking-[0.02em] leading-tight mt-2 mb-4 text-foreground">
                <YorhaScramble :text="project.title" />
              </h1>
              <p class="text-base md:text-lg leading-relaxed text-foreground-secondary max-w-3xl">
                {{ project.description }}
              </p>
            </div>

            <!-- Quick Tech Stack (Top 5) -->
            <div class="mt-4 flex flex-wrap gap-2 pb-4">
              <span
                v-for="tech in flattenTechStack(project.tech_stack)?.slice(0, 5)"
                :key="tech"
                class="bg-background-secondary/40 px-2 py-1 text-xs font-sans font-bold uppercase tracking-[0.18em] text-foreground border border-transparent"
              >
                {{ tech }}
              </span>
              <span v-if="flattenTechStack(project.tech_stack)?.length > 5" class="px-2 py-1 text-[11px] font-mono text-foreground-secondary flex items-center">
                +{{ flattenTechStack(project.tech_stack).length - 5 }} more
              </span>
            </div>
          </div>

          <!-- Content (STAR Method - Matches Card Body) -->
          <div class="p-6 md:p-8 pt-8 border-t border-border space-y-12">
            
            <!-- Problem / Situation -->
            <div v-if="project.problem" class="relative">
              <div class="text-xs font-mono tracking-[0.24em] uppercase font-bold text-foreground flex items-center gap-2 mb-4">
                <span class="w-2 h-[1px] bg-foreground"></span>
                The Problem
              </div>
              <ul v-if="Array.isArray(project.problem)" class="space-y-3 text-base leading-relaxed text-foreground-secondary ml-4 border-l border-border pl-5 py-1 list-none">
                <li v-for="(item, index) in project.problem" :key="index" class="relative before:content-['>_'] before:absolute before:-left-7 before:text-xs before:font-mono before:text-foreground/50 pl-2">
                  {{ item }}
                </li>
              </ul>
              <p v-else class="text-base leading-relaxed text-foreground-secondary ml-4 border-l border-border pl-5 py-1">
                {{ project.problem }}
              </p>
            </div>

            <!-- Approach / Action -->
            <div v-if="project.approach" class="relative">
              <div class="text-xs font-mono tracking-[0.24em] uppercase font-bold text-foreground flex items-center gap-2 mb-4">
                <span class="w-2 h-[1px] bg-foreground"></span>
                The Approach
              </div>
              <ul v-if="Array.isArray(project.approach)" class="space-y-3 text-base leading-relaxed text-foreground-secondary ml-4 border-l border-border pl-5 py-1 list-none">
                <li v-for="(item, index) in project.approach" :key="index" class="relative before:content-['>_'] before:absolute before:-left-7 before:text-xs before:font-mono before:text-foreground/50 pl-2">
                  {{ item }}
                </li>
              </ul>
              <p v-else class="text-base leading-relaxed text-foreground-secondary ml-4 border-l border-border pl-5 py-1">
                {{ project.approach }}
              </p>
            </div>

            <!-- Outcome / Result -->
            <div v-if="project.outcome" class="relative bg-foreground/5 p-6 md:p-8 border border-foreground/20">
              <div class="text-xs font-mono tracking-[0.24em] uppercase font-bold text-foreground flex items-center gap-2 mb-4">
                <span class="w-1.5 h-1.5 bg-foreground"></span>
                The Outcome
              </div>
              <ul v-if="Array.isArray(project.outcome)" class="space-y-3 text-base leading-relaxed text-foreground font-medium list-none">
                <li v-for="(item, index) in project.outcome" :key="index" class="relative flex gap-3">
                  <span class="text-foreground/60 text-sm mt-1">■</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
              <p v-else class="text-base leading-relaxed text-foreground font-medium">
                {{ project.outcome }}
              </p>
            </div>

            <!-- Detailed Tech Stack -->
            <div v-if="project.tech_stack" class="relative pt-8 mt-8 border-t border-border">
              <div class="text-xs font-mono tracking-[0.32em] uppercase text-foreground-secondary mb-6">
                Technical Architecture
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <div v-for="(stack, category) in project.tech_stack" :key="category" class="space-y-4">
                  <div class="text-xs font-sans font-bold uppercase tracking-[0.2em] text-foreground border-b border-border pb-2">
                    {{ category }}
                  </div>
                  <ul class="space-y-4">
                    <li v-for="item in stack" :key="item.name" class="flex flex-col gap-1.5">
                      <span class="text-sm font-mono font-bold text-foreground">{{ item.name }}</span>
                      <span class="text-xs text-foreground-secondary leading-relaxed">{{ item.reason }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Technical Architecture & App Screenshots (Bottom section) -->
        <div class="max-w-5xl mx-auto w-full">

            <!-- App Screenshots Gallery (Optional) -->
            <section v-if="project.app_screenshots?.length" class="mb-32">
              <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2 mb-10">
                <h2 class="text-3xl font-display font-bold uppercase tracking-wider text-foreground transition-colors hover:text-accent">
                  Application UI
                </h2>
                <div class="flex items-center gap-4">
                  <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden md:block">
                    [ UI_GALLERY ]
                  </div>
                  <div class="flex gap-1">
                    <button class="p-1.5 border border-border hover:border-foreground transition-colors bg-background text-foreground" aria-label="Previous Screenshot" @click="scrollAppCarousel('left')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button class="p-1.5 border border-border hover:border-foreground transition-colors bg-background text-foreground" aria-label="Next Screenshot" @click="scrollAppCarousel('right')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Main Large Image -->
              <YorhaPanel
                as="figure"
                brackets
                variant="none"
                padding="p-0"
                class="w-full mb-6 group"
              >
                <div ref="appScreenshotContainerRef" class="overflow-hidden bg-foreground aspect-[16/9] relative flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing">
                  <NuxtImg
                    :src="project.app_screenshots[selectedAppScreenshotIndex]?.src"
                    :alt="project.app_screenshots[selectedAppScreenshotIndex]?.alt || 'App Screenshot'"
                    class="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity select-none"
                    draggable="false"
                    format="webp"
                  />
                </div>
                <figcaption
                  v-if="project.app_screenshots[selectedAppScreenshotIndex]?.caption"
                  class="px-4 py-3 text-[10px] font-mono uppercase tracking-widest bg-foreground text-background"
                >
                  <span class="opacity-50 mr-2">_CAPTION:</span>
                  {{ project.app_screenshots[selectedAppScreenshotIndex].caption }}
                </figcaption>
              </YorhaPanel>

              <!-- Thumbnail Selector -->
              <div ref="appThumbnailsRef" class="flex overflow-x-auto snap-x hide-scrollbar gap-4 pb-4 scroll-smooth">
                <button
                  v-for="(screenshot, index) in project.app_screenshots"
                  :key="index"
                  class="relative shrink-0 snap-center w-32 md:w-40 aspect-[16/9] border transition-all overflow-hidden bg-background"
                  :class="selectedAppScreenshotIndex === index ? 'border-foreground' : 'border-border hover:border-foreground/50'"
                  @click="selectedAppScreenshotIndex = index"
                >
                  <NuxtImg
                    :src="screenshot.src"
                    :alt="screenshot.alt || 'Thumbnail'"
                    class="w-full h-full object-contain"
                    format="webp"
                  />
                  <!-- Overlay for unselected -->
                  <div v-if="selectedAppScreenshotIndex !== index" class="absolute inset-0 bg-background/40"></div>
                </button>
              </div>
            </section>

            <!-- Technical Architecture Gallery -->
            <section v-if="project.screenshots?.length" class="mb-32">
              <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2 mb-10">
                <h2 class="text-3xl font-display font-bold uppercase tracking-wider text-foreground transition-colors hover:text-accent">
                  Technical Architecture
                </h2>
                <div class="flex items-center gap-4">
                  <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden md:block">
                    [ DIAGRAM_GALLERY ]
                  </div>
                  <div class="flex gap-1">
                    <button class="p-1.5 border border-border hover:border-foreground transition-colors bg-background text-foreground" aria-label="Previous Slide" @click="scrollCarousel('left')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button class="p-1.5 border border-border hover:border-foreground transition-colors bg-background text-foreground" aria-label="Next Slide" @click="scrollCarousel('right')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div
                ref="carouselRef"
                class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 lg:gap-16 pb-8 scroll-smooth cursor-grab active:cursor-grabbing"
                @scroll="onCarouselScroll"
                @mousedown="onMouseDown"
                @mouseleave="onMouseLeave"
                @mouseup="onMouseUp"
                @mousemove="onMouseMove"
              >
                <div
                  v-for="(screenshot, index) in project.screenshots"
                  :key="index"
                  class="w-full min-w-full snap-center shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center select-none"
                >
                  <!-- Diagram Image (Optional) -->
                  <YorhaPanel
                    v-if="screenshot.src"
                    as="figure"
                    brackets
                    variant="none"
                    padding="p-0"
                    class="lg:col-span-7 xl:col-span-8 group"
                  >
                    <div class="overflow-hidden bg-foreground flex items-center justify-center">
                      <NuxtImg
                        :src="screenshot.src"
                        :alt="screenshot.title || screenshot.alt"
                        loading="lazy"
                        class="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
                        draggable="false"
                        format="webp"
                      />
                    </div>
                    <figcaption
                      v-if="screenshot.title"
                      class="px-4 py-3 text-[10px] font-mono uppercase tracking-widest bg-foreground text-background"
                    >
                      <span class="opacity-50 mr-2">_IMG_METADATA:</span>
                      {{ screenshot.title }}
                    </figcaption>
                  </YorhaPanel>

                  <!-- CV-Like Bullet Points -->
                  <div :class="screenshot.src ? 'lg:col-span-5 xl:col-span-4' : 'lg:col-span-12'">
                    <h3 class="text-2xl font-bold uppercase tracking-tight mb-4 border-b border-border pb-2 inline-block">
                      {{ screenshot.title }}
                    </h3>
                    <p v-if="screenshot.description" class="text-muted-foreground font-medium mb-6">
                      {{ screenshot.description }}
                    </p>
                    <ul v-if="screenshot.bullets?.length" class="space-y-4">
                      <li
                        v-for="(bullet, bIndex) in screenshot.bullets"
                        :key="bIndex"
                        class="relative pl-6 text-sm md:text-base font-medium"
                      >
                        <span class="absolute left-0 top-0.5 text-accent">⚡</span>
                        {{ bullet }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Thumbnail Selector for Technical Architecture -->
              <div ref="techThumbnailsRef" class="flex overflow-x-auto snap-x hide-scrollbar gap-4 pb-4 scroll-smooth">
                <button
                  v-for="(screenshot, index) in project.screenshots"
                  :key="index"
                  class="relative shrink-0 snap-center w-32 md:w-40 aspect-[16/9] border transition-all overflow-hidden bg-background"
                  :class="activeScreenshotIndex === index ? 'border-foreground' : 'border-border hover:border-foreground/50'"
                  @click="scrollToSlide(index)"
                >
                  <NuxtImg
                    v-if="screenshot.src"
                    :src="screenshot.src"
                    :alt="screenshot.title || 'Thumbnail'"
                    class="w-full h-full object-contain"
                    format="webp"
                  />
                  <div v-else class="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <span class="text-xs font-mono font-bold uppercase">{{ screenshot.title }}</span>
                  </div>
                  <!-- Overlay for unselected -->
                  <div v-if="activeScreenshotIndex !== index" class="absolute inset-0 bg-background/40"></div>
                </button>
              </div>
            </section>

          </div>
      </article>
      </div>

      <!-- 404 inside modal -->
      <div v-else class="min-h-screen flex flex-col items-center justify-center text-center bg-background">
        <h1 class="text-8xl font-black mb-4 uppercase">404</h1>
        <p class="text-xl mb-8">Project not found.</p>
        <Button variant="default" class="rounded-none uppercase font-bold tracking-tight" @click="$emit('close')">
          Return to Projects
        </Button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { usePointerSwipe, useElementVisibility } from '@vueuse/core'
import type { ProjectArticlesCollectionItem } from '@nuxt/content'

const props = defineProps<{
  slug: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

// App Screenshots Gallery State
const selectedAppScreenshotIndex = ref(0)
const appThumbnailsRef = ref<HTMLElement | null>(null)
const appScreenshotContainerRef = ref<HTMLElement | null>(null)

usePointerSwipe(appScreenshotContainerRef, {
  onSwipeEnd(e, direction) {
    if (direction === 'left') {
      scrollAppCarousel('right')
    } else if (direction === 'right') {
      scrollAppCarousel('left')
    }
  }
})

// Technical Architecture Carousel State
const carouselRef = ref<HTMLElement | null>(null)
const techThumbnailsRef = ref<HTMLElement | null>(null)
const activeScreenshotIndex = ref(0)

watch(selectedAppScreenshotIndex, (newIndex) => {
  if (!appThumbnailsRef.value) return
  const targetBtn = appThumbnailsRef.value.children[newIndex] as HTMLElement
  if (targetBtn) {
    targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
})

watch(activeScreenshotIndex, (newIndex) => {
  if (!techThumbnailsRef.value) return
  const targetBtn = techThumbnailsRef.value.children[newIndex] as HTMLElement
  if (targetBtn) {
    targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
})

const onCarouselScroll = () => {
  if (!carouselRef.value) return
  const scrollLeft = carouselRef.value.scrollLeft
  const clientWidth = carouselRef.value.clientWidth
  activeScreenshotIndex.value = Math.round(scrollLeft / clientWidth)
}

const scrollToSlide = (index: number) => {
  if (!carouselRef.value) return
  activeScreenshotIndex.value = index
  const targetChild = carouselRef.value.children[index] as HTMLElement
  if (targetChild) {
    targetChild.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }
}

const scrollCarousel = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  const newIndex = direction === 'left' ? activeScreenshotIndex.value - 1 : activeScreenshotIndex.value + 1
  const maxIndex = carouselRef.value.children.length - 1
  if (newIndex >= 0 && newIndex <= maxIndex) {
    scrollToSlide(newIndex)
  }
}

const { data: project } = await useAsyncData<ProjectArticlesCollectionItem | null>(
  `project-${props.slug}`,
  () => queryCollection('projects').path(`/projects/${props.slug}`).first()
)

const scrollAppCarousel = (direction: 'left' | 'right') => {
  if (!project.value?.app_screenshots) return
  const maxIndex = project.value.app_screenshots.length - 1
  if (direction === 'left') {
    selectedAppScreenshotIndex.value = selectedAppScreenshotIndex.value > 0 ? selectedAppScreenshotIndex.value - 1 : maxIndex
  } else {
    selectedAppScreenshotIndex.value = selectedAppScreenshotIndex.value < maxIndex ? selectedAppScreenshotIndex.value + 1 : 0
  }
}

// Mouse Drag-to-Scroll for Technical Architecture
let isDown = false
let startX = 0
let scrollLeft = 0

const onMouseDown = (e: MouseEvent) => {
  if (!carouselRef.value) return
  isDown = true
  startX = e.pageX - carouselRef.value.offsetLeft
  scrollLeft = carouselRef.value.scrollLeft
  carouselRef.value.style.scrollSnapType = 'none'
  carouselRef.value.style.scrollBehavior = 'auto'
}

const onMouseLeave = () => {
  if (!isDown || !carouselRef.value) return
  isDown = false
  carouselRef.value.style.scrollSnapType = ''
  carouselRef.value.style.scrollBehavior = ''
}

const onMouseUp = () => {
  if (!isDown || !carouselRef.value) return
  isDown = false
  carouselRef.value.style.scrollSnapType = ''
  carouselRef.value.style.scrollBehavior = ''
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDown || !carouselRef.value) return
  e.preventDefault()
  const x = e.pageX - carouselRef.value.offsetLeft
  const walk = (x - startX) * 2.5 // Increased multiplier for a smoother, lighter feel
  carouselRef.value.scrollLeft = scrollLeft - walk
}

// Visibility state for smart keyboard navigation
const isAppVisible = useElementVisibility(appScreenshotContainerRef)
const isTechVisible = useElementVisibility(carouselRef)

// Keyboard Navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  } else if (e.key === 'ArrowLeft') {
    if (isTechVisible.value) {
      scrollCarousel('left')
    } else if (isAppVisible.value) {
      scrollAppCarousel('left')
    }
  } else if (e.key === 'ArrowRight') {
    if (isTechVisible.value) {
      scrollCarousel('right')
    } else if (isAppVisible.value) {
      scrollAppCarousel('right')
    }
  }
}

// Lifecycle Hooks & Scroll Lock
onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

