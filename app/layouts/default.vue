<template>
  <div class="min-h-screen flex flex-col relative overflow-x-hidden bg-background yorha-grid-bg">
    <!-- CRT Effect Overlay -->
    <div class="crt-overlay"></div>
    
    <NavigationLoader />
    
    <Teleport to="body">
      <Transition
        leave-active-class="transition-opacity duration-500 ease-exit"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showBootSequence" class="fixed inset-0 z-100 bg-background text-foreground font-mono uppercase p-6 md:p-12 flex flex-col justify-end">
          <div class="max-w-7xl mx-auto w-full mb-12 lg:px-12">
            <div class="space-y-4 text-sm md:text-base opacity-80 font-bold tracking-widest">
              <div v-for="(line, index) in bootLines" :key="index" class="animate-glitch">
                {{ line }}
              </div>
              <div class="mt-4"><span class="w-3 h-4 inline-block bg-foreground animate-blink"></span></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Main Shell -->
    <div class="flex-1 flex flex-col w-full z-10 relative max-w-7xl mx-auto min-h-screen border-x border-yorha-faint">
      
      <!-- HUD Header -->
      <header class="p-4 md:p-8 flex justify-between items-start z-30">
        <NuxtLink to="/" class="flex flex-col group w-fit" @click="closeMobileMenu">
          <div class="font-display font-bold text-2xl md:text-3xl tracking-wide flex items-center gap-2">
            <span class="text-yorha-red">[</span> LABTIME <span class="text-yorha-red">]</span>
          </div>
          <div class="font-mono text-xs text-foreground-secondary uppercase tracking-[0.2em] mt-1 group-hover:text-foreground transition-colors yorha-bracket-panel p-1 w-fit">
            <YorhaScramble text="System.Init()" />
          </div>
        </NuxtLink>
        
        <div class="flex items-center gap-6">
          <nav ref="desktopNavRef" class="hidden md:flex items-center relative gap-2 pl-2">
            <!-- Animated vertical indicator -->
            <div 
              class="absolute left-0 h-4 w-0.5 bg-foreground transition-all duration-300 ease-yorha pointer-events-none"
              :style="activeIndicatorStyle"
            ></div>
            
            <NuxtLink 
              v-for="(item, index) in desktopNavItems"
              :key="item.path"
              :ref="el => setNavRef(el, index)"
              :to="item.path"
              class="font-sans text-sm font-medium tracking-widest uppercase py-1.5 px-3 transition-all duration-200 cursor-pointer block text-foreground-secondary hover:text-foreground"
              active-class="text-foreground font-bold"
            >
              <YorhaScramble :text="item.name" />
            </NuxtLink>
          </nav>

          <button
            v-if="isHydrated"
            ref="mobileMenuButtonRef"
            type="button"
            class="md:hidden yorha-btn"
            @click="toggleMobileMenu"
          >
            {{ mobileMenuOpen ? 'CLOSE' : 'MENU' }}
          </button>
          
          <div class="hidden md:flex gap-4">
            <button class="yorha-btn relative group flex items-center gap-2" @click="openSearch">
              <span>SEARCH</span>
              <kbd class="text-[10px] font-mono border border-foreground/30 px-1 opacity-50 group-hover:opacity-100 group-hover:border-background">⌘K</kbd>
            </button>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 p-4 md:p-8 lg:p-12 pt-0 z-10 animate-screen-enter">
        <slot />
      </main>

      <!-- HUD Footer -->
      <footer class="p-4 md:p-8 text-xs font-mono uppercase text-foreground-secondary flex justify-between items-end z-20">
        <div class="flex flex-col gap-2">
           <div class="flex items-center gap-2">
             <div class="w-1.5 h-1.5 bg-yorha-red rounded-none animate-blink"></div>
             <span class="font-bold text-foreground">STATUS : ONLINE</span>
           </div>
           <div>COORD : {{ userCoords }}</div>
           <div class="yorha-divider w-32 my-1!"></div>
        </div>
        
        <div class="flex flex-col items-end gap-3">
          <div class="flex items-center gap-4">
            <ThemeToggle />
            <a :href="appConfig.github ? String(appConfig.github) : '#'" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors hover:bg-foreground/5 p-1 border border-transparent hover:border-border">
              GITHUB : REPO
            </a>
          </div>
          <div>Ver 1.0.0 — GLORY TO MANKIND</div>
        </div>
      </footer>
    </div>

    <!-- Mobile Drawer (YoRHa Style) -->
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
        class="fixed inset-0 z-60 md:hidden"
      >
        <button
          type="button"
          class="absolute inset-0 bg-background/90"
          aria-label="Close navigation menu"
          @click="closeMobileMenu"
        ></button>
        <Transition
          enter-active-class="transition-all duration-300 ease-yorha"
          enter-from-class="translate-x-8 opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-8 opacity-0"
          appear
        >
          <div
            id="mobile-navigation-drawer"
            ref="mobileMenuDrawerRef"
            role="dialog"
            class="absolute right-0 top-0 h-full w-[min(20rem,calc(100vw-2rem))] border-l border-border bg-background p-6 flex flex-col gap-6 shadow-2xl"
            @keydown.tab="trapMobileMenuFocus"
          >
            <div class="flex justify-between items-center pb-4 border-b border-yorha-faint">
              <span class="font-mono text-xs uppercase tracking-widest">[ SYSTEM MENU ]</span>
              <button
                ref="mobileMenuCloseButtonRef"
                type="button"
                class="yorha-btn py-1! px-2!"
                @click="closeMobileMenu"
              >
                X
              </button>
            </div>
            
            <nav class="flex flex-col gap-1 text-sm font-medium uppercase font-sans">
              <NuxtLink to="/" class="yorha-nav-item" active-class="active" @click="closeMobileMenu"><YorhaScramble text="Home" /></NuxtLink>
              <NuxtLink to="/projects" class="yorha-nav-item" active-class="active" @click="closeMobileMenu"><YorhaScramble text="Projects" /></NuxtLink>
              <NuxtLink to="/articles" class="yorha-nav-item" active-class="active" @click="closeMobileMenu"><YorhaScramble text="Articles" /></NuxtLink>
              <NuxtLink to="/resume" class="yorha-nav-item" active-class="active" @click="closeMobileMenu"><YorhaScramble text="Resume" /></NuxtLink>
            </nav>
            
            <div class="mt-auto space-y-4 pt-4 border-t border-yorha-faint">
              <button type="button" class="yorha-btn w-full text-left flex justify-between" @click="handleMobileSearch">
                <span>SEARCH</span>
                <kbd class="tracking-widest">⌘K</kbd>
              </button>
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
import { useRoute } from 'vue-router'


