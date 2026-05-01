# Resume Sync Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync the `/resume` and `/resume/ats` pages with the English resume source in `/var/www/resume/resume.md` without changing each page's intended presentation mode.

**Architecture:** Keep the current page components and update their inline content directly. Add focused integration tests that pin the updated facts so future resume edits do not silently drift from the source material.

**Tech Stack:** Nuxt 4, Vue 3, Vitest, `@nuxt/test-utils`

---

### Task 1: Add failing integration tests for the new resume source facts

**Files:**
- Create: `tests/integration/pages/resume.spec.ts`
- Create: `tests/integration/pages/resume-ats.spec.ts`

- [ ] **Step 1: Write the failing test for `/resume`**

```ts
expect(wrapper.text()).toContain('+6285723960603')
expect(wrapper.text()).toContain('4.2M+ requests/month')
expect(wrapper.text()).toContain('West Bandung Regency Government')
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:integration -- tests/integration/pages/resume.spec.ts tests/integration/pages/resume-ats.spec.ts`
Expected: FAIL because the current pages do not yet contain all of the synced source content.

- [ ] **Step 3: Write the failing test for `/resume/ats`**

```ts
expect(wrapper.text()).toContain('+6285723960603')
expect(wrapper.text()).toContain('Core Skills')
expect(wrapper.text()).toContain('West Bandung Regency Government')
```

- [ ] **Step 4: Run test to verify it fails**

Run: `pnpm test:integration -- tests/integration/pages/resume.spec.ts tests/integration/pages/resume-ats.spec.ts`
Expected: FAIL with missing updated ATS content.

### Task 2: Sync `app/pages/resume.vue` to the source resume

**Files:**
- Modify: `app/pages/resume.vue`
- Reference: `/var/www/resume/resume.md`
- Test: `tests/integration/pages/resume.spec.ts`

- [ ] **Step 1: Implement the summary and contact sync**

Update the summary copy, add the phone number, and align the contact card with the source resume facts.

- [ ] **Step 2: Implement the quantified signal cards and skill taxonomy sync**

Replace the current compact metrics and reduced skill matrix with categories and numbers grounded in the source resume.

- [ ] **Step 3: Implement the expanded experience coverage**

Add the missing project entries and update the existing ones so the experience section reflects the source resume.

- [ ] **Step 4: Run the `/resume` integration test**

Run: `pnpm test:integration -- tests/integration/pages/resume.spec.ts`
Expected: PASS

### Task 3: Sync `app/pages/resume-ats.vue` to the source resume

**Files:**
- Modify: `app/pages/resume-ats.vue`
- Reference: `/var/www/resume/resume.md`
- Test: `tests/integration/pages/resume-ats.spec.ts`

- [ ] **Step 1: Update top-level ATS metadata and contact block**

Add the phone number and align section titles and summary wording with the source resume.

- [ ] **Step 2: Update skills and experience copy**

Rename `Technical Skills` to `Core Skills` and sync experience labels, summaries, and bullets to the source resume.

- [ ] **Step 3: Update education labels**

Align degree labels with the source resume wording.

- [ ] **Step 4: Run the `/resume/ats` integration test**

Run: `pnpm test:integration -- tests/integration/pages/resume-ats.spec.ts`
Expected: PASS

### Task 4: Run focused verification on both pages

**Files:**
- Verify: `app/pages/resume.vue`
- Verify: `app/pages/resume-ats.vue`
- Verify: `tests/integration/pages/resume.spec.ts`
- Verify: `tests/integration/pages/resume-ats.spec.ts`

- [ ] **Step 1: Run both integration tests together**

Run: `pnpm test:integration -- tests/integration/pages/resume.spec.ts tests/integration/pages/resume-ats.spec.ts`
Expected: PASS

- [ ] **Step 2: Review the final diff**

Run: `git diff -- app/pages/resume.vue app/pages/resume-ats.vue tests/integration/pages/resume.spec.ts tests/integration/pages/resume-ats.spec.ts`
Expected: Only the intended resume sync content and new tests appear.
