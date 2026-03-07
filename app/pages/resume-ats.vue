<template>
  <div class="min-h-screen bg-background text-foreground">
    <main class="mx-auto max-w-4xl px-6 py-10 md:px-10 md:py-14 lg:px-12">
      <header class="ats-screen-header ats-print-section border-b border-foreground/20 pb-6 md:pb-8">
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">ATS-Friendly Resume</p>
        <h1 class="mt-3 text-3xl font-black tracking-tight md:text-5xl">Anggi Wibiyanto</h1>
        <p class="mt-3 text-base font-semibold md:text-lg">Senior Software Engineer · Senior System Builder · AI-Augmented Engineer</p>

        <div class="mt-5 grid gap-2 text-sm md:text-[15px] print:gap-1">
          <p><strong>Email:</strong> <a href="mailto:anggi.wibiyanto@gmail.com" class="underline underline-offset-2">anggi.wibiyanto@gmail.com</a></p>
          <p><strong>Location:</strong> Bandung, Indonesia</p>
          <p><strong>Website:</strong> <a href="https://labtime.web.id" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">labtime.web.id</a></p>
          <p><strong>GitHub:</strong> <a href="https://github.com/hopewithoute" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">github.com/hopewithoute</a></p>
        </div>
      </header>

      <section aria-labelledby="summary-heading" class="ats-print-section mt-8 md:mt-10">
        <h2 id="summary-heading" class="text-xl font-black tracking-tight md:text-2xl">Professional Summary</h2>
        <p class="mt-3 text-sm leading-7 text-foreground/80 md:text-base">
          End-to-end system builder with 10+ years of experience turning complex business needs into scalable,
          resource-efficient digital systems. Focused on full-cycle architecture, high-performance SaaS
          infrastructure, and AI-augmented engineering workflows that accelerate delivery without lowering
          engineering quality.
        </p>
      </section>

      <section aria-labelledby="skills-heading" class="ats-print-section mt-8 md:mt-10">
        <h2 id="skills-heading" class="text-xl font-black tracking-tight md:text-2xl">Technical Skills</h2>
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
          <h2 id="experience-heading" class="text-xl font-black tracking-tight md:text-2xl">Professional Experience</h2>

          <article class="ats-print-section mt-5 border-b border-foreground/15 pb-6">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 class="text-lg font-bold">Senior Software Engineer</h3>
                <p class="text-sm font-semibold text-foreground/80">LMS Certification Platform</p>
              </div>
              <p class="text-sm text-foreground/70">2025 – Present</p>
            </div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/80">
              <li>Independently architected and delivered a certification-focused LMS covering immutable certification workflows, real-time assessments, xAPI telemetry, and edge-based media delivery.</li>
              <li>Increased feature delivery speed by 3x by combining architecture ownership with AI-assisted full-stack implementation across frontend, backend, and infrastructure.</li>
              <li>Built a React 19 and Phoenix WebSocket architecture with O(1) progress updates, chat, and notification flows without relying on coarse polling.</li>
              <li>Lowered storage and egress cost through an HLS pipeline, Cloudflare R2, edge-side media authorization, and Oban-based transcription workflows.</li>
            </ul>
          </article>
        </div>

        <div class="mt-5 space-y-6 md:space-y-8">

          <article class="ats-print-section border-b border-foreground/15 pb-6">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 class="text-lg font-bold">Senior Software Engineer</h3>
                <p class="text-sm font-semibold text-foreground/80">Digital School</p>
              </div>
              <p class="text-sm text-foreground/70">2019 – 2025</p>
            </div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/80">
              <li>Directed the initial engineering and independently architected the major v2 rebuild of an integrated school management and LMS platform.</li>
              <li>Engineered an online exam system that handled 3,000 concurrent student sessions on cost-efficient infrastructure.</li>
              <li>Applied Google OR-Tools to automate complex academic scheduling and reduce manual timetable generation effort.</li>
              <li>Used Laravel Octane, Horizon, and Redis-backed queues to handle billing, notifications, and other heavy background workloads efficiently.</li>
            </ul>
          </article>

          <article class="ats-print-section border-b border-foreground/15 pb-6">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 class="text-lg font-bold">Senior Software Engineer</h3>
                <p class="text-sm font-semibold text-foreground/80">Universitas Pendidikan Indonesia</p>
              </div>
              <p class="text-sm text-foreground/70">2022 – 2024</p>
            </div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/80">
              <li>Delivered a centralized asset platform covering 50,000+ university assets, automated depreciation, lifecycle tracking, and audit-ready change history.</li>
              <li>Built a cooperation management system with two-way synchronization to Kemdikbud, reducing manual compliance reporting and improving institutional visibility.</li>
            </ul>
          </article>

          <article class="ats-print-section border-b border-foreground/15 pb-6">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 class="text-lg font-bold">Senior Software Engineer</h3>
                <p class="text-sm font-semibold text-foreground/80">SIBER</p>
              </div>
              <p class="text-sm text-foreground/70">2024</p>
            </div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/80">
              <li>Built an Azure OCR-based real-count pipeline to process ID cards and C1 voting forms from large numbers of polling stations.</li>
              <li>Engineered mapping and territory analytics for voter distribution, logistics tracking, and field-team coordination.</li>
              <li>Designed a resilient backend with Redis, Horizon, and SQL optimization to stay responsive during election-day traffic spikes.</li>
            </ul>
          </article>

          <article class="ats-print-section border-b border-foreground/15 pb-6">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 class="text-lg font-bold">Software Engineer / System Administrator</h3>
                <p class="text-sm font-semibold text-foreground/80">limawaktu.id + bandungkita.id</p>
              </div>
              <p class="text-sm text-foreground/70">2016 – 2024</p>
            </div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/80">
              <li>Built and maintained long-running media infrastructure covering 16,000+ published articles, layered WordPress and server security, Core Web Vitals optimization, technical SEO, and incident recovery with zero permanent data loss across major outages.</li>
            </ul>
          </article>

          <article class="ats-print-section pb-2">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 class="text-lg font-bold">Software Engineer</h3>
                <p class="text-sm font-semibold text-foreground/80">Pemkab Bandung Barat</p>
              </div>
              <p class="text-sm text-foreground/70">2013 – 2016</p>
            </div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/80">
              <li>Built and deployed 10+ e-government systems, including licensing, village finance, citizen notification, and agency web platforms, helping move manual public-service workflows into digital operations.</li>
            </ul>
          </article>
        </div>
      </section>

      <section aria-labelledby="education-heading" class="ats-print-section mt-8 md:mt-10">
        <h2 id="education-heading" class="text-xl font-black tracking-tight md:text-2xl">Education</h2>
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
      content: 'ATS-friendly resume for Anggi Wibiyanto — Senior Software Engineer focused on scalable systems, SaaS infrastructure, and AI-augmented engineering.'
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
    margin-top: 1rem !important;
  }

  .ats-print-section:first-of-type {
    margin-top: 0 !important;
  }

  .ats-print-keep-with-next {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  article {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  ul {
    margin-top: 0.5rem !important;
  }

  li {
    margin-bottom: 0.25rem;
  }

  a {
    color: inherit !important;
    text-decoration: none !important;
  }
}
</style>
