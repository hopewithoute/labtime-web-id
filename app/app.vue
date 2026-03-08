<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Page Transition: Monochrome to Color */
.page-enter-active {
  transition: filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.page-leave-active {
  transition: filter 0.2s ease, opacity 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  filter: grayscale(1);
}

.page-leave-to {
  opacity: 0;
  filter: grayscale(1);
}
</style>
