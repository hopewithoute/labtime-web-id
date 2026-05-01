<template>
  <div class="grid grid-cols-1 gap-8 pb-24 font-sans text-foreground lg:grid-cols-12">
    <aside class="lg:col-span-4 xl:col-span-3">
      <div class="flex flex-col space-y-6 lg:sticky lg:top-24">
        <YorhaPanel brackets variant="panel">
          <div
            class="mb-4 border-b border-yorha-faint pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary"
          >
            [ OPERATOR_IDENTITY ]
          </div>

          <h1
            class="mb-2 text-3xl leading-none font-display font-bold uppercase tracking-wider md:text-4xl"
          >
            Resume
          </h1>

          <div
            class="mb-8 space-y-1 text-xs font-bold uppercase tracking-widest text-foreground-secondary"
          >
            <div class="flex items-center gap-2">
              <span class="text-foreground">></span>
              <span>Senior Full-Stack Engineer</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-foreground">></span>
              <span>End-to-End Technical Ownership</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-foreground">></span>
              <span>Education, Government, Media</span>
            </div>
          </div>

          <nav
            class="mb-8 hidden space-y-1 font-mono text-[10px] uppercase tracking-widest lg:block"
          >
            <div
              class="mb-4 flex justify-between border-b border-yorha-faint pb-2 text-foreground-secondary"
            >
              <span>[ INDEX_MAP ]</span>
              <span>/sys/docs</span>
            </div>
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              class="group flex items-center gap-2 border-b border-yorha-faint py-1.5 text-foreground-secondary transition-colors hover:text-foreground"
            >
              <span
                class="w-4 shrink-0 font-bold opacity-0 transition-opacity group-hover:opacity-100"
              >
                >
              </span>
              <span
                class="absolute left-0 w-4 opacity-100 transition-opacity group-hover:opacity-0"
              >
                -
              </span>
              <span class="ml-1 font-bold">{{ item.label }}</span>
            </a>
          </nav>

          <NuxtLink
            to="/resume/ats"
            class="yorha-btn relative flex w-full! justify-center text-center group"
          >
            <span class="flex items-center gap-2 transition-colors">
              <span>[ VIEW_ATS_FORMAT ]</span>
            </span>
          </NuxtLink>
        </YorhaPanel>
      </div>
    </aside>

    <div class="space-y-16 lg:col-span-8 xl:col-span-9">
      <section id="summary" class="scroll-mt-24 space-y-6">
        <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2">
          <h2 class="text-2xl font-display font-bold uppercase tracking-wider text-foreground">
            01. Summary
          </h2>
        </div>

        <YorhaPanel as="div" variant="panel" brackets padding="p-0">
          <div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
            <div class="p-6 md:p-8">
              <div
                class="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary"
              >
                [ PROFILE_DATA ]
              </div>

              <div class="mb-6 flex flex-wrap gap-2">
                <span
                  class="border-2 border-transparent bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-background"
                >
                  Senior Full-Stack Engineer
                </span>
                <span
                  class="border border-yorha-strong px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground"
                >
                  Bandung / Remote
                </span>
              </div>

              <p class="max-w-3xl text-base leading-relaxed tracking-wide md:text-xl">
                Senior Full-Stack Engineer with 10+ years of experience building and operating
                business-critical platforms across education, government, and media. Strong in
                turning ambiguous requirements into production systems end to end, spanning
                stakeholder discovery, system design, backend development, frontend integration,
                testing discipline, infrastructure, and long-term production support. Best suited
                for lean teams that need a hands-on technical owner who can ship reliably with
                strong cost and operational discipline.
              </p>
            </div>

            <div
              class="border-t border-yorha-faint bg-background/50 p-6 md:p-8 xl:border-t-0 xl:border-l"
            >
              <div
                class="mb-5 flex items-center justify-between gap-4 border-b border-yorha-faint pb-3"
              >
                <div>
                  <div
                    class="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary"
                  >
                    [ CONTACT_BLOCK ]
                  </div>
                  <h3 class="mt-1 text-xl font-display font-bold uppercase tracking-wider">
                    Anggi Wibiyanto
                  </h3>
                </div>
                <span
                  class="border border-yorha-strong px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground"
                >
                  Open
                </span>
              </div>

              <div class="space-y-4 text-sm font-sans uppercase tracking-widest">
                <div
                  v-for="item in contactItems"
                  :key="item.label"
                  class="flex flex-col gap-1 border-b border-yorha-faint pb-3 last:border-b-0 last:pb-0"
                >
                  <span class="text-[10px] font-bold text-foreground-secondary">
                    {{ item.label }}
                  </span>
                  <a
                    v-if="item.href"
                    :href="item.href"
                    :target="item.external ? '_blank' : undefined"
                    :rel="item.external ? 'noopener noreferrer' : undefined"
                    class="self-start px-1 -ml-1 font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    {{ item.value }}
                  </a>
                  <span v-else class="font-bold text-foreground">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </YorhaPanel>

        <div class="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          <YorhaPanel
            v-for="metric in metrics"
            :key="metric.label"
            brackets
            variant="simple"
            hover
            padding="p-4 md:p-6"
            class="text-center"
          >
            <div
              class="mb-2 font-mono text-[10px] uppercase tracking-widest text-foreground-secondary group-hover:text-background/60"
            >
              {{ metric.code }}
            </div>
            <div
              class="mb-2 text-3xl font-display font-bold tracking-wider transition-colors group-hover:text-background"
            >
              {{ metric.value }}
            </div>
            <div
              class="text-[10px] font-bold uppercase tracking-widest opacity-80 transition-all group-hover:text-background group-hover:opacity-100"
            >
              {{ metric.label }}
            </div>
          </YorhaPanel>
        </div>
      </section>

      <div class="yorha-divider-double"></div>

      <section id="achievements" class="scroll-mt-24 space-y-6">
        <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2">
          <h2 class="text-2xl font-display font-bold uppercase tracking-wider text-foreground">
            02. Signal_Achievements
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-px border border-border bg-border xl:grid-cols-2">
          <YorhaPanel
            v-for="item in achievementItems"
            :key="item.code"
            brackets
            variant="simple"
            hover
            padding="p-6 md:p-8"
            class="group"
          >
            <div
              class="mb-4 border-b border-yorha-faint pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary group-hover:text-background/60"
            >
              {{ item.code }}
            </div>
            <p class="text-sm leading-relaxed md:text-base">
              {{ item.body }}
            </p>
          </YorhaPanel>
        </div>
      </section>

      <div class="yorha-divider-double"></div>

      <section id="experience" class="scroll-mt-24 space-y-6">
        <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2">
          <h2 class="text-2xl font-display font-bold uppercase tracking-wider text-foreground">
            03. Execution_Logs
          </h2>
        </div>

        <div class="space-y-8">
          <YorhaPanel
            v-for="section in experienceSections"
            :key="section.company"
            as="div"
            variant="panel"
            brackets
            padding="p-0"
          >
            <div class="border-b border-yorha-strong bg-background p-6 md:p-8">
              <div class="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <h3 class="text-2xl font-display font-bold uppercase tracking-wider md:text-3xl">
                    {{ section.company }}
                  </h3>
                  <div class="mt-2 text-xs font-bold uppercase tracking-widest opacity-80">
                    {{ section.role }}
                  </div>
                </div>
                <div
                  class="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest md:items-end"
                >
                  <span class="border border-transparent bg-foreground px-3 py-1.5 text-background">
                    {{ section.dates }}
                  </span>
                  <span v-if="section.location" class="mt-1 text-foreground-secondary">
                    {{ section.location }}
                  </span>
                </div>
              </div>
              <p
                v-if="section.summary"
                class="mt-4 max-w-3xl text-sm leading-relaxed text-foreground md:text-base"
              >
                {{ section.summary }}
              </p>
            </div>

            <div class="space-y-0 text-foreground">
              <article
                v-for="project in section.projects"
                :key="`${section.company}-${project.title}`"
                class="relative border-b border-yorha-faint p-6 transition-colors last:border-b-0 hover:bg-foreground/5 md:p-8"
              >
                <div
                  class="mb-4 flex flex-col justify-between gap-2 border-b border-yorha-faint pb-4 md:flex-row md:items-baseline"
                >
                  <div class="flex flex-wrap items-baseline gap-3">
                    <h4 class="text-xl font-display font-bold uppercase tracking-wider">
                      {{ project.title }}
                    </h4>
                    <span
                      class="bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-background"
                    >
                      {{ project.scope }}
                    </span>
                  </div>
                  <span
                    class="border border-yorha-strong px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                  >
                    {{ project.dates }}
                  </span>
                </div>

                <div class="mb-6 flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in project.tech"
                    :key="`${project.title}-${tech}`"
                    class="border border-yorha-strong px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                  >
                    {{ tech }}
                  </span>
                </div>

                <ul class="space-y-4 text-sm leading-relaxed md:text-base">
                  <li
                    v-for="bullet in project.bullets"
                    :key="bullet.title"
                    class="flex items-start gap-4"
                  >
                    <span class="mt-1 shrink-0 font-display font-bold text-foreground-secondary">
                      >
                    </span>
                    <span>
                      <strong class="mb-1 block text-xs font-bold uppercase tracking-widest">
                        {{ bullet.title }}
                      </strong>
                      {{ bullet.body }}
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          </YorhaPanel>
        </div>
      </section>

      <div class="yorha-divider-double"></div>

      <section id="skills" class="scroll-mt-24 space-y-6">
        <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2">
          <h2 class="text-2xl font-display font-bold uppercase tracking-wider text-foreground">
            04. Core_Skills
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          <YorhaPanel
            v-for="group in skillGroups"
            :key="group.code"
            brackets
            variant="simple"
            padding="p-6 md:p-8"
          >
            <div
              class="mb-4 border-b border-yorha-faint pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary"
            >
              {{ group.code }}
            </div>
            <h3 class="mb-4 text-xl font-display font-bold uppercase tracking-wider">
              {{ group.title }}
            </h3>
            <div class="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest">
              <span
                v-for="item in group.items"
                :key="`${group.code}-${item.label}`"
                :class="
                  item.highlight
                    ? 'bg-foreground text-background'
                    : 'border border-yorha-strong text-foreground'
                "
                class="px-2 py-1"
              >
                {{ item.label }}
              </span>
            </div>
          </YorhaPanel>
        </div>
      </section>

      <div class="yorha-divider-double"></div>

      <section id="education" class="scroll-mt-24 space-y-6 pb-20">
        <div class="flex items-end justify-between border-b-2 border-yorha-strong pb-2">
          <h2 class="text-2xl font-display font-bold uppercase tracking-wider text-foreground">
            05. Education
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          <YorhaPanel
            v-for="item in educationItems"
            :key="item.school"
            brackets
            variant="simple"
            padding="p-6 md:p-8"
          >
            <div
              class="mb-4 inline-block bg-foreground px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-background"
            >
              {{ item.dates }}
            </div>
            <h3 class="mb-2 text-xl font-display font-bold uppercase tracking-wider md:text-2xl">
              {{ item.degree }}
            </h3>
            <div
              class="mb-3 border-b border-yorha-faint pb-3 text-[10px] font-bold uppercase tracking-widest text-foreground-secondary"
            >
              {{ item.school }}
            </div>
            <p class="text-sm font-bold uppercase tracking-widest">{{ item.focus }}</p>
          </YorhaPanel>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { href: '#summary', label: '01. Summary' },
  { href: '#achievements', label: '02. Achievements' },
  { href: '#experience', label: '03. Exec_Logs' },
  { href: '#skills', label: '04. Core_Skills' },
  { href: '#education', label: '05. Education' },
]