const route = useRoute()
const desktopNavItems = [
  { path: '/projects', name: 'Projects' },
  { path: '/articles', name: 'Articles' },
  { path: '/resume', name: 'Resume' },
]

const desktopNavRef = ref<HTMLElement | null>(null)
const navRefs = ref<HTMLElement[]>([])
const activeIndicatorStyle = ref({ opacity: 0, transform: 'translateX(0px)', top: '10px' }) // Assuming height is 1rem, adjust top if needed

const setNavRef = (el: HTMLElement | any, index: number) => {
  if (el) {
    navRefs.value[index] = el.$el || el
  }
}

const updateIndicator = async () => {
  if (!import.meta.client) return
  await nextTick()
  await document.fonts.ready

  const activeIndex = desktopNavItems.findIndex(item => route.path.startsWith(item.path))
  
  if (activeIndex !== -1 && navRefs.value[activeIndex] && desktopNavRef.value) {
    const el = navRefs.value[activeIndex] as HTMLElement
    // Calculate the left position relative to the nav container
    // And shift it slightly left (e.g. -12px) from the text boundary
    // Use el.offsetLeft directly if parent is relative
    const leftOffset = el.offsetLeft - 12
    const topOffset = el.offsetTop + (el.offsetHeight / 2) - 8 // Center vertically (h-1rem = 16px -> -8)

    activeIndicatorStyle.value = {
      opacity: 1,
      transform: `translateX(${leftOffset}px)`,
      top: `${topOffset}px`
    }
  } else {
    activeIndicatorStyle.value.opacity = 0
  }
}

watch(() => route.path, updateIndicator)

const appConfig = useAppConfig()
const { open: openSearch } = useGlobalSearch()
const isHydrated = ref(false)
const mobileMenuOpen = ref(false)
const mobileMenuButtonRef = ref<HTMLButtonElement | null>(null)
const mobileMenuCloseButtonRef = ref<HTMLButtonElement | null>(null)
const mobileMenuDrawerRef = ref<HTMLElement | null>(null)
const userCoords = ref('UNKNOWN')

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
  window.removeEventListener('resize', updateIndicator)
})

const bootedCookie = useCookie('booted', { maxAge: undefined })
const showBootSequence = ref(!bootedCookie.value)
const bootLines = ref<string[]>([])

const BOOT_SEQUENCE = [
  { message: 'INITIALIZING YORHA OS KERNEL...', delay: 200 },
  { message: 'DATA SYNCHRONIZATION: OK', delay: 400 },
  { message: 'MEMORY CHECK: OK', delay: 700 },
  { message: 'SYSTEM.INIT() COMPLETE. GLORY TO MANKIND.', delay: 1000 },
] as const

const BOOT_DISMISS_DELAY = 1000

onMounted(() => {
  isHydrated.value = true
  
  // Fake coordinates for HUD
  userCoords.value = `${(Math.random() * 100).toFixed(4)}N ${(Math.random() * 100).toFixed(4)}W`

  // Initialize indicator
  document.fonts.ready.then(updateIndicator)
  updateIndicator()
  window.addEventListener('resize', updateIndicator)

  if (!bootedCookie.value) {
    for (const { message, delay } of BOOT_SEQUENCE) {
      setTimeout(() => {
        bootLines.value = [...bootLines.value, message]
      }, delay)
    }

    const lastDelay = BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1]!.delay
    setTimeout(() => {
      showBootSequence.value = false
      bootedCookie.value = 'true'
    }, lastDelay + BOOT_DISMISS_DELAY)
  }
})
</script>

<style scoped>
@media print {
  header, footer {
    display: none !important;
  }
}
</style>
