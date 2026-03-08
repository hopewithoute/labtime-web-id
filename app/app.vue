<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Page Transition: Kernel Refresh */
@keyframes terminal-flicker {
  0% { opacity: 1; }
  25% { opacity: 0.7; }
  50% { opacity: 0.9; }
  75% { opacity: 0.4; }
  100% { opacity: 1; }
}

@keyframes terminal-reveal {
  from { clip-path: inset(0 0 100% 0); }
  to { clip-path: inset(0 0 0 0); }
}

.page-enter-active {
  animation: terminal-reveal 0.3s cubic-bezier(0.19, 1, 0.22, 1),
             terminal-flicker 0.15s steps(2);
}

.page-leave-active {
  animation: terminal-flicker 0.2s steps(4) reverse;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
