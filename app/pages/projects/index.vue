<template>
  <div class="relative min-h-[80vh] group/crt font-mono text-foreground flex flex-col">
    <!-- Header Area -->
    <DiagnosticHeader
      title="Systems Built"
      system-request="/CORE/SYSTEMS"
      :count="projects?.length || 0"
      count-label="MODULES"
      context-label="ROOT"
      context-value="~/workspace"
      status="ONLINE"
    />

    <!-- Main Content Layout -->
    <div
      class="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-8 xl:gap-16 flex-grow items-start pb-24"
    >
      <!-- Left Side Module Tree -->
      <aside class="hidden lg:block relative z-10 w-full min-w-0">
        <CornerFrame class="sticky top-24 bg-background">
          <div class="p-6">
            <div
              class="text-accent font-black tracking-tight mb-4 flex items-center gap-2 border-b border-dashed border-foreground/30 pb-2 uppercase"
            >
              <span class="opacity-60">[Topology_Map]</span>
            </div>
            <div class="text-xs font-mono space-y-1 opacity-80">
              <div class="text-foreground font-bold mb-2 break-all">~/labtime/systems</div>
              <NuxtLink
                v-for="(project, i) in projects"
                :key="'tree-' + project.path"
                :to="project.path"
                class="flex hover:text-accent transition-colors group"
                active-class="text-accent font-bold"
              >
                <span class="text-muted-foreground mr-2 group-hover:text-accent">
                  {{ i === (projects?.length ?? 0) - 1 ? '└──' : '├──' }}
                </span>
                <span class="truncate block w-full relative">
                  <span
                    class="group-hover:opacity-100 opacity-0 text-accent transition-all absolute -left-3"
                  >
                    >
                  </span>
                  {{ project.title }}
                </span>
              </NuxtLink>
            </div>

            <!-- Decorative Node Health -->
            <div
              class="mt-8 pt-6 border-t border-dashed border-foreground/20 text-[10px] leading-tight text-muted-foreground"
            >
              <div class="uppercase tracking-widest mb-2 opacity-50">Node Health</div>
              <div class="flex gap-1 h-12 items-end">
                <div
                  v-for="i in 16"
                  :key="i"
                  class="flex-1 bg-accent/40"
                  :style="{ height: Math.random() * 80 + 20 + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </CornerFrame>
      </aside>

      <!-- Main Project List -->
      <main class="space-y-12 relative z-10">
        <div
          class="text-xs uppercase text-muted-foreground mb-8 opacity-60 border-b border-dashed border-foreground/30 pb-2 flex justify-between"
        >
          <span>[DEPLOYMENT_LOG]</span>
          <span class="hidden sm:inline-block">Auth: VALIDATED</span>
        </div>

        <div v-if="projects?.length" class="space-y-16 lg:space-y-24">
          <NuxtLink
            v-for="(project, index) in projects"
            :key="project.path"
            v-motion
            :to="project.path"
            :initial="{ opacity: 0, x: 20 }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: { duration: 500, delay: index * 100, ease: 'easeOut' },
            }"
            class="block group border-2 border-foreground hover:bg-foreground hover:text-background transition-colors relative crt-hover bg-background w-full"
          >
            <!-- Timeline connection line removed, replaced with full card container -->
            <div class="p-6 md:p-8 relative z-10 flex flex-col h-full">
              <!-- Content details -->
              <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div class="w-full">
                  <div class="flex items-center gap-3 mb-2 md:mb-3">
                    <span
                      class="text-accent group-hover:text-background font-bold font-mono text-[10px] md:text-xs uppercase tracking-widest bg-accent/10 group-hover:bg-background/20 px-2 py-0.5 transition-colors"
                    >
                      {{ project.role || 'CORE_MODULE' }}
                    </span>
                    <span
                      class="font-mono text-[10px] md:text-xs opacity-50 w-6 text-center border-b border-foreground/20 group-hover:border-background/20 transition-colors"
                    >
                      {{ String(index + 1).padStart(2, '0') }}
                    </span>
                  </div>

                  <h2
                    class="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none group-hover:underline underline-offset-4 decoration-2 break-words text-foreground group-hover:text-background transition-colors"
                  >
                    {{ project.title }}
                  </h2>
                </div>
              </div>

              <p
                class="text-base md:text-xl md:leading-relaxed opacity-80 mb-8 max-w-3xl font-sans mt-2"
              >
                {{ project.description }}
              </p>

              <!-- Dependencies / Tech Stack footer -->
              <div
                class="flex flex-col sm:flex-row sm:items-end justify-between mt-auto pt-6 border-t-2 border-dashed border-foreground/20 group-hover:border-background/30 transition-colors gap-6 relative"
              >
                <div
                  class="flex flex-wrap gap-2 text-[10px] md:text-xs font-mono items-center uppercase"
                >
                  <span
                    class="opacity-60 font-bold tracking-widest bg-foreground text-background group-hover:bg-background group-hover:text-foreground px-2 py-1 transition-colors"
                  >
                    DEPS
                  </span>
                  <span
                    v-for="tech in flattenTechStack(project.meta?.tech_stack || project.tech_stack)"
                    :key="tech"
                    class="border border-foreground/30 group-hover:border-background/30 px-2 py-0.5 transition-colors opacity-80"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div
                  class="text-xs md:text-sm font-bold uppercase flex items-center justify-center gap-1.5 transition-colors bg-accent/10 px-3 py-1.5 bg-transparent border-2 border-transparent group-hover:border-background/20 mt-2 hover:bg-transparent"
                >
                  <span class="leading-none tracking-widest">DEPLOY</span>
                  <span
                    class="font-black group-hover:text-accent transition-colors ml-1 group-hover:translate-x-1 duration-200"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
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

<style scoped>
.group\/crt::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%);
  background-size: 100% 8px;
  z-index: 50;
  pointer-events: none;
}
.crt-hover:hover::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 50%);
  background-size: 100% 4px;
  z-index: 50;
  pointer-events: none;
}
</style>
