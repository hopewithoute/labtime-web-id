# ATS-friendly resume implementation plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a dedicated ATS-friendly `/resume/ats` page, expose it from the existing `/resume` sidebar with a new button above the export button, and ensure the ATS page prints cleanly.

**Architecture:** Keep the current `/resume` page as the visual cyber-styled version and add a separate ATS route with its own simplified layout and print-specific CSS. Reuse the curated resume content, but structure it semantically for ATS parsing with a text-first header, grouped skills, conventional experience sections, and education. Keep the change localized to the resume pages unless a tiny shared helper becomes clearly necessary.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, existing Tailwind utility classes, route-based pages, browser print CSS, Playwright/manual browser verification

---

### Task 1: Add a failing route-level verification for the ATS page

**Files:**
- Modify: `tests/e2e/navigation.spec.ts` or the closest existing E2E spec that covers route navigation
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Write the failing test**

Add a test that:
- opens `/resume`
- verifies a new ATS button is visible above the export button
- clicks it
- confirms navigation to `/resume/ats`
- verifies the ATS page shows a plain resume heading and contact information

Use code shaped like this:

```ts
test('resume page links to ATS resume view', async ({ page }) => {
  await page.goto('/resume')

  const atsButton = page.getByRole('link', { name: /view ats resume/i })
  await expect(atsButton).toBeVisible()
  await atsButton.click()

  await expect(page).toHaveURL('/resume/ats')
  await expect(page.getByRole('heading', { name: /anggi wibiyanto/i })).toBeVisible()
  await expect(page.getByText('anggi.wibiyanto@gmail.com')).toBeVisible()
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts --grep "resume page links to ATS resume view"`

Expected: FAIL because the ATS button and route do not exist yet.

**Step 3: Commit the failing test**

```bash
git add tests/e2e/navigation.spec.ts
git commit -m "test: add failing ATS resume navigation coverage"
```

### Task 2: Add the ATS access button to the existing resume page

**Files:**
- Modify: `app/pages/resume.vue:46-54`
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Add the new ATS button above the export button**

In the CTA area of `app/pages/resume.vue`, insert a new `NuxtLink` above the current export button.

Requirements:
- route target is `/resume/ats`
- label is visually aligned with the current terminal/cyber language
- accessible name should still read clearly as ATS resume access
- keep the export button in place below it

Use a structure like:

```vue
<NuxtLink
  to="/resume/ats"
  class="block w-full border border-accent/40 ..."
>
  <span class="...">view_ats_resume</span>
</NuxtLink>
```

**Step 2: Keep scope constrained**

Do not refactor the rest of the sidebar or extract new CTA components unless duplication becomes obviously harmful.

**Step 3: Run the targeted ATS navigation test**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts --grep "resume page links to ATS resume view"`

Expected: still FAIL, but now further along because the route content is still missing.

**Step 4: Commit the sidebar CTA change**

```bash
git add app/pages/resume.vue tests/e2e/navigation.spec.ts
git commit -m "feat: add ATS resume access button"
```

### Task 3: Build the `/resume/ats` page with semantic ATS-friendly structure

**Files:**
- Create: `app/pages/resume/ats.vue`
- Reference: `app/pages/resume.vue:1-406`
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Create the page shell**

Create `app/pages/resume/ats.vue` with:
- `useHead()` metadata specific to the ATS version
- a single-column container with readable max width
- semantic sections using `header`, `main`, and `section`

Use minimal structure like:

```vue
<template>
  <div class="min-h-screen bg-background text-foreground">
    <main class="mx-auto max-w-4xl px-6 py-12 md:px-10">
      <header class="border-b pb-6">
        <h1 class="text-3xl font-bold">Anggi Wibiyanto</h1>
        <p class="mt-2 text-base">Senior Software Engineer · Senior System Builder</p>
      </header>
    </main>
  </div>
</template>
```

**Step 2: Add a plain ATS-friendly contact header**

Include:
- name
- primary role line
- location
- email
- website
- GitHub

Keep links real and text-first. Do not split the content into overly decorative blocks.

**Step 3: Add a concise professional summary**

Reuse the current resume summary but tighten it into one ATS-friendly paragraph.

Suggested shape:

```vue
<section aria-labelledby="summary-heading">
  <h2 id="summary-heading">Professional Summary</h2>
  <p>...</p>
