# Product Requirements Document (PRD) & Design Spec
**Project:** Labtime Web ID (Portfolio & Technical Blog)
**Date:** 2026-03-03
**Goal:** Create a stunning, high-performance portfolio and blog focused on technical problem-solving, utilizing a "Brutalist-lite" design language.

## 1. Product Overview

### 1.1 Core Concept
A minimalist, text-first portfolio designed to showcase deep technical case studies and articles. The primary message (branding) is: **Tough, reliable, and performance-driven technical problem-solving.**

### 1.2 Target Audience
- Recruiters (Technical & Non-Technical)
- Engineering Managers / CTOs
- Fellow Developers

### 1.3 Key Features
- **Markdown-Based Content Management:** All case studies and articles are written in Markdown.
- **Two Content Collections:**
  - `Case Studies`: In-depth analysis focusing on the "Problem - Approach - Solution - Result" structure.
  - `Articles/Blog`: Shorter pieces, opinions, tutorials, and general updates.
- **Brutalist-lite UI:** High contrast, abundant whitespace, sharp typography, and minimal decoration.
- **Performance Optimized:** Statically generated/Edge-rendered via Nuxt 4, deployed on Cloudflare Workers.

## 2. Technical Stack
- **Framework:** Nuxt 4 (Vue 3)
- **Styling:** Tailwind CSS 4 + Shadcn UI (Vue)
- **Content Parsing:** `@nuxt/content` (for Markdown/MDC rendering and querying)
- **Deployment:** Cloudflare Workers (`wrangler`)
- **Linting/Formatting:** ESLint + Prettier

## 3. Design Specification

### 3.1 Vibe & Aesthetics
"Brutalist-lite" – Raw, structural, but highly legible and refined. The interface should feel like reading a high-quality technical manual or an engineer's logbook.

### 3.2 Color Palette
- **Primary Backgrounds:** Bone White (`#F9F9F6` or similar warm off-white).
- **Primary Text & Borders:** Pure Black (`#000000`) or very dark gray (`#111111`) for maximum contrast.
- **Grayscale:** Varied steps of gray primarily used for secondary text or subtle background states.
- **The "Bold" Accent (The CTA Color):** A highly saturated, aggressive color (e.g., Crimson Red `#DC143C` or Elixir Purple `#704214`).
  - *Usage Rule:* Applied playfully yet purposefully to all interactive elements, buttons, and important icons. It acts as the "connective tissue" guiding the user's interaction.

### 3.3 Typography
- **Headings (H1, H2, H3):** A strong, character-rich sans-serif (e.g., *Space Grotesk*, *Clash Display*, or *Syne*). Must feel mechanical and confident.
- **Body Text:** A highly legible, neutral, geometric or neo-grotesque sans-serif (e.g., *Inter*, *Geist*, or *Helvetica Neue*).
- **Code Blocks:** A sharp monospace font (e.g., *JetBrains Mono* or *Fira Code*).

### 3.4 Layout & Interaction
- **Navigation:** Ultra-minimalist. Likely just plain text links at the top corners.
- **Structure:** Strong use of asymmetric grid layouts. Content areas are separated by stark 1px solid borders (no soft shadows, no rounded corners unless specifically stylized).
- **Whitespace:** Massive. Sections should breathe. The layout should look intentional in its emptiness, forcing focus onto the text.
- **Interaction/Motion:**
  - Hover effects are immediate and stark (e.g., a pure black button instantly turns into the Bold Accent color on hover, with 0ms transition time, or a harsh 1px underline appears).
  - No smooth fades; interactions should feel "snappy" and "mechanical".

## 4. Content Architecture (@nuxt/content)

Directory structure for content:
```
content/
├── case-studies/
│   ├── 01-optimizing-analytics.md
│   └── 02-websocket-realtime.md
└── articles/
    ├── mitigating-rate-limits.md
    └── simple-vue-components.md
```

### 4.1 Required Frontmatter Fields (Case Studies)
- `title`: String
- `description`: String (Short summary)
- `date`: YYYY-MM-DD
- `tags`: Array of strings
- `problem_statement`: String
- `solution_highlights`: Array of strings

### 4.2 Required Frontmatter Fields (Articles)
- `title`: String
- `description`: String
- `date`: YYYY-MM-DD
- `tags`: Array of strings

## 5. Key Pages
1. **Home (`/`):**
   - Hero Section: Bold typography stating the core value proposition.
   - Featured Case Studies (Grid layout with 1px borders).
   - Recent Articles list.
2. **Case Studies Index (`/case-studies`):** List of all deep-dive projects.
3. **Case Study Detail (`/case-studies/[slug]`):** The reading experience. Massive typography for the title, followed by the structured technical breakdown.
4. **Articles Index (`/articles`):** List of blog posts.
5. **Article Detail (`/articles/[slug]`):** Similar to case study detail, but perhaps a slightly different layout to distinguish the content type.

## 6. Development Milestones
1. **Setup & Configuration:** Initialize `@nuxt/content` and install structural fonts. Update Tailwind config for the exact color palette.
2. **Design System Implementation:** Build the core UI components (Buttons, Cards, Typography variants) adhering strictly to the brutalist-lite spec.
3. **Layout Construction:** Build the `default` Nuxt layout (Header, Footer, Grid skeleton).
4. **Content Integration:** Connect `@nuxt/content` queries to the Case Studies and Articles index pages.
5. **Detail Pages:** Design and implement the `.md` rendering views (Prose styling for Markdown).
6. **Polish & Deploy:** Final performance audit, metadata/SEO injection, and deployment to Cloudflare.
