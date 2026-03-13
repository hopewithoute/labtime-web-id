# DISC V1 Highlight Strengthening Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Digital School V1 subsection in both resume pages so it contains exactly two evidence-backed ATS-friendly achievement bullets grounded in the approved DISC v1 spec.

**Architecture:** This is a content-only update inside two existing Vue page templates. The implementation should replace the current single V1 bullet in each file with exactly two semantically aligned bullets that follow the approved traceability table, preserve the V1/V2 structure, and avoid unsupported scale claims.

**Tech Stack:** Nuxt 3, Vue SFC templates, TypeScript, Tailwind CSS

---

## Chunk 1: Replace the DISC V1 achievement bullets

### File map

- `app/pages/resume.vue` — visual resume page; update only the Digital School V1 bullet list in the V1 sub-section
- `app/pages/resume-ats.vue` — ATS resume page; update only the Digital School V1 bullet list in the V1 sub-section
- `docs/superpowers/specs/2026-03-13-disc-v1-highlight-strengthening-design.md` — approved wording direction, traceability, and constraints

### Task 1: Apply the approved DISC V1 bullet set

**Files:**
- Modify: `app/pages/resume.vue:230-235`
- Modify: `app/pages/resume-ats.vue:98-100`
- Reference: `docs/superpowers/specs/2026-03-13-disc-v1-highlight-strengthening-design.md:53-118`
- Test: no automated test file; validate by exact diff review and bullet-count inspection because this is a copy-only resume content change

- [ ] **Step 1: Confirm the approved constraints from the spec**

Implementation must satisfy all of these:

- Exactly 2 bullets for DISC V1 in each file
- Each bullet must be a single sentence
- Bullets must align to these themes:
  1. backend caching / invalidation / Redis / controller-level response caching
  2. exam-processing reliability / session validation / batch answer handling / async jobs
- No new unsupported numeric or scale claims
- V1/V2 structure, role framing, timeline, and team-context paragraph must remain unchanged

- [ ] **Step 2: Confirm the current DISC V1 bullet block in `app/pages/resume.vue`**

Current block at `app/pages/resume.vue:230-235`:

```vue
<ul class="space-y-2 text-sm text-muted-foreground font-medium ml-4">
  <li class="flex items-start gap-3">
    <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
    <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">High-Scale Examination Engine:</strong> Engineered testing engine handling 3,000+ concurrent sessions on low-cost infrastructure.</span>
  </li>
</ul>
```

- [ ] **Step 3: Replace the DISC V1 bullet block in `app/pages/resume.vue`**

Resulting block must contain exactly these two bullets:

```vue
<ul class="space-y-2 text-sm text-muted-foreground font-medium ml-4">
  <li class="flex items-start gap-3">
    <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
    <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Cache Architecture &amp; Invalidation:</strong> Architected backend caching and invalidation patterns using Redis and controller-level response caching to reduce repeated database load across academic workflows.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
    <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Exam Processing Reliability:</strong> Engineered resilient exam-processing flows with strict session validation, batch answer handling, and async background jobs to support reliable assessment operations.</span>
  </li>
</ul>
```

- [ ] **Step 4: Confirm the current DISC V1 bullet block in `app/pages/resume-ats.vue`**

Current block at `app/pages/resume-ats.vue:98-100`:

```vue
<ul class="ats-print-list mt-1 list-disc space-y-1 pl-5 text-sm leading-7 text-foreground/80">
  <li><strong>High-Scale Examination Engine:</strong> Engineered testing engine handling 3,000+ concurrent sessions on low-cost infrastructure.</li>
</ul>
```

- [ ] **Step 5: Replace the DISC V1 bullet block in `app/pages/resume-ats.vue`**

Resulting block must contain exactly these two bullets:

```vue
<ul class="ats-print-list mt-1 list-disc space-y-1 pl-5 text-sm leading-7 text-foreground/80">
  <li><strong>Cache Architecture & Invalidation:</strong> Architected backend caching and invalidation patterns using Redis and controller-level response caching to reduce repeated database load across academic workflows.</li>
  <li><strong>Exam Processing Reliability:</strong> Engineered resilient exam-processing flows with strict session validation, batch answer handling, and async background jobs to support reliable assessment operations.</li>
</ul>
```

- [ ] **Step 6: Review the targeted diff and repository status**

Run:

```bash
git diff -- app/pages/resume.vue app/pages/resume-ats.vue
git status --short
```

Expected:
- Diff shows only the DISC V1 bullet replacement in `app/pages/resume.vue`
- Diff shows only the DISC V1 bullet replacement in `app/pages/resume-ats.vue`
- No V2 content, role labels, team-context lines, or timeline lines are changed
- `git status --short` shows only the two intended modified resume files for this task

- [ ] **Step 7: Verify the DISC V1 blocks contain exactly 2 approved bullets and no banned scale wording**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re
checks = {
    Path('app/pages/resume.vue'): {
        'start': '<span class="text-muted-foreground text-xs">Team-based Development (2019–2024)</span>',
        'end': '<!-- v2 Sub-section -->',
        'needles': [
            'Cache Architecture &amp; Invalidation:',
            'Exam Processing Reliability:'
        ],
    },
    Path('app/pages/resume-ats.vue'): {
        'start': '<p class="text-xs font-semibold text-foreground mt-3">[V1] Team-based Development (2019–2024)</p>',
        'end': '<!-- v2 -->',
        'needles': [
            'Cache Architecture & Invalidation:',
            'Exam Processing Reliability:'
        ],
    },
}
banned = ['3,000+', 'high-concurrency', 'massive']
for path, cfg in checks.items():
    content = path.read_text()
    start = content.index(cfg['start'])
    end = content.index(cfg['end'], start)
    block = content[start:end]
    li_count = block.count('<li')
    print(path)
    print(f'  li_count={li_count}')
    for needle in cfg['needles']:
        print(f'  {needle} {block.count(needle)}')
    for term in banned:
        print(f'  banned:{term} {block.count(term)}')
    sentence_endings = re.findall(r'[.!?]</span>|[.!?]</li>', block)
    print(f'  sentence_endings={len(sentence_endings)}')
PY
```

Expected:
- Each file reports `li_count=2` inside the DISC V1 block
- Each file reports both required bullet headings exactly once inside the DISC V1 block
- Each banned term count is `0`
- Sentence endings count matches the two bullet sentences in each file

- [ ] **Step 8: Commit the focused change**

Run:

```bash
git add app/pages/resume.vue app/pages/resume-ats.vue
git commit -m "feat(resume): strengthen DISC v1 backend highlights"
```

Expected:
- Commit succeeds with only the two intended files staged

---

## Notes for implementers

- Do not restore or reintroduce older wording about "High-Scale Examination Engine" in DISC V1 if it conflicts with the exactly-2-bullet requirement.
- Keep visual and ATS bullets semantically aligned, even though the visual file uses escaped `&amp;` in HTML.
- Do not edit the V1 team-context sentence, the V1 tech stack line, or any V2 content.
- If the line numbers shift, match the V1 bullet list by the surrounding `[V1] Team-based Development (2019–2024)` section rather than by line numbers alone.