</section>
```

**Step 4: Add grouped technical skills**

Create grouped lists for:
- Architecture
- Frontend
- Backend & Performance
- Database & Tools
- Infrastructure & DevOps

Prefer plain text or compact list items over decorative chips.

**Step 5: Add professional experience in conventional ATS format**

For each role, render:
- role title
- organization / project
- date range
- 2 to 4 bullet points

Reuse the already curated content from `app/pages/resume.vue`, but normalize it into traditional resume formatting. Do not add brand-new achievements not already supported by current content.

A suitable shape is:

```vue
<section aria-labelledby="experience-heading">
  <h2 id="experience-heading">Professional Experience</h2>

  <article>
    <div class="flex flex-col md:flex-row md:justify-between gap-2">
      <div>
        <h3>Senior Software Engineer</h3>
        <p>LMS Certification Platform</p>
      </div>
      <p>2025 – Present</p>
    </div>
    <ul>
      <li>Independently architected and delivered ...</li>
      <li>Increased feature delivery speed by 3x ...</li>
    </ul>
  </article>
</section>
```

**Step 6: Add education section**

Present the two education entries in a compact standard structure.

**Step 7: Run the targeted ATS navigation test**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts --grep "resume page links to ATS resume view"`

Expected: PASS

**Step 8: Commit the ATS page**

```bash
git add app/pages/resume/ats.vue tests/e2e/navigation.spec.ts
git commit -m "feat: add ATS-friendly resume page"
```

### Task 4: Make the ATS page print-friendly

**Files:**
- Modify: `app/pages/resume/ats.vue`
- Test: browser print preview for `/resume/ats`

**Step 1: Add scoped print styles**

Add a scoped `<style>` block or equivalent local styling in `app/pages/resume/ats.vue` for `@media print`.

Requirements:
- no decorative shadows or overlays
- no sticky positioning
- no unnecessary borders or background fills
- typography remains readable in print
- grouped blocks avoid awkward internal page breaks where reasonable

Use print rules shaped like this:

```css
@media print {
  .ats-print-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}
```

**Step 2: Mark key sections for print stability**

Apply a lightweight class such as `ats-print-section` to:
- header/contact block
- each experience entry
- education entries if needed

**Step 3: Ensure the screen layout still looks acceptable**

Keep the screen version simple and professional. Do not reintroduce cyber styling on the ATS page.

**Step 4: Verify with browser print preview**

Open `/resume/ats` in the browser and confirm:
- the full document appears in print preview
- headings remain clear
- links are readable
- no major section is clipped or split badly

Expected: clean print-ready output suitable for PDF export.

**Step 5: Commit print optimization**

```bash
git add app/pages/resume/ats.vue
git commit -m "feat: optimize ATS resume for print"
```

### Task 5: Final verification and handoff review

**Files:**
- Review: `app/pages/resume.vue`
- Review: `app/pages/resume/ats.vue`
- Review: `tests/e2e/navigation.spec.ts`
- Review: `docs/plans/2026-03-07-resume-ats-design.md`
- Review: `docs/plans/2026-03-07-resume-ats-implementation.md`

**Step 1: Verify design requirements against implementation**

Confirm:
- `/resume` still preserves the cyber/terminal layout
- ATS button is above the export button
- `/resume/ats` is clearly text-first and recruiter-friendly
- the ATS page avoids decorative UI that could hurt parsing
- the ATS page is print-friendly

**Step 2: Run targeted automated verification**

Run:
- `pnpm playwright test tests/e2e/navigation.spec.ts --grep "resume page links to ATS resume view"`

If the project already has an appropriate lightweight verification command, also run one of:
- `pnpm test`
- `pnpm lint`

Expected: PASS

**Step 3: Run manual browser verification**

Check both routes manually:
- `/resume`
- `/resume/ats`

Confirm the CTA placement, content hierarchy, mobile readability, and print preview quality.

**Step 4: Prepare handoff summary**

Document:
- what changed
- which routes were added or updated
- what tests passed
- any intentionally deferred improvements such as downloadable PDF generation from the ATS route

**Step 5: Commit final cleanup if needed**

```bash
git add app/pages/resume.vue app/pages/resume/ats.vue tests/e2e/navigation.spec.ts docs/plans/2026-03-07-resume-ats-design.md docs/plans/2026-03-07-resume-ats-implementation.md
git commit -m "docs: finalize ATS resume delivery plan"
```
