# LabTime Logo Design
**Date:** 2026-03-03
**Context:** The portfolio site (formerly System.Log) is being rebranded to "LabTime", the personal portfolio of Anggi Wibiyanto. The design language is brutalist-lite.

## Overview
The approved logo design for LabTime follows a typographic, "Object Execution" approach. It blends modern, technical aesthetics with an asymmetrical, brutalist-lite structure.

## Design Details

### 1. Structure & Layout
- **Line 1:** `LabTime.init()`
- **Line 2:** `// by Anggi Wibiyanto`
- **Layout:** Stacked (two lines), left-aligned. The second line should visually align with the letter "L" of "LabTime".

### 2. Typography & Styling
- **`LabTime`**:
  - Font: Sans-serif (matching the current web default, likely Inter or system-ui).
  - Weight: Black or Extrabold.
  - Size: Prominent (larger relative size).
- **`.init()`**:
  - Font & Weight: Same as `LabTime`.
  - Color: The site's primary *accent* color, emphasizing the "execution" aspect.
- **`// by Anggi Wibiyanto`**:
  - Font: Monospace (e.g., Fira Code, JetBrains Mono, or the site's default mono stack).
  - Size: Very small (e.g., `text-xs` or `text-[10px]`).
  - Color: Muted/dimmed (e.g., `text-muted-foreground`), styled to look like an inline code comment.

### 3. Responsive Behavior
- **Desktop:** The full stacked logo is visible alongside the navigation items in the header.
- **Mobile:** Based on space constraints, the `// by Anggi Wibiyanto` line may be hidden on small screens to ensure the primary `LabTime.init()` remains legible without breaking the header layout.

## Implementation Notes
- Update the `<NuxtLink to="/">` component in the main header (`app/layouts/default.vue` or equivalent layout).
- Use flexbox/grid to manage the stacked layout.
- Use Tailwind utility classes for font weights, sizes, and colors (using the existing `accent` and `muted-foreground` css variables).
