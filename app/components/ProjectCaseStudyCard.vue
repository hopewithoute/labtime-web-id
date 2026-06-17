<template>
  <button 
    class="w-full text-left group block relative border border-border bg-background transition-all duration-300 hover:border-foreground/50 hover:shadow-sm cursor-pointer focus:outline-none"
    @click="$emit('open', project.meta?.slug || project.path.split('/').pop())"
    @mouseenter="playHover"
  >
    <div class="p-6 md:p-8 flex flex-col gap-4">
      <div class="flex flex-wrap items-center justify-between gap-4 w-full">
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-[11px] md:text-xs font-sans font-bold uppercase tracking-[0.24em] text-foreground bg-foreground/10 px-2 py-1">
            {{ project.role || 'Core System Ownership' }}
          </span>
          <span class="text-[11px] md:text-xs font-mono uppercase tracking-[0.18em] text-foreground-secondary">
            {{ formatDate(project.date) }}
          </span>
        </div>
        
        <!-- Action Button -->
        <div class="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground border border-foreground/30 px-3 py-1.5 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all flex items-center gap-2">
          [ READ_REPORT ]
        </div>
      </div>
      
      <div>
        <h3 class="text-2xl md:text-3xl font-display font-bold uppercase tracking-[0.02em] leading-tight mt-1 mb-2 text-foreground/90 group-hover:text-foreground transition-colors">
          {{ project.title }}
        </h3>
        <p class="text-base leading-relaxed text-foreground-secondary max-w-3xl">
          {{ project.description }}
        </p>
      </div>

      <!-- Quick Tech Stack (Top 5) -->
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="tech in flattenTechStack(project.tech_stack)?.slice(0, 5)"
          :key="tech"
          class="bg-background-secondary/40 px-2 py-1 text-xs font-sans font-bold uppercase tracking-[0.18em] text-foreground border border-transparent"
        >
          {{ tech }}
        </span>
        <span v-if="flattenTechStack(project.tech_stack)?.length > 5" class="px-2 py-1 text-[11px] font-mono text-foreground-secondary">
          +{{ flattenTechStack(project.tech_stack).length - 5 }} more
        </span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { flattenTechStack } from '~/utils/flattenTechStack'
import { formatDate } from '~/utils/formatDate'
import { useYorhaAudio } from '~/composables/useYorhaAudio'

defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any
}>()

// eslint-disable-next-line no-unused-vars
defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'open', slug: string): void
}>()

const { playHover } = useYorhaAudio()
</script>
