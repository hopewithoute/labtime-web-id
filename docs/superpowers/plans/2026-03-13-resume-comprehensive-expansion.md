# Resume Comprehensive Expansion Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update resume.vue and resume-ats.vue with comprehensive achievements, full tech stacks, and clear product ownership narrative.

**Architecture:** Content-focused update to two Vue single-file components. No business logic changes—only template content updates. Each project section gets expanded achievements, tech stack chips, and scope tags.

**Tech Stack:** Vue 3, Nuxt 3, TypeScript

---

## Files to Modify

| File | Changes |
|------|---------|
| `app/pages/resume.vue` | Update summary, expand tech matrix to 6 categories, add detailed achievements per project, add scope tags and tech stack chips |
| `app/pages/resume-ats.vue` | Expand all sections with full details, ensure ATS keyword density, add scope field per project |

---

## Chunk 1: resume.vue — Summary Section

### Task 1: Update Profile Summary Text

**Files:**
- Modify: `app/pages/resume.vue:74-76`

- [ ] **Step 1: Update summary paragraph**

Replace the summary paragraph at line 74-76:

```vue
<p class="text-xl md:text-2xl leading-relaxed max-w-3xl font-medium">
  Senior Software Engineer with 10+ years delivering end-to-end systems across education, government, and media sectors. Experienced in full product ownership — from requirements gathering and client consultation to architecture, implementation, UAT, and long-term maintenance. Combines systems thinking with AI-augmented execution to ship production-grade software at 3x velocity without compromising quality.
</p>
```

- [ ] **Step 2: Update role tag in header**

Replace the tag at line 71:

```vue
<span class="border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-mono font-black uppercase tracking-[0.2em] text-accent">Senior Software Engineer</span>
```

- [ ] **Step 3: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 4: Commit**

```bash
git add app/pages/resume.vue
git commit -m "feat(resume): update profile summary with senior SWE positioning and full product ownership narrative"
```

---

## Chunk 2: resume.vue — Technical Skills Matrix

### Task 2: Expand Technical Skills to 6 Categories

**Files:**
- Modify: `app/pages/resume.vue:271-325`

- [ ] **Step 1: Replace entire Technical Matrix grid section**

Replace lines 271-325 with:

```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-foreground border-2 border-foreground">
  <div class="bg-background p-6 md:p-8 group relative">
    <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_01 // Architecture</div>
    <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Architecture &amp; Design</h3>
    <div class="flex flex-wrap gap-2">
      <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Multi-Tenant SaaS</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">System Design Patterns</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">High Availability</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Event-Driven Arch</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">API Design</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Database Schema Design</span>
    </div>
  </div>

  <div class="bg-background p-6 md:p-8 group relative">
    <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_02 // Frontend</div>
    <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Frontend</h3>
    <div class="flex flex-wrap gap-2">
      <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Vue 3</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">React 19</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">TypeScript</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Tailwind CSS 4</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Inertia.js</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">TanStack</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">PrimeVue</span>
    </div>
  </div>

  <div class="bg-background p-6 md:p-8 group relative">
    <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_03 // Backend</div>
    <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Backend</h3>
    <div class="flex flex-wrap gap-2">
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Elixir</span>
      <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Ash Framework</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Phoenix</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Laravel 11/12</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">PHP 8.4</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Hono</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Yii2</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Python (OR-Tools)</span>
    </div>
  </div>

  <div class="bg-background p-6 md:p-8 group relative">
    <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_04 // Data</div>
    <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Database &amp; Data</h3>
    <div class="flex flex-wrap gap-2">
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">PostgreSQL</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">MySQL/MariaDB</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Redis</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">xAPI/LRS</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Query Optimization</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Data Modeling</span>
    </div>
  </div>

  <div class="bg-background p-6 md:p-8 group relative">
    <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_05 // Infra</div>
    <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Infrastructure &amp; DevOps</h3>
    <div class="flex flex-wrap gap-2">
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Docker</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Nginx</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Linux Server</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Cloudflare</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Azure Services</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">AWS S3</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">CI/CD</span>
    </div>
  </div>

  <div class="bg-background p-6 md:p-8 group relative">
    <div class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-dashed border-foreground/20 pb-2">IDX_06 // Process</div>
    <h3 class="font-black uppercase mb-4 text-xl md:text-2xl tracking-tight">Product &amp; Process</h3>
    <div class="flex flex-wrap gap-2">
      <span class="border px-2 py-1 text-xs font-mono uppercase bg-accent/10 border-accent/20 text-accent font-black tracking-widest">Full Product Ownership</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Requirements Gathering</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">Client Consultation</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">UAT Coordination</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">AI-Assisted Dev</span>
      <span class="border border-foreground/30 px-2 py-1 text-xs font-mono uppercase font-bold opacity-80">System Maintenance</span>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add app/pages/resume.vue
git commit -m "feat(resume): expand technical skills matrix to 6 categories with version numbers"
```

