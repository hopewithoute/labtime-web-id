# Global Search — Command Palette Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Add a `Ctrl+K` / `⌘K` command palette that fuzzy-searches across all content (projects, articles, project sub-articles) by title, description, and tags — with results grouped by type and parent project context.

**Architecture:** Client-side fuzzy search using Fuse.js. A Vue composable (`useGlobalSearch`) fetches all content metadata via `queryCollection` on first open and builds a Fuse index. A modal component (`SearchPalette.vue`) renders grouped results with keyboard navigation. Lives in `default.vue` layout.

**Tech Stack:** Vue 3, Fuse.js, `@nuxt/content` queryCollection API, `@vueuse/core` (onKeyStroke)

---

### Task 1: Install Fuse.js

**Files:**
- Modify: `package.json`

**Step 1: Install the dependency**

```bash
cd /var/www/labtime-web-id && pnpm add fuse.js
```

**Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml && git commit -m "deps: add fuse.js for client-side fuzzy search"
```

---

### Task 2: Create `useGlobalSearch` composable

**Files:**
- Create: `app/composables/useGlobalSearch.ts`
- Test: `tests/unit/composables/useGlobalSearch.spec.ts`

**Step 1: Write the failing test**

Create `tests/unit/composables/useGlobalSearch.spec.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock queryCollection before importing composable
const mockAll = vi.fn()
const mockOrder = vi.fn(() => ({ all: mockAll }))
const mockQueryCollection = vi.fn(() => ({ order: mockOrder }))

vi.stubGlobal('queryCollection', mockQueryCollection)

// We'll test the search logic by importing the composable
// and verifying its behavior with mocked data
describe('useGlobalSearch', () => {
  const mockProjects = [
    { path: '/projects/lms-sertifikasi', title: 'LMS Sertifikasi', description: 'A learning management system', tags: ['elixir', 'react'], stem: 'projects/lms-sertifikasi/index' },
  ]

  const mockArticles = [
    { path: '/articles/01-example-article', title: 'Understanding CSS', description: 'A deep dive into CSS', tags: ['css', 'frontend'], stem: 'articles/01-example-article' },
  ]

  const mockProjectArticles = [
    { path: '/projects/lms-sertifikasi/chat-architecture-scaling', title: 'Chat Architecture', description: 'How we scaled chat', tags: ['elixir', 'phoenix'], stem: 'projects/lms-sertifikasi/chat-architecture-scaling' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockAll
      .mockResolvedValueOnce(mockProjects)
      .mockResolvedValueOnce(mockArticles)
      .mockResolvedValueOnce(mockProjectArticles)
  })

  it('should export isOpen, query, and search results', async () => {
    const { useGlobalSearch } = await import('~/composables/useGlobalSearch')
    const { isOpen, query, results } = useGlobalSearch()
    
    expect(isOpen.value).toBe(false)
    expect(query.value).toBe('')
    expect(results.value).toEqual({ projects: [], articles: [], projectArticles: [] })
  })

  it('should toggle open state', async () => {
    const { useGlobalSearch } = await import('~/composables/useGlobalSearch')
    const { isOpen, open, close } = useGlobalSearch()
    
    open()
    expect(isOpen.value).toBe(true)
    close()
    expect(isOpen.value).toBe(false)
  })
})
```

**Step 2: Run test to verify it fails**

```bash
cd /var/www/labtime-web-id && pnpm vitest run tests/unit/composables/useGlobalSearch.spec.ts
```

Expected: FAIL — module not found

**Step 3: Write the composable**

Create `app/composables/useGlobalSearch.ts`:

```typescript
import { ref, watch, type Ref } from 'vue'
import Fuse from 'fuse.js'

interface SearchableItem {
  path: string
  title: string
  description: string
  tags?: string[]
  stem?: string
  _type: 'project' | 'article' | 'projectArticle'
  _parentProject?: string
}

interface GroupedResults {
  projects: SearchableItem[]
  articles: SearchableItem[]
  projectArticles: SearchableItem[]
}

const isOpen = ref(false)
const query = ref('')
const results: Ref<GroupedResults> = ref({ projects: [], articles: [], projectArticles: [] })
const isLoaded = ref(false)

let fuseIndex: Fuse<SearchableItem> | null = null
let allItems: SearchableItem[] = []
let projectMap: Record<string, string> = {}

