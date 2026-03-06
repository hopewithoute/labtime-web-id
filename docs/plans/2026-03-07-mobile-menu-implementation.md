# Mobile Menu Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the overflowing inline mobile header navigation with a right-side slide-in drawer while preserving the existing desktop navigation behavior.

**Architecture:** Keep the change localized to `app/layouts/default.vue` by introducing a small reactive mobile-menu state, conditional mobile/desktop header rendering, and a mobile drawer overlay that reuses the existing navigation destinations and search behavior. Verification should focus on preventing mobile overflow while preserving desktop behavior and existing terminal-editorial styling.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, existing Tailwind utility classes, Playwright E2E tests

---

### Task 1: Add failing mobile navigation coverage

**Files:**
- Modify: `tests/e2e/navigation.spec.ts`
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Write the failing test**

Add a new Playwright test that:
- opens `/` using a mobile viewport,
- verifies the hamburger trigger is visible,
- opens the mobile menu,
- verifies the drawer is visible,
- clicks a navigation item and confirms navigation succeeds.

Use code shaped like this:

```ts
test('mobile menu opens and navigates without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
  await expect(mobileMenuButton).toBeVisible()
  await mobileMenuButton.click()

  await expect(page.getByRole('dialog', { name: /mobile navigation/i })).toBeVisible()
  await page.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL('/projects')
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts --grep "mobile menu opens and navigates without overflow"`

Expected: FAIL because the mobile menu trigger and dialog do not exist yet.

**Step 3: Commit the failing test snapshot**

```bash
git add tests/e2e/navigation.spec.ts
git commit -m "test: add failing mobile navigation coverage"
```

### Task 2: Implement mobile drawer state and layout

**Files:**
- Modify: `app/layouts/default.vue:19-127`
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Add minimal reactive menu state**

In `app/layouts/default.vue`, add:
- `const isMobileMenuOpen = ref(false)`
- `const openMobileMenu = () => { isMobileMenuOpen.value = true }`
- `const closeMobileMenu = () => { isMobileMenuOpen.value = false }`
- `const openSearchFromMobileMenu = () => { closeMobileMenu(); openSearch() }`

Also add an `Escape` key handler using the existing keyboard pattern so pressing Escape closes the drawer when open.

Use minimal code like:

```ts
const isMobileMenuOpen = ref(false)

const openMobileMenu = () => {
  isMobileMenuOpen.value = true
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const openSearchFromMobileMenu = () => {
  closeMobileMenu()
  openSearch()
}
```

**Step 2: Split desktop and mobile header controls**

Update the header markup so that:
- the existing inline nav becomes `hidden md:flex`,
- a mobile-only hamburger button becomes `md:hidden`,
- the hamburger button includes accessible attributes such as `aria-label`, `aria-expanded`, and `aria-controls`.

Example button shape:

```vue
<button
  type="button"
  class="md:hidden inline-flex items-center justify-center border border-foreground px-3 py-2 text-xs font-mono uppercase"
  aria-label="Open navigation menu"
  :aria-expanded="isMobileMenuOpen"
  aria-controls="mobile-navigation-drawer"
  @click="openMobileMenu"
>
  Menu
</button>
```

**Step 3: Add the overlay and right-side drawer**

Insert mobile-only overlay + drawer markup near the header or just after it. Keep it local to this layout.

Requirements:
- overlay only renders when `isMobileMenuOpen` is true,
- drawer slides in from the right,
- drawer exposes `role="dialog"` and `aria-label="Mobile navigation"`,
- nav links call `closeMobileMenu` on click,
- Search calls `openSearchFromMobileMenu`,
- GitHub remains external.

Use the existing route-active pattern for mobile links as well.

Structure example:

```vue
<Transition>
  <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 md:hidden">
    <button class="absolute inset-0 bg-background/70" aria-label="Close navigation menu" @click="closeMobileMenu" />
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-label="Mobile navigation"
      class="absolute right-0 top-0 h-full w-[min(24rem,100vw)] border-l border-foreground bg-background"
    >
      <!-- close button + nav links -->
    </div>
  </div>
</Transition>
```

**Step 4: Keep scope constrained**

Do not:
- move the theme toggle,
- refactor footer behavior,
- extract a new component unless the layout becomes unmanageable,
- alter desktop navigation destinations or semantics.

**Step 5: Run targeted test to verify it passes**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts --grep "mobile menu opens and navigates without overflow"`

Expected: PASS

**Step 6: Commit the implementation**

```bash
git add app/layouts/default.vue tests/e2e/navigation.spec.ts
git commit -m "feat: add mobile navigation drawer"
```

### Task 3: Verify full navigation behavior

**Files:**
- Modify: `tests/e2e/navigation.spec.ts` (only if assertions need tightening)
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Add or refine verification for close behavior**

If not already covered, add one extra assertion-focused test for one of these minimal behaviors:
- overlay click closes the drawer, or
- Search button inside the drawer closes the drawer and opens the search UI.

Prefer the smallest additional test that validates the interaction contract.

Example:

```ts
test('mobile menu closes from overlay', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: /open navigation menu/i }).click()
  await expect(page.getByRole('dialog', { name: /mobile navigation/i })).toBeVisible()
  await page.getByRole('button', { name: /close navigation menu/i }).first().click()
  await expect(page.getByRole('dialog', { name: /mobile navigation/i })).toHaveCount(0)
})
```

**Step 2: Run the full navigation spec**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts`

Expected: PASS for existing navigation tests and new mobile navigation coverage.

**Step 3: Run project lint or targeted test command if navigation spec reveals markup issues**

Run one of these only if needed:
- `pnpm test`
- `pnpm lint`
- the project’s existing targeted verification command for Vue templates

Expected: PASS, or no further changes needed if navigation spec already provides sufficient confidence.

**Step 4: Commit verification refinements**

```bash
git add tests/e2e/navigation.spec.ts app/layouts/default.vue
git commit -m "test: verify mobile navigation interactions"
```

### Task 4: Final review before handoff

**Files:**
- Review: `app/layouts/default.vue`
- Review: `tests/e2e/navigation.spec.ts`
- Review: `docs/plans/2026-03-07-mobile-menu-design.md`
- Review: `docs/plans/2026-03-07-mobile-menu-implementation.md`

**Step 1: Review against design constraints**

Confirm the final implementation still matches the approved design:
- mobile overflow removed,
- drawer enters from the right,
- desktop nav preserved,
- search still works,
- theme toggle remains untouched.

**Step 2: Run final targeted verification**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts`

Expected: PASS

**Step 3: Prepare handoff summary**

Document:
- what changed,
- which tests passed,
- any follow-up risks or nice-to-haves intentionally left out.

**Step 4: Commit any final cleanup if needed**

```bash
git add app/layouts/default.vue tests/e2e/navigation.spec.ts docs/plans/2026-03-07-mobile-menu-design.md docs/plans/2026-03-07-mobile-menu-implementation.md
git commit -m "docs: finalize mobile menu delivery plan"
```
