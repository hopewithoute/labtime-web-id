# LabTime Favicon Design
**Date:** 2026-03-04
**Context:** Brainstormed a new favicon design to match the brutalist-lite, code-inspired "LabTime" branding, specifically complementing the `LabTime.init()` typography.

## Overview
The approved favicon design replaces the standard Nuxt logo with a minimalist terminal prompt graphic (`>_`). This approach leans heavily into the "Object Execution" technical motif established by the site header.

## Design Details

### 1. Visual Composition
- **Characters:** `>_` (A greater-than sign followed by an underscore).
- **Format:** SVG (Scalable Vector Graphics) to ensure infinite crispness, particularly on high DPI/Retina displays where `.ico` can sometimes appear blurry or require multiple baked resolutions.
- **Font/Pathing:** Drawn with thick, blocky, monolithic strokes rather than a delicate web-safe font, to ensure it remains legible when scaled down to 16x16px or 32x32px.

### 2. Color System & Responsive Mode
- **The Prompt (`>`):** The LabTime primary accent color.
  - Hex: `#db1436` (Derived from the site's `hsl(348, 83%, 47%)`).
- **The Cursor (`_`):** Contextually aware (Adaptive).
  - Light Mode (Default): Black (`#000000` or `#171717`).
  - Dark Mode: Off-white/White (`#fafafa` or `#ffffff`).
- **Mechanism:** The SVG will embed a `<style>` block containing `@media (prefers-color-scheme: dark)` to dynamically swap the `fill` color of the cursor path based on the user's browser or OS theme.

### 3. Integration & Fallbacks
- **Primary Setup:** The main favicon will be placed at `/public/favicon.svg`.
- **Config:** Update `nuxt.config.ts` to reference the `.svg` format:
  ```typescript
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ```
- *(Optional extension during implementation: We may generate a static fallback `.ico` if absolute legacy browser support is a hard requirement, though modern implementations generally rely strictly on the SVG.)*

## Implementation Plan
Proceed to write the implementation plan to build the SVG file and swap the configuration.
