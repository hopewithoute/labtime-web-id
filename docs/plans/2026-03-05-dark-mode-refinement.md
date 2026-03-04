# Dark Mode Refinement (Smoked Topaz) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Refine the dark mode to use a subtle warm tone ("Smoked Topaz") for better cohesion with the light mode and improved reading comfort.

**Architecture:** Updating existing Tailwind CSS custom variables in the `:root` and `.dark` blocks. No structural or component logic changes are required.

**Tech Stack:** Tailwind CSS v4, Vue/Nuxt.

---

### Task 1: Update Dark Mode CSS Variables

**Files:**
- Modify: `app/assets/css/tailwind.css`

**Step 1: Write the failing test**
*N/A - This is a pure styling change.*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**

Update `app/assets/css/tailwind.css` by modifying the variables inside the `.dark` block.

```css
.dark {
  --background: hsl(40, 6%, 6%);
  --foreground: hsl(60, 10%, 96%);
  --card: hsl(40, 6%, 6%);
  --card-foreground: hsl(60, 10%, 96%);
  --popover: hsl(40, 6%, 6%);
  --popover-foreground: hsl(60, 10%, 96%);
  --primary: hsl(60, 10%, 98%);
  --primary-foreground: hsl(40, 6%, 6%);
  --secondary: hsl(40, 6%, 12%);
  --secondary-foreground: hsl(60, 10%, 96%);
  --muted: hsl(40, 6%, 12%);
  --muted-foreground: hsl(40, 4%, 60%);
  --accent: hsl(348, 83%, 47%);
  --accent-foreground: hsl(60, 10%, 98%);
  --destructive: hsl(0, 62.8%, 30.6%);
  --border: hsl(40, 6%, 18%);
  --input: hsl(40, 6%, 18%);
  --ring: hsl(348, 83%, 47%);
  --sidebar: hsl(40, 6%, 6%);
  --sidebar-foreground: hsl(60, 10%, 96%);
  --sidebar-primary: hsl(60, 10%, 96%);
  --sidebar-primary-foreground: hsl(40, 6%, 6%);
  --sidebar-accent: hsl(40, 6%, 12%);
  --sidebar-accent-foreground: hsl(60, 10%, 96%);
  --sidebar-border: hsl(40, 6%, 18%);
  --sidebar-ring: hsl(348, 83%, 47%);
}
```

**Step 4: Run test to verify it passes**

Visual verification in the browser running via `npm run dev`:
1. Open the local dev server.
2. Toggle to dark mode (if not already).
3. Verify the background color is a warm dark gray (not pure black or neutral gray).
4. Verify text is easily readable and borders are subtle.

**Step 5: Commit**

```bash
git add app/assets/css/tailwind.css
git commit -m "style: refine dark mode with warm smoked topaz tone"
```
