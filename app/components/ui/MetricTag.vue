<script setup lang="ts">
defineProps<{
  label?: string
  value?: string
  variant?: 'status' | 'info'
}>()
</script>

<template>
  <div class="inline-flex items-center gap-2 px-1.5 py-0.5 border border-foreground/20 bg-foreground/5 font-mono text-[10px] uppercase tracking-wider h-fit">
    <span v-if="label" class="opacity-50 line-clamp-1">{{ label }}</span>
    <span v-if="label" class="opacity-20">|</span>
    <span v-if="value || $slots.default" class="font-bold flex items-center gap-1.5">
      <span v-if="variant === 'status'" class="w-1.5 h-1.5 bg-accent animate-pulse"></span>
      <slot>{{ value }}</slot>
    </span>
  </div>
</template>
