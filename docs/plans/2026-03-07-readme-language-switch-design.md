# README Language Switch Design

**Goal:** Rework the repository README so English is the default entry, Indonesian remains available as a second section, and the tech stack is presented with icons in a non-bulleted format.

## Context

The current `README.md` is already bilingual, but it starts with Indonesian first and the tech stack still uses regular bullet lists. The requested change is presentation-focused: make English the main entry point, add simple in-document navigation between languages, and make the tech stack feel more visual without turning the README into a badge wall.

## Recommended approach

Use plain Markdown with minimal HTML anchors only where needed for reliable section switching on GitHub.

### Structure

- Keep `# LabTime` as the top-level heading.
- Add a language switch row directly below it.
- Put the English section first.
- Move the Indonesian section below it.
- Add a return link at the top of the Indonesian section.

Target shape:

```md
# LabTime

English · [Bahasa Indonesia](#id)

## EN
...

## ID

[Back to English](#en)
...
```

To make the anchors stable, the implementation can either rely on GitHub heading anchors (`#en`, `#id`) or add explicit HTML anchors if needed. Prefer the simplest version that renders cleanly in GitHub.

### Tech stack presentation

Replace the current bulleted tech stack lists with a compact icon-led block that is not a Markdown bullet list.

Recommended format:

```md
⚡ Nuxt 4
🟢 Vue 3
📘 TypeScript
🎨 Tailwind CSS
```

Use one icon per stack item. Keep the content identical between English and Indonesian sections. The icons should improve scanning, not act like decorative clutter.

## Alternatives considered

### 1. Markdown-first with inline icons — recommended
- Pros: simple, readable, GitHub-friendly, low maintenance
- Cons: less visually rich than badges or tables

### 2. HTML table layout
- Pros: tighter alignment and more control
- Cons: heavier markup, less pleasant to edit, easier to over-design

### 3. Badge-heavy stack section
- Pros: visually obvious
- Cons: too noisy for this repo, feels more like marketing than a personal site README

## Decision

Use **Markdown-first language switching plus icon-led non-bulleted stack lines**.

This keeps the README personal and readable while matching the requested presentation change with minimal complexity.

## Implementation notes

- Modify only `README.md`.
- Preserve the existing bilingual copy unless wording needs a small adjustment to support the new structure.
- Do not reintroduce setup, deploy, or command documentation.
- Keep the stack entries consistent across both languages.

## Verification

Verification is visual and structural:

- README starts in English
- there is a visible link to Indonesian near the top
- Indonesian section has a visible link back to English
- tech stack sections are no longer Markdown bullet lists
- icon usage is consistent and readable in both languages
