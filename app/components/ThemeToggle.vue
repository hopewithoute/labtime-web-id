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
    <span class="opacity-0 group-hover:opacity-100 transition-opacity">]</span>
  </button>
</template>
