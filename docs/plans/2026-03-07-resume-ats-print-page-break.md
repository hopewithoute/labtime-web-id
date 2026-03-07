# Resume ATS Print Page Break Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Keep the `Professional Experience` heading attached to the first experience item in the printed ATS resume so the title never ends page 1 by itself.

**Architecture:** Add a small print-specific wrapper around the section heading and first experience entry in `app/pages/resume-ats.vue`, then apply print pagination rules to that wrapper. This keeps screen layout unchanged while making print pagination deterministic.

**Tech Stack:** Nuxt 4, Vue 3 SFC, scoped CSS, print media CSS, Vitest

---

### Task 1: Wrap the heading and first experience item

**Files:**
- Modify: `app/pages/resume-ats.vue`
- Test: existing project suite via `pnpm test -- --run`

**Step 1: Write the failing test**

No automated print-layout regression test exists in this repo. Use a minimal structural change instead of inventing a test-only print harness.

**Step 2: Verify current broken structure**

Read: `app/pages/resume-ats.vue`
Expected: `Professional Experience` heading is separate from the first `<article>`, so print layout may split them across pages.

**Step 3: Write minimal implementation**

In `app/pages/resume-ats.vue`, wrap:
- the `Professional Experience` `<h2>`
- the first experience `<article>`

inside a dedicated container class such as `.ats-print-keep-with-next`.

Do not change the remaining experience items.

**Step 4: Add print pagination rule**

In the same file’s `@media print` block, add print rules for the new wrapper:

```css
.ats-print-keep-with-next {
  break-inside: avoid;
  page-break-inside: avoid;
}
```

If needed, also keep inner spacing tight enough for predictable print layout, but avoid unrelated styling changes.

**Step 5: Run test suite**

Run: `pnpm --dir "/var/www/labtime-web-id" test -- --run`
Expected: PASS with 0 failures.

**Step 6: Commit**

```bash
git add app/pages/resume-ats.vue docs/plans/2026-03-07-resume-ats-print-page-break.md
git commit -m "fix(print): keep experience heading with first item"
```
