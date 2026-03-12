<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative group/crt pb-24">

    <!-- Left Column: Sticky Header & Navigation -->
    <aside class="lg:col-span-4 xl:col-span-3">
      <div class="lg:sticky lg:top-32 flex flex-col">
        <CornerFrame class="bg-background">
          <div class="p-6 md:p-8">
            <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 border-l-[6px] border-accent pl-4 leading-none glitch-hover relative inline-block">
              <span class="relative z-10">Resume</span>
            </h1>
            <p class="text-sm font-mono text-muted-foreground leading-snug mb-8 opacity-80">
              <span class="text-accent font-bold">></span> Senior Software Engineer
              <br/>
              <span class="text-accent font-bold">></span> AI-Augmented Engineer
            </p>

            <!-- Desktop Navigation Map -->
            <nav class="hidden lg:block space-y-1 font-mono text-xs uppercase mb-12">
              <div class="text-[10px] text-muted-foreground mb-4 tracking-widest border-b border-dashed border-foreground/30 pb-2 flex justify-between">
                <span>[INDEX_MAP]</span>
                <span>/sys/docs</span>
              </div>
              <a href="#summary" class="flex items-center gap-2 py-2 text-foreground/70 hover:text-accent group transition-colors border-b border-foreground/10 hover:border-accent/40 relative">
                <span class="opacity-0 group-hover:opacity-100 text-accent transition-opacity w-6 shrink-0">[x]</span>
                <span class="opacity-100 group-hover:opacity-0 text-muted-foreground transition-opacity w-6 absolute left-0">[ ]</span>
                <span class="ml-1">01. Summary</span>
              </a>
              <a href="#experience" class="flex items-center gap-2 py-2 text-foreground/70 hover:text-accent group transition-colors border-b border-foreground/10 hover:border-accent/40 relative">
                <span class="opacity-0 group-hover:opacity-100 text-accent transition-opacity w-6 shrink-0">[x]</span>
                <span class="opacity-100 group-hover:opacity-0 text-muted-foreground transition-opacity w-6 absolute left-0">[ ]</span>
                <span class="ml-1">02. Execution_Logs</span>
              </a>
              <a href="#skills" class="flex items-center gap-2 py-2 text-foreground/70 hover:text-accent group transition-colors border-b border-foreground/10 hover:border-accent/40 relative">
                <span class="opacity-0 group-hover:opacity-100 text-accent transition-opacity w-6 shrink-0">[x]</span>
                <span class="opacity-100 group-hover:opacity-0 text-muted-foreground transition-opacity w-6 absolute left-0">[ ]</span>
                <span class="ml-1">03. Tech_Matrix</span>
              </a>
              <a href="#education" class="flex items-center gap-2 py-2 text-foreground/70 hover:text-accent group transition-colors border-b border-foreground/10 hover:border-accent/40 relative">
                <span class="opacity-0 group-hover:opacity-100 text-accent transition-opacity w-6 shrink-0">[x]</span>
                <span class="opacity-100 group-hover:opacity-0 text-muted-foreground transition-opacity w-6 absolute left-0">[ ]</span>
                <span class="ml-1">04. Education</span>
              </a>
            </nav>

            <!-- Prominent CTA -->
            <div class="mt-8 lg:mt-6 space-y-3">
              <NuxtLink to="/resume/ats" class="block w-full border-2 border-foreground group hover:bg-foreground hover:text-background transition-colors relative crt-hover bg-background overflow-hidden text-center text-xs py-3 font-mono font-bold uppercase tracking-widest">
                <span class="relative z-10 flex items-center justify-center gap-2 group-hover:text-background text-foreground transition-colors">
                  <span class="text-accent group-hover:text-background">./sys/</span>
                  <span>Open ATS</span>
                </span>
                <div class="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </NuxtLink>
            </div>
          </div>
        </CornerFrame>
      </div>
    </aside>

    <!-- Right Column: Scrolling Content -->
    <div class="lg:col-span-8 xl:col-span-9 space-y-20 lg:pl-8 lg:border-l lg:border-foreground/20">

      <!-- 01. Summary Section -->
      <section id="summary" class="scroll-mt-24 space-y-8">
        <div class="border-2 border-foreground bg-background">
          <div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)] gap-0.5 bg-foreground">
            <div class="bg-background p-6 md:p-8 lg:p-10">
              <div class="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">/* 01. Profile Summary */</div>
              <div class="mb-5 flex flex-wrap gap-2">
                <span class="border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-mono font-black uppercase tracking-[0.2em] text-accent">Senior Software Engineer</span>
                <span class="border border-foreground/20 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/70">Bandung / Remote</span>
              </div>
              <p class="text-xl md:text-2xl leading-relaxed max-w-3xl font-medium">
                Senior Software Engineer with 10+ years delivering end-to-end systems across education, government, and media sectors. Experienced in full product ownership — from requirements gathering and client consultation to architecture, implementation, UAT, and long-term maintenance. Combines systems thinking with AI-augmented execution to ship production-grade software at 3x velocity without compromising quality.
              </p>
            </div>

            <div class="bg-background p-6 md:p-8 border-t xl:border-t-0 xl:border-l border-foreground/20">
              <div class="flex items-center justify-between gap-4 mb-5 border-b border-dashed border-foreground/20 pb-3">
                <div>
                  <div class="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">[CONTACT_BLOCK]</div>
                  <h2 class="text-xl font-black uppercase tracking-tight mt-1">Anggi Wibiyanto</h2>
                </div>
                <span class="font-mono text-[10px] px-2 py-1 border border-accent/30 text-accent uppercase tracking-[0.2em] font-bold">Open to role</span>
              </div>

              <div class="space-y-3 text-sm md:text-[15px]">
                <div class="flex items-start justify-between gap-4 border-b border-foreground/10 pb-3">
                  <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Email</span>
                  <a href="mailto:anggi.wibiyanto@gmail.com" class="text-right font-semibold text-foreground hover:text-accent transition-colors break-all">anggi.wibiyanto@gmail.com</a>
                </div>
                <div class="flex items-start justify-between gap-4 border-b border-foreground/10 pb-3">
                  <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Location</span>
                  <span class="text-right font-semibold text-foreground">Bandung, Indonesia</span>
                </div>
                <div class="flex items-start justify-between gap-4 border-b border-foreground/10 pb-3">
                  <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Website</span>
                  <a href="https://labtime.web.id" target="_blank" rel="noopener noreferrer" class="text-right font-semibold text-foreground hover:text-accent transition-colors break-all">labtime.web.id</a>
                </div>
                <div class="flex items-start justify-between gap-4">
                  <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">GitHub</span>
                  <a href="https://github.com/hopewithoute" target="_blank" rel="noopener noreferrer" class="text-right font-semibold text-foreground hover:text-accent transition-colors break-all">github.com/hopewithoute</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-foreground border-2 border-foreground">
          <div class="bg-background p-4 md:p-5">
            <div class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Signal_01</div>
            <div class="text-2xl md:text-3xl font-black tracking-tight">10+</div>
            <div class="text-xs md:text-sm font-medium text-muted-foreground">years delivering production systems</div>
          </div>
          <div class="bg-background p-4 md:p-5">
            <div class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Signal_02</div>
            <div class="text-2xl md:text-3xl font-black tracking-tight">21</div>
            <div class="text-xs md:text-sm font-medium text-muted-foreground">user stories shipped in LMS rollout</div>
          </div>
          <div class="bg-background p-4 md:p-5">
            <div class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Signal_03</div>
            <div class="text-2xl md:text-3xl font-black tracking-tight">3x</div>
            <div class="text-xs md:text-sm font-medium text-muted-foreground">faster delivery with AI-augmented execution</div>
          </div>
          <div class="bg-background p-4 md:p-5">
            <div class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Signal_04</div>
            <div class="text-2xl md:text-3xl font-black tracking-tight">3,000</div>
            <div class="text-xs md:text-sm font-medium text-muted-foreground">concurrent exam sessions handled</div>
          </div>
        </div>
      </section>

      <!-- 02. Experience Section -->
      <section id="experience" class="scroll-mt-24">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-3xl font-black uppercase tracking-tight">Execution_Logs</h2>
          <div class="h-px bg-foreground flex-1 opacity-20"></div>
        </div>

        <div class="border-2 border-foreground bg-background">
          <!-- Company Header -->
          <div class="p-6 md:p-8 bg-foreground/5 border-b-2 border-foreground">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h3 class="text-2xl md:text-3xl font-black uppercase tracking-tight">Rail System</h3>
                <div class="font-mono text-sm text-accent font-bold mt-1">Tech Partner & Senior Software Engineer</div>
              </div>
              <div class="flex flex-col md:items-end gap-1">
                <span class="font-mono text-xs font-bold tracking-widest text-background bg-foreground shrink-0 px-3 py-1.5">2013 - PRESENT</span>
                <span class="font-mono text-xs uppercase tracking-widest text-muted-foreground">Remote</span>
              </div>
            </div>
            <p class="text-sm md:text-base text-muted-foreground mt-4 max-w-3xl">
              Independent tech partner delivering end-to-end software systems for clients across education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership.
            </p>
          </div>

          <!-- Project Engagements -->
          <div class="space-y-0">

            <!-- LMS -->
            <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
              <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
                <div class="flex flex-wrap items-baseline gap-2">
                  <h4 class="text-xl font-black uppercase tracking-tight">LMS Certification Platform</h4>
                  <span class="font-mono text-[10px] px-2 py-0.5 border border-accent/30 text-accent uppercase tracking-[0.15em] font-bold">Full Product Owner</span>
                </div>
                <span class="font-mono text-xs font-bold tracking-widest text-accent border border-accent/30 shrink-0 px-2 py-1">2025 - PRES</span>
              </div>

              <!-- Tech Stack Chips -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">React 19</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">TypeScript</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">TanStack</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Elixir</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Ash Framework</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Phoenix WebSockets</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Oban</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">PostgreSQL</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Hono</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Cloudflare Workers</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">xAPI</span>
              </div>

              <ul class="space-y-3 text-sm md:text-base text-muted-foreground font-medium">
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">AI-Augmented Delivery</strong> Accelerated feature delivery cycles by 3x, acting as Architect and driver while orchestrating AI tools for high-quality full-stack code execution.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Real-Time Infrastructure</strong> Engineered React 19 + Phoenix WebSocket architecture with O(1) granular progress tracking, powering real-time chat/notifications with zero perceived latency.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Backend Resilience</strong> Built scalable Elixir/Ash backend enforcing strict data immutability, coupled with modern xAPI architecture enabling deep learning analytics and full data interoperability.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Cost-Optimized Media Pipeline</strong> Designed resilient Media Gateway and custom HLS pipeline using Cloudflare Worker &amp; R2, drastically reducing storage and egress costs while automating Oban-based video transcription.</span>
                </li>
              </ul>
            </div>

            <!-- Digital School -->
            <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
              <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
                <div class="flex flex-wrap items-baseline gap-2">
                  <h4 class="text-xl font-black uppercase tracking-tight">Digital School Platform</h4>
                  <span class="font-mono text-[10px] px-2 py-0.5 border border-foreground/30 text-foreground/70 uppercase tracking-[0.15em] font-bold">Architect & Lead</span>
                </div>
                <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2019 - 2025</span>
              </div>

              <!-- Tech Stack Chips -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Vue 3</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Inertia.js</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">PrimeVue</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Tailwind CSS</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Laravel 12</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">PHP 8.4</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Python (OR-Tools)</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">MySQL</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Redis</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">AWS S3</span>
                <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Docker</span>
              </div>

              <ul class="space-y-3 text-sm md:text-base text-muted-foreground font-medium">
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">High-Scale Examination Engine</strong> Engineered highly optimized testing engine handling 3,000+ concurrent student test sessions on low-cost server infrastructure.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Automated Assessment Pipeline</strong> Eliminated manual grading workloads to near-zero by implementing automated assessment pipeline for objective tests.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Advanced Scheduling Solver</strong> Architected multi-stage automated scheduling solver using Python (Google OR-Tools) from PHP, providing realistic time estimates for clash-free timetables.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Multi-Curriculum Support</strong> Designed flexible JSON-backed data model to process diverse academic standards (Merdeka, 2013 curriculum) simultaneously.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Async Processing</strong> Developed modular backend using Laravel Octane and Redis-backed queues (Horizon) for heavy workloads like tuition billing and Telegram notifications.</span>
                </li>
              </ul>
            </div>

            <!-- UPI -->
            <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
              <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
                <h4 class="text-xl font-black uppercase tracking-tight">Universitas Pendidikan Indonesia</h4>
                <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2022 - 2024</span>
              </div>
              <ul class="space-y-3 text-sm md:text-base text-muted-foreground font-medium">
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">SIMSARPRAS</strong> Centralized asset platform for 50,000+ university assets with automated depreciation and audit trails.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">SIMKERMA</strong> Cooperation management with Kemdikbud synchronization for compliance reporting.</span>
                </li>
              </ul>
            </div>

            <!-- SIBER -->
            <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
              <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
                <h4 class="text-xl font-black uppercase tracking-tight">SIBER Election Platform</h4>
                <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2024</span>
              </div>
              <ul class="space-y-3 text-sm md:text-base text-muted-foreground font-medium">
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">OCR pipeline</strong> Azure OCR-based real-count pipeline for ID cards and C1 voting forms.</span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                  <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">High availability</strong> Resilient backend design for election-day traffic spikes with Redis, Horizon, SQL optimization.</span>
                </li>
              </ul>
            </div>

            <!-- Media Infrastructure -->
            <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
              <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
                <h4 class="text-xl font-black uppercase tracking-tight">Media Infrastructure</h4>
                <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2016 - 2024</span>
              </div>
              <p class="text-sm md:text-base text-muted-foreground font-medium ml-6">Long-running media infrastructure for limawaktu.id + bandungkita.id: 16,000+ published articles, layered security, Core Web Vitals optimization, incident recovery with zero permanent data loss.</p>
            </div>

            <!-- Gov -->
            <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20 last:border-b-0">
              <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
                <h4 class="text-xl font-black uppercase tracking-tight">Pemkab Bandung Barat</h4>
                <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2013 - 2016</span>
              </div>
              <p class="text-sm md:text-base text-muted-foreground font-medium ml-6">10+ e-government systems including licensing, village finance, citizen notification, and agency web platforms.</p>
            </div>

          </div>
        </div>
      </section>

      <!-- 03. Tech Matrix Section -->
      <section id="skills" class="scroll-mt-24">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-3xl font-black uppercase tracking-tight">Technical Matrix</h2>
          <div class="h-px bg-foreground flex-1 opacity-20"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0.5 bg-foreground border-2 border-foreground">
          <div class="bg-background p-6 md:p-8 group relative">
            <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_01 // Architecture</div>
            <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">System Design</h3>
            <div class="flex flex-wrap gap-2">
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">AI-Augmented Engineering</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">System Design Patterns</span>
              <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Multi-Tenant SaaS</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">High Availability</span>
            </div>
          </div>

          <div class="bg-background p-6 md:p-8 group relative">
            <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_02 // Backend</div>
            <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Backend &amp; Performance</h3>
            <div class="flex flex-wrap gap-2">
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Elixir</span>
              <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Ash Framework</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Phoenix</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Laravel</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Hono</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Yii2</span>
            </div>
          </div>

          <div class="bg-background p-6 md:p-8 group relative">
            <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_03 // Frontend</div>
            <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Frontend</h3>
            <div class="flex flex-wrap gap-2">
              <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Vue 3</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">React</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">TypeScript</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Tailwind CSS</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Inertia.js</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">TanStack</span>
            </div>
          </div>

          <div class="bg-background p-6 md:p-8 group relative">
            <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_04 // Data + Ops</div>
            <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Infrastructure &amp; Tools</h3>
            <div class="flex flex-wrap gap-2">
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">PostgreSQL</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">MySQL</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Docker</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Nginx</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Redis</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Cloudflare</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Azure OCR</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Google OR-Tools</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">xAPI</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">WebSockets</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 04. Education Section -->
      <section id="education" class="scroll-mt-24 pb-20">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-3xl font-black uppercase tracking-tight">Education</h2>
          <div class="h-px bg-foreground flex-1 opacity-20"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground bg-foreground">
          <div class="bg-background p-6 md:p-8 group relative border-b border-r border-foreground">
            <div class="font-mono text-xs font-bold tracking-widest text-background bg-foreground shrink-0 px-2 py-1 inline-block mb-4">2011 - 2016</div>
            <h3 class="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">S1 Teknik Informatika</h3>
            <div class="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 font-bold border-b border-dashed border-foreground/20 pb-4">Universitas Komputer Indonesia (UNIKOM)</div>
            <p class="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">Software Engineering, Information System</p>
          </div>

          <div class="bg-background p-6 md:p-8 group relative border-b border-foreground">
            <div class="font-mono text-xs font-bold tracking-widest text-background bg-foreground shrink-0 px-2 py-1 inline-block mb-4">2006 - 2010</div>
            <h3 class="text-lg md:text-xl font-black uppercase tracking-tight mb-2">Teknik Komputer &amp; Jaringan</h3>
            <div class="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 font-bold border-b border-dashed border-foreground/20 pb-4">SMKN 1 Cimahi</div>
            <p class="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">Network Engineering</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Resume | LabTime',
  meta: [
    { name: 'description', content: 'Anggi Wibiyanto — Senior Software Engineer & AI-Augmented Engineer with 10+ years designing scalable digital systems.' }
  ]
})
</script>

<style scoped>
.group\/crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.05) 50%
  );
  background-size: 100% 8px;
  z-index: 50;
  pointer-events: none;
}
.crt-hover:hover::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.05) 50%
  );
  background-size: 100% 4px;
  z-index: 50;
  pointer-events: none;
}
</style>
