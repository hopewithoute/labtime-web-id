# Favicon Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement the new `>_` terminal prompt favicon for the LabTime portfolio site.

**Architecture:** A dynamically coloring SVG favicon (`public/favicon.svg`) loaded via Nuxt configuration.

**Tech Stack:** Nuxt 3/4, SVG, CSS Media Queries

---

### Task 1: Create the SVG Favicon

**Files:**
- Create: `public/favicon.svg`
- Delete: `public/favicon.ico`

**Step 1: Write the SVG implementation**

Create the SVG file using the approved design colors and dynamic dark mode support.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #171717; }
    @media (prefers-color-scheme: dark) {
      path { fill: #fafafa; }
    }
  </style>
  <- Delete: The Prompt ">" in LabTime Red -->
  <polyline points="6,6 16,16 6,26" fill="none" stroke="#db1436" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/>
  <- Delete: The Cursor "_" dynamic fill -->
  <path d="M 18,24 h 10 v 4 h -10 z" />
</svg>
```

**Step 2: Remove the old favicon**

Run: `rm public/favicon.ico`
Expected: File is deleted.

**Step 3: Commit**

```bash
git add public/favicon.svg public/favicon.ico
git commit -m "feat(ui): add dynamic svg terminal favicon"
```

### Task 2: Update Nuxt Configuration

**Files:**
- Modify: `nuxt.config.ts`

**Step 1: Update the configuration**

Change the `href` to point to `/favicon.svg` and the `type` to `image/svg+xml`.

```typescript
// Replace lines 8-10 in app.head.link
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
```

**Step 2: Verify Configuration Structure**

Run: `cat nuxt.config.ts | grep favicon`
Expected: Output showing the new svg configuration.

**Step 3: Commit**

```bash
git add nuxt.config.ts
git commit -m "chore(config): update favicon reference to svg"
```
