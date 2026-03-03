# Terminal Aesthetics Design Document
Date: 2026-03-04

## Overview
This design document outlines the implementation approach for adding a cohesive "Terminal/OS" aesthetic to the LabTime.init() portfolio website. The goal is to enhance the existing Brutalist-lite design with interactive, terminal-inspired elements without sacrificing performance or core usability.

## Approach: Tactile Enhancements
We are taking the "Tactile Enhancements" approach. This provides high-impact visual effects (boot sequences, typing, status bars) while maintaining modern web UX restraint (fast load times, non-intrusive navigation).

## Design Sections

### 1. Boot Sequence & Header Navigation
*   **Boot Sequence:** A fast (< 1.5s) overlay on initial load. It sequentially displays mock terminal output (e.g., `> INITIALIZING KERNEL...`, `> MOUNTING FILE SYSTEM...`, `> STARTING LABTIME...`) before sliding up. To prevent annoyance, it uses `sessionStorage` to only play once per browser session.
*   **Header Updates:**
    *   **Logo Cursor:** A persistent, blinking block cursor (`▮` or `_`) added immediately after the `LabTime.init()` text.
    *   **Subtitle Animation:** The `// by Anggi Wibiyanto` text will feature a one-time "typewriter" animation on load.
*   **Active Navigation:** The active route link in the header will be prefixed with a `> ` (e.g., `> Projects`) using a CSS `::before` pseudo-element, replacing standard underlines for active states.

### 2. Hero Section & Status Bar
*   **Hero Typing Effect:** The main `H1` ("LabTime.init()") and its subheading will load via a staggered typing animation. The cursor will trail the typing text and disappear or drop to the next line upon completion.
*   **Footer Status Bar:** The standard footer is replaced with a sticky status bar at the bottom of the viewport.
    *   Features a pulsing green status badge: `• SYSTEM OPERATIONAL`.
    *   Displays a simulated connection status: `[✓] Connected` alongside dynamic elements (e.g., route path, mock PING).
    *   Styled with the existing utility classes: `bg-background border-t border-foreground p-2 text-xs font-mono uppercase`.

### 3. Content Presentation & Callouts
*   **Feed Interactions:** 
    *   Hovering over article/project cards changes the pointer to a `crosshair` or `text` cursor.
    *   Cards gain a subtle left-border expansion (translation) on hover to simulate a terminal selection block.
    *   List items or card titles will feature a `[ ]` prefix that toggles to `[x]` on hover.
*   **Code Block Styling:**
    *   **Inline Code:** Subtle contrast background to mimic terminal highlights.
    *   **Preformatted Blocks:** A "Top Bar" acts as a mock window header, displaying the language context (e.g., `user@labtime:~$ cat script.ts`) above the actual code snippet.

## Technical Implementation Notes
*   **State Management:** `sessionStorage` will be used via Vue composables to track the boot sequence state.
*   **Animations:** Vue `<Transition>` components and Tailwind CSS keyframes/animations will drive the typing and blinking effects.
*   **Styling:** pure Tailwind CSS utility classes and custom `@layer` directives in `assets/css/tailwind.css` where pseudo-elements (`::before`) are necessary.
