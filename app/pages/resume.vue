<template>
  <div class="space-y-12">
    <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-foreground pb-4 mb-8">
      <div>
        <h1 class="text-4xl font-extrabold uppercase tracking-tighter mb-2">Resume</h1>
        <p class="text-lg max-w-xl text-muted-foreground">Professional experience, skills, and education.</p>
      </div>
      <div class="mt-4 md:mt-0">
        <Button variant="outline" class="rounded-none border-foreground uppercase font-mono text-xs">
          Download PDF
        </Button>
      </div>
    </div>

    <!-- Experience Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-black uppercase tracking-tight border-b border-foreground pb-2">Experience</h2>
      <div class="space-y-8 mt-6">
        <!-- Sample Item -->
        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">Software Engineer</h3>
            <span class="font-mono text-sm text-muted-foreground">2023 - Present</span>
          </div>
          <div class="text-accent font-bold mb-4 uppercase text-sm tracking-widest">Tech Company</div>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li>Developed and maintained web applications using Vue and Nuxt.</li>
            <li>Collaborated with design teams to implement brutalist-lite UI/UX.</li>
            <li>Optimized application performance reducing load times by 30%.</li>
          </ul>
        </div>

        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">Junior Developer</h3>
            <span class="font-mono text-sm text-muted-foreground">2021 - 2023</span>
          </div>
          <div class="text-accent font-bold mb-4 uppercase text-sm tracking-widest">Digital Agency</div>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li>Assisted in building responsive front-end components.</li>
            <li>Participated in daily stand-ups and agile planning.</li>
            <li>Wrote comprehensive tests using Vitest and Cypress.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-black uppercase tracking-tight border-b border-foreground pb-2">Technical Skills</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">Frontend</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>Vue.js / Nuxt 3</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>HTML5 / Semantics</li>
          </ul>
        </div>
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">Backend & Tools</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>Node.js / Express</li>
            <li>PostgreSQL</li>
            <li>Git & GitHub Actions</li>
            <li>Docker Basics</li>
          </ul>
        </div>
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">Design Integration</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>Figma / UX Patterns</li>
            <li>Shadcn UI Elements</li>
            <li>Brutalist Aesthetics</li>
            <li>Responsive Layouts</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-black uppercase tracking-tight border-b border-foreground pb-2">Education</h2>
      <div class="mt-6 border-l-4 border-foreground pl-6 py-2">
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
          <h3 class="text-xl font-bold uppercase tracking-tight">Bachelor of Computer Science</h3>
          <span class="font-mono text-sm text-muted-foreground">2017 - 2021</span>
        </div>
        <div class="text-accent font-bold uppercase text-sm tracking-widest">University of Technology</div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Resume | LabTime',
  meta: [
    { name: 'description', content: 'Professional experience, technical skills, and educational background.' }
  ]
})
</script>