const contactItems = [
  { label: 'Email', value: 'anggi.wibiyanto@gmail.com', href: 'mailto:anggi.wibiyanto@gmail.com' },
  { label: 'Phone', value: '+6285723960603', href: 'tel:+6285723960603' },
  { label: 'Location', value: 'Bandung, Indonesia' },
  { label: 'Portfolio', value: 'labtime.web.id', href: 'https://labtime.web.id', external: true },
  {
    label: 'GitHub',
    value: 'github.com/hopewithoute',
    href: 'https://github.com/hopewithoute',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/hopewithoute',
    href: 'https://www.linkedin.com/in/hopewithoute/',
    external: true,
  },
]

const metrics = [
  { code: 'Sig_01', value: '10+', label: 'Years in production' },
  { code: 'Sig_02', value: '5,000+', label: 'Students served' },
  { code: 'Sig_03', value: '2,000', label: 'Peak exam users' },
  { code: 'Sig_04', value: '80K+', label: 'Managed records' },
]

const achievementItems = [
  {
    code: 'ACH_01',
    body: 'Delivered and operated a digital school platform serving 5,000+ students and supporting peaks of 2,000 concurrent exam users while keeping infrastructure costs below USD 50 per month.',
  },
  {
    code: 'ACH_02',
    body: 'Rebuilt a university cooperation-management platform that removed duplicate reporting into the national system and introduced real-time progress tracking across faculties, campuses, and study programs.',
  },
  {
    code: 'ACH_03',
    body: 'Replaced a failing academic and LMS platform for a private high school serving around 800 students across 4 years of operation, keeping online exams stable without recurring exam incidents.',
  },
  {
    code: 'ACH_04',
    body: 'Designed an institutional asset-governance platform covering 68 organizational units and 80K+ records with audit trails, ownership tracking, and automated depreciation workflows.',
  },
]

