# Performance Runtime Cloudflare Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve user-perceived loading speed by reducing unnecessary per-request work in Cloudflare Workers while preserving hybrid rendering for request-sensitive features.

**Architecture:** Keep Cloudflare Workers as the runtime boundary, but move stable public-route work onto Nuxt/Nitro pre-render and route rules where possible. Runtime routes should stay narrow, cache-aware, and payload-light, while decorative client-only behaviors should stop adding avoidable hydration or request overhead.

**Tech Stack:** Nuxt 4, Nitro Cloudflare preset, Nuxt Content, Vue 3, TypeScript, Vitest, Playwright, Cloudflare Workers

---

### Task 1: Add route-level rendering and caching policy in Nuxt config

**Files:**
- Modify: `nuxt.config.ts`
- Test: `tests/integration/pages/index.spec.ts`

**Step 1: Write the failing test**

Add an assertion in `tests/integration/pages/index.spec.ts` that verifies the home page still mounts after introducing route rules, and add a second assertion if useful to confirm that page text expected from pre-rendered content still appears.

```ts
it('still renders the home page with performance route rules enabled', async () => {
  const wrapper = await mountSuspended(IndexPage)
  expect(wrapper.text()).toContain('Systems Built')
})
```

**Step 2: Run test to verify current baseline**

Run: `pnpm vitest run tests/integration/pages/index.spec.ts`
Expected: PASS before config changes, establishing a baseline.

**Step 3: Write minimal implementation**

Modify `nuxt.config.ts` to add explicit `routeRules` for public routes and dynamic routes.

Implementation target:
- mark `/`, `/articles`, `/articles/**`, `/projects`, `/projects/**`, `/resume`, `/resume/ats` as pre-rendered or cache-friendly public routes,
- keep runtime-only behavior for any future API endpoints or request-sensitive routes,
- prefer simple Nitro-native rules such as `prerender`, `swr`, or similar cache directives supported by the current Nuxt/Nitro version,
- do not add speculative rules for routes that do not exist.

Example shape to adapt to the codebase:

```ts
routeRules: {
  '/': { prerender: true },
  '/articles': { prerender: true },
  '/articles/**': { prerender: true },
  '/projects': { prerender: true },
  '/projects/**': { prerender: true },
  '/resume': { prerender: true },
  '/resume/ats': { prerender: true },
}
```

If you choose `swr` for selected public routes instead of pure prerender, document why in the code change or commit message and keep the policy minimal.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/integration/pages/index.spec.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add nuxt.config.ts tests/integration/pages/index.spec.ts
git commit -m "perf: add route rules for public pages"
```

### Task 2: Precompute the global search source instead of building it on first open

**Files:**
- Modify: `app/composables/useGlobalSearch.ts`
- Modify: `app/components/SearchPalette.vue`
- Test: `tests/integration/pages/articles.spec.ts`
- Create: `tests/unit/composables/useGlobalSearch.spec.ts`

**Step 1: Write the failing test**

Create a focused unit test for the search composable that proves it can search against a precomputed dataset without first issuing multiple collection queries on open.

```ts
import { describe, expect, it } from 'vitest'

describe('useGlobalSearch', () => {
  it('groups search results from a prepared index payload', async () => {
    const items = [
      { path: '/projects/demo', title: 'Demo', description: 'Project', _type: 'project' },
    ]

    // mount/use composable with injected prepared data
    // search for "demo"
    // expect grouped project result
    expect(true).toBe(false)
  })
})
```

Also add or extend an integration test so the search UI still renders expected empty-state or opened-state text after the refactor.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/composables/useGlobalSearch.spec.ts tests/integration/pages/articles.spec.ts`
Expected: FAIL because the composable does not yet support a prepared data path.

**Step 3: Write minimal implementation**

Refactor `app/composables/useGlobalSearch.ts` so that:
- Fuse index construction is separated from on-demand collection querying,
- the composable can accept a precomputed payload loaded once from a static JSON asset, `useAsyncData`, or another prepared source,
- `open()` no longer performs three content queries on first interaction,
- result grouping behavior remains the same.

Update `app/components/SearchPalette.vue` only as needed to adapt to the new composable API.

Keep the implementation DRY:
- one function to normalize search items,
- one function to build the Fuse index,
- one function to group results.

