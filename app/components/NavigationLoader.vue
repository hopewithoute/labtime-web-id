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
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-500"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed top-0 left-0 w-full z-[100] bg-background border-b border-foreground p-2 px-6 flex items-center gap-4 font-mono text-xs uppercase shadow-lg"
    >
      <div class="flex items-center gap-2">
        <span class="text-accent animate-blink">></span>
        <span class="font-bold">EXEC:</span>
        <span class="text-muted-foreground whitespace-nowrap">FETCHING...</span>
      </div>
      <div class="flex-1 flex items-center gap-3 overflow-hidden">
        <span class="tracking-tighter hidden sm:inline">[{{ barDisplay }}]</span>
        <span class="min-w-[3rem]">{{ Math.round(progress) }}%</span>
      </div>
      <div class="text-[10px] opacity-70 hidden md:block whitespace-nowrap">
        STATUS: IN_PROGRESS
      </div>
    </div>
  </Transition>
</template>
