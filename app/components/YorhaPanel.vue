<template>
  <component
    :is="componentTag"
    class="relative group"
    :class="[
      { 'yorha-cut': cut },
      { 'yorha-bracket-panel': brackets },
      { 'yorha-panel yorha-panel-staff': variant === 'panel' },
      { 'yorha-panel': variant === 'simple' },
      hover ? 'transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer' : ''
    ]"
    v-bind="$attrs"
  >
    <div 
      class="relative z-10 w-full h-full"
      :class="padding"
    >
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { computed } from 'vue'

interface Props {
  as?: string | any
  cut?: boolean
  brackets?: boolean
  variant?: 'panel' | 'simple' | 'none'
  padding?: string
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  cut: true,
  brackets: false,
  variant: 'panel',
  padding: 'p-4 sm:p-5',
  hover: false
})

const componentTag = computed(() => {
  if (props.as === 'NuxtLink') {
    return NuxtLink
  }

  return props.as
})
</script>

<style scoped>
/* Ensure brackets are above backgrounds but below content */
.yorha-bracket-panel::before,
.yorha-bracket-panel::after {
  z-index: 5;
}

/* Optional: Glitch effect on hover if requested */
.group:hover :deep(.animate-glitch-hover) {
  animation: glitch 400ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
</style>