async function loadContent() {
  if (isLoaded.value) return

  const [projects, articles, projectArticles] = await Promise.all([
    queryCollection('projects').order('date', 'DESC').all(),
    queryCollection('articles').order('date', 'DESC').all(),
    queryCollection('projectArticles')
      .where('stem', 'NOT LIKE', '%/index')
      .order('date', 'DESC')
      .all(),
  ])

  // Build project slug → title map for parent context
  projectMap = {}
  for (const p of projects) {
    const slug = p.path.replace('/projects/', '')
    projectMap[slug] = p.title
  }

  allItems = [
    ...projects.map((p: any) => ({ ...p, _type: 'project' as const })),
    ...articles.map((a: any) => ({ ...a, _type: 'article' as const })),
    ...projectArticles.map((pa: any) => {
      // Extract parent project slug from path: /projects/lms-sertifikasi/article-slug → lms-sertifikasi
      const parts = pa.path.split('/')
      const parentSlug = parts[2] || ''
      return { ...pa, _type: 'projectArticle' as const, _parentProject: projectMap[parentSlug] || parentSlug }
    }),
  ]

  fuseIndex = new Fuse(allItems, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'tags', weight: 1.5 },
      { name: 'description', weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  })

  isLoaded.value = true
}

function search(q: string) {
  if (!fuseIndex || !q.trim()) {
    results.value = { projects: [], articles: [], projectArticles: [] }
    return
  }

  const fuseResults = fuseIndex.search(q, { limit: 15 })
  const grouped: GroupedResults = { projects: [], articles: [], projectArticles: [] }

  for (const r of fuseResults) {
    const item = r.item
    if (item._type === 'project') grouped.projects.push(item)
    else if (item._type === 'article') grouped.articles.push(item)
    else if (item._type === 'projectArticle') grouped.projectArticles.push(item)
  }

  results.value = grouped
}