Avoid introducing a general-purpose abstraction unless the code genuinely needs it.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/composables/useGlobalSearch.spec.ts tests/integration/pages/articles.spec.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add app/composables/useGlobalSearch.ts app/components/SearchPalette.vue tests/unit/composables/useGlobalSearch.spec.ts tests/integration/pages/articles.spec.ts
git commit -m "perf: preload global search index"
```

### Task 3: Add a prepared search index build path for public content

**Files:**
- Create: `server/routes/search-index.json.ts` or a more appropriate prepared-data location supported by the current Nuxt setup
- Modify: `app/composables/useGlobalSearch.ts`
- Test: `tests/integration/pages/articles.spec.ts`
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Write the failing test**

Add an integration or e2e assertion that opening the search UI still works and returns results without relying on first-open content queries from the client.

Example e2e addition:

```ts
test('search opens and can show prepared results', async ({ page }) => {
  await page.goto('/')
  // open search via current UI trigger
  // type a known term from seeded content
  // expect at least one result button to appear
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/integration/pages/articles.spec.ts && pnpm playwright test tests/e2e/navigation.spec.ts --grep "search opens and can show prepared results"`
Expected: FAIL because no prepared search index endpoint or asset exists yet.

**Step 3: Write minimal implementation**

Create a prepared search payload source that emits only the fields needed by Fuse:
- `path`
- `title`
- `description`
- `tags`
- `_type`
- `_parentProject` when relevant

Implementation guidance:
- prefer a static or cache-friendly route in Nitro that Cloudflare can serve cheaply,
- do not expose raw content bodies,
- keep payload size intentionally small,
- make the composable fetch this prepared payload once and reuse it.

If a static build-generated asset is easier than a runtime route in this repo, use the static asset path instead. The important outcome is removing expensive first-open query work from the live interaction path.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/integration/pages/articles.spec.ts && pnpm playwright test tests/e2e/navigation.spec.ts --grep "search opens and can show prepared results"`
Expected: PASS

**Step 5: Commit**

```bash
git add server/routes/search-index.json.ts app/composables/useGlobalSearch.ts tests/integration/pages/articles.spec.ts tests/e2e/navigation.spec.ts
git commit -m "perf: serve prepared search index"
```

### Task 4: Remove avoidable client runtime churn from the home page

**Files:**
- Modify: `app/pages/index.vue`
- Test: `tests/integration/pages/index.spec.ts`

**Step 1: Write the failing test**

Add a test that asserts the core home-page content still renders even if decorative live telemetry is simplified or replaced with stable initial values.

```ts
it('renders home page core content without relying on decorative timers', async () => {
  const wrapper = await mountSuspended(IndexPage)
  expect(wrapper.text()).toContain('Anggi Wibiyanto')
  expect(wrapper.text()).toContain('Recent Logs')
})
```

If useful, add an assertion that no user-visible content depends on time-based updates to become meaningful.

**Step 2: Run test to verify current baseline**

Run: `pnpm vitest run tests/integration/pages/index.spec.ts`
Expected: PASS before refactor.

**Step 3: Write minimal implementation**

Refactor `app/pages/index.vue` to reduce avoidable client work:
- remove or simplify repeated timer-driven decorative state that does not improve task completion,
- prefer stable SSR-friendly values for decorative metrics,
- keep the visual identity intact,
- preserve only interactive behavior that is meaningful to the page.

Likely targets based on current file:
- `sysUptime` live interval,
- `telemetryInterval` updates for `memAlloc` and `threadPoolState`,
- boot-sequence timers if they cause unnecessary hydration churn.

A good minimal result is to keep the page looking intentional without continuous updates after mount.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/integration/pages/index.spec.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add app/pages/index.vue tests/integration/pages/index.spec.ts
git commit -m "perf: reduce home page runtime churn"
```

### Task 5: Remove avoidable client runtime churn from the articles listing page

**Files:**
- Modify: `app/pages/articles/index.vue`
- Test: `tests/integration/pages/articles.spec.ts`

**Step 1: Write the failing test**

Add a test that verifies the articles page renders the archive UI and article list without depending on random or timer-driven diagnostic state.

```ts
it('renders article archive content without dynamic diagnostic timers', async () => {
  const wrapper = await mountSuspended(ArticlesPage)
  expect(wrapper.text()).toContain('System Logs')
})
```

**Step 2: Run test to verify current baseline**

Run: `pnpm vitest run tests/integration/pages/articles.spec.ts`
Expected: PASS before refactor.

**Step 3: Write minimal implementation**

Refactor `app/pages/articles/index.vue` to reduce decorative client runtime work:
- remove interval-driven telemetry updates where they are purely cosmetic,
- replace random values in visible markup with stable values or precomputed constants,
- keep the archive layout and branding language intact.

Likely targets:
- `telemetryInterval`,
- `bufferWidth` animation logic,
- command boot sequence timers,
- `Math.random()` in template-rendered file-size output.

The result should be visually consistent and deterministic while requiring less client-side work.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/integration/pages/articles.spec.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add app/pages/articles/index.vue tests/integration/pages/articles.spec.ts
git commit -m "perf: reduce articles page runtime churn"
```

### Task 6: Verify route behavior and navigation after performance changes

**Files:**
- Test: `tests/e2e/navigation.spec.ts`
- Test: `tests/e2e/articles.spec.ts`
- Test: `tests/e2e/projects.spec.ts`

**Step 1: Write the failing test**

Extend existing e2e coverage where needed so it explicitly checks the public routes affected by route rules and search changes.

Add assertions for:
- home page loads,
- articles page loads,
- projects page loads,
- mobile navigation still works,
- search still opens and returns results.

Example addition:

```ts
test('public content routes remain navigable after performance optimization', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('/')
  await page.goto('/articles')
  await expect(page).toHaveURL('/articles')
  await page.goto('/projects')
  await expect(page).toHaveURL('/projects')
})
```

**Step 2: Run test to verify it fails or highlights gaps**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts tests/e2e/articles.spec.ts tests/e2e/projects.spec.ts`
Expected: either FAIL on missing assertions/behavior gaps or PASS with enough coverage to validate the refactor.

If it already passes and coverage is sufficient, keep this as a verification task and do not force artificial failures.

**Step 3: Write minimal implementation**

Make only the code changes required to restore navigation/search behavior after the earlier performance tasks. Do not add unrelated UI work.

Potential files if fixes are needed:
- `app/components/SearchPalette.vue`
- `app/composables/useGlobalSearch.ts`
- `app/pages/index.vue`
- `app/pages/articles/index.vue`

**Step 4: Run test to verify it passes**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts tests/e2e/articles.spec.ts tests/e2e/projects.spec.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/e2e/navigation.spec.ts tests/e2e/articles.spec.ts tests/e2e/projects.spec.ts app/components/SearchPalette.vue app/composables/useGlobalSearch.ts app/pages/index.vue app/pages/articles/index.vue
git commit -m "test: verify public route performance behavior"
```

### Task 7: Run full verification for the Cloudflare-oriented performance refactor

**Files:**
- Modify: none unless a failing test requires a targeted fix
- Test: `tests/integration/pages/index.spec.ts`
- Test: `tests/integration/pages/articles.spec.ts`
- Test: `tests/e2e/navigation.spec.ts`
- Test: `tests/e2e/articles.spec.ts`
- Test: `tests/e2e/projects.spec.ts`

**Step 1: Run focused unit and integration suite**

Run: `pnpm vitest run tests/unit/composables/useGlobalSearch.spec.ts tests/integration/pages/index.spec.ts tests/integration/pages/articles.spec.ts`
Expected: PASS

**Step 2: Run e2e suite for affected routes**

Run: `pnpm playwright test tests/e2e/navigation.spec.ts tests/e2e/articles.spec.ts tests/e2e/projects.spec.ts`
Expected: PASS

**Step 3: Run production build to validate Nitro/Cloudflare config**

Run: `pnpm run build`
Expected: PASS with no route-rule or Nitro config errors.

**Step 4: Run static generation check if prerender is used**

Run: `pnpm run generate`
Expected: PASS and include generated public routes without unexpected runtime-only failures.

**Step 5: Commit**

```bash
git add nuxt.config.ts app/composables/useGlobalSearch.ts app/components/SearchPalette.vue app/pages/index.vue app/pages/articles/index.vue tests/unit/composables/useGlobalSearch.spec.ts tests/integration/pages/index.spec.ts tests/integration/pages/articles.spec.ts tests/e2e/navigation.spec.ts tests/e2e/articles.spec.ts tests/e2e/projects.spec.ts
git commit -m "perf: optimize cloudflare runtime path for public pages"
```
