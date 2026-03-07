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
              <span class="text-accent font-bold">></span> End-to-End System Builder
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
                  <span>Open ATS-Friendly Resume</span>
                </span>
                <div class="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </NuxtLink>

              <NuxtLink to="/resume" class="block w-full border-2 border-foreground group hover:bg-foreground hover:text-background transition-colors relative crt-hover bg-background overflow-hidden text-center text-xs py-3 font-mono font-bold uppercase tracking-widest">
                <span class="relative z-10 flex items-center justify-center gap-2 group-hover:text-background text-foreground transition-colors">
                  <span class="text-accent group-hover:text-background">./bin/</span>
                  <span>Export PDF Resume</span>
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
      <section id="summary" class="scroll-mt-24">
        <div class="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">/* 01. Profile Summary */</div>
        <p class="text-xl md:text-2xl leading-relaxed max-w-3xl font-medium">
          End-to-End System Builder with 10+ years of experience building scalable, resource-efficient digital ecosystems. Specializes in multi-tenant platforms, high-performance infrastructure, and AI-Augmented Engineering to accelerate development, delivering robust, cost-effective solutions with rapid business adaptability.
        </p>
      </section>

      <!-- 02. Experience Section -->
      <section id="experience" class="scroll-mt-24">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-3xl font-black uppercase tracking-tight">Execution_Logs</h2>
          <div class="h-px bg-foreground flex-1 opacity-20"></div>
        </div>

        <div class="space-y-0 border-2 border-foreground bg-background">
          
          <!-- R&D: Modern LMS -->
          <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20 last:border-b-0">
            <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
              <h3 class="text-2xl font-black uppercase tracking-tight">Software Architect &amp; AI Dev</h3>
              <span class="font-mono text-xs font-bold tracking-widest text-background bg-foreground shrink-0 px-2 py-1">2025 - PRES</span>
            </div>
            <div class="font-mono font-bold mb-6 uppercase text-xs tracking-widest text-foreground/70">
              <span class="text-accent">#01</span> [ R&D — Modern Learning Management System ]
            </div>
            <ul class="space-y-4 text-sm md:text-base text-muted-foreground font-medium">
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">AI-Augmented Execution</strong> Accelerated feature delivery cycles by 3x acting as Architect & Driver, orchestrating AI for high-quality full-stack code execution.</span>
              </li>
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">State Persistence</strong> Designed an xAPI-based architecture for granular learning traces, deep analytics, and full data interoperability across standard and bespoke payloads.</span>
              </li>
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Media Delivery</strong> Reduced storage/egress costs using HLS encoding pipeline, Cloudflare R2, and edge workers for strict media auth and automated transcription.</span>
              </li>
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Real-Time Sync</strong> Built real-time concurrency (Chat, Notifications) using WebSockets, integrating heavily with Ash Framework domain events.</span>
              </li>
            </ul>
          </div>

          <!-- DISC -->
          <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20 last:border-b-0">
            <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
              <h3 class="text-2xl font-black uppercase tracking-tight">Lead Developer</h3>
              <span class="font-mono text-xs font-bold tracking-widest text-background bg-foreground shrink-0 px-2 py-1">2019 - PRES</span>
            </div>
            <div class="font-mono font-bold mb-6 uppercase text-xs tracking-widest text-foreground/70">
              <span class="text-accent">#02</span> [ DISC — Integrated Academic SaaS Platform ]
            </div>
            <ul class="space-y-4 text-sm md:text-base text-muted-foreground font-medium">
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Scalability</strong> Engineered an Online Exam module handling 2,000+ concurrent users on cost-effective infrastructure.</span>
              </li>
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Task Automation</strong> Deployed Google OR-Tools for automated, constraint-based multi-campus class scheduling.</span>
              </li>
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">IoT Integration</strong> Developed a custom IoT bridge connecting fingerprint hardware with the cloud for low-latency attendance tracking.</span>
              </li>
            </ul>
          </div>

          <!-- UPI -->
          <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20 last:border-b-0">
            <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
              <h3 class="text-2xl font-black uppercase tracking-tight">Full Stack Developer</h3>
              <span class="font-mono text-xs border border-foreground/30 font-bold tracking-widest shrink-0 px-2 py-1">2022 - 2024</span>
            </div>
            <div class="font-mono font-bold mb-6 uppercase text-xs tracking-widest text-foreground/70">
              <span class="text-accent">#03</span> [ Universitas Pendidikan Indonesia ]
            </div>
            <ul class="space-y-4 text-sm md:text-base text-muted-foreground font-medium">
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Simsarpras</strong> Centralized system for 50,000+ university assets with automated depreciation, streamlining institutional audits.</span>
              </li>
              <li class="flex items-start gap-4">
                <span class="text-accent font-black mt-0.5 shrink-0">>></span>
                <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Simkerma</strong> Multi-level external cooperation approval workflow with automated two-way data synchronization to Kemdikbud.</span>
              </li>
            </ul>
          </div>

          <!-- Media Infrastructure -->
          <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20 last:border-b-0">
            <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
              <h3 class="text-2xl font-black uppercase tracking-tight">Full Stack Developer</h3>
              <span class="font-mono text-xs border border-foreground/30 font-bold tracking-widest shrink-0 px-2 py-1">2016 - 2024</span>
            </div>
            <div class="font-mono font-bold mb-6 uppercase text-xs tracking-widest text-foreground/70">
              <span class="text-accent">#04</span> [ Media Infrastructure ]
            </div>
            <p class="text-sm md:text-base text-muted-foreground font-medium ml-8">Maintained 9+ years of operational stability. Managed multi-layered security protocols (Fail2Ban, Firewalls, Cloudflare WAF) and optimized Core Web Vitals for programmatic SEO.</p>
          </div>

          <!-- Gov -->
          <div class="relative p-6 md:p-8 group border-b-2 border-foreground/20 last:border-b-0">
            <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
              <h3 class="text-2xl font-black uppercase tracking-tight">Full Stack Developer</h3>
              <span class="font-mono text-xs border border-foreground/30 font-bold tracking-widest shrink-0 px-2 py-1">2010 - 2024</span>
            </div>
            <div class="font-mono font-bold mb-6 uppercase text-xs tracking-widest text-foreground/70">
              <span class="text-accent">#05</span> [ Gov / Election Analytics ]
            </div>
            <p class="text-sm md:text-base text-muted-foreground font-medium ml-8">Led development of 10+ public service systems. Built hierarchical analytics for voter mapping and Real-Time Quick Count Dashboards.</p>
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
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Multi-Tenant SaaS</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Event-Driven</span>
              <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">AI-Augmented Dev</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Granular Telemetry</span>
            </div>
          </div>
          
          <div class="bg-background p-6 md:p-8 group relative">
            <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_02 // Backend</div>
            <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Core Infrastructure</h3>
            <div class="flex flex-wrap gap-2">
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Elixir / Phoenix</span>
              <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Ash Framework</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">PostgreSQL</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Hono (Edge)</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Laravel</span>
            </div>
          </div>

          <div class="bg-background p-6 md:p-8 group relative">
            <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_03 // Frontend</div>
            <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">User Interface</h3>
            <div class="flex flex-wrap gap-2">
              <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Vue / Nuxt 3</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">React 19</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">TypeScript</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Tailwind CSS v4</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">WebSockets</span>
            </div>
          </div>

          <div class="bg-background p-6 md:p-8 group relative">
            <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_04 // Operations</div>
            <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">DevOps &amp; Edge</h3>
            <div class="flex flex-wrap gap-2">
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Cloudflare Workers</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">R2 Object Storage</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Docker</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Linux Server</span>
              <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">GitHub Actions</span>
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
            <div class="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 font-bold border-b border-dashed border-foreground/20 pb-4">UNIKOM</div>
            <p class="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">Software Engineering, Information Systems</p>
          </div>
          
          <div class="bg-background p-6 md:p-8 group relative border-b border-foreground">
            <div class="font-mono text-xs font-bold tracking-widest text-background bg-foreground shrink-0 px-2 py-1 inline-block mb-4">2006 - 2010</div>
            <h3 class="text-lg md:text-xl font-black uppercase tracking-tight mb-2">Teknik Komputer &amp; Jaringan</h3>
            <div class="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 font-bold border-b border-dashed border-foreground/20 pb-4">SMKN 1 Cimahi</div>
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
    { name: 'description', content: 'Anggi Wibiyanto — System Builder & AI-Augmented Engineer. 10+ years building scalable digital ecosystems.' }
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
