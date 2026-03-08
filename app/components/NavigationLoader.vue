<script setup lang="ts">
import { computed } from 'vue'

const { progress, isLoading } = useLoadingIndicator()

// Create a visual ASCII-style bar
const barLength = 20
const filledLength = computed(() => Math.floor((progress.value / 100) * barLength))
const barDisplay = computed(() => {
  const filled = '█'.repeat(filledLength.value)
  const empty = '░'.repeat(Math.max(0, barLength - filledLength.value))
  return [filled, empty].join('')
})
const statusMessages = [
  'FETCH_PAGE_BUFFER',
  'COMPILING_VNODE',
  'MOUNTING_DOM',
  'SYNC_STATE'
]

const currentStatus = computed(() => {
  const index = Math.min(
    Math.floor((progress.value / 100) * statusMessages.length),
    statusMessages.length - 1
  )
  return statusMessages[index]
})
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="terminal-leave transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed top-0 left-0 w-full z-100 bg-background border-b border-foreground p-2 px-6 flex items-center gap-4 font-mono text-xs uppercase shadow-lg"
    >
      <div class="flex items-center gap-2">
        <span class="text-accent animate-blink">></span>
        <span class="font-bold flex items-center gap-1">
          EXEC<span class="animate-pulse">:</span>
        </span>
        <span class="text-muted-foreground whitespace-nowrap">{{ currentStatus }}...</span>
      </div>
      <div class="flex-1 flex items-center gap-3 overflow-hidden">
        <span class="tracking-tighter hidden sm:inline">[{{ barDisplay }}]</span>
        <span class="min-w-12">{{ Math.round(progress) }}%</span>
      </div>
      <div class="text-[10px] opacity-70 hidden md:block whitespace-nowrap">
        STATUS: IN_PROGRESS
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.z-100 {
  z-index: 100;
}

@keyframes terminal-flicker {
  0% { opacity: 1; }
  25% { opacity: 0.7; }
  50% { opacity: 0.9; }
  75% { opacity: 0.4; }
  100% { opacity: 1; }
}

.terminal-leave {
  animation: terminal-flicker 0.2s steps(4) reverse;
}

/* Scanline effect */
.fixed::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
  z-index: 2;
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}
</style>
