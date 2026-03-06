# Mobile Menu Refinement Design

**Date:** 2026-03-07

## Objective
Refine the header navigation on mobile so it no longer overflows narrow viewports, while preserving the existing terminal-editorial identity of the site. The solution should keep desktop navigation behavior intact and introduce a dedicated mobile interaction that feels intentional rather than merely compressed.

## Selected Approach
Implement a **mobile-only hamburger trigger** that opens a **right-side slide-in drawer** styled to match the current LabTime terminal aesthetic.

## 1. Mobile Navigation Structure
On mobile viewports, the current inline header navigation will be replaced with a compact header layout consisting of:
- the existing LabTime brand block on the left,
- a hamburger button on the right.

The existing inline navigation will remain in place for medium screens and above, so the desktop experience is preserved.

When the hamburger button is activated, a mobile drawer will slide in from the right. The drawer will contain:
- Projects
- Articles
- Resume
- Search
- GitHub

This resolves overflow by removing the need to fit all header actions into a single narrow row.

## 2. Visual Direction
The mobile drawer will follow the current site language rather than using a generic app-style sheet.

Key styling traits:
- strong borders matching the existing header/footer framing,
- uppercase navigation labels,
- mono/editorial accents where helpful,
- active-route highlighting consistent with the current desktop nav,
- restrained motion that feels crisp and technical.

The goal is to make the drawer feel like an extension of the current shell, not a separate design system.

## 3. Interaction Behavior
The mobile drawer interaction will behave as follows:
- tapping the hamburger opens the drawer,
- a translucent overlay appears behind it,
- the drawer slides in from the right,
- tapping the overlay closes it,
- tapping the close button closes it,
- tapping a navigation item closes it,
- invoking Search from within the drawer closes the drawer and opens the search palette.

GitHub remains an external link. Theme toggle remains in the footer and is not moved into the drawer to keep scope constrained.

## 4. Accessibility & Responsiveness
The implementation should include baseline accessible behavior:
- clear labels for open/close buttons,
- `Escape` closes the drawer,
- open/closed state is exposed through appropriate button state attributes,
- desktop layout remains unaffected.

Responsively:
- mobile gets the hamburger + drawer,
- medium and larger screens continue using the current inline nav,
- the header should no longer overflow on narrow screens.

## 5. Implementation Scope
Primary implementation target:
- `app/layouts/default.vue`

Expected changes:
- add reactive state for drawer visibility,
- add mobile-only hamburger trigger,
- split mobile and desktop navigation presentation,
- add overlay and right-side drawer markup,
- wire drawer close behavior for overlay, close button, route clicks, and search action.

No new reusable component is required unless the existing file becomes clearly unwieldy. The preferred approach is to keep the change localized.

## 6. Testing Strategy
Verification should cover:
- no header overflow on mobile widths,
- drawer opens from the right on mobile,
- overlay and close button both dismiss the drawer,
- clicking a nav item dismisses the drawer and navigates correctly,
- Search still opens correctly from mobile nav,
- active route styling still works,
- desktop navigation remains unchanged.

## Constraints
- Do not redesign the desktop header.
- Do not move the theme toggle.
- Do not expand scope into broader header/footer refactors.
- Prefer utility classes and existing project patterns over introducing new dependencies.
