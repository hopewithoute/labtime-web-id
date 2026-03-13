# Rail System Description Refinement Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Rail System company description in both resume pages so it explicitly covers internal product development and external client delivery, with no other content changes.

**Architecture:** This is a targeted copy-only change in two existing Nuxt page components. The implementation should replace the current Rail System header paragraph with identical approved wording in both files, then verify via diff that only those paragraphs changed.

**Tech Stack:** Nuxt 3, Vue SFC templates, TypeScript, Tailwind CSS

---

## Chunk 1: Replace the shared Rail System description

### File map

- `app/pages/resume.vue` — visual resume page; update the Rail System company description paragraph under the company header
- `app/pages/resume-ats.vue` — ATS resume page; update the matching Rail System company description paragraph under the company header
- `docs/superpowers/specs/2026-03-13-rail-system-description-refinement-design.md` — approved wording source of truth

### Task 1: Apply the approved description to both resume pages

**Files:**
- Modify: `app/pages/resume.vue:154-156`
- Modify: `app/pages/resume-ats.vue:67-69`
- Reference: `docs/superpowers/specs/2026-03-13-rail-system-description-refinement-design.md:40-49`
- Test: no automated test file; validate with exact diff review because this is a copy-only change with no behavior changes

- [ ] **Step 1: Confirm the approved replacement text from the spec**

Use this exact text from the spec:

```text
Software company building digital products while also delivering external client platforms across education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership across both internal products and client engagements.
```

- [ ] **Step 2: Confirm the current text in `app/pages/resume.vue`**

Current block at `app/pages/resume.vue:154-156`:

```vue
<p class="text-sm md:text-base text-muted-foreground mt-4 max-w-3xl">
  Software company building digital products and platforms for education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership across multiple product lines.
</p>
```

- [ ] **Step 3: Replace the paragraph content in `app/pages/resume.vue`**

Resulting block must be:

```vue
<p class="text-sm md:text-base text-muted-foreground mt-4 max-w-3xl">
  Software company building digital products while also delivering external client platforms across education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership across both internal products and client engagements.
</p>
```

- [ ] **Step 4: Confirm the current text in `app/pages/resume-ats.vue`**

Current block at `app/pages/resume-ats.vue:67-69`:

```vue
<p class="mt-2 text-sm leading-7 text-foreground/80">
  Software company building digital products and platforms for education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership across multiple product lines.
</p>
```

- [ ] **Step 5: Replace the paragraph content in `app/pages/resume-ats.vue`**

Resulting block must be:

```vue
<p class="mt-2 text-sm leading-7 text-foreground/80">
  Software company building digital products while also delivering external client platforms across education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership across both internal products and client engagements.
</p>
```

- [ ] **Step 6: Review the diff for the two target files only**

Run:

```bash
git diff -- app/pages/resume.vue app/pages/resume-ats.vue
```

Expected:
- Diff shows the paragraph replacement hunk in `app/pages/resume.vue`
- Diff shows the paragraph replacement hunk in `app/pages/resume-ats.vue`
- No unintended lines inside those hunks are changed
- If either file already has unrelated pending edits, ignore those unrelated hunks and verify only the Rail System paragraph replacement

- [ ] **Step 7: Verify the approved text appears identically in both files**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
text = "Software company building digital products while also delivering external client platforms across education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership across both internal products and client engagements."
paths = [
    Path("app/pages/resume.vue"),
    Path("app/pages/resume-ats.vue"),
]
for path in paths:
    content = path.read_text()
    count = content.count(text)
    print(f"{path}: {count}")
PY
```

Expected:
- `app/pages/resume.vue: 1`
- `app/pages/resume-ats.vue: 1`
- This confirms the same approved description text exists exactly once in each target file

- [ ] **Step 8: Commit the focused change**

Run:

```bash
git add app/pages/resume.vue app/pages/resume-ats.vue
git commit -m "fix(resume): clarify Rail System product and client delivery scope"
```

Expected:
- Commit succeeds with only the two intended files staged

---

## Notes for implementers

- Do not modify any project bullets, scope tags, headings, dates, or tech stacks.
- Do not reword the approved sentence.
- Do not make formatting or style cleanups while touching the files.
- If the paragraph has shifted line numbers, match by the full current sentence under the Rail System header rather than by line number alone.
