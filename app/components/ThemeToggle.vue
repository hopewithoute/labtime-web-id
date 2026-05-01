<template>
  <button 
    class="hover:text-background transition-colors hover:bg-foreground relative group flex items-center p-1 border border-transparent hover:border-border font-sans font-bold text-xs uppercase tracking-widest"
    @click="toggleTheme"
  >
    MODE : {{ colorMode.value === 'dark' ? 'LIGHT' : 'DARK' }}
  </button>
</template>
<script setup lang="ts">
const colorMode = useColorMode()

function toggleTheme(): void {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

defineExpose({ toggleTheme })
</script>