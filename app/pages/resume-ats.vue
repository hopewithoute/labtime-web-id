<template>
  <div class="min-h-screen bg-background text-foreground">
    <main class="mx-auto max-w-4xl px-6 py-10 md:px-10 md:py-14 lg:px-12">
      <header class="ats-screen-header ats-print-section border-b border-foreground/20 pb-6 md:pb-8">
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">ATS-Friendly Resume</p>
        <h1 class="mt-3 text-3xl font-black tracking-tight md:text-5xl">Anggi Wibiyanto</h1>
        <p class="mt-3 text-base font-semibold md:text-lg">Tech Partner & Senior Software Engineer · System Builder · AI-Augmented Engineer</p>

        <div class="mt-5 grid gap-2 text-sm md:text-[15px] print:gap-1">
          <p><strong>Email:</strong> <a href="mailto:anggi.wibiyanto@gmail.com" class="underline underline-offset-2">anggi.wibiyanto@gmail.com</a></p>
          <p><strong>Location:</strong> Bandung, Indonesia</p>
          <p><strong>Website:</strong> <a href="https://labtime.web.id" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">labtime.web.id</a></p>
          <p><strong>GitHub:</strong> <a href="https://github.com/hopewithoute" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">github.com/hopewithoute</a></p>
        </div>
      </header>

      <section aria-labelledby="summary-heading" class="ats-print-section mt-8 md:mt-10">
        <h2 id="summary-heading" class="ats-section-heading text-xl font-black tracking-tight md:text-2xl">Professional Summary</h2>
        <p class="mt-3 text-sm leading-7 text-foreground/80 md:text-base">
          Tech partner and system builder with 10+ years of experience delivering end-to-end software systems
          for clients across education, government, and media. Focused on full-cycle architecture, high-performance
          infrastructure, and AI-augmented engineering workflows that accelerate delivery without lowering
          engineering quality.
        </p>
      </section>

      <section aria-labelledby="skills-heading" class="ats-print-section mt-8 md:mt-10">
        <h2 id="skills-heading" class="ats-section-heading text-xl font-black tracking-tight md:text-2xl">Technical Skills</h2>
        <div class="mt-4 grid gap-4">
          <div>
            <h3 class="font-bold">Architecture</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">AI-Augmented Engineering, System Design Patterns, Multi-Tenant SaaS, High Availability</p>
          </div>
          <div>
            <h3 class="font-bold">Frontend</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">Vue 3, React, TypeScript, Tailwind CSS, Inertia.js, TanStack</p>
          </div>
          <div>
            <h3 class="font-bold">Backend &amp; Performance</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">Elixir, Ash Framework, Phoenix, Laravel, Hono, Yii2</p>
          </div>
          <div>
            <h3 class="font-bold">Database &amp; Tools</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">PostgreSQL, MySQL, Azure OCR, Google OR-Tools, xAPI, WebSockets</p>
          </div>
          <div>
            <h3 class="font-bold">Infrastructure &amp; DevOps</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">Linux Server Administration, Nginx, Docker, Redis, Cloudflare Ecosystem, Security Hardening, Performance Tuning</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-heading" class="mt-8 md:mt-10">
        <div class="ats-print-keep-with-next">
          <h2 id="experience-heading" class="ats-section-heading text-xl font-black tracking-tight md:text-2xl">Professional Experience</h2>

          <!-- Company Header -->
          <div class="border-b border-foreground/15 pb-4 mb-4">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 class="text-xl font-bold">Rail System</h3>
                <p class="text-sm font-semibold text-foreground/80">Tech Partner & Senior Software Engineer</p>
              </div>
              <p class="text-sm text-foreground/70">2013 – Present · Remote</p>
            </div>
            <p class="mt-2 text-sm leading-7 text-foreground/80">
              Independent tech partner delivering end-to-end software systems for clients across education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership.
            </p>
          </div>

          <!-- Project Engagements -->
          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">LMS Certification Platform</h4>
              <p class="text-sm text-foreground/70">2025 – Present</p>
            </div>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li>Independently architected and delivered a certification-focused LMS covering immutable certification workflows, real-time assessments, xAPI telemetry, and edge-based media delivery.</li>
              <li>Increased feature delivery speed by 3x by combining architecture ownership with AI-assisted full-stack implementation.</li>
              <li>Built React 19 + Phoenix WebSocket architecture with O(1) progress updates. HLS media pipeline with edge-side authorization.</li>
            </ul>
          </article>

          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">Digital School Platform</h4>
              <p class="text-sm text-foreground/70">2019 – 2025</p>
            </div>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li>Architected the major v2 rebuild of an integrated school management and LMS platform.</li>
              <li>Online exam system handling 3,000 concurrent sessions. Google OR-Tools for automatic scheduling.</li>
              <li>Laravel Octane, Horizon, Redis-backed queues for billing, notifications, and heavy workloads.</li>
            </ul>
          </article>

          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">Universitas Pendidikan Indonesia</h4>
              <p class="text-sm text-foreground/70">2022 – 2024</p>
            </div>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li>Delivered centralized asset platform for 50,000+ university assets with automated depreciation and audit trails.</li>
              <li>Built cooperation management system with Kemdikbud synchronization for compliance reporting.</li>
            </ul>
          </article>

          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">SIBER Election Platform</h4>
              <p class="text-sm text-foreground/70">2024</p>
            </div>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li>Built Azure OCR-based real-count pipeline for ID cards and C1 voting forms.</li>
              <li>Designed resilient backend for election-day traffic spikes with Redis, Horizon, SQL optimization.</li>
            </ul>
          </article>

          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">Media Infrastructure (limawaktu.id + bandungkita.id)</h4>
              <p class="text-sm text-foreground/70">2016 – 2024</p>
            </div>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li>Built and maintained long-running media infrastructure: 16,000+ published articles, layered security, Core Web Vitals optimization, incident recovery with zero permanent data loss.</li>
            </ul>
          </article>

          <article class="pb-2">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">Pemkab Bandung Barat</h4>
              <p class="text-sm text-foreground/70">2013 – 2016</p>
            </div>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li>Built and deployed 10+ e-government systems including licensing, village finance, citizen notification, and agency web platforms.</li>
            </ul>
          </article>
        </div>
      </section>

      <section aria-labelledby="education-heading" class="ats-print-section mt-8 md:mt-10">
        <div class="education-print-group">
          <h2 id="education-heading" class="ats-section-heading text-xl font-black tracking-tight md:text-2xl">Education</h2>
          <div class="mt-4 space-y-4 text-sm leading-7 text-foreground/80">
            <div>
              <h3 class="font-bold">S1 Teknik Informatika</h3>
              <p>Universitas Komputer Indonesia (UNIKOM) · 2011 – 2016</p>
              <p>Software Engineering, Information System</p>
            </div>
            <div>
              <h3 class="font-bold">Teknik Komputer &amp; Jaringan</h3>
              <p>SMKN 1 Cimahi · 2006 – 2010</p>
              <p>Network Engineering</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  path: '/resume/ats'
})

useHead({
  title: 'ATS Resume | LabTime',
  meta: [
    {
      name: 'description',
      content: 'ATS-friendly resume for Anggi Wibiyanto — Tech Partner & Senior Software Engineer with 15+ years delivering end-to-end systems.'
    }
  ]
})
</script>

<style scoped>
@media print {
  :global(@page) {
    margin: 12mm;
  }

  :global(body) {
    background: white !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  main {
    max-width: none !important;
    padding: 0 !important;
  }

  .ats-screen-header {
    display: none !important;
  }

  .ats-print-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .ats-print-keep-with-next {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .education-print-group {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  article {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .ats-print-stack {
    margin-top: 0.875rem !important;
  }

  .ats-print-stack > .ats-print-section {
    margin-top: 0 !important;
  }

  .ats-print-stack > .ats-print-section + .ats-print-section {
    margin-top: 0.875rem !important;
  }

  .ats-section-heading {
    margin-bottom: 0.5rem;
  }

  .ats-print-list {
    margin-top: 0.375rem !important;
  }

  .ats-print-list li {
    margin-bottom: 0.2rem;
  }

  a {
    color: inherit !important;
    text-decoration: none !important;
  }
}
</style>
