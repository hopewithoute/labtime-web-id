<template>
  <div class="min-h-screen flex flex-col">
    <Transition
      leave-active-class="transition-opacity duration-700 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showBootSequence" class="fixed inset-0 z-100 bg-background text-foreground font-mono uppercase p-6 md:p-12 flex flex-col justify-end">
        <div class="max-w-7xl mx-auto w-full mb-12 lg:px-12">
          <div class="space-y-2 text-sm md:text-base">
            <div v-for="(line, index) in bootLines" :key="index">{{ line }}</div>
            <div class="animate-blink mt-1">_</div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="site-shell-frame flex-1 border-x 2xl:border-x-2 border-foreground max-w-7xl mx-auto flex flex-col w-full overflow-x-clip">
      <header class="site-shell-header border-b border-foreground p-4 md:p-6 flex justify-between items-center bg-background z-30 sticky top-0">
        <NuxtLink to="/" class="flex flex-col hover:opacity-80 transition-opacity w-fit" @click="closeMobileMenu">
          <div class="font-black text-xl md:text-2xl uppercase tracking-tighter leading-none flex items-baseline gap-1">
            LabTime<span class="text-accent">.init()</span><span class="animate-blink">_</span>
          </div>
          <div class="font-mono text-[10px] md:text-xs text-muted-foreground lowercase hidden sm:block mt-0.5 ml-[2px] overflow-hidden whitespace-nowrap border-r-2 border-transparent animate-typewriter w-fit max-w-fit">
            // by Anggi Wibiyanto
          </div>
        </NuxtLink>
        <button
          v-if="isHydrated"
          ref="mobileMenuButtonRef"
          type="button"
          class="md:hidden link-fill-accent hover:text-accent relative inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide group"
          :aria-label="mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation-drawer"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">{{ mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu' }}</span>
          <span aria-hidden="true" class="opacity-50 group-hover:opacity-100">[</span>
          <span aria-hidden="true">{{ mobileMenuOpen ? 'CLOSE' : 'MENU' }}</span>
          <span aria-hidden="true" class="opacity-50 group-hover:opacity-100">]</span>
        </button>
        <nav class="hidden md:flex gap-6 items-center">
          <div class="flex gap-6 text-sm font-medium uppercase">
            <NuxtLink to="/projects" :class="[$route.path.startsWith('/projects') ? 'active before:content-[\'>_\'] text-accent' : '']" class="link-fill-accent hover:text-accent relative">Projects</NuxtLink>
            <NuxtLink to="/articles" :class="[$route.path.startsWith('/articles') ? 'active before:content-[\'>_\'] text-accent' : '']" class="link-fill-accent hover:text-accent relative">Articles</NuxtLink>
            <NuxtLink to="/resume" :class="[$route.path.startsWith('/resume') ? 'active before:content-[\'>_\'] text-accent' : '']" class="link-fill-accent hover:text-accent relative">Resume</NuxtLink>
            <button class="link-fill-accent hover:text-accent relative flex items-center gap-1.5 group" title="Search (Ctrl+K)" @click="openSearch">
              <span class="opacity-50 group-hover:opacity-100">[</span>
              <span>SEARCH</span>
              <kbd class="hidden md:inline-block text-[10px] font-mono px-1 py-0.5 border border-foreground/30 text-muted-foreground group-hover:text-accent group-hover:border-accent/50 ml-1 transition-colors">⌘K</kbd>
              <span class="opacity-50 group-hover:opacity-100">]</span>
            </button>
            <a :href="appConfig.github ? String(appConfig.github) : '#'" target="_blank" rel="noopener noreferrer" class="link-fill-accent hover:text-accent relative flex items-center gap-1.5 group">
              <span class="opacity-50 group-hover:opacity-100">[</span>
              <span>GITHUB</span>
              <span class="opacity-50 group-hover:opacity-100">]</span>
            </a>
          </div>
        </nav>
      </header>

      <main class="flex-1 p-4 md:p-8 lg:p-12">
        <slot />
      </main>

      <footer class="site-shell-footer border-t border-foreground p-3 md:p-4 text-[10px] md:text-xs font-mono flex justify-between items-center uppercase bg-background text-foreground">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div
              v-motion
              :initial="{ opacity: 0.4, scale: 0.8 }"
              :enter="{
                opacity: 1,
                scale: 1,
                transition: {
                  repeat: Infinity,
                  duration: 1500,
                  repeatType: 'reverse'
                }
              }"
              class="w-2 h-2 bg-accent rounded-full"
            ></div>
            <span class="font-bold">System Operational</span>
          </div>
          <div class="hidden md:flex gap-4 opacity-70">
            <span>[✓] Connected</span>
            <span>PING: 12ms</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <ThemeToggle ref="themeToggleRef" />
          <span class="opacity-70 hidden sm:inline">© {{ new Date().getFullYear() }}</span>
          <MetricTag variant="status" value="STABLE" />
        </div>
      </footer>
    </div>

    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-40 md:hidden"
      >
        <button
          type="button"
          class="absolute inset-0 bg-background/80 backdrop-blur-sm"
          aria-label="Close navigation menu"
          @click="closeMobileMenu"
        ></button>
        <Transition
          enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          enter-from-class="translate-x-8 opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-6 opacity-0"
          appear
        >
          <div
            id="mobile-navigation-drawer"
            ref="mobileMenuDrawerRef"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            class="absolute right-0 top-0 h-full w-[min(22rem,calc(100vw-2rem))] border-l border-foreground bg-background p-6 flex flex-col gap-6 shadow-2xl"
            @keydown.tab="trapMobileMenuFocus"
          >
            <div class="flex items-start justify-between gap-4 border-b border-foreground pb-4">
            <div class="space-y-1">
              <div class="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Nav://Mobile</div>
              <div class="text-sm uppercase tracking-wide">Quick access panel</div>
            </div>
            <button
              ref="mobileMenuCloseButtonRef"
              type="button"
              class="link-fill-accent hover:text-accent relative inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide group"
              aria-label="Close navigation menu"
              @click="closeMobileMenu"
            >
              <span class="opacity-50 group-hover:opacity-100">[</span>
              <span>CLOSE</span>
              <span class="opacity-50 group-hover:opacity-100">]</span>
            </button>
          </div>
          <nav class="flex flex-col gap-2 text-sm font-medium uppercase">
            <NuxtLink to="/projects" :class="[$route.path.startsWith('/projects') ? 'text-accent before:content-[\'>_\'] before:mr-1' : '']" class="link-fill-accent hover:text-accent relative flex w-fit items-center gap-2 py-1.5 tracking-wide" @click="closeMobileMenu">Projects</NuxtLink>
            <NuxtLink to="/articles" :class="[$route.path.startsWith('/articles') ? 'text-accent before:content-[\'>_\'] before:mr-1' : '']" class="link-fill-accent hover:text-accent relative flex w-fit items-center gap-2 py-1.5 tracking-wide" @click="closeMobileMenu">Articles</NuxtLink>
            <NuxtLink to="/resume" :class="[$route.path.startsWith('/resume') ? 'text-accent before:content-[\'>_\'] before:mr-1' : '']" class="link-fill-accent hover:text-accent relative flex w-fit items-center gap-2 py-1.5 tracking-wide" @click="closeMobileMenu">Resume</NuxtLink>
          </nav>
            <div class="mt-auto space-y-3 border-t border-foreground pt-4">
              <button type="button" class="link-fill-accent hover:text-accent relative flex items-center gap-1.5 text-left font-mono text-xs uppercase tracking-wide group" @click="handleMobileSearch">
                <span class="opacity-50 group-hover:opacity-100">[</span>
                <span>SEARCH</span>
                <kbd class="text-[10px] font-mono px-1 py-0.5 border border-foreground/30 text-muted-foreground group-hover:text-accent group-hover:border-accent/50 ml-1 transition-colors">⌘K</kbd>
                <span class="opacity-50 group-hover:opacity-100">]</span>
              </button>
              <a :href="appConfig.github ? String(appConfig.github) : '#'" target="_blank" rel="noopener noreferrer" class="link-fill-accent hover:text-accent relative flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide group w-fit" @click="closeMobileMenu">
                <span class="opacity-50 group-hover:opacity-100">[</span>
                <span>GITHUB</span>
                <span class="opacity-50 group-hover:opacity-100">]</span>
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <SearchPalette />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { onKeyStroke } from '@vueuse/core'