export function useGlobalSearch() {
  // Watch query and search with debounce effect
  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  watch(query, (q) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => search(q), 150)
  })

  async function open() {
    isOpen.value = true
    await loadContent()
  }

  function close() {
    isOpen.value = false
    query.value = ''
    results.value = { projects: [], articles: [], projectArticles: [] }
  }

  return { isOpen, query, results, open, close, isLoaded }
}
```

**Step 4: Run test to verify it passes**

```bash
cd /var/www/labtime-web-id && pnpm vitest run tests/unit/composables/useGlobalSearch.spec.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add app/composables/useGlobalSearch.ts tests/unit/composables/useGlobalSearch.spec.ts
git commit -m "feat: add useGlobalSearch composable with Fuse.js indexing"
```

---

### Task 3: Create `SearchPalette.vue` component

**Files:**
- Create: `app/components/SearchPalette.vue`

**Step 1: Create the component**

Create `app/components/SearchPalette.vue`:

```vue
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50" @click.self="close">
        <!-- Backdrop with scanlines -->
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm search-scanlines"></div>

        <!-- Palette -->
        <div class="relative z-10 max-w-2xl mx-auto mt-[15vh] mx-4">
          <CornerFrame class="bg-background border-2 border-foreground">
            <div class="p-0">
              <!-- Search Input -->
              <div class="flex items-center gap-3 px-6 py-4 border-b-2 border-foreground">
                <span class="text-accent font-mono font-bold text-sm shrink-0">&gt;</span>
                <input
                  ref="inputRef"
                  v-model="query"
                  type="text"
                  placeholder="grep -i 'query' ~/content/*"
                  class="bg-transparent w-full font-mono text-sm outline-none placeholder:text-muted-foreground/50 text-foreground caret-accent"
                  @keydown.escape="close"
                  @keydown.down.prevent="moveSelection(1)"
                  @keydown.up.prevent="moveSelection(-1)"
                  @keydown.enter.prevent="navigateToSelected"
                />
                <kbd class="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 border border-foreground/30 text-muted-foreground shrink-0">ESC</kbd>
              </div>

              <!-- Results -->
              <div class="max-h-[50vh] overflow-y-auto" role="listbox">
                <!-- Empty state -->
                <div v-if="!query.trim()" class="p-6 text-center font-mono text-xs text-muted-foreground">
                  <div class="mb-2 opacity-60">[SEARCH_MODULE v1.0]</div>
                  <div>Type to search projects, articles, and logs...</div>
                </div>

                <!-- No results -->
                <div v-else-if="!hasResults" class="p-6 text-center font-mono text-xs text-muted-foreground">
                  <div class="text-accent mb-1">&gt; No matches found</div>
                  <div class="opacity-60">grep: pattern '{{ query }}' not found in any file</div>
                </div>

                <!-- Grouped results -->
                <template v-else>
                  <!-- Projects -->
                  <div v-if="results.projects.length">
                    <div class="px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-foreground/5 border-b border-foreground/10">
                      [SYSTEMS] — {{ results.projects.length }} match{{ results.projects.length > 1 ? 'es' : '' }}
                    </div>
                    <button
                      v-for="(item, i) in results.projects"
                      :key="item.path"
                      role="option"
                      :aria-selected="isSelected('project', i)"
                      class="w-full text-left px-6 py-3 font-mono text-sm flex flex-col gap-1 transition-colors border-b border-foreground/5"
                      :class="isSelected('project', i) ? 'bg-foreground text-background' : 'hover:bg-foreground/5'"
                      @click="navigateTo(item.path)"
                      @mouseenter="setSelection('project', i)"
                    >
                      <span class="font-bold uppercase tracking-tight">{{ item.title }}</span>
                      <span class="text-xs opacity-70 line-clamp-1" :class="isSelected('project', i) ? 'text-background/70' : 'text-muted-foreground'">{{ item.description }}</span>
                    </button>
                  </div>

                  <!-- Articles -->
                  <div v-if="results.articles.length">
                    <div class="px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-foreground/5 border-b border-foreground/10">
                      [LOGS] — {{ results.articles.length }} match{{ results.articles.length > 1 ? 'es' : '' }}
                    </div>
                    <button
                      v-for="(item, i) in results.articles"
                      :key="item.path"
                      role="option"
                      :aria-selected="isSelected('article', i)"
                      class="w-full text-left px-6 py-3 font-mono text-sm flex flex-col gap-1 transition-colors border-b border-foreground/5"
                      :class="isSelected('article', i) ? 'bg-foreground text-background' : 'hover:bg-foreground/5'"
                      @click="navigateTo(item.path)"
                      @mouseenter="setSelection('article', i)"
                    >
                      <span class="font-bold uppercase tracking-tight">{{ item.title }}</span>
                      <span class="text-xs opacity-70 line-clamp-1" :class="isSelected('article', i) ? 'text-background/70' : 'text-muted-foreground'">{{ item.description }}</span>
                    </button>
                  </div>

                  <!-- Project Articles (Sub-modules) -->
                  <div v-if="results.projectArticles.length">
                    <div class="px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-foreground/5 border-b border-foreground/10">
                      [SUB_MODULES] — {{ results.projectArticles.length }} match{{ results.projectArticles.length > 1 ? 'es' : '' }}
                    </div>
                    <button
                      v-for="(item, i) in results.projectArticles"
                      :key="item.path"
                      role="option"
                      :aria-selected="isSelected('projectArticle', i)"
                      class="w-full text-left px-6 py-3 font-mono text-sm flex flex-col gap-1 transition-colors border-b border-foreground/5"
                      :class="isSelected('projectArticle', i) ? 'bg-foreground text-background' : 'hover:bg-foreground/5'"
                      @click="navigateTo(item.path)"
                      @mouseenter="setSelection('projectArticle', i)"
                    >
                      <div class="flex items-center gap-2">
                        <span class="text-[10px] opacity-50 shrink-0" :class="isSelected('projectArticle', i) ? 'text-background/50' : ''">{{ item._parentProject }} /</span>
                        <span class="font-bold uppercase tracking-tight truncate">{{ item.title }}</span>
                      </div>
                      <span class="text-xs opacity-70 line-clamp-1" :class="isSelected('projectArticle', i) ? 'text-background/70' : 'text-muted-foreground'">{{ item.description }}</span>
                    </button>
                  </div>
                </template>
              </div>

              <!-- Footer -->
              <div class="px-6 py-2 border-t-2 border-foreground flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <div class="flex gap-4">
                  <span><kbd class="px-1 border border-foreground/30">↑↓</kbd> navigate</span>
                  <span><kbd class="px-1 border border-foreground/30">↵</kbd> open</span>
                  <span><kbd class="px-1 border border-foreground/30">esc</kbd> close</span>
                </div>
                <span class="text-accent animate-pulse">●</span>
              </div>
            </div>
          </CornerFrame>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const { isOpen, query, results, open, close } = useGlobalSearch()
