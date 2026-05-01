<template>
  <div class="relative min-h-[80vh] flex flex-col font-sans">
    <div class="flex items-end justify-between pb-4">
      <div>
        <div class="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground-secondary mb-1">
          <YorhaScramble text="[ /CORE/SYSTEMS ]" />
        </div>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none group-hover/header:text-accent transition-colors group/header wrap-break-word">
          <YorhaScramble text="Systems Built" />
        </h1>
      </div>
      <div class="text-right hidden sm:block">
        <div class="font-bold text-lg text-foreground"><YorhaScramble :text="String(projects?.length || 0)" /> RECS</div>
        <div class="text-[10px] uppercase tracking-widest text-foreground-secondary"><YorhaScramble text="STATUS : ONLINE" /></div>
      </div>
    </div>
    <div class="yorha-divider-double mb-10"></div>

    <!-- Main Content Layout -->
    <div
      class="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-8 xl:gap-16 grow items-start pb-24"
    >
      <!-- Left Side Module Tree -->
      <aside class="hidden lg:block relative z-10 w-full min-w-0">
        <YorhaPanel brackets variant="panel" class="sticky top-24">
          <div class="text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-yorha-faint pb-2 text-foreground-secondary font-mono">
            <YorhaScramble text="[ TOPOLOGY_MAP ]" />
          </div>
          <div class="text-sm font-sans space-y-2 opacity-80 font-bold uppercase tracking-widest">
            <div class="text-foreground border-yorha-strong mb-4 break-all pb-2 opacity-100">~/systems/core</div>
            <NuxtLink
              v-for="(project, i) in projects"
              :key="'tree-' + project.path"
              :to="project.path"
              class="flex hover:text-foreground transition-colors group"
              active-class="text-foreground font-black"
            >
              <span class="text-yorha-strong mr-2">
                {{ i === (projects?.length ?? 0) - 1 ? '└──' : '├──' }}
              </span>
              <span class="truncate block w-full relative">
                <YorhaScramble :text="project.title" />
              </span>
            </NuxtLink>
          </div>
        </YorhaPanel>
      </aside>

      <!-- Main Project List -->
      <main class="space-y-12 relative z-10">
        <div
          class="text-[10px] uppercase tracking-widest text-foreground-secondary mb-8 border-b border-yorha-faint pb-2 flex justify-between font-mono"
        >
          <span><YorhaScramble text="[ DEPLOYMENT_LOG ]" /></span>
          <span class="hidden sm:inline-block"><YorhaScramble text="AUTH : VALIDATED" /></span>
        </div>

        <div v-if="projects?.length" class="space-y-12">
          <YorhaPanel
            v-for="(project, index) in projects"
            :key="project.path"
            as="NuxtLink"
            v-motion
            :to="project.path"
            :initial="{ opacity: 0, x: 15 }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: { duration: 400, delay: index * 100, ease: 'linear' },
            }"
            brackets
            variant="simple"
            hover
            padding="p-6 md:p-8"
            class="block w-full"
          >
              <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div class="w-full">
                  <div class="flex items-center gap-3 mb-2">
                    <span
                      class="text-background bg-foreground font-bold tracking-widest text-[10px] px-2 py-0.5 uppercase group-hover:text-foreground group-hover:bg-background transition-colors"
                    >
                      ROLE : {{ project.role || 'CORE_MODULE' }}
                    </span>
                    <span
                      class="font-sans text-[10px] font-bold tracking-widest uppercase opacity-60 border-b border-yorha-faint w-8 text-center group-hover:text-background group-hover:border-background/50 group-hover:opacity-100 transition-all"
                    >
                      NO.{{ String(index + 1).padStart(2, '0') }}
                    </span>
                  </div>

                  <h2
                    class="text-4xl md:text-5xl font-display font-bold uppercase tracking-wider leading-none wrap-break-word text-foreground mt-4 group-hover:text-background transition-colors"
                  >
                    {{ project.title }}
                  </h2>
                </div>
              </div>

              <p
                class="text-base md:text-lg leading-relaxed opacity-80 mb-8 max-w-3xl font-sans group-hover:text-background/80 transition-colors"
              >
                {{ project.description }}
              </p>

              <!-- Dependencies / Tech Stack footer -->
              <div
                class="flex flex-col sm:flex-row sm:items-end justify-between mt-auto pt-6 border-t border-yorha-faint gap-6"
              >
                <div
                  class="flex flex-wrap gap-2 text-[10px] font-sans font-bold uppercase tracking-widest max-w-[70%] text-foreground group-hover:text-background transition-colors"
                >
                  <span class="opacity-60">[ DEPS ]</span>
                  <span
                    v-for="tech in flattenTechStack(project.meta?.tech_stack || project.tech_stack)"
                    :key="tech"
                    class="border border-foreground/30 px-1.5 py-0.5 group-hover:border-background/50 transition-colors"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div
                  class="text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 transition-colors text-foreground group-hover:text-background"
                >
                  <span>[ DETAILS ]</span>
                </div>
              </div>
          </YorhaPanel>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').order('date', 'DESC').all()
)

useHead({
  title: 'Systems Built | LabTime',
  meta: [
    {
      name: 'description',
      content:
        "Deep dives into systems I've built — the problems, the decisions, and the implementations.",
    },
  ],
})
</script>