const experienceSections = [
  {
    company: 'Rail System',
    role: 'Senior Full-Stack Engineer / Long-Term Core Engineer',
    dates: '2013 - Present',
    location: 'Remote',
    summary:
      'Rail System is a software house and product studio delivering internal products and custom platforms for university, government, and media clients. I work there full-time as a long-term core engineer, leading some systems independently end to end while also partnering with frontend, mobile, PM, and stakeholder teams when projects require cross-functional delivery.',
    projects: [
      {
        title: 'Digital School Platform',
        scope: 'Internal Product',
        dates: '2019 - 2025',
        tech: ['Laravel', 'Vue', 'Inertia.js', 'PHP', 'MySQL', 'Redis', 'Python', 'OR-Tools'],
        bullets: [
          {
            title: 'Backend Architecture',
            body: 'Led backend architecture and production operations for a digital school platform used by 5,000+ students, collaborating with frontend, mobile, and PM contributors across delivery.',
          },
          {
            title: 'Exam Stability',
            body: 'Kept online exam operations stable at peaks of 2,000 concurrent users while maintaining infrastructure costs below USD 50 per month.',
          },
          {
            title: 'Multi-School Delivery',
            body: 'Served as the backend and infrastructure decision maker, defining feature implementation patterns, rollout strategy, and multi-tenant architecture for multi-school deployments.',
          },
          {
            title: 'Cross-Functional Rollout',
            body: 'Worked with frontend and mobile contributors through contract-based API design and joint debugging during rollout and production issue resolution.',
          },
          {
            title: 'Automation',
            body: 'Replaced paper-based exams with online assessment and automatic grading, and built a scheduling solver with Google OR-Tools to reduce manual academic planning.',
          },
        ],
      },
      {
        title: 'SIMKERMA - Universitas Pendidikan Indonesia',
        scope: 'Client Platform',
        dates: '2022 - 2024',
        tech: ['Laravel 11', 'Vue 3', 'Inertia.js', 'PrimeVue', 'PHP 8.3', 'MySQL', 'Redis'],
        bullets: [
          {
            title: 'Platform Rebuild',
            body: 'Rebuilt a university cooperation-management platform from scratch after the prior implementation diverged from operational requirements, restoring delivery quality and stakeholder trust.',
          },
          {
            title: 'Reporting Model',
            body: 'Reverse engineered an undocumented external reporting API and designed a reporting-compatible data model and synchronization workflow for 8,000+ cooperation records across 9 faculties, 5 regional campuses, and 176 study programs.',
          },
          {
            title: 'Duplicate Work Removal',
            body: 'Enabled units to submit reports directly from SIMKERMA without re-entering data into the central government reporting system, reducing duplicate work and reporting friction.',
          },
          {
            title: 'Progress Visibility',
            body: 'Defined clear boundaries between internal workflow and external compliance reporting, adding real-time progress tracking and local scoring simulation before final submission.',
          },
          {
            title: 'Source-of-Truth Control',
            body: 'Reduced sync ambiguity and state drift where the central system acted as the reporting source of truth.',
          },
        ],
      },
      {
        title: 'SIMSARPRAS - Universitas Pendidikan Indonesia',
        scope: 'Client Platform',
        dates: '2022 - 2024',
        tech: ['Laravel 11', 'Vue 3', 'Inertia.js', 'PrimeVue', 'PHP 8.3', 'MySQL', 'Redis'],
        bullets: [
          {
            title: 'Asset Governance',
            body: 'Built an asset management platform used across 68 organizational units, unifying 3 procurement channels and 8 asset classes in one operational system.',
          },
          {
            title: 'Lifecycle Model',
            body: 'Designed a database-backed asset lifecycle model to track ownership, location, distribution state, and depreciation across 80K+ asset and inventory records.',
          },
          {
            title: 'Auditability',
            body: 'Added audit trails and role-based access controls to strengthen accountability, traceability, and compliance across university units.',
          },
          {
            title: 'Financial Automation',
            body: 'Automated fixed-asset depreciation and related workflows, reducing manual reconciliation effort for finance and operations teams.',
          },
          {
            title: 'Long-Term Support',
            body: 'Sustained the platform through more than two years of ongoing maintenance and production support.',
          },
        ],
      },
      {
        title: 'LMS Certification Platform',
        scope: 'Internal Product',
        dates: '2025 - Present',
        tech: [
          'React 19',
          'TypeScript',
          'TanStack',
          'Elixir',
          'Ash Framework',
          'Phoenix WebSockets',
          'Oban',
          'PostgreSQL',
          'Hono',
          'Cloudflare Workers',
          'Cloudflare R2',
          'xAPI',
        ],
        bullets: [
          {
            title: 'Platform Scope',
            body: 'Leading the design and implementation of an in-development certification LMS intended to unify learning, exams, certification, and audit workflows in a single platform.',
          },
          {
            title: 'Domain Modeling',
            body: 'Translated 22 product user stories into a domain model with 40+ data entities supporting academic and certification workflows.',
          },
          {
            title: 'Real-Time Records',
            body: 'Designed a real-time architecture and immutable xAPI-based learning records to support auditability, reporting, and interoperability.',
          },
          {
            title: 'Media Delivery',
            body: 'Built a media pipeline on Cloudflare Workers and R2 to improve delivery resilience while controlling storage and bandwidth costs.',
          },
          {
            title: 'Quality Standards',
            body: 'Established automated testing practices and code quality standards to support stable delivery without a dedicated QA team.',
          },
        ],
      },
      {
        title: 'limawaktu.id - Media Portal',
        scope: 'Internal Product',
        dates: '2016 - 2024',
        tech: ['PHP', 'Yii2', 'MySQL', 'Nginx', 'Linux', 'Cloudflare', 'Google Analytics', 'Matomo'],
        bullets: [
          {
            title: 'Product Ownership',
            body: 'Designed, built, and maintained a media portal supporting 16,000+ published articles over 9 years.',
          },
          {
            title: 'Lean Operations',
            body: 'Owned the application and infrastructure end to end for 2.3M+ monthly requests on USD 10 per month hosting.',
          },
          {
            title: 'Search Visibility',
            body: 'Improved search visibility and editorial insight through SEO-friendly delivery and analytics instrumentation.',
          },
        ],
      },
      {
        title: 'bandungkita.id - Media Infrastructure',
        scope: 'Client Infrastructure',
        dates: '2017 - 2024',
        tech: ['WordPress', 'Linux Server', 'Nginx', 'Cloudflare WAF', 'Fail2Ban'],
        bullets: [
          {
            title: 'Traffic Handling',
            body: 'Managed infrastructure reliability and server performance for a WordPress-based media platform handling up to 4.2M+ requests per month on USD 10 per month hosting.',
          },
          {
            title: 'Incident Recovery',
            body: 'Recovered from three major security incidents, including rogue-plugin takeovers, through backup restoration and system rebuilds with no permanent data loss.',
          },
        ],
      },
      {
        title: 'West Bandung Regency Government',
        scope: 'Client Delivery',
        dates: '2013 - 2016',
        tech: ['PHP', 'Yii2', 'MySQL', 'Kannel SMS Gateway', 'Linux'],
        bullets: [
          {
            title: 'Public Systems',
            body: 'Delivered 10+ public service and internal government systems, including licensing, village finance, and agency websites.',
          },
          {
            title: 'Status Notifications',
            body: 'Built SMS-based notification services to improve status communication for citizens and administrative users.',
          },
        ],
      },
    ],
  },
  {
    company: 'Independent Freelance Delivery',
    role: 'Full-Stack Engineer',
    dates: '2022 - 2023',
    location: 'Remote',
    projects: [
      {
        title: 'Academic System & LMS - SMA PGRI Depok',
        scope: 'Client Platform',
        dates: '2022 - 2023',
        tech: ['Laravel', 'Inertia.js', 'Vue', 'Vuetify', 'Redis', 'MySQL', 'S3 Storage'],
        bullets: [
          {
            title: 'Platform Recovery',
            body: 'Replaced a failing academic and LMS platform serving around 800 students across 4 years of operation, resolving online exam instability, emergency server scaling, and high operating costs during peak periods.',
          },
          {
            title: 'Solo Delivery',
            body: 'Built the system end to end as a solo engineer, covering exams, automatic grading, attendance, and learning-material delivery.',
          },
          {
            title: 'Operational Stability',
            body: 'Provided one year of post-launch maintenance; the platform has remained in active use across 4 years of operation without recurring exam-related issues.',
          },
        ],
      },
    ],
  },
]

