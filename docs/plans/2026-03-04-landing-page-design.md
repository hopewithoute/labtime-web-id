# LabTime Landing Page Design (The Operator Profile)
Date: 2026-03-04

## 1. Overview
The `index.vue` landing page will be redesigned to shift focus from a generic blog layout to a "Proof of Work" portfolio layout. The new design, dubbed **The Operator Profile**, uses a split-console aesthetic (sticky left panel, scrollable right panel) to immediately establish professional identity while providing a canvas for featured projects and recent technical logs.

## 2. Architecture & Layout
The page will adopt a CSS Grid/Flexbox approach to create a dual-pane layout on desktop, stacking gracefully on mobile.

### Left Panel (Sticky Identity & Resume)
*   **Behavior:** `sticky top-24` (or similar offset below the header) on desktop, static flow on mobile.
*   **Content:**
    *   **Identity:** `LabTime.init()` hero text (smaller than current, but prominent) and the blinking system operational status.
    *   **Elevator Pitch:** A short, punchy bio (e.g., "Software Engineer specializing in...").
    *   **Bento Resume:** 
        *   Current Role/Status badge.
        *   Core Tech Stack (dense arrangement of `Badge` components or raw text).
        *   Primary CTA: "Execute `/resume`" or "Download Resume".
    *   **Links:** High-contrast GitHub link, perhaps raw text links for LinkedIn/Email.

### Right Panel (Scrollable Proof of Work)
*   **Behavior:** Natural scrolling, housing the primary dynamic content.
*   **Content:**
    *   **Featured Projects (Primary Focus):**
        *   Large cards/frames for 2-3 key projects.
        *   Visuals: If images aren't available, rely on strong typography, tech stack badges, and prominent `MetricTag` components to denote stats or roles.
        *   Interactive: `CornerFrame` or hover effects (brackets) to maintain the terminal aesthetic.
    *   **Recent Logs (Secondary Focus):**
        *   A compact, dense list of the 3-5 latest articles.
        *   Emphasis on tags (e.g., `[ARCHITECTURE]`, `[PERFORMANCE]`) and dates rather than long excerpts.
    *   *(Optional)* **Terminal Activity Stream:** A small pseudo-terminal box showing "Recent Commits" or latest site updates to reinforce the "LabTime" motif.

## 3. Data Flow
*   The page will continue to use `queryContent()` via `useAsyncData()`.
*   We will fetch featured projects from `/projects` (potentially filtering by a `featured: true` frontmatter flag or just taking the top 3).
*   We will fetch the latest articles from `/articles` (limit 3-5).
*   Mock data or static configuration in `app.config.ts` might be used for the bio and sticky links if they aren't meant to be hardcoded.

## 4. Components Used/Needed
*   **Reused:** `CornerFrame`, `MetricTag`, `Badge`, Layout Shell.
*   **Modified:** The current `NuxtLink` project and article cards will be heavily refactored into distinct "Featured Project Card" and "Compact Log Row" components (either internal to `index.vue` or extracted if complex enough).

## 5. Next Steps
1.  Implement the split CSS grid layout in `app/pages/index.vue`.
2.  Build out the Sticky Left Panel (Identity & Bento Resume).
3.  Build out the Right Panel (Featured Projects large cards).
4.  Build out the Right Panel (Compact Recent Articles list).
5.  Refine mobile responsiveness (stacking order: Identity -> Projects -> Articles -> Resume links).
