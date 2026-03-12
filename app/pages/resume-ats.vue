<template>
  <div class="min-h-screen bg-background text-foreground">
    <main class="mx-auto max-w-4xl px-6 py-10 md:px-10 md:py-14 lg:px-12">
      <header class="ats-screen-header ats-print-section border-b border-foreground/20 pb-6 md:pb-8">
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">ATS-Friendly Resume</p>
        <h1 class="mt-3 text-3xl font-black tracking-tight md:text-5xl">Anggi Wibiyanto</h1>
        <p class="mt-3 text-base font-semibold md:text-lg">Senior Software Engineer · Full Product Owner · AI-Augmented Engineer</p>

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
          Senior Software Engineer with 10+ years delivering end-to-end systems across education, government, and media sectors. Experienced in full product ownership — from requirements gathering and client consultation to architecture, implementation, UAT, and long-term maintenance. Combines systems thinking with AI-augmented execution to ship production-grade software at 3x velocity without compromising quality.
        </p>
      </section>

      <section aria-labelledby="skills-heading" class="ats-print-section mt-8 md:mt-10">
        <h2 id="skills-heading" class="ats-section-heading text-xl font-black tracking-tight md:text-2xl">Technical Skills</h2>
        <div class="mt-4 grid gap-4">
          <div>
            <h3 class="font-bold">Architecture &amp; Design</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">Multi-Tenant SaaS Architecture, System Design Patterns, High Availability Systems, Event-Driven Architecture, API Design, Database Schema Design</p>
          </div>
          <div>
            <h3 class="font-bold">Frontend</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">Vue 3, React 19, TypeScript, Tailwind CSS 4, Inertia.js, TanStack (Query, Router, Form), PrimeVue, Bulma CSS</p>
          </div>
          <div>
            <h3 class="font-bold">Backend</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">Elixir, Ash Framework, Phoenix, Laravel 11/12 (Octane, Horizon), PHP 8.4, Hono, Yii2, Python (OR-Tools)</p>
          </div>
          <div>
            <h3 class="font-bold">Database &amp; Data</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">PostgreSQL, MySQL/MariaDB, Redis, xAPI/LRS, Query Optimization, Data Modeling</p>
          </div>
          <div>
            <h3 class="font-bold">Infrastructure &amp; DevOps</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">Docker, Nginx, Linux Server Administration, Cloudflare (Workers, R2, WAF), Azure Services, AWS S3, CI/CD</p>
          </div>
          <div>
            <h3 class="font-bold">Product &amp; Process</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80">Requirements Gathering, Client Consultation, UAT Coordination, Technical Documentation, System Maintenance, AI-Assisted Development</p>
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

          <!-- LMS -->
          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">LMS Certification Platform</h4>
              <p class="text-sm text-foreground/70">2025 – Present · <em>Scope: Full Product Owner</em></p>
            </div>
            <p class="text-xs text-foreground/60 mt-1">Tech: React 19, TypeScript, TanStack, Elixir, Ash Framework, Phoenix WebSockets, Oban, PostgreSQL, Hono, Cloudflare Workers &amp; R2, xAPI</p>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li><strong>AI-Augmented Delivery:</strong> Accelerated feature delivery cycles by 3x, acting as Architect and Driver while orchestrating AI tools for high-quality full-stack code execution.</li>
              <li><strong>Real-Time Infrastructure:</strong> Engineered React 19 + Phoenix WebSocket architecture with O(1) granular progress tracking, powering real-time chat/notifications with zero perceived latency.</li>
              <li><strong>Backend Resilience:</strong> Built scalable Elixir/Ash backend enforcing strict data immutability, coupled with modern xAPI architecture enabling deep learning analytics and full data interoperability.</li>
              <li><strong>Cost-Optimized Media Pipeline:</strong> Designed resilient Media Gateway and custom HLS pipeline using Cloudflare Worker &amp; R2, drastically reducing storage and egress costs while automating Oban-based video transcription.</li>
            </ul>
          </article>

          <!-- Digital School -->
          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">Digital School Platform</h4>
              <p class="text-sm text-foreground/70">2019 – 2025 · <em>Scope: Architect & Lead Engineer</em></p>
            </div>
            <p class="text-xs text-foreground/60 mt-1">Tech: Vue 3, Inertia.js, PrimeVue, Tailwind CSS, Laravel 12 (Octane &amp; Horizon), PHP 8.4, Python (OR-Tools), MySQL, Redis, AWS S3, Docker</p>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li><strong>High-Scale Examination Engine:</strong> Engineered highly optimized testing engine handling 3,000+ concurrent student test sessions on low-cost server infrastructure.</li>
              <li><strong>Automated Assessment Pipeline:</strong> Eliminated manual grading workloads to near-zero by implementing automated assessment pipeline for objective tests.</li>
              <li><strong>Advanced Scheduling Solver:</strong> Architected multi-stage automated scheduling solver using Python (Google OR-Tools) from PHP, providing realistic time estimates for clash-free timetables.</li>
              <li><strong>Multi-Curriculum Support:</strong> Designed flexible JSON-backed data model to process diverse academic standards (Merdeka, 2013 curriculum) simultaneously.</li>
              <li><strong>Async Processing:</strong> Developed modular backend using Laravel Octane and Redis-backed queues (Horizon) for heavy workloads like tuition billing and Telegram notifications.</li>
            </ul>
          </article>

          <!-- UPI SIMSARPRAS -->
          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">SIMSARPRAS — Universitas Pendidikan Indonesia</h4>
              <p class="text-sm text-foreground/70">2022 – 2024 · <em>Scope: Architect & Engineer</em></p>
            </div>
            <p class="text-xs text-foreground/60 mt-1">Tech: Vue 3, Inertia.js, PrimeVue, Laravel 11, PHP 8.3, MySQL, Redis</p>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li><strong>Unified Polymorphic Data Model:</strong> Engineered highly extensible single asset schema unifying disparate procurement types (purchase, donation, grants), eliminating data silos.</li>
              <li><strong>Automated Depreciation Engine:</strong> Developed high-performance module auto-computing real-time straight-line depreciation for 50,000+ assets.</li>
              <li><strong>Immutable Audit Trail:</strong> Architected tamper-proof change history integrated into all asset mutation records, satisfying university audits and compliance.</li>
              <li><strong>Hierarchical RBAC:</strong> Implemented granular access controls governing asset visibility and mutation rights across departments.</li>
            </ul>
          </article>

          <!-- UPI SIMKERMA -->
          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">SIMKERMA — Universitas Pendidikan Indonesia</h4>
              <p class="text-sm text-foreground/70">2022 – 2024 · <em>Scope: Architect & Engineer</em></p>
            </div>
            <p class="text-xs text-foreground/60 mt-1">Tech: Vue 3, Inertia.js, PrimeVue, Laravel 11, PHP 8.3, MySQL, Redis</p>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li><strong>Fault-Tolerant Sync Engine:</strong> Designed robust synchronization bridging complex local workflows with strict Kemdikbud national schemas.</li>
              <li><strong>Compliance & Simulation Workflow:</strong> Streamlined national reporting with real-time Report Weight calculations and scoring simulations.</li>
              <li><strong>Granular Performance Tracking:</strong> Developed comprehensive monitoring for cooperation activities per organizational unit.</li>
            </ul>
          </article>

          <!-- SIBER -->
          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">SIBER Election Platform</h4>
              <p class="text-sm text-foreground/70">2024 · <em>Scope: Architect & Engineer</em></p>
            </div>
            <p class="text-xs text-foreground/60 mt-1">Tech: Vue 3, Inertia.js, PrimeVue, Tailwind CSS, Laravel 11, PHP 8.2, MySQL, Redis, Laravel Horizon, Azure OCR API, Google Maps API</p>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li><strong>Automated Real-Count OCR Pipeline:</strong> Architected automated data extraction pipeline leveraging Azure OCR API to process ID cards and C1 voting forms from thousands of polling stations (TPS).</li>
              <li><strong>Real-Time Geospatial Analytics:</strong> Engineered dynamic territory mapping using Google Maps API, providing real-time visual insights into voter distribution and logistics tracking.</li>
              <li><strong>High-Availability Architecture:</strong> Built resilient high-load system using Redis and Laravel Horizon. Eliminated N+1 query bottlenecks, ensuring sub-second response times during Election Day traffic spikes.</li>
            </ul>
          </article>

          <!-- limawaktu.id -->
          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">limawaktu.id — Media Portal</h4>
              <p class="text-sm text-foreground/70">2016 – 2024 · <em>Scope: Founder & Engineer</em></p>
            </div>
            <p class="text-xs text-foreground/60 mt-1">Tech: PHP, Yii2 Framework, Bulma CSS, MySQL, Nginx, Linux, Cloudflare, Google Analytics, Matomo</p>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li><strong>Solo Platform Architecture:</strong> Designed, developed, and solely maintained entire media portal using Yii2 and Bulma CSS, managing 16,000+ news articles over 9 years.</li>
              <li><strong>Technical SEO & Traffic Analytics:</strong> Architected frontend and server pipelines with SEO best practices. Integrated Google Analytics alongside Matomo for robust tracking.</li>
            </ul>
          </article>

          <!-- bandungkita.id -->
          <article class="border-b border-foreground/15 pb-5">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">bandungkita.id — Media Infrastructure</h4>
              <p class="text-sm text-foreground/70">2017 – 2024 · <em>Scope: System Administrator</em></p>
            </div>
            <p class="text-xs text-foreground/60 mt-1">Tech: WordPress, Linux Server, Nginx, Cloudflare WAF, Fail2Ban</p>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li><strong>Infrastructure & Reliability:</strong> Managed and optimized Nginx and server resources for high-volume WordPress architecture.</li>
              <li><strong>Security Hardening & Disaster Recovery:</strong> Fortified defenses using multi-layered protocols. Led recovery for 3 major security incidents with zero permanent data loss.</li>
            </ul>
          </article>

          <!-- Pemkab -->
          <article class="pb-2">
            <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <h4 class="text-base font-bold">Pemkab Kabupaten Bandung Barat</h4>
              <p class="text-sm text-foreground/70">2013 – 2016 · <em>Scope: Software Engineer</em></p>
            </div>
            <p class="text-xs text-foreground/60 mt-1">Tech: PHP, Yii2 Framework, Bootstrap, jQuery, MySQL, Kannel SMS Gateway, Linux</p>
            <ul class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
              <li><strong>E-Government Ecosystem:</strong> Designed and developed 10+ critical public service platforms including One-Stop Licensing (SIMPPTSP) and Village Finance Systems.</li>
              <li><strong>Public Communication Channel:</strong> Architected reliable SMS notification system using Kannel SMS Gateway for real-time citizen status updates.</li>
              <li><strong>Agency Web Infrastructure:</strong> Built, deployed, and maintained official portals across multiple government agencies.</li>
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
      content: 'ATS-friendly resume for Anggi Wibiyanto — Senior Software Engineer with 10+ years delivering end-to-end systems with full product ownership.'
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