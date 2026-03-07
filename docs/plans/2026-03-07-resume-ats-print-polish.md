# Resume ATS Print Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Polish the ATS resume print output so section flow is more stable on paper, the Education section prints cleanly, and the primary resume CTA uses the shorter `Open ATS` label.

**Architecture:** Keep the changes localized to the existing Nuxt page components and tests. Update the public CTA copy in `app/pages/resume.vue`, then tighten print-specific structure and spacing in `app/pages/resume-ats.vue` using small wrappers and scoped `@media print` rules rather than introducing a separate print-only layout.

**Tech Stack:** Nuxt 4, Vue 3 SFC, scoped CSS, Playwright, Vitest

---

### Task 1: Rename the ATS CTA and align navigation coverage

**Files:**
- Modify: `app/pages/resume.vue:47-63`
- Modify: `tests/e2e/navigation.spec.ts:52-74`
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Write the failing test**

In `tests/e2e/navigation.spec.ts`, change the ATS CTA assertion from `Open ATS-Friendly Resume` to `Open ATS`.

```ts
await expect(atsLink).toContainText('Open ATS')
```

**Step 2: Run test to verify it fails**

Run: `pnpm --dir "/var/www/labtime-web-id" test:e2e -- --grep "resume page exposes ATS route access"`
Expected: FAIL because the current CTA text in `app/pages/resume.vue` still says `Open ATS-Friendly Resume`.

**Step 3: Write minimal implementation**

In `app/pages/resume.vue`, update only the CTA label text.

```vue
<span>Open ATS</span>
```

Do not change the link target, CTA ordering, button styling, or the `Export PDF Resume` CTA.

**Step 4: Run test to verify it passes**

Run: `pnpm --dir "/var/www/labtime-web-id" test:e2e -- --grep "resume page exposes ATS route access"`
Expected: PASS.

**Step 5: Commit**

```bash
git add app/pages/resume.vue tests/e2e/navigation.spec.ts
git commit -m "fix(resume): shorten ats call-to-action label"
```

### Task 2: Stabilize Education print layout and tighten print spacing

**Files:**
- Modify: `app/pages/resume-ats.vue:149-163`
- Modify: `app/pages/resume-ats.vue:184-239`
- Test: existing project suite via `pnpm test -- --run`

**Step 1: Write the failing test**

No automated print-layout regression test exists in this repo. Use a minimal structural and CSS change, then verify with the existing project test suite.

**Step 2: Verify current structure that causes unstable print output**

Read `app/pages/resume-ats.vue` and confirm:
- the `Education` heading is not grouped with its content
- print spacing still uses the same section margin for all blocks
- print layout depends on generic section/article rules instead of explicit education-level grouping

Expected: the current structure can leave the `Education` heading separated from its entries and wastes vertical space in print.

**Step 3: Write minimal implementation**

In `app/pages/resume-ats.vue`, wrap the `Education` heading and its content inside a print-specific grouping container.

Example target structure:

```vue
<section aria-labelledby="education-heading" class="mt-8 md:mt-10">
  <div class="ats-print-keep-with-next ats-print-section">
    <h2 id="education-heading" class="text-xl font-black tracking-tight md:text-2xl">Education</h2>
    <div class="mt-4 space-y-4 text-sm leading-7 text-foreground/80">
      ...
    </div>
  </div>
</section>
```

Then tighten only print-specific spacing in the same file. Keep screen spacing unchanged.

**Step 4: Add print CSS for denser section flow**

In the `@media print` block of `app/pages/resume-ats.vue`, keep the existing print reset rules and add only the minimum extra print rules needed for tighter spacing.

Use this pattern:

```css
.ats-print-section {
  break-inside: avoid;
  page-break-inside: avoid;
  margin-top: 0.75rem !important;
}

.ats-print-section + .ats-print-section {
  margin-top: 0.75rem !important;
}
```

If the final structure needs a dedicated education wrapper selector, add a small scoped rule for it, but avoid unrelated restyling.

