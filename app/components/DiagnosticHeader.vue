<template>
  <!-- Header Area -->
  <header class="mb-12 border-b-2 border-foreground pb-6 w-full pt-4 relative">
    <div class="absolute -bottom-1.5 left-0 w-3 h-3 bg-foreground"></div>
    <div class="absolute -bottom-1.5 right-0 w-3 h-3 bg-foreground"></div>
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div class="text-accent text-sm md:text-base font-bold mb-3 flex items-center gap-2">
          <span class="animate-pulse">_</span>
          <span>> SYS_REQ: {{ systemRequest }}</span>
        </div>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none group-hover/header:text-accent transition-colors group/header break-words">
          {{ title }}
        </h1>
      </div>
      
      <div class="text-xs md:text-sm text-muted-foreground opacity-80 text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-accent pl-4 md:pl-0 md:pr-4 py-1">
        <div>{{ countLabel }}: <span class="text-foreground font-bold">{{ count }}</span></div>
        <div>{{ contextLabel }}: <span class="text-foreground font-bold">{{ contextValue }}</span></div>
        <div>STATUS: <span class="text-accent font-bold animate-pulse">{{ status }}</span></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  systemRequest: string
  count: number
  countLabel: string
  contextLabel: string
  contextValue: string
  status?: string
}>(), {
  status: 'ONLINE'
})
</script>
