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

    <div class="flex-1 border-x 2xl:border-x-2 border-foreground max-w-7xl mx-auto flex flex-col w-full">
      <header class="border-b border-foreground p-4 md:p-6 flex justify-between items-center bg-background z-10 sticky top-0">
        <NuxtLink to="/" class="flex flex-col hover:opacity-80 transition-opacity w-fit">
          <div class="font-black text-xl md:text-2xl uppercase tracking-tighter leading-none flex items-baseline gap-1">
            LabTime<span class="text-accent">.init()</span><span class="animate-blink">_</span>
          </div>
          <div class="font-mono text-[10px] md:text-xs text-muted-foreground lowercase hidden sm:block mt-0.5 ml-[2px] overflow-hidden whitespace-nowrap border-r-2 border-transparent animate-typewriter w-fit max-w-fit">
            // by Anggi Wibiyanto
          </div>
        </NuxtLink>
        <nav class="flex gap-6 items-center">
          <div class="flex gap-6 text-sm font-medium uppercase">
            <NuxtLink to="/projects" :class="[$route.path.startsWith('/projects') ? 'active before:content-[\'>_\'] text-accent' : '']" class="link-fill-accent hover:text-accent relative">Projects</NuxtLink>
            <NuxtLink to="/articles" :class="[$route.path.startsWith('/articles') ? 'active before:content-[\'>_\'] text-accent' : '']" class="link-fill-accent hover:text-accent relative">Articles</NuxtLink>
            <NuxtLink to="/resume" :class="[$route.path.startsWith('/resume') ? 'active before:content-[\'>_\'] text-accent' : '']" class="link-fill-accent hover:text-accent relative">Resume</NuxtLink>
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

      <footer class="border-t border-foreground p-3 md:p-4 text-[10px] md:text-xs font-mono flex justify-between items-center uppercase bg-background text-foreground">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onKeyStroke } from '@vueuse/core'

const appConfig = useAppConfig()
const themeToggleRef = ref<{ toggleTheme: () => void } | null>(null)

onKeyStroke(['k', 'K'], (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    themeToggleRef.value?.toggleTheme()
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
