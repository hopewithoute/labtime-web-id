# Combining Articles and Project Sub-Articles Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Modify the Nuxt Content queries on the landing page and the `articles` page to include both standard articles and project-related sub-articles (excluding the main project index files).

**Architecture:** We will replace the static `path="/articles"` prop in `<ContentList>` with a dynamic `:query="customQuery"` object that uses the Nuxt Content `$or` operator to query multiple directories. We will also add a fallback to the badge logic to support both `tags` and `category` frontmatter properties.

**Tech Stack:** Vue 3, Nuxt 3, Nuxt Content v2

---

### Task 1: Update Landing Page (Recent Logs)

**Files:**
- Modify: `app/pages/index.vue`

**Step 1: Update the ContentList query and badge rendering**

Modify `app/pages/index.vue` to fetch from both directories and properly format the metadata badge.

```vue
<!-- Replace line ~139-142 -->
        <ContentList
          v-slot="{ list }"
          :query="{
            where: [{ $or: [{ _dir: 'articles' }, { _path: { $contains: '/projects/' } }] }, { _file: { $not: { $contains: 'index.md' } } }],
            limit: 4,
            sort: [{ date: -1 }]
          }"
        >

<!-- Replace line ~158 to handle combined tags/category -->
                <span class="truncate max-w-30 hidden sm:inline-block">[{{ article.tags?.[0] || article.category || 'Note' }}]</span>
```

### Task 2: Update Articles Page (`/articles`)

**Files:**
- Modify: `app/pages/articles/index.vue`

**Step 1: Update the ContentList query and badge rendering**

Modify `app/pages/articles/index.vue` to fetch from both directories globally.

```vue
<!-- Replace line ~10-13 -->
    <ContentList
      v-slot="{ list }"
      :query="{
        where: [{ $or: [{ _dir: 'articles' }, { _path: { $contains: '/projects/' } }] }, { _file: { $not: { $contains: 'index.md' } } }],
        sort: [{ date: -1 }]
      }"
    >

<!-- Replace line ~22-24 to handle combined tags/category -->
            <Badge variant="secondary" class="font-mono uppercase rounded-none">
              {{ article.tags?.[0] || article.category || 'Note' }}
            </Badge>
```

### Task 3: Verification

**Step 1: Verify Landing Page SSR**
Run: `curl -s http://localhost:3001/ | grep -i 'optimizing-websocket'`
Expected: Output showing the article title indicating it loaded successfully in the Recent Logs section.

**Step 2: Verify Articles Page SSR**
Run: `curl -s http://localhost:3001/articles | grep -i 'optimizing-websocket'`
Expected: Output showing the article title indicating it loaded successfully on the main articles page.