const skillGroups = [
  {
    code: 'IDX_01 // DELIVERY',
    title: 'Full-Stack Delivery',
    items: [
      { label: 'Laravel', highlight: true },
      { label: 'Vue', highlight: true },
      { label: 'PHP' },
      { label: 'Inertia.js' },
      { label: 'React' },
      { label: 'TypeScript' },
      { label: 'Hono' },
      { label: 'Elixir', highlight: true },
      { label: 'Phoenix' },
      { label: 'Ash Framework' },
    ],
  },
  {
    code: 'IDX_02 // ARCH',
    title: 'Backend & Architecture',
    items: [
      { label: 'REST API Design', highlight: true },
      { label: 'Multi-Tenant SaaS' },
      { label: 'Background Jobs' },
      { label: 'Real-Time Systems', highlight: true },
      { label: 'Event-Driven Patterns' },
    ],
  },
  {
    code: 'IDX_03 // DATA',
    title: 'Data & Infrastructure',
    items: [
      { label: 'MySQL/MariaDB', highlight: true },
      { label: 'PostgreSQL', highlight: true },
      { label: 'Redis' },
      { label: 'Docker' },
      { label: 'Nginx' },
      { label: 'Linux Server Administration', highlight: true },
      { label: 'Cloudflare', highlight: true },
      { label: 'AWS S3' },
      { label: 'CI/CD' },
    ],
  },
  {
    code: 'IDX_04 // OPS',
    title: 'Product & Operations',
    items: [
      { label: 'Requirements Discovery', highlight: true },
      { label: 'Stakeholder Communication' },
      { label: 'Technical Documentation' },
      { label: 'UAT Coordination' },
      { label: 'QA Discipline' },
      { label: 'Production Support', highlight: true },
      { label: 'xAPI/LRS' },
    ],
  },
]

const educationItems = [
  {
    dates: '2011 - 2016',
    degree: 'Bachelor of Informatics Engineering',
    school: 'Universitas Komputer Indonesia (UNIKOM)',
    focus: 'Software Engineering, Information Systems',
  },
  {
    dates: '2006 - 2010',
    degree: 'Vocational High School, Computer and Network Engineering',
    school: 'SMKN 1 Cimahi',
    focus: 'Four-year vocational program in network engineering',
  },
]

useHead({
  title: 'Resume | LabTime',
  meta: [
    {
      name: 'description',
      content:
        'Anggi Wibiyanto — Senior Full-Stack Engineer with 10+ years of experience building and operating business-critical platforms across education, government, and media.',
    },
  ],
})
</script>
