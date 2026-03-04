# Design: Integrating "Related Writings" (Sub-Articles) into the Main Article List

## Problem Statement
The user writes "Related Writings" (sub-articles) that are currently stored alongside their parent projects (e.g., `content/projects/lms-sertifikasi/optimizing-websocket-fanout.md`). Currently, these sub-articles only display on their parent project pages. The goal is to surface these technical writings on the global "Recent Logs" (landing page) and the main "Articles" list (`/articles`), mixing them seamlessly with standard articles stored in `content/articles/`.

## Selected Approach: Multi-Directory Querying
Instead of forcing a folder restructuring (which breaks the logical grouping of project files), we will modify the Nuxt Content queries to fetch from both the `articles` directory and the `projects` directory simultaneously while filtering out the "index" project files.

## Technical Changes

### 1. `app/pages/index.vue` (Recent Logs)
- **Current implementation:**  
  `<ContentList path="/articles" :query="{ limit: 4, sort: [{ date: -1 }] }">`
- **Proposed implementation:**  
  Remove the `path` prop (which restricts to a single directory) and move everything into a comprehensive `:query` object.
  - Target condition: `_dir: { $in: ['articles', 'projects/lms-sertifikasi'] }` OR use `$or` operator: `[{ _dir: 'articles' }, { _path: { $contains: '/projects/' } }]`
  - Explicit exclusion: Filter out root project index files (e.g., `_file: { $not: { $contains: 'index.md' } }` or similar logic based on the `_extension: 'md'` structure).

### 2. `app/pages/articles/index.vue` (Main List)
- **Current implementation:**  
  `<ContentList path="/articles">`
- **Proposed implementation:**  
  Apply the exact same comprehensive query object structure as above to fetch and combine all articles globally. Sort by `date: -1`.

### 3. Display Data Fallbacks
- Sub-articles in `projects/` currently use `category` frontmatter instead of `tags`.  
- Standard articles use `tags` (an array).
- To maintain UI consistency, the rendering template inside `<ContentList>` will use a fallback logic for the badge:
  `{{ article.tags?.[0] || article.category || 'Note' }}`

## Validation Plan
1. Ensure the landing page "Recent Logs" correctly lists `optimizing-websocket-fanout.md` (or other sub-articles) ordered by date.
2. Ensure `/articles` lists the combined set of articles without breaking pagination or display.
3. Ensure root project files (like the LMS Sertifikasi main project page) do **not** accidentally appear in the article lists.
