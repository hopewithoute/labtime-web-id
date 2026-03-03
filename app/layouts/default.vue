<template>
  <div class="min-h-screen border-x 2xl:border-x-2 border-foreground max-w-5xl mx-auto flex flex-col">
    <header class="border-b border-foreground p-4 md:p-6 flex justify-between items-center bg-background z-10 sticky top-0">
      <NuxtLink to="/" class="flex flex-col hover:opacity-80 transition-opacity">
        <div class="font-black text-xl md:text-2xl uppercase tracking-tighter leading-none">
          LabTime<span class="text-accent">.init()</span>
        </div>
        <div class="font-mono text-[10px] md:text-xs text-muted-foreground lowercase hidden sm:block mt-0.5 ml-[2px]">
          // by Anggi Wibiyanto
        </div>
      </NuxtLink>
      <nav class="flex gap-6 text-sm font-medium uppercase">
        <NuxtLink to="/projects" class="hover:text-accent transition-none hover:underline underline-offset-4 decoration-2">Projects</NuxtLink>
        <NuxtLink to="/articles" class="hover:text-accent transition-none hover:underline underline-offset-4 decoration-2">Articles</NuxtLink>
        <NuxtLink to="/resume" class="hover:text-accent transition-none hover:underline underline-offset-4 decoration-2">Resume</NuxtLink>
      </nav>
    </header>

    <main class="flex-1 p-4 md:p-8 lg:p-12">
      <slot />
    </main>

    <footer class="border-t border-foreground p-4 md:p-6 text-sm flex justify-between uppercase">
      <span>© {{ new Date().getFullYear() }}</span>
      <span class="text-muted-foreground">End of Transmission</span>
    </footer>
  </div>
</template>
