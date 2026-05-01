<template>
  <div class="min-h-screen bg-background text-foreground">
    <main class="mx-auto max-w-4xl px-6 py-10 md:px-10 md:py-14 lg:px-12">
      <header class="ats-print-section border-b border-foreground/20 pb-6 md:pb-8">
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          ATS-Friendly Resume
        </p>
        <h1 class="mt-3 text-3xl font-black tracking-tight md:text-5xl">Anggi Wibiyanto</h1>
        <p class="mt-3 text-base font-semibold md:text-lg">Senior Full-Stack Engineer</p>

        <div class="mt-5 grid gap-2 text-sm md:text-[15px] print:gap-1">
          <p v-for="item in contactItems" :key="item.label">
            <strong>{{ item.label }}:</strong>
            <a
              v-if="item.href"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              class="underline underline-offset-2"
            >
              {{ item.value }}
            </a>
            <span v-else>{{ item.value }}</span>
          </p>
        </div>

        <div class="mt-8 flex flex-wrap gap-4 print:hidden">
          <button
            class="group inline-flex h-10 items-center gap-2 border-2 border-foreground bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
            @click="typeof window !== 'undefined' && window.print()"
          >
            <span class="text-accent transition-colors group-hover:text-foreground">PDF</span>
            <span>Print Resume</span>
          </button>
          <a
            href="/resume.md"
            download="Anggi-Wibiyanto-Resume.md"
            class="group inline-flex h-10 items-center gap-2 border-2 border-foreground bg-background px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <span class="text-accent transition-colors group-hover:text-background">MD</span>
            <span>Download Markdown</span>
          </a>
        </div>
      </header>

      <section aria-labelledby="summary-heading" class="ats-print-section mt-8 md:mt-10">
        <h2
          id="summary-heading"
          class="ats-section-heading text-xl font-black tracking-tight md:text-2xl"
        >
          Professional Summary
        </h2>
        <p class="mt-3 text-sm leading-7 text-foreground/80 md:text-base">
          Senior Full-Stack Engineer with 10+ years of experience building and operating
          business-critical platforms across education, government, and media. Strong in turning
          ambiguous requirements into production systems end to end, spanning stakeholder
          discovery, system design, backend development, frontend integration, testing discipline,
          infrastructure, and long-term production support. Best suited for lean teams that need a
          hands-on technical owner who can ship reliably with strong cost and operational
          discipline.
        </p>
      </section>

      <section aria-labelledby="achievements-heading" class="ats-print-section mt-8 md:mt-10">
        <h2
          id="achievements-heading"
          class="ats-section-heading text-xl font-black tracking-tight md:text-2xl"
        >
          Selected Achievements
        </h2>
        <ul class="ats-print-list mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80">
          <li v-for="item in achievementItems" :key="item">
            {{ item }}
          </li>
        </ul>
      </section>

      <section aria-labelledby="skills-heading" class="ats-print-section mt-8 md:mt-10">
        <h2
          id="skills-heading"
          class="ats-section-heading text-xl font-black tracking-tight md:text-2xl"
        >
          Core Skills
        </h2>
        <div class="mt-4 grid gap-4 md:grid-cols-2">
          <div v-for="group in skillGroups" :key="group.title">
            <h3 class="font-bold">{{ group.title }}</h3>
            <p class="mt-1 text-sm leading-7 text-foreground/80 md:text-base">
              {{ group.items.join(', ') }}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-heading" class="mt-8 md:mt-10">
        <h2
          id="experience-heading"
          class="ats-section-heading text-xl font-black tracking-tight md:text-2xl"
        >
          Professional Experience
        </h2>

        <div class="mt-4 space-y-8">
          <div
            v-for="section in experienceSections"
            :key="section.company"
            class="ats-print-keep-with-next"
          >
            <div class="mb-4 border-b border-foreground/15 pb-4">
              <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 class="text-xl font-bold">{{ section.company }}</h3>
                  <p class="text-sm font-semibold text-foreground/80">{{ section.role }}</p>
                </div>
                <p class="text-sm text-foreground/70">
                  {{ section.dates }}<span v-if="section.location"> | {{ section.location }}</span>
                </p>
              </div>
              <p v-if="section.summary" class="mt-2 text-sm leading-7 text-foreground/80">
                <em>{{ section.summary }}</em>
              </p>
            </div>

            <article
              v-for="project in section.projects"
              :key="`${section.company}-${project.title}`"
              class="border-b border-foreground/15 pb-5 last:border-b-0 last:pb-2"
            >
              <div class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <h4 class="text-base font-bold">{{ project.title }}</h4>
                <p class="text-sm text-foreground/70">
                  {{ project.dates }} |
                  <em>{{ project.scope }}</em>
                </p>
              </div>
              <p class="mt-1 text-xs text-foreground/60">Tech: {{ project.tech.join(', ') }}</p>
              <ul
                class="ats-print-list mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/80"
              >
                <li v-for="bullet in project.bullets" :key="bullet">
                  {{ bullet }}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="education-heading" class="ats-print-section mt-8 md:mt-10">
        <div class="education-print-group">
          <h2
            id="education-heading"
            class="ats-section-heading text-xl font-black tracking-tight md:text-2xl"
          >
            Education
          </h2>
          <div class="mt-4 space-y-4 text-sm leading-7 text-foreground/80">
            <div v-for="item in educationItems" :key="item.degree">
              <h3 class="font-bold">{{ item.degree }}</h3>
              <p>
                <strong>{{ item.school }}</strong>
                | {{ item.dates }}
              </p>
              <p v-if="item.focus">{{ item.focus }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
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

const achievementItems = [
  'Delivered and operated a digital school platform serving 5,000+ students and supporting peaks of 2,000 concurrent exam users while keeping infrastructure costs below USD 50 per month.',
  'Rebuilt a university cooperation-management platform that removed duplicate reporting into the national system and introduced real-time progress tracking across faculties, campuses, and study programs.',
  'Replaced a failing academic and LMS platform for a private high school serving around 800 students across 4 years of operation, keeping online exams stable without recurring exam incidents.',
  'Designed an institutional asset-governance platform covering 68 organizational units and 80K+ records with audit trails, ownership tracking, and automated depreciation workflows.',
]

const skillGroups = [
  {
    title: 'Full-Stack Delivery',
    items: ['Laravel', 'Vue', 'PHP', 'Inertia.js', 'React', 'TypeScript', 'Hono', 'Elixir', 'Phoenix', 'Ash Framework'],
  },
  {
    title: 'Backend & Architecture',
    items: [
      'REST API Design',
      'Multi-Tenant SaaS',
      'Background Jobs',
      'Real-Time Systems',
      'Event-Driven Patterns',
    ],
  },
  {
    title: 'Data & Infrastructure',
    items: [
      'MySQL/MariaDB',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Nginx',
      'Linux Server Administration',
      'Cloudflare',
      'AWS S3',
      'CI/CD',
    ],
  },
  {
    title: 'Product & Operations',
    items: [
      'Requirements Discovery',
      'Stakeholder Communication',
      'Technical Documentation',
      'UAT Coordination',
      'QA Discipline',
      'Production Support',
      'xAPI/LRS',
    ],
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
        dates: '2019 - 2025',
        scope: 'Internal Product',
        tech: ['Laravel', 'Vue', 'Inertia.js', 'PHP', 'MySQL', 'Redis', 'Python', 'OR-Tools'],
        bullets: [
          'Led backend architecture and production operations for a digital school platform used by 5,000+ students, collaborating with frontend, mobile, and PM contributors across delivery.',
          'Kept online exam operations stable at peaks of 2,000 concurrent users while maintaining infrastructure costs below USD 50 per month.',
          'Served as the backend and infrastructure decision maker, defining feature implementation patterns, rollout strategy, and multi-tenant architecture for multi-school deployments.',
          'Worked with frontend and mobile contributors through contract-based API design and joint debugging during rollout and production issue resolution.',
          'Replaced paper-based exams with online assessment and automatic grading, and built a scheduling solver with Google OR-Tools to reduce manual academic planning.',
        ],
      },
      {
        title: 'SIMKERMA - Universitas Pendidikan Indonesia',
        dates: '2022 - 2024',
        scope: 'Client Platform',
        tech: ['Laravel 11', 'Vue 3', 'Inertia.js', 'PrimeVue', 'PHP 8.3', 'MySQL', 'Redis'],
        bullets: [
          'Rebuilt a university cooperation-management platform from scratch after the prior implementation diverged from operational requirements, restoring delivery quality and stakeholder trust.',
          'Reverse engineered an undocumented external reporting API and designed a reporting-compatible data model and synchronization workflow for 8,000+ cooperation records across 9 faculties, 5 regional campuses, and 176 study programs.',
          'Enabled units to submit reports directly from SIMKERMA without re-entering data into the central government reporting system, reducing duplicate work and reporting friction.',
          'Defined clear boundaries between internal workflow and external compliance reporting, adding real-time progress tracking and local scoring simulation before final submission.',
          'Reduced sync ambiguity and state drift where the central system acted as the reporting source of truth.',
        ],
      },
      {
        title: 'SIMSARPRAS - Universitas Pendidikan Indonesia',
        dates: '2022 - 2024',
        scope: 'Client Platform',
        tech: ['Laravel 11', 'Vue 3', 'Inertia.js', 'PrimeVue', 'PHP 8.3', 'MySQL', 'Redis'],
        bullets: [
          'Built an asset management platform used across 68 organizational units, unifying 3 procurement channels and 8 asset classes in one operational system.',
          'Designed a database-backed asset lifecycle model to track ownership, location, distribution state, and depreciation across 80K+ asset and inventory records.',
          'Added audit trails and role-based access controls to strengthen accountability, traceability, and compliance across university units.',
          'Automated fixed-asset depreciation and related workflows, reducing manual reconciliation effort for finance and operations teams.',
          'Sustained the platform through more than two years of ongoing maintenance and production support.',
        ],
      },
      {
        title: 'LMS Certification Platform',
        dates: '2025 - Present',
        scope: 'Internal Product',
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
          'Leading the design and implementation of an in-development certification LMS intended to unify learning, exams, certification, and audit workflows in a single platform.',
          'Translated 22 product user stories into a domain model with 40+ data entities supporting academic and certification workflows.',
          'Designed a real-time architecture and immutable xAPI-based learning records to support auditability, reporting, and interoperability.',
          'Built a media pipeline on Cloudflare Workers and R2 to improve delivery resilience while controlling storage and bandwidth costs.',
          'Established automated testing practices and code quality standards to support stable delivery without a dedicated QA team.',
        ],
      },
      {
        title: 'limawaktu.id - Media Portal',
        dates: '2016 - 2024',
        scope: 'Internal Product',
        tech: ['PHP', 'Yii2', 'MySQL', 'Nginx', 'Linux', 'Cloudflare', 'Google Analytics', 'Matomo'],
        bullets: [
          'Designed, built, and maintained a media portal supporting 16,000+ published articles over 9 years.',
          'Owned the application and infrastructure end to end for 2.3M+ monthly requests on USD 10 per month hosting.',
          'Improved search visibility and editorial insight through SEO-friendly delivery and analytics instrumentation.',
        ],
      },
      {
        title: 'bandungkita.id - Media Infrastructure',
        dates: '2017 - 2024',
        scope: 'Client Infrastructure',
        tech: ['WordPress', 'Linux Server', 'Nginx', 'Cloudflare WAF', 'Fail2Ban'],
        bullets: [
          'Managed infrastructure reliability and server performance for a WordPress-based media platform handling up to 4.2M+ requests per month on USD 10 per month hosting.',
          'Recovered from three major security incidents, including rogue-plugin takeovers, through backup restoration and system rebuilds with no permanent data loss.',
        ],
      },
      {
        title: 'West Bandung Regency Government',
        dates: '2013 - 2016',
        scope: 'Client Delivery',
        tech: ['PHP', 'Yii2', 'MySQL', 'Kannel SMS Gateway', 'Linux'],
        bullets: [
          'Delivered 10+ public service and internal government systems, including licensing, village finance, and agency websites.',
          'Built SMS-based notification services to improve status communication for citizens and administrative users.',
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
        dates: '2022 - 2023',
        scope: 'Client Platform',
        tech: ['Laravel', 'Inertia.js', 'Vue', 'Vuetify', 'Redis', 'MySQL', 'S3 Storage'],
        bullets: [
          'Replaced a failing academic and LMS platform serving around 800 students across 4 years of operation, resolving online exam instability, emergency server scaling, and high operating costs during peak periods.',
          'Built the system end to end as a solo engineer, covering exams, automatic grading, attendance, and learning-material delivery.',
          'Provided one year of post-launch maintenance; the platform has remained in active use across 4 years of operation without recurring exam-related issues.',
        ],
      },
    ],
  },
]

const educationItems = [
  {
    degree: 'Bachelor of Informatics Engineering',
    school: 'Universitas Komputer Indonesia (UNIKOM)',
    dates: '2011 - 2016',
    focus: 'Focus: Software Engineering, Information Systems',
  },
  {
    degree: 'Vocational High School, Computer and Network Engineering',
    school: 'SMKN 1 Cimahi',
    dates: '2006 - 2010',
    focus: 'Four-year vocational program in network engineering',
  },
]

definePageMeta({
  path: '/resume/ats',
})

useHead({
  title: 'ATS Resume | LabTime',
  meta: [
    {
      name: 'description',
      content:
        'ATS-friendly resume for Anggi Wibiyanto — Senior Full-Stack Engineer with 10+ years of experience building and operating business-critical platforms across education, government, and media.',
    },
  ],
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
