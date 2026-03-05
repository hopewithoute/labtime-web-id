# Architecture Decision Record Placement: Right Sidebar Design

## Problem
Currently, the Architecture Decision Records (ADRs) for projects are located at the very bottom of the page (`/projects/[slug]`), underneath the main text content and screenshots. This requires users to scroll past the entire narrative before they realize technical documentation is available, decreasing the visibility of these important records.

## Objective
Increase the visibility of ADRs on desktop screens by moving them from a single-column layout at the bottom of the page to a two-column, sticky right-aligned sidebar layout. 

## Design Solution: Sticky Right Sidebar

To solve this, we will migrate the project article page (`app/pages/projects/[slug]/index.vue`) to a multi-column CSS Grid layout on larger screens, allowing the technical documents to scroll alongside the core content.

### 1. Structural Changes (CSS Grid)
*   **Breakpoint Integration:** The multi-column layout will activate only on desktop or wider screens (`lg` breakpoint or higher). Mobile and smaller tablet screens will retain the single-column vertical flow with ADRs at the bottom.
*   **Grid Placement:** The main content wrapper surrounding both the article body (`<ContentRenderer>`) and the new ADR sidebar will be converted into a CSS Grid (e.g., `grid-cols-1` for mobile, `lg:grid-cols-12` for desktop).
*   **Column Allocation:** 
    *   The primary content (Tech brief, screenshots, article body) will span the majority of the grid (e.g., `col-span-8` or `col-span-9`).
    *   The ADR sidebar will inhabit the remaining space on the right (e.g., `col-span-4` or `col-span-3`).

### 2. Header and Hero Section
The top header block (including Title, Date, Stack Tags, and the Problem/Approach/Outcome brief) will remain full width, spanning all columns. This ensures the visual flow and narrative introduction are not interrupted before the split-layout begins.

### 3. Sidebar Behavior (Sticky Positioning)
The element containing the list of ADRs will utilize CSS `position: sticky` (e.g., `sticky top-24`). This ensures that as the user reads down the primary article content on the left, the list of technical documents remains visible and pinned within the viewport on the right, providing constant contextual access.

### 4. Component Refinements
The styling of the individual ADR link cards will be slightly refined (e.g., typography scale, padding adjustments) to look proportionate and tidy within the narrower constraints of a sidebar column, compared to their previous full-width container.