const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)

// Focus input when opened
watch(isOpen, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
  }
})

// Keyboard selection state
const selectedType = ref<'project' | 'article' | 'projectArticle'>('project')
const selectedIndex = ref(0)

// Flatten results into ordered list for keyboard navigation
const flatList = computed(() => {
  const list: Array<{ type: string; index: number; path: string }> = []
  results.value.projects.forEach((_, i) => list.push({ type: 'project', index: i, path: results.value.projects[i].path }))
  results.value.articles.forEach((_, i) => list.push({ type: 'article', index: i, path: results.value.articles[i].path }))
  results.value.projectArticles.forEach((_, i) => list.push({ type: 'projectArticle', index: i, path: results.value.projectArticles[i].path }))
  return list
})

const flatIndex = computed(() =>
  flatList.value.findIndex(f => f.type === selectedType.value && f.index === selectedIndex.value)
)

const hasResults = computed(() =>
  results.value.projects.length > 0 ||
  results.value.articles.length > 0 ||
  results.value.projectArticles.length > 0
)

function isSelected(type: string, index: number) {
  return selectedType.value === type && selectedIndex.value === index
}

function setSelection(type: 'project' | 'article' | 'projectArticle', index: number) {
  selectedType.value = type
  selectedIndex.value = index
}

function moveSelection(direction: number) {
  const newFlat = flatIndex.value + direction
  if (newFlat < 0 || newFlat >= flatList.value.length) return
  const entry = flatList.value[newFlat]
  if (entry) {
    selectedType.value = entry.type as typeof selectedType.value
    selectedIndex.value = entry.index
  }
}

function navigateTo(path: string) {
  router.push(path)
  close()
}

function navigateToSelected() {
  const entry = flatList.value[flatIndex.value]
  if (entry) navigateTo(entry.path)
}

// Reset selection when results change
watch(results, () => {
  selectedType.value = 'project'
  selectedIndex.value = 0
  // If no projects, select first available type
  if (results.value.projects.length === 0) {
    if (results.value.articles.length > 0) selectedType.value = 'article'
    else if (results.value.projectArticles.length > 0) selectedType.value = 'projectArticle'
  }
})
</script>

<style scoped>
.search-scanlines::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.03) 50%
  );
  background-size: 100% 8px;
  pointer-events: none;
}
</style>
```

**Step 2: Verify it renders (manual check after Task 4)**

**Step 3: Commit**

```bash
git add app/components/SearchPalette.vue
git commit -m "feat: add SearchPalette command palette component"
```

---

### Task 4: Integrate into layout and rewire `Ctrl+K`

**Files:**
- Modify: `app/layouts/default.vue`

**Step 1: Add SearchPalette and keybinding**

In `app/layouts/default.vue`:

1. Add `<SearchPalette />` inside the template, after the `</div>` that wraps the main layout.
2. Change the `onKeyStroke` for `Ctrl+K` from toggling theme to opening search.
3. Add `Ctrl+Shift+T` as the new theme toggle shortcut.

Template change — add before closing `</div>` of root:
```vue
<SearchPalette />
```

Script change — replace the `onKeyStroke` block:
```typescript
const { open: openSearch } = useGlobalSearch()

onKeyStroke(['k', 'K'], (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    openSearch()
  }
})

onKeyStroke(['t', 'T'], (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
    e.preventDefault()
    themeToggleRef.value?.toggleTheme()
  }
})
```

**Step 2: Add search button to header nav**

Add a search button/icon in the `<nav>` section for mobile discoverability:
```vue
<button @click="openSearch" class="link-fill-accent hover:text-accent relative flex items-center gap-1" title="Search (Ctrl+K)">
  <span class="opacity-50 group-hover:opacity-100">[</span>
  <span>SEARCH</span>
  <span class="opacity-50 group-hover:opacity-100">]</span>
</button>
```

**Step 3: Commit**

```bash
git add app/layouts/default.vue
git commit -m "feat: integrate SearchPalette into layout, rewire Ctrl+K"
```

---

### Task 5: Add unit test for SearchPalette

**Files:**
- Create: `tests/unit/components/SearchPalette.spec.ts`

**Step 1: Write the component test**

```typescript
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchPalette from '~/components/SearchPalette.vue'