---

## Chunk 3: resume.vue — LMS Project Section

### Task 3: Expand LMS Certification Platform Achievements

**Files:**
- Modify: `app/pages/resume.vue:162-182`

- [ ] **Step 1: Replace LMS project section**

Replace lines 162-182 with:

```vue
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
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">AI-Augmented Delivery</strong> Accelerated feature delivery cycles by 3x, acting as Architect and Driver while orchestrating AI tools for high-quality full-stack code execution.</span>
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
```

- [ ] **Step 2: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add app/pages/resume.vue
git commit -m "feat(resume): expand LMS project with full achievements and tech stack"
```

---

## Chunk 4: resume.vue — Digital School Project Section

### Task 4: Expand Digital School Platform Achievements

**Files:**
- Modify: `app/pages/resume.vue:184-204`

- [ ] **Step 1: Replace Digital School project section**

Replace lines 184-204 with:

```vue
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
```

- [ ] **Step 2: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add app/pages/resume.vue
git commit -m "feat(resume): expand Digital School project with 5 achievements and full tech stack"
```

---

## Chunk 5: resume.vue — UPI Project Section (Two Systems)

### Task 5: Split UPI into SIMSARPRAS and SIMKERMA

**Files:**
- Modify: `app/pages/resume.vue` (UPI section)

- [ ] **Step 1: Replace UPI project section with two systems**

Replace the UPI project div with:

```vue
<!-- UPI -->
<div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
  <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
    <div class="flex flex-wrap items-baseline gap-2">
      <h4 class="text-xl font-black uppercase tracking-tight">Universitas Pendidikan Indonesia</h4>
      <span class="font-mono text-[10px] px-2 py-0.5 border border-foreground/30 text-foreground/70 uppercase tracking-[0.15em] font-bold">Architect & Engineer</span>
    </div>
    <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2022 - 2024</span>
  </div>

  <!-- SIMSARPRAS Sub-section -->
  <div class="mb-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-accent font-mono text-xs font-bold">[SIMSARPRAS]</span>
      <span class="text-muted-foreground text-xs">Asset Management System</span>
    </div>
    <div class="flex flex-wrap gap-1.5 mb-3">
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Vue 3</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Inertia.js</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Laravel 11</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">PHP 8.3</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">MySQL</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Redis</span>
    </div>
    <ul class="space-y-2 text-sm text-muted-foreground font-medium ml-4">
      <li class="flex items-start gap-3">
        <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
        <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Unified Data Model:</strong> Engineered extensible single asset schema unifying procurement types (purchase, donation, grants), eliminating data silos.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
        <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Depreciation Engine:</strong> Developed module auto-computing real-time straight-line depreciation for 50,000+ assets.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
        <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Immutable Audit Trail:</strong> Architected tamper-proof change history for all asset mutations, satisfying university compliance.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
        <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Hierarchical RBAC:</strong> Implemented granular access controls governing asset visibility across departments.</span>
      </li>
    </ul>
  </div>

  <!-- SIMKERMA Sub-section -->
  <div>
    <div class="flex items-center gap-2 mb-3">
      <span class="text-accent font-mono text-xs font-bold">[SIMKERMA]</span>
      <span class="text-muted-foreground text-xs">Cooperation Information System</span>
    </div>
    <div class="flex flex-wrap gap-1.5 mb-3">
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Vue 3</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Inertia.js</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Laravel 11</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">MySQL</span>
      <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Redis</span>
    </div>
    <ul class="space-y-2 text-sm text-muted-foreground font-medium ml-4">
      <li class="flex items-start gap-3">
        <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
        <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Fault-Tolerant Sync:</strong> Designed robust synchronization bridging local workflows with Kemdikbud national schemas.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
        <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Compliance Workflow:</strong> Streamlined national reporting with real-time Report Weight calculations and scoring simulations.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
        <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Performance Tracking:</strong> Developed comprehensive monitoring for cooperation activities per organizational unit.</span>
      </li>
    </ul>
  </div>
</div>
```

