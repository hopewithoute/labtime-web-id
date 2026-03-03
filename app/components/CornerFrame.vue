<template>
  <div class="relative group/frame">
    <!-- Corners -->
    <div class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-foreground z-10 pointer-events-none group-hover/frame:border-accent transition-colors"></div>
    <div class="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-foreground z-10 pointer-events-none group-hover/frame:border-accent transition-colors"></div>
    <div class="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-foreground z-10 pointer-events-none group-hover/frame:border-accent transition-colors"></div>
    <div class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-foreground z-10 pointer-events-none group-hover/frame:border-accent transition-colors"></div>
    
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
