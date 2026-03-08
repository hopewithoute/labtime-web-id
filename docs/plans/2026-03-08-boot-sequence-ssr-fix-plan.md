# Boot Sequence SSR Fix Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Eliminate the flash of unstyled content / hydration mismatch on the landing page boot sequence by migrating the "booted" state from `sessionStorage` to a Nuxt session cookie.

**Architecture:** Use Nuxt's `useCookie('booted')` composable in `app/layouts/default.vue` to allow the server to correctly determine whether the boot sequence overlay should be rendered during SSR. We'll also update E2E tests to wait for the matching cookie state.

**Tech Stack:** Nuxt 3, Vue 3 Composition API, Playwright.

---

### Task 1: Update E2E Tests for Cookie

**Files:**
- Modify: `tests/e2e/navigation.spec.ts`
- Modify: `tests/e2e/theme.spec.ts`

**Step 1: Write the failing / updated test**

In `tests/e2e/navigation.spec.ts`:
Change line 38 from:
```typescript
    await page.waitForFunction(() => window.sessionStorage.getItem('booted') === 'true')
```
To:
```typescript
    await page.waitForFunction(() => document.cookie.includes('booted=true'))
```

In `tests/e2e/theme.spec.ts`:
Change line 4 from:
```typescript
  await page.waitForFunction(() => window.sessionStorage.getItem('booted') === 'true')
```
To:
```typescript
  await page.waitForFunction(() => document.cookie.includes('booted=true'))
```

**Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/navigation.spec.ts`
Expected: Timeout waiting for the function because the cookie is not being set by the application yet.

### Task 2: Migrate state to useCookie in Layout

**Files:**
- Modify: `app/layouts/default.vue`

**Step 1: Implement the minimal code**

In `app/layouts/default.vue`:

Replace the initialization of `showBootSequence` around line 281-282. We will initialize it synchronously from the cookie:

```vue
const bootedCookie = useCookie('booted', { maxAge: undefined })
const showBootSequence = ref(!bootedCookie.value)
const bootLines = ref<string[]>([])
```

In the `onMounted` hook around line 289, change the `sessionStorage` logic:

```vue
onMounted(() => {
  isHydrated.value = true

  if (!bootedCookie.value) {
    showBootSequence.value = true

    setTimeout(() => { bootLines.value.push(allLines[0] as string) }, 300)
    setTimeout(() => { bootLines.value.push(allLines[1] as string) }, 800)
    setTimeout(() => {
      bootLines.value.push(allLines[2] as string)

      setTimeout(() => {
        showBootSequence.value = false
        bootedCookie.value = 'true'
      }, 700)
    }, 1300)
  }
})
```

**Step 2: Run tests to verify they pass**

Run: `npx playwright test tests/e2e/theme.spec.ts tests/e2e/navigation.spec.ts`
Expected: PASS

**Step 3: Commit**

```bash
git add app/layouts/default.vue tests/e2e/navigation.spec.ts tests/e2e/theme.spec.ts
git commit -m "fix(ui): eliminate boot sequence flashes by moving state to cookie"
```