// Mock useGlobalSearch
vi.mock('~/composables/useGlobalSearch', () => ({
  useGlobalSearch: () => ({
    isOpen: ref(true),
    query: ref(''),
    results: ref({ projects: [], articles: [], projectArticles: [] }),
    open: vi.fn(),
    close: vi.fn(),
    isLoaded: ref(false),
  }),
}))

describe('SearchPalette', () => {
  it('renders search input when open', () => {
    const wrapper = mount(SearchPalette, {
      global: { stubs: { CornerFrame: true, Teleport: true } },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('shows empty state message when no query', () => {
    const wrapper = mount(SearchPalette, {
      global: { stubs: { CornerFrame: true, Teleport: true } },
    })
    expect(wrapper.text()).toContain('Type to search')
  })

  it('shows keyboard shortcut hints', () => {
    const wrapper = mount(SearchPalette, {
      global: { stubs: { CornerFrame: true, Teleport: true } },
    })
    expect(wrapper.text()).toContain('navigate')
    expect(wrapper.text()).toContain('open')
    expect(wrapper.text()).toContain('close')
  })
})
```

**Step 2: Run tests**

```bash
cd /var/www/labtime-web-id && pnpm vitest run tests/unit/components/SearchPalette.spec.ts
```

**Step 3: Commit**

```bash
git add tests/unit/components/SearchPalette.spec.ts
git commit -m "test: add SearchPalette unit tests"
```

---

### Task 6: Add E2E test for search flow

**Files:**
- Create: `tests/e2e/search.spec.ts`

**Step 1: Write the E2E test**

```typescript
import { expect, test } from '@playwright/test'

test.describe('Global Search', () => {
  test('opens search palette with Ctrl+K', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Control+k')
    await expect(page.locator('input[placeholder*="grep"]')).toBeVisible()
  })

  test('closes search palette with Escape', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Control+k')
    await expect(page.locator('input[placeholder*="grep"]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('input[placeholder*="grep"]')).not.toBeVisible()
  })

  test('shows results when typing', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Control+k')
    await page.locator('input[placeholder*="grep"]').fill('lms')
    // Wait for debounced results
    await page.waitForTimeout(300)
    await expect(page.locator('[role="option"]')).toHaveCount(1, { timeout: 5000 })
  })

  test('navigates to result on Enter', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Control+k')
    await page.locator('input[placeholder*="grep"]').fill('lms')
    await page.waitForTimeout(300)
    await expect(page.locator('[role="option"]').first()).toBeVisible({ timeout: 5000 })
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\//)
  })

  test('opens from header SEARCH button', async ({ page }) => {
    await page.goto('/')
    await page.locator('button:has-text("SEARCH")').click()
    await expect(page.locator('input[placeholder*="grep"]')).toBeVisible()
  })
})
```

**Step 2: Run E2E tests**

```bash
cd /var/www/labtime-web-id && pnpm test:e2e tests/e2e/search.spec.ts
```

**Step 3: Commit**

```bash
git add tests/e2e/search.spec.ts
git commit -m "test: add E2E tests for global search command palette"
```

---

### Task 7: Final verification and cleanup

**Step 1: Run all unit tests**

```bash
cd /var/www/labtime-web-id && pnpm vitest run
```

**Step 2: Run lint**

```bash
cd /var/www/labtime-web-id && pnpm lint
```

**Step 3: Fix any lint errors, then commit**

```bash
cd /var/www/labtime-web-id && pnpm lint:fix
git add -A && git commit -m "chore: lint fixes for global search"
```

**Step 4: Manual verification**

Start dev server: `cd /var/www/labtime-web-id && pnpm dev`

1. Open browser at `http://localhost:3000`
2. Press `Ctrl+K` — palette should open with terminal styling
3. Type "lms" — should see LMS Sertifikasi under `[SYSTEMS]`
4. Type "chat" — should see sub-article under `[SUB_MODULES]` with parent `LMS Sertifikasi /`
5. Arrow keys should navigate, Enter should open the result
6. Escape should close
7. Click SEARCH button in header — should open palette
8. `Ctrl+Shift+T` — should toggle theme (verify reassignment)