- [ ] **Step 2: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add app/pages/resume.vue
git commit -m "feat(resume): split UPI into SIMSARPRAS and SIMKERMA with full achievements"
```

---

## Chunk 6: resume.vue — SIBER Project Section

### Task 6: Expand SIBER Election Platform Achievements

**Files:**
- Modify: `app/pages/resume.vue` (SIBER section)

- [ ] **Step 1: Replace SIBER project section**

Replace the SIBER project div with:

```vue
<!-- SIBER -->
<div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
  <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
    <div class="flex flex-wrap items-baseline gap-2">
      <h4 class="text-xl font-black uppercase tracking-tight">SIBER Election Platform</h4>
      <span class="font-mono text-[10px] px-2 py-0.5 border border-foreground/30 text-foreground/70 uppercase tracking-[0.15em] font-bold">Architect & Engineer</span>
    </div>
    <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2024</span>
  </div>

  <!-- Tech Stack Chips -->
  <div class="flex flex-wrap gap-1.5 mb-4">
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Vue 3</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Inertia.js</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Laravel 11</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">PHP 8.2</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">MySQL</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Redis</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Laravel Horizon</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Azure OCR API</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Google Maps API</span>
  </div>

  <ul class="space-y-3 text-sm md:text-base text-muted-foreground font-medium">
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Automated Real-Count OCR Pipeline</strong> Architected automated data extraction pipeline leveraging Azure OCR API to process ID cards and C1 voting forms from thousands of polling stations (TPS).</span>
    </li>
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Real-Time Geospatial Analytics</strong> Engineered dynamic territory mapping using Google Maps API, providing real-time visual insights into voter distribution and logistics tracking.</span>
    </li>
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">High-Availability Architecture</strong> Built resilient high-load system using Redis and Laravel Horizon. Eliminated N+1 query bottlenecks, ensuring sub-second response times during Election Day traffic spikes.</span>
    </li>
  </ul>
</div>
```

- [ ] **Step 2: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add app/pages/resume.vue
git commit -m "feat(resume): expand SIBER project with geospatial analytics achievement"
```

---

## Chunk 7: resume.vue — Media Infrastructure Section

### Task 7: Split Media Infrastructure into Two Entries

**Files:**
- Modify: `app/pages/resume.vue` (Media Infrastructure section)

- [ ] **Step 1: Replace Media Infrastructure section with two entries**

Replace the Media Infrastructure project div with:

```vue
<!-- limawaktu.id -->
<div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
  <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
    <div class="flex flex-wrap items-baseline gap-2">
      <h4 class="text-xl font-black uppercase tracking-tight">limawaktu.id</h4>
      <span class="font-mono text-[10px] px-2 py-0.5 border border-foreground/30 text-foreground/70 uppercase tracking-[0.15em] font-bold">Founder & Engineer</span>
    </div>
    <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2016 - 2024</span>
  </div>

  <!-- Tech Stack Chips -->
  <div class="flex flex-wrap gap-1.5 mb-4">
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">PHP</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Yii2 Framework</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Bulma CSS</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">MySQL</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Nginx</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Linux</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Cloudflare</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Google Analytics</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Matomo</span>
  </div>

  <ul class="space-y-3 text-sm md:text-base text-muted-foreground font-medium">
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Solo Platform Architecture</strong> Designed, developed, and solely maintained entire media portal using Yii2 and Bulma CSS, managing 16,000+ news articles over 9 years.</span>
    </li>
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Technical SEO & Traffic Analytics</strong> Architected frontend and server pipelines with SEO best practices. Integrated Google Analytics alongside Matomo for robust tracking.</span>
    </li>
  </ul>
</div>

<!-- bandungkita.id -->
<div class="relative p-6 md:p-8 group border-b-2 border-foreground/20">
  <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
    <div class="flex flex-wrap items-baseline gap-2">
      <h4 class="text-xl font-black uppercase tracking-tight">bandungkita.id</h4>
      <span class="font-mono text-[10px] px-2 py-0.5 border border-foreground/30 text-foreground/70 uppercase tracking-[0.15em] font-bold">System Administrator</span>
    </div>
    <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2017 - 2024</span>
  </div>

  <!-- Tech Stack Chips -->
  <div class="flex flex-wrap gap-1.5 mb-4">
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">WordPress</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Linux Server</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Nginx</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Cloudflare WAF</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Fail2Ban</span>
  </div>

  <ul class="space-y-3 text-sm md:text-base text-muted-foreground font-medium">
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Infrastructure & Reliability</strong> Managed and optimized Nginx and server resources for high-volume WordPress architecture.</span>
    </li>
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Security Hardening & Disaster Recovery</strong> Fortified defenses using multi-layered protocols. Led recovery for 3 major security incidents with zero permanent data loss.</span>
    </li>
  </ul>
</div>
```

