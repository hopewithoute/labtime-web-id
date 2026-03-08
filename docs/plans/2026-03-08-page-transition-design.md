# Page Navigation Transition Design

## Approach: The "Command Execution" Blur

### Visual Effect
When clicking a link to navigate to a new page, the current page content will quickly blur and slightly drop opacity, mimicking a terminal executing a command or buffering output. The new page content will then fade in and slide up slightly into place.

### Implementation Details
We will utilize Nuxt 3's built-in `<NuxtPage>` transition properties within `app.vue` (or `nuxt.config.ts`).

1.  **CSS Classes (Tailwind + Custom):**
    *   **Leave (Outgoing Page):** 
        *   `leave-active`: `transition-all duration-200 ease-in`
        *   `leave-from`: `opacity-100 blur-none`
        *   `leave-to`: `opacity-0 blur-sm`
    *   **Enter (Incoming Page):**
        *   `enter-active`: `transition-all duration-300 ease-out`
        *   `enter-from`: `opacity-0 blur-sm translate-y-2`
        *   `enter-to`: `opacity-100 blur-none translate-y-0`

2.  **Configuration (`nuxt.config.ts`):**
    We will define the default page transition globally in `nuxt.config.ts`.

    ```typescript
    app: {
      pageTransition: {
        name: 'page',
        mode: 'out-in', // Wait for the old page to leave before starting the new page enter
      },
      // ...
    }
    ```

3.  **Global CSS (`assets/css/tailwind.css` or similar):**
    We will add the necessary CSS classes that Vue's `<Transition>` component expects based on the `name: 'page'` configuration.

    ```css
    /* Page Transition: Command Execution Blur */
    .page-enter-active,
    .page-leave-active {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* tailwind ease-out-in roughly */
    }
    .page-enter-from {
      opacity: 0;
      filter: blur(4px);
      transform: translateY(4px);
    }
    .page-leave-to {
      opacity: 0;
      filter: blur(4px);
      transform: translateY(-4px);
    }
    ```
    *(We will refine the exact timing and blur radius to feel snappy like a CLI).*

### Trade-offs
*   **Pros:** Feels fast, responsive, and aligns with the digital/terminal aesthetic without being overwhelming.
*   **Cons:** Very fast navigations might make the transition almost imperceptible, but that's generally a positive for perceived performance.
