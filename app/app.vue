<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Page Transition: Kernel Refresh (Smooth) */
.page-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
  filter: brightness(1.3);
}

.page-leave-to {
  opacity: 0;
  filter: brightness(0.7);
}
</style>
