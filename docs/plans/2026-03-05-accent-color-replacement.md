# Accent Color Replacement (Terminal Amber) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Replace the current neon pink/red accent color with "Terminal Amber" (`hsl(32, 95%, 44%)`) for a more technical, cohesive aesthetic.

**Architecture:** Updating existing Tailwind CSS custom variables for `--accent`, `--ring`, and `--sidebar-ring` in the `:root` and `.dark` blocks. No structural or component logic changes are required.

**Tech Stack:** Tailwind CSS v4, Vue/Nuxt.

---

### Task 1: Update Accent Color CSS Variables

**Files:**
- Modify: `app/assets/css/tailwind.css`

**Step 1: Write the failing test**
*N/A - This is a pure styling change.*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**

Update `app/assets/css/tailwind.css` by modifying the tracking variables inside the `:root` and `.dark` block.

**In `:root`**, replace:
```css
  --accent: hsl(348, 83%, 47%);
```
with:
```css
  --accent: hsl(32, 95%, 44%);
```

Replace:
```css
  --ring: hsl(348, 83%, 47%);
```
with:
```css
  --ring: hsl(32, 95%, 44%);
```

Replace:
```css
  --sidebar-ring: hsl(348, 83%, 47%);
```
with:
```css
  --sidebar-ring: hsl(32, 95%, 44%);
```

**In `.dark`**, replace:
```css
  --accent: hsl(348, 83%, 47%);
```
with:
```css
  --accent: hsl(32, 95%, 44%);
```

Replace:
```css
  --ring: hsl(348, 83%, 47%);
```
with:
```css
  --ring: hsl(32, 95%, 44%);
```

Replace:
```css
  --sidebar-ring: hsl(348, 83%, 47%);
```
with:
```css
  --sidebar-ring: hsl(32, 95%, 44%);
```

**Step 4: Run test to verify it passes**

Visual verification in the browser running via `npm run dev`:
1. Open the local dev server.
2. Verify links, badges, or buttons using the accent color are now amber instead of red.
3. Toggle between light and dark mode to ensure the amber persists correctly.

**Step 5: Commit**

```bash
git add app/assets/css/tailwind.css
git commit -m "style: replace red accent with technical terminal amber"
```