- [ ] **Step 2: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add app/pages/resume.vue
git commit -m "feat(resume): split media infrastructure into limawaktu.id and bandungkita.id"
```

---

## Chunk 8: resume.vue — Pemkab Project Section

### Task 8: Expand Pemkab Government Projects

**Files:**
- Modify: `app/pages/resume.vue` (Pemkab section)

- [ ] **Step 1: Replace Pemkab project section**

Replace the Pemkab project div with:

```vue
<!-- Gov -->
<div class="relative p-6 md:p-8 group border-b-2 border-foreground/20 last:border-b-0">
  <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 border-b border-dashed border-foreground/20 pb-4">
    <div class="flex flex-wrap items-baseline gap-2">
      <h4 class="text-xl font-black uppercase tracking-tight">Pemkab Bandung Barat</h4>
      <span class="font-mono text-[10px] px-2 py-0.5 border border-foreground/30 text-foreground/70 uppercase tracking-[0.15em] font-bold">Software Engineer</span>
    </div>
    <span class="font-mono text-xs font-bold tracking-widest text-muted-foreground border border-foreground/30 shrink-0 px-2 py-1">2013 - 2016</span>
  </div>

  <!-- Tech Stack Chips -->
  <div class="flex flex-wrap gap-1.5 mb-4">
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">PHP</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Yii2 Framework</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Bootstrap</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">jQuery</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">MySQL</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Kannel SMS Gateway</span>
    <span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Linux</span>
  </div>

  <ul class="space-y-3 text-sm md:text-base text-muted-foreground font-medium">
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">E-Government Ecosystem</strong> Designed and developed 10+ critical public service platforms including One-Stop Licensing (SIMPPTSP) and Village Finance Systems.</span>
    </li>
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Public Communication Channel</strong> Architected reliable SMS notification system using Kannel SMS Gateway for real-time citizen status updates.</span>
    </li>
    <li class="flex items-start gap-4">
      <span class="text-accent font-black mt-0.5 shrink-0">>></span>
      <span><strong class="text-foreground uppercase text-xs font-black tracking-widest block mb-1">Agency Web Infrastructure</strong> Built, deployed, and maintained official portals across multiple government agencies.</span>
    </li>
  </ul>
</div>
```

- [ ] **Step 2: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add app/pages/resume.vue
git commit -m "feat(resume): expand Pemkab project with SMS gateway and agency infrastructure achievements"
```

---

## Chunk 9: resume-ats.vue — Complete Rewrite

### Task 9: Rewrite ATS Resume with Full Content

**Files:**
- Modify: `app/pages/resume-ats.vue`

- [ ] **Step 1: Replace entire template section**

Replace the entire `<template>` section (lines 2-158, keeping `<template>` and `</template>` tags) with the expanded content:

```vue
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
```

- [ ] **Step 2: Update meta description in script section**

Find and replace the `content` property of the meta description. Look for:

```typescript
content: 'ATS-friendly resume for Anggi Wibiyanto — Tech Partner & Senior Software Engineer with 15+ years delivering end-to-end systems.'
```

Replace with:

```typescript
content: 'ATS-friendly resume for Anggi Wibiyanto — Senior Software Engineer with 10+ years delivering end-to-end systems with full product ownership.'
```

- [ ] **Step 3: Verify build passes**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 4: Commit**

```bash
git add app/pages/resume-ats.vue
git commit -m "feat(resume-ats): comprehensive expansion with full achievements and tech stacks"
```

---

## Chunk 10: Final Verification

### Task 10: Build and Visual Verification

- [ ] **Step 1: Run full build**

Run: `pnpm build`
Expected: Build completes without errors

- [ ] **Step 2: Run linting**

Run: `pnpm lint`
Expected: No linting errors

- [ ] **Step 3: Create summary commit if needed**

If there are uncommitted changes:

```bash
git add -A
git commit -m "chore: final cleanup for resume comprehensive expansion"
```

---

## Summary

This plan updates both resume files with:

1. **Profile Summary** — Repositioned as "Senior Software Engineer" with full product ownership narrative
2. **Technical Skills** — Expanded from 4 to 6 categories with version numbers
3. **LMS Project** — 4 achievements with full tech stack chips
4. **Digital School** — 5 achievements with full tech stack chips
5. **UPI** — Split into SIMSARPRAS (4 achievements) and SIMKERMA (3 achievements)
6. **SIBER** — 3 achievements including geospatial analytics
7. **Media Infrastructure** — Split into limawaktu.id and bandungkita.id
8. **Pemkab** — 3 achievements including SMS gateway
9. **ATS Version** — Complete rewrite with scope fields and inline tech stacks