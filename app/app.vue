<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Page Transition: CRT Warm-up */
.page-enter-active {
  transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-leave-active {
  transition: opacity 0.2s ease-out;
}

.page-enter-from {
  filter: grayscale(1) blur(2px);
}

.page-leave-to {
  opacity: 0;
}
</style>
