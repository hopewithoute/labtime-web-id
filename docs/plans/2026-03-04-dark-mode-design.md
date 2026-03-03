# Design: Dark Mode Implementation

## Goal
Implement a robust dark mode system with a "Neo-Technical" aesthetic, matching the site's terminal-style theme.

## Architecture
- **Dependency**: `@nuxtjs/color-mode`
- **Theme Engine**: Tailwind CSS v4 (using the `.dark` class)
- **Persistence**: Automatic via `localStorage` (handled by color-mode module)
- **SSR Handling**: Handled by `@nuxtjs/color-mode` to prevent theme flickering.

## UI/UX Design

### Terminal Toggle Component
- **Component**: `ThemeToggle.vue`
- **Placement**: Footer (links section)
- **Visuals**:
  - Light Mode: `> toggle_theme --dark`
  - Dark Mode: `> toggle_theme --light`
- **Interactions**:
  - Hover: Brackets `[ ]` appear around the text (consistent with existing nav links).
  - Click: Toggles the theme and triggers a brief "flicker" animation.

### Keyboard Shortcut
- **Shortcut**: `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac).
- **Behavior**: Global event listener toggles the theme.
- **Visual Feedback**: The footer toggle triggers its "hit" state (brief flicker or scale pulse) even if not visible in the viewport.

## Implementation Details
1. Install `@nuxtjs/color-mode`.
2. Configure `nuxt.config.ts` with `classSuffix: ''`.
3. Create `ThemeToggle.vue` component.
4. Integrate `ThemeToggle.vue` into `layouts/default.vue`.
5. Implement global shortcut logic in `layouts/default.vue` or a dedicated plugin/composable.
