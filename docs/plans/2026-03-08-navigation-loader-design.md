# Navigation Loader Design: Terminal Style

## Goal
Implement a visual loading indicator that persists during asynchronous page navigation, providing feedback while the next page's data is being fetched.

## Proposed Design
A custom component `NavigationLoader.vue` that hooks into Nuxt 3's global loading state.

### Visual Aesthetic (Terminal/CLI)
Match the existing "LabTime Shell" theme.
- **Position:** Top-fixed or just below the header.
- **Content:**
    - Prefix: `EXEC:` (blinking cursor style).
    - Progress Bar: Block-style ASCII bar `[████████░░░░░░]`.
    - Percentage: `50%`.
- **Colors:**
    - Foreground/Text: Foreground.
    - Progress Fill: Accent (Amber).
    - Background: Background with a subtle border.

### Logic
- Use `useLoadingIndicator()` to get reactive `progress` and `isLoading` state.
- Nuxt 3 automatically manages this during route changes with async data.

### Approach
1.  **Create `components/NavigationLoader.vue`**.
2.  **Integrate into `app/layouts/default.vue`**.
3.  **Style with Tailwind** for the "Block" progress look.

## Alternatives Considered
- **Overlay:** Too intrusive for fast navigations.
- **Footer-only:** Might be missed by the user as it's at the bottom.
