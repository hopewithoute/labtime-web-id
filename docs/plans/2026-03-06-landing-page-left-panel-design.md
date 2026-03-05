# Design: Landing Page Left Panel Refinement

**Date:** 2026-03-06
**Context:** The current landing page (`app/pages/index.vue`) features a hacker/terminal vibe, but the left panel (`<aside>`) has an `<h1/>` ("LabTime.init()") that duplicates the navigation bar logo, and generic badges that don't fully sell the aesthetic.

## Aesthetic Direction
**Terminal / System Diagnostic (Enhanced Brutalist)**

We are leaning fully into the "raw terminal readout" or "live boot screen" vibe for the left panel. The goal is to make it look like an active SSH session or system monitor belonging to the "Operator" of the site.

### Key Visuals
*   **Typography:** Strict adherence to monospace fonts (already present, but heavily amplified).
*   **Colors:** Pure pure dark backgrounds (`bg-background` / `bg-card`) with high-contrast text (`text-foreground`) and stark, glowing accents (using the generic `text-accent` for system highlights, e.g., phosphor green).
*   **Borders:** Use of ASCII-style bracket enclosures `[ ]` and raw borders.

### Micro-Interactions
*   Blinking cursors `_`.
*   Simulated rapid terminal text or glitch effects on button hover states instead of smooth fades.

## Content Structure

To resolve the duplication of the main logo and commit to the aesthetic, the content will be restructured as follows:

### 1. System Operator Readout (`> whoami`)
Replaces the `LabTime.init()` H1. It reads like a terminal prompt.
```text
> whoami
USER: Anggi Wibiyanto
ROLE: Senior System Builder
SYS_UPTIME: <Live Client-Side Date/Time or "ONLINE">
```

### 2. Loaded Modules (Replacing Core Stack Badges)
Replaces the generic outline badges. Formatted as successful boot logs.
```text
[ OK ] load_module "elixir_ash"
[ OK ] load_module "vue_nuxt"
[ OK ] load_module "react"
[ OK ] load_module "laravel"
```

### 3. Active Executables (Replacing Buttons)
The structural links to "Resume" and "GitHub" are restyled as command-line executions.
*   **Resume Link:** Styled as `$ ./execute_resume.sh`
*   **GitHub Link:** Styled as `$ ping github.com/yourusername` (or similar network diag command).

### 4. Background Process Dump (Optional Visual Flair)
A decorative block at the very bottom of the panel showing small, fast-scrolling or static "system diagnostic" text (e.g., `allocating memory...`, `verifying nodes...`) to give the panel a feeling of life and ongoing execution.

## Testing & Verification
*   **Screen Sizes:** Ensure the new terminal readouts wrap correctly or truncate cleanly on mobile (where the aside folds to the top) versus desktop (where it is `sticky top-24`).
*   **Hydration Mismatches:** If using a live Date/Time for "Uptime", ensure it is wrapped in `<ClientOnly>` or mounted correctly to avoid Nuxt hydration errors.
*   **Theme Cohesion:** Verify that the raw terminal look works equally well in both Light and Dark modes (relying on CSS variables like `bg-foreground` / `text-background` for inversions).