**Step 5: Run test suite**

Run: `pnpm --dir "/var/www/labtime-web-id" test -- --run`
Expected: PASS with 0 failures.

**Step 6: Commit**

```bash
git add app/pages/resume-ats.vue
git commit -m "fix(print): tighten ats resume education spacing"
```

### Task 3: Make experience page-break behavior more consistent across print pages

**Files:**
- Modify: `app/pages/resume-ats.vue:53-147`
- Test: existing project suite via `pnpm test -- --run`
- Reference: `docs/plans/2026-03-07-resume-ats-print-page-break.md`

**Step 1: Write the failing test**

No browser-level print pagination test exists. Use the existing structural contract in the page markup and verify the repo test suite after the change.

**Step 2: Verify current limitation**

Read `app/pages/resume-ats.vue` and confirm:
- only the `Professional Experience` heading + first item are explicitly grouped
- later experience items rely on generic `article` print rules
- there is no dedicated print grouping for the section heading plus the following list container

Expected: later page breaks are browser-dependent and can still feel uneven between items.

**Step 3: Write minimal implementation**

In `app/pages/resume-ats.vue`, keep the existing first-item wrapper, then make the experience list container explicitly print-aware without changing content order.

Target structure:

```vue
<section aria-labelledby="experience-heading" class="mt-8 md:mt-10">
  <div class="ats-print-keep-with-next">
    <h2 id="experience-heading" class="text-xl font-black tracking-tight md:text-2xl">Professional Experience</h2>

    <article class="ats-print-section mt-5 border-b border-foreground/15 pb-6">
      ...
    </article>
  </div>

  <div class="ats-print-stack mt-5 space-y-6 md:space-y-8">
    <article class="ats-print-section border-b border-foreground/15 pb-6">
      ...
    </article>
    ...
  </div>
</section>
```

Do not rewrite the experience copy. Do not merge multiple jobs into one print block.

**Step 4: Add minimal print stack rule**

In the same file’s `@media print` block, add a small rule for the new list container so print spacing is controlled in one place.

```css
.ats-print-stack {
  margin-top: 0.75rem !important;
}

.ats-print-stack > .ats-print-section {
  margin-top: 0 !important;
}
```

Keep `article` and `.ats-print-keep-with-next` pagination rules intact. Only add what is needed to reduce erratic inter-item gaps in print.

**Step 5: Run test suite**

Run: `pnpm --dir "/var/www/labtime-web-id" test -- --run`
Expected: PASS with 0 failures.

**Step 6: Commit**

```bash
git add app/pages/resume-ats.vue docs/plans/2026-03-07-resume-ats-print-page-break.md docs/plans/2026-03-07-resume-ats-print-polish.md
git commit -m "fix(print): polish ats resume pagination"
```

### Task 4: Verify the whole ATS polish set together

**Files:**
- Verify: `app/pages/resume.vue`
- Verify: `app/pages/resume-ats.vue`
- Verify: `tests/e2e/navigation.spec.ts`

**Step 1: Run the full project test suite**

Run: `pnpm --dir "/var/www/labtime-web-id" test -- --run`
Expected: PASS with 0 failures.

**Step 2: Run the focused Playwright navigation check**

Run: `pnpm --dir "/var/www/labtime-web-id" test:e2e -- --grep "resume page exposes ATS route access"`
Expected: PASS.

**Step 3: Review changed files before final handoff**

Inspect:
- `app/pages/resume.vue`
- `app/pages/resume-ats.vue`
- `tests/e2e/navigation.spec.ts`
- `docs/plans/2026-03-07-resume-ats-print-polish.md`

Confirm all changes stay within the approved scope:
- CTA label is `Open ATS`
- print header/footer hiding behavior remains intact
- print spacing is tighter but screen layout is unchanged
- `Education` and experience print flow are more stable

**Step 4: Commit final verification-only changes if needed**

If no extra files changed during verification, do not create an extra commit.
If any verification-driven change was required, commit it separately with a narrow message.
