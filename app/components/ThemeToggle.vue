<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

defineExpose({ toggleTheme })
</script>

<template>
  <button 
    class="hover:text-accent transition-none hover:underline underline-offset-4 decoration-2 relative group flex items-center gap-1 uppercase font-mono"
    @click="toggleTheme"
  >
    <span class="opacity-0 group-hover:opacity-100 transition-opacity">[</span>
    <span>> TOGGLE_THEME --{{ colorMode.value === 'dark' ? 'LIGHT' : 'DARK' }}</span>
    <kbd class="hidden md:inline-block text-[10px] font-mono px-1 py-0.5 border border-foreground/30 text-muted-foreground group-hover:text-accent group-hover:border-accent/50 ml-1 transition-colors">⌘⇧M</kbd>
    <span class="opacity-0 group-hover:opacity-100 transition-opacity">]</span>
  </button>
</template>
