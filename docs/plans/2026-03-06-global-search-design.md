# Global Search — Command Palette

A client-side fuzzy search palette triggered by `Ctrl+K` / `⌘K`, searching across all content types (projects, articles, project sub-articles) by title, description, and tags.

## Decisions

| Decision        | Choice                                         |
| --------------- | ---------------------------------------------- |
| Trigger         | Command palette modal (`Ctrl+K` / `⌘K`)       |
| Search fields   | Title + Description + Tags                     |
| Result grouping | Grouped by type, with parent project context   |
| Architecture    | Client-side fuzzy index (Fuse.js, ~5KB gzipped)|
| Scale limit     | Safe up to ~1,000 items; swap to server later  |

## UX & Interaction Flow

**Opening:**
- `Ctrl+K` (Win/Linux) / `⌘K` (Mac) opens the palette
- Search icon in header nav for mobile/discoverability
- Current `Ctrl+K` → theme toggle reassigned to `Ctrl+Shift+T`

**Inside the palette:**
1. Terminal-styled input with `> ` prompt prefix
2. Live results, debounced ~150ms
3. Results grouped: `[SYSTEMS]` (projects), `[LOGS]` (articles), `[SUB_MODULES]` (project articles)
4. Project articles show parent: `LMS Sertifikasi / Chat Architecture`
5. Arrow keys navigate, `Enter` opens, `Escape` closes
6. Empty state: terminal hint message

**On result click:**
- Navigate to existing content URL
- Close palette

## Architecture & Data Flow

```
Ctrl+K opens palette
  → Fetch all content metadata (once, cached via composable)
      queryCollection('projects').all()
      queryCollection('articles').all()
      queryCollection('projectArticles').all()
  → Build Fuse.js index
      keys: title (weight: 2), description (weight: 1), tags (weight: 1.5)
  → User types → debounced Fuse.search(query)
  → Group by type, inject parent project names for sub-articles
  → Render grouped results with keyboard navigation
```

## Component Structure

| Component             | Purpose                                                   |
| --------------------- | --------------------------------------------------------- |
| `SearchPalette.vue`   | Modal overlay, input, results list, keyboard handling     |
| `useGlobalSearch.ts`  | Composable: fetch, index, search, open/close state        |

Palette lives in `default.vue` layout (always available).

## Visual Design (CRT Terminal Aesthetic)

- **Backdrop**: semi-transparent dark overlay with scanline effect
- **Container**: `CornerFrame` with CRT border treatment
- **Input**: monospace, `> ` prefix, blinking cursor, accent text
- **Group headers**: `[SYSTEMS]`, `[LOGS]`, `[SUB_MODULES]` terminal-style
- **Result items**: monospace, hover = inverted colors (`crt-hover` pattern)
- **Footer**: `ESC close` / `↑↓ navigate` / `↵ open` shortcut hints
