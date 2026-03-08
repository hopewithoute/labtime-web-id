<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Page Transition: CRT Warm-up */
.page-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-leave-active {
  transition: all 0.2s ease-out;
}

.page-enter-from {
  opacity: 0;
  filter: grayscale(1) blur(2px) contrast(1.2);
}

.page-leave-to {
  opacity: 0;
  filter: grayscale(1) blur(1px);
}
</style>