const appConfig = useAppConfig()
const themeToggleRef = ref<{ toggleTheme: () => void } | null>(null)
const { open: openSearch } = useGlobalSearch()
const isHydrated = ref(false)
const mobileMenuOpen = ref(false)
const mobileMenuButtonRef = ref<HTMLButtonElement | null>(null)
const mobileMenuCloseButtonRef = ref<HTMLButtonElement | null>(null)
const mobileMenuDrawerRef = ref<HTMLElement | null>(null)

function openMobileMenu() {
  mobileMenuOpen.value = true
  if (import.meta.client) {
    document.body.style.overflow = 'hidden'
  }
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
}

function toggleMobileMenu() {
  if (mobileMenuOpen.value) {
    closeMobileMenu()
    return
  }

  openMobileMenu()
}

function trapMobileMenuFocus(event: KeyboardEvent) {
  const drawer = mobileMenuDrawerRef.value
  if (!drawer) return

  const focusableElements = Array.from(
    drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled'))

  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement as HTMLElement | null

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement?.focus()
    return
  }

  if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement?.focus()
  }
}

async function handleMobileSearch() {
  closeMobileMenu()
  await nextTick()
  await openSearch()
}

onKeyStroke(['k', 'K'], (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    openSearch()
  }
})

onKeyStroke('Escape', () => {
  if (mobileMenuOpen.value) {
    closeMobileMenu()
  }
})

watch(mobileMenuOpen, async (isOpen) => {
  if (!import.meta.client) return

  if (isOpen) {
    await nextTick()
    mobileMenuCloseButtonRef.value?.focus()
    return
  }

  await nextTick()
  mobileMenuButtonRef.value?.focus()
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})

const showBootSequence = ref(false)
const bootLines = ref<string[]>([])
const allLines = [
  '> INITIALIZING KERNEL...',
  '> MOUNTING FILE SYSTEM...',
  '> STARTING LABTIME...'
]

onMounted(() => {
  isHydrated.value = true

  if (!sessionStorage.getItem('booted')) {
    showBootSequence.value = true

    setTimeout(() => { bootLines.value.push(allLines[0] as string) }, 300)
    setTimeout(() => { bootLines.value.push(allLines[1] as string) }, 800)
    setTimeout(() => {
      bootLines.value.push(allLines[2] as string)

      setTimeout(() => {
        showBootSequence.value = false
        sessionStorage.setItem('booted', 'true')
      }, 700)
    }, 1300)
  }
})
</script>

<style scoped>
@media print {
  .site-shell-header,
  .site-shell-footer {
    display: none !important;
  }

  .site-shell-frame {
    border: 0 !important;
    max-width: none !important;
  }
}
</style>
