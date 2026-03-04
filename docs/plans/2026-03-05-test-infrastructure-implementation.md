# Test Infrastructure Implementation Plan

**Design Document**: docs/plans/2026-03-05-test-infrastructure-design.md
**Date**: 2026-03-05

## Overview

Implementation plan for comprehensive testing infrastructure with Vitest, @nuxt/test-utils, and Playwright targeting 95%+ coverage.

## Prerequisites

- Node.js 18+ (current project uses Nuxt 4)
- pnpm as package manager
- Existing Nuxt 4 project with @nuxt/content

## Implementation Steps

### Step 1: Install Dependencies

Install testing dependencies for unit, integration, and E2E tests.

**Packages to install:**
```bash
pnpm add -D vitest @nuxt/test-utils @vue/test-utils happy-dom @vitest/coverage-v8 @playwright/test
```

**Verification:**
- All packages installed without conflicts
- No peer dependency warnings

---

### Step 2: Create Vitest Configuration

Create `vitest.config.ts` at project root with:
- Nuxt test utilities integration
- happy-dom environment
- Coverage configuration with 95% thresholds
- Path aliases matching Nuxt config

**File:** `vitest.config.ts`

**Verification:**
- `pnpm vitest --version` runs successfully
- Config loads without errors

---

### Step 3: Create Playwright Configuration

Create `playwright.config.ts` at project root with:
- Chromium browser only
- Base URL http://localhost:3000
- Dev server auto-start
- Screenshot on failure, trace on retry

**File:** `playwright.config.ts`

**Verification:**
- `pnpm playwright --version` runs successfully
- Config loads without errors

---

### Step 4: Update Package Scripts

Add test scripts to `package.json`:
```json
{
  "test": "vitest",
  "test:unit": "vitest run tests/unit",
  "test:integration": "vitest run tests/integration",
  "test:e2e": "playwright test",
  "test:all": "vitest run && playwright test",
  "test:coverage": "vitest run --coverage"
}
```

**Verification:**
- All scripts run without "script not found" errors

---

### Step 5: Create Test Directory Structure

Create the tests directory structure:
```
tests/
├── unit/
│   ├── utils/
│   ├── lib/
│   └── components/
├── integration/
│   └── pages/
└── e2e/
```

**Verification:**
- All directories exist

---

### Step 6: Write Unit Tests for Utility Functions

Create tests for pure functions:

**Files to create:**
1. `tests/unit/utils/formatDate.spec.ts`
   - Valid date string
   - Date object
   - undefined input
   - Invalid date
   - Empty string

2. `tests/unit/utils/flattenTechStack.spec.ts`
   - Object with groups
   - Flat array (backward compat)
   - undefined input
   - Empty object

3. `tests/unit/lib/utils.spec.ts`
   - Single class
   - Multiple classes
   - Conditional classes
   - Tailwind merge conflicts

**Verification:**
- `pnpm test:unit` passes
- Coverage > 95% for utils/lib

---

### Step 7: Write Unit Tests for Components

Create tests for Vue components:

**Files to create:**
1. `tests/unit/components/MetricTag.spec.ts`
   - Renders with props
   - Slot content

2. `tests/unit/components/CornerFrame.spec.ts`
   - Renders correctly
   - CSS classes applied

3. `tests/unit/components/ThemeToggle.spec.ts`
   - Renders toggle button
   - Emits events on click

**Verification:**
- `pnpm test:unit` passes
- Component coverage > 95%

---

### Step 8: Write Integration Tests for Pages

Create tests for Nuxt pages with full context:

**Files to create:**
1. `tests/integration/pages/index.spec.ts`
   - Home page renders
   - Hero section visible
   - Navigation links work

2. `tests/integration/pages/articles.spec.ts`
   - Articles list renders
   - Article page renders content
   - 404 handling

3. `tests/integration/pages/projects.spec.ts`
   - Projects list renders
   - Project detail page renders
   - Sub-article pages render
   - Tech badges display correctly

**Verification:**
- `pnpm test:integration` passes
- Page coverage > 95%

---

### Step 9: Write E2E Tests with Playwright

Create end-to-end tests:

**Files to create:**
1. `tests/e2e/navigation.spec.ts`
   - Home to articles flow
   - Home to projects flow
   - Back navigation works

2. `tests/e2e/articles.spec.ts`
   - Article content renders
   - Code syntax highlighting works
   - Links work correctly

3. `tests/e2e/projects.spec.ts`
   - Project list displays
   - Project detail page
   - Sub-article navigation

4. `tests/e2e/theme.spec.ts`
   - Theme toggle works
   - Theme persists on navigation
   - Dark/light mode styles

**Verification:**
- `pnpm test:e2e` passes
- Dev server starts automatically

---

### Step 10: Install Playwright Browsers

Run Playwright browser installation:

```bash
pnpm exec playwright install chromium
```

**Verification:**
- Chromium browser installed
- E2E tests can run

---

### Step 11: Verify Coverage Thresholds

Run full coverage report and verify:

```bash
pnpm test:coverage
```

**Verification:**
- Coverage report shows > 95% for:
  - Lines
  - Branches
  - Functions
  - Statements
- HTML coverage report generated

---

### Step 12: Final Verification

Run all tests together:

```bash
pnpm test:all
```

**Verification:**
- All unit tests pass
- All integration tests pass
- All E2E tests pass
- Overall coverage > 95%

---

## Files to Create/Modify

### New Files
- `vitest.config.ts`
- `playwright.config.ts`
- `tests/unit/utils/formatDate.spec.ts`
- `tests/unit/utils/flattenTechStack.spec.ts`
- `tests/unit/lib/utils.spec.ts`
- `tests/unit/components/MetricTag.spec.ts`
- `tests/unit/components/CornerFrame.spec.ts`
- `tests/unit/components/ThemeToggle.spec.ts`
- `tests/integration/pages/index.spec.ts`
- `tests/integration/pages/articles.spec.ts`
- `tests/integration/pages/projects.spec.ts`
- `tests/e2e/navigation.spec.ts`
- `tests/e2e/articles.spec.ts`
- `tests/e2e/projects.spec.ts`
- `tests/e2e/theme.spec.ts`

### Modified Files
- `package.json` (scripts and devDependencies)

---

## Success Criteria

1. All tests pass locally
2. Coverage > 95% across all metrics
3. `pnpm test:all` runs without errors
4. E2E tests cover critical user journeys
5. Unit tests cover all utility functions and components

---

## Notes

- Run `pnpm install` after modifying package.json
- Use `@nuxt/test-utils` `mockNuxtImport` for mocking Nuxt composables
- Use `mountSuspended` for testing components with Nuxt context
- Use `renderAndWait` for page-level integration tests