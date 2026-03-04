<template>
  <div class="space-y-12">
    <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-foreground pb-4 mb-8">
      <div>
        <h1 class="text-4xl font-extrabold uppercase tracking-tighter mb-2">Resume</h1>
        <p class="text-lg max-w-xl text-muted-foreground">End-to-End System Builder &amp; AI-Augmented Engineer.</p>
      </div>
      <div class="mt-4 md:mt-0">
        <Button variant="outline" class="rounded-none border-foreground uppercase font-mono text-xs">
          Download PDF
        </Button>
      </div>
    </div>

    <!-- Summary Section -->
    <section class="space-y-4">
      <p class="text-base leading-relaxed max-w-3xl">
        End-to-End System Builder with 10+ years of experience building scalable, resource-efficient digital ecosystems. Specializes in multi-tenant platforms, high-performance infrastructure, and AI-Augmented Engineering to accelerate development, delivering robust, cost-effective solutions with rapid business adaptability.
      </p>
    </section>

    <!-- Experience Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-black uppercase tracking-tight border-b border-foreground pb-2">Experience</h2>
      <div class="space-y-10 mt-6">

        <!-- R&D: Modern LMS -->
        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">Software Architect & AI-Augmented Developer</h3>
            <span class="font-mono text-sm text-muted-foreground">2025 - Present</span>
          </div>
          <div class="text-accent font-bold mb-4 uppercase text-sm tracking-widest">R&D — Modern Learning Management System</div>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li><strong>AI-Augmented Development:</strong> Accelerated feature delivery cycles by 3x acting as Architect & Driver, orchestrating AI for high-quality full-stack code execution.</li>
            <li><strong>Modern xAPI Implementation:</strong> Designed an xAPI-based architecture for granular learning traces, deep analytics, and full data interoperability across video, audio, document, and xAPI packages.</li>
            <li><strong>Cost-Optimized Video Delivery:</strong> Drastically reduced storage and egress costs using custom HLS encoding pipeline for adaptive bitrate, Cloudflare R2. and custom edge worker for media access auth and automatic transcription.</li>
            <li><strong>Real-Time Interactivity:</strong> Built real-time features (Chat/Notifications) using WebSockets, fully integrated with User Activity Logs.</li>
          </ul>
        </div>

        <!-- DISC -->
        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">Lead Developer</h3>
            <span class="font-mono text-sm text-muted-foreground">2019 - Present</span>
          </div>
          <div class="text-accent font-bold mb-4 uppercase text-sm tracking-widest">DISC — Integrated Academic SaaS Platform</div>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li><strong>High-Concurrency Performance:</strong> Engineered an Online Exam module handling 2,000+ concurrent users on cost-effective infrastructure through optimized indexing and aggressive caching.</li>
            <li><strong>Intelligent Automation:</strong> Deployed Google OR-Tools for automated class scheduling via constraint programming.</li>
            <li><strong>IoT Integration:</strong> Developed a custom IoT bridge connecting fingerprint hardware with the cloud for real-time attendance tracking.</li>
          </ul>
        </div>

        <!-- UPI -->
        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">FullStack Developer</h3>
            <span class="font-mono text-sm text-muted-foreground">2022 - 2024</span>
          </div>
          <div class="text-accent font-bold mb-4 uppercase text-sm tracking-widest">Universitas Pendidikan Indonesia</div>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li><strong>Simsarpras:</strong> Centralized system for 50,000+ university assets with automated depreciation modules, streamlining internal audits.</li>
            <li><strong>Simkerma:</strong> Multi-level approval workflow for cooperation reporting with two-way data sync to Kemdikbud.</li>
          </ul>
        </div>

        <!-- Bandungkita & Limawaktu -->
        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">FullStack Developer</h3>
            <span class="font-mono text-sm text-muted-foreground">2016 - 2024</span>
          </div>
          <div class="text-accent font-bold mb-4 uppercase text-sm tracking-widest">Bandungkita.id & Limawaktu.id — Media Infrastructure</div>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li><strong>System Reliability:</strong> 9+ years of operational stability through proactive and preventive maintenance strategies.</li>
            <li><strong>Security Hardening:</strong> Multi-layered security protocols (Fail2Ban, Firewalls, Cloudflare WAF) to mitigate cyber threats.</li>
            <li><strong>Technical SEO:</strong> Optimized backend architecture and Core Web Vitals for maximum page load speeds and search visibility.</li>
          </ul>
        </div>

        <!-- Government & Election -->
        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">FullStack Developer</h3>
            <span class="font-mono text-sm text-muted-foreground">2010 - 2024</span>
          </div>
          <div class="text-accent font-bold mb-4 uppercase text-sm tracking-widest">Pemkab Bandung Barat & Tim Kampanye — Government & Election Analytics</div>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li><strong>Election Analytics Platform (2024):</strong> Hierarchical analytics for voter mapping and field team monitoring with Real-Time Quick Count Dashboard.</li>
            <li><strong>Government Digitalization:</strong> Led development of 10+ public service systems including One-Stop Licensing (SIMPPTSP), Village Finance, and SMS Gateway integrations.</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- Skills Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-black uppercase tracking-tight border-b border-foreground pb-2">Technical Skills</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">Architecture & Methodology</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>AI-Augmented Engineering</li>
            <li>System Design Patterns</li>
            <li>Multi-Tenant SaaS</li>
          </ul>
        </div>
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">Backend & Performance</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>Laravel / Yii2</li>
            <li>Hono (Edge Worker)</li>
            <li>Elixir / Ash Framework</li>
            <li>PostgreSQL / MySQL</li>
          </ul>
        </div>
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">Frontend</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>Vue / Nuxt</li>
            <li>React / TypeScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">EdTech & Modern Stack</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>xAPI Learning Analytics</li>
            <li>Cloudflare R2 (Video)</li>
            <li>Real-time WebSocket</li>
          </ul>
        </div>
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">Infrastructure & DevOps</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>Docker / Linux Server</li>
            <li>Nginx / CI/CD</li>
            <li>Fail2Ban / Security</li>
          </ul>
        </div>
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-4 text-accent">Tools & Optimization</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li>Google OR-Tools</li>
            <li>Technical SEO</li>
            <li>Git / GitHub Actions</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-black uppercase tracking-tight border-b border-foreground pb-2">Education</h2>
      <div class="space-y-6 mt-6">
        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">S1 Teknik Informatika</h3>
            <span class="font-mono text-sm text-muted-foreground">2011 - 2016</span>
          </div>
          <div class="text-accent font-bold uppercase text-sm tracking-widest">Universitas Komputer Indonesia (UNIKOM)</div>
          <div class="text-sm text-muted-foreground mt-1">Software Engineering, Information System</div>
        </div>
        <div class="border-l-4 border-foreground pl-6 py-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h3 class="text-xl font-bold uppercase tracking-tight">Teknik Komputer dan Jaringan</h3>
            <span class="font-mono text-sm text-muted-foreground">2006 - 2010</span>
          </div>
          <div class="text-accent font-bold uppercase text-sm tracking-widest">SMKN 1 Cimahi</div>
        </div>
      </div>
    </section>

    <!-- Key Interests Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-black uppercase tracking-tight border-b border-foreground pb-2">Key Interests</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-3 text-accent">AI Orchestration</h3>
          <p class="text-sm leading-relaxed">Deep exploration of Agentic Workflows and utilizing LLMs as leverage for complex problem-solving.</p>
        </div>
        <div class="p-6 border border-foreground bg-card text-card-foreground">
          <h3 class="font-bold uppercase mb-3 text-accent">System Architecture</h3>
          <p class="text-sm leading-relaxed">Passionate about efficient system design patterns (System Thinking), SaaS scalability, and distributed systems.</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Resume | LabTime',
  meta: [
    { name: 'description', content: 'Anggi Wibiyanto — Senior System Builder & AI-Augmented Engineer. 10+ years building scalable digital ecosystems.' }
  ]
})
</script>
