# Landing Page Aesthetic Enhancements: Hardcore Terminal & Glitch Polish

**Date:** 2026-03-06

## Objective
To enhance the `pages/index.vue` landing page by pushing its existing "Hardcore Terminal / System Diagnostic" aesthetic further. We aim to create a more dynamic, "live" feel while introducing premium glitch details that break away from generic web design patterns, adhering to the `/frontend-design` skill principles.

## Selected Approach
A combination of **"Live" Terminal Interactivity** and **Matrix/Glitch Visual Polish**.

## 1. Live Terminal Interactivity (Motion & Realism)
The left sticky profile panel will be transformed from static text into a lively, booting terminal system.
*   **Sequential Boot Sequence:**
    *   The `[ OK ] load_module ...` lines will be rendered using a Vue `ref` array.
    *   On `onMounted`, these lines will reveal sequentially with staggered delays (e.g., using `setTimeout` or CSS animation delays) to simulate a real boot sequence.
*   **Dynamic Telemetry Data:**
    *   The "Static System Dump" (`mem_alloc`, `thread_pool`, etc.) will become reactive.
    *   A simulated interval will occasionally randomize hex values for memory allocation and toggle thread states (e.g., between `idle` and `active` or fluctuating numerical values) to imply background processing.
*   **Blinking Cursor Anchor:**
    *   A classic blinking underscore `_` cursor (`animate-pulse`) will be appended strategically, likely near the active "command" links or at the end of the boot sequence, to serve as a strong aesthetic anchor for the terminal theme.

## 2. Matrix/Glitch Visual Polish (Depth & Texture)
We will introduce subtle layers of texture and motion to increase the depth and premium feel of the UI.
*   **Subtle CRT Scanline Overlay:**
    *   A CSS-only `repeating-linear-gradient` will be applied via an `::after` pseudo-element over the left terminal block.
    *   This will create a faint scanline texture that evokes old CRT monitors without compromising text legibility.
*   **Hover "Decryption" Glitch Effects:**
    *   We will define a custom CSS `@keyframes` animation (`glitch`) and utility classes.
    *   When hovering over the project cards in the right panel (`class="group"`), the project title will experience a brief, controlled glitch. Note: it doesn't have to be a full scramble.
    *   This will be achieved using CSS techniques like `clip-path`, `transform`, and multiple drop shadows to simulate digital interference or "decryption", adding a highly tactile and memorable interaction.

## Architecture & Implementation Notes
*   **Dependencies:** No external animation libraries (like Framer Motion or GSAP) will be added. All effects will strictly utilize native Vue reactivity, standard Tailwind CSS utility classes, and localized custom `<style scoped>` blocks for complex keyframes.
*   **Layout Stability:** The existing CSS Grid layout (`grid-cols-1 lg:grid-cols-[24rem_1fr] xl:grid-cols-[26rem_1fr]`) will remain untouched to ensure zero layout shift and preserve responsiveness.
*   **Constraints:** Animations must be performant. The CRT overlay must be `pointer-events: none` to avoid interfering with interactions. Make sure the aesthetic modifications do not overpower the actual content.
