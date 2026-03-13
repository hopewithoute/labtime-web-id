# Digital School V2 Highlight Strengthening Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Digital School V2 subsection in both resume pages so it ends with exactly two evidence-backed ATS-friendly achievement bullets grounded in the approved V2 spec.

**Architecture:** This is a content-only update inside two existing Vue page templates. The implementation should replace the current three-item V2 bullet list in each file with exactly two semantically aligned bullets covering soft proctoring/exam integrity and payment reconciliation plus integrated attendance operations, while leaving the surrounding V1/V2 structure, role framing, timeline, and tech stack untouched.

**Tech Stack:** Nuxt 3, Vue SFC templates, TypeScript, Tailwind CSS

---

## Chunk 1: Replace the Digital School V2 achievement bullets

### File map

- `app/pages/resume.vue` — visual resume page; update only the Digital School V2 bullet list inside the V2 sub-section
- `app/pages/resume-ats.vue` — ATS resume page; update only the Digital School V2 bullet list inside the V2 sub-section
- `docs/superpowers/specs/2026-03-13-digital-school-v2-highlight-strengthening-design.md` — approved wording direction, traceability, and wording guardrails

### Task 1: Apply the approved Digital School V2 bullet set

**Files:**
- Modify: `app/pages/resume.vue:257-270`
- Modify: `app/pages/resume-ats.vue:107-110`
- Reference: `docs/superpowers/specs/2026-03-13-digital-school-v2-highlight-strengthening-design.md:45-130`
- Test: no automated test file; validate with exact diff review and V2 block inspection because this is a focused resume copy change

- [ ] **Step 1: Confirm the approved constraints from the spec**

Implementation must satisfy all of these:

- Exactly 2 bullets for Digital School V2 in each file
- Each bullet must be a single sentence
- Bullets must align to these themes:
  1. soft proctoring / exam integrity / tokenized sessions / device-bound access / activity tracking / auditable session logs
  2. signed payment reconciliation / biometric and web attendance / geofencing / evidence-backed attendance records
- No unsupported claims about direct payment-gateway checkout, webcam proctoring, AI proctoring, or face-recognition proctoring
- V1/V2 structure, role framing, timeline, and V2 tech stack line must remain unchanged

- [ ] **Step 2: Confirm the current Digital School V2 bullet block in `app/pages/resume.vue`**

Current block at `app/pages/resume.vue:257-270`:

```vue
<ul class="space-y-2 text-sm text-muted-foreground font-medium ml-4">
  <li class="flex items-start gap-3">
    <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
    <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Automated Assessment Pipeline:</strong> Eliminated manual grading to near-zero with automated assessment pipeline.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
    <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Advanced Scheduling Solver:</strong> Architected multi-stage solver using Python (Google OR-Tools) for clash-free timetables.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
    <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Multi-Curriculum Support:</strong> Designed flexible JSON-backed data model for diverse academic standards.</span>
  </li>
</ul>
```

- [ ] **Step 3: Replace the Digital School V2 bullet block in `app/pages/resume.vue`**

Resulting block must contain exactly these two bullets:

```vue
<ul class="space-y-2 text-sm text-muted-foreground font-medium ml-4">
  <li class="flex items-start gap-3">
    <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
    <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Soft Proctoring &amp; Exam Integrity:</strong> Built soft-proctoring and exam integrity workflows with tokenized sessions, device-bound access, activity tracking, and auditable session logs for digital assessments.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-accent font-black mt-0.5 shrink-0 text-sm">></span>
    <span><strong class="text-foreground uppercase text-[11px] font-black tracking-widest">Payment Reconciliation &amp; Attendance Operations:</strong> Integrated signed payment reconciliation workflows with biometric and web attendance operations, including geofencing and evidence-backed attendance records.</span>
  </li>
</ul>
```

- [ ] **Step 4: Confirm the current Digital School V2 bullet block in `app/pages/resume-ats.vue`**

Current block at `app/pages/resume-ats.vue:107-110`:

```vue
<ul class="ats-print-list mt-1 list-disc space-y-1 pl-5 text-sm leading-7 text-foreground/80">
  <li><strong>Automated Assessment Pipeline:</strong> Eliminated manual grading to near-zero with automated assessment pipeline.</li>
  <li><strong>Advanced Scheduling Solver:</strong> Architected multi-stage solver using Python (Google OR-Tools) for clash-free timetables.</li>
  <li><strong>Multi-Curriculum Support:</strong> Designed flexible JSON-backed data model for diverse academic standards (Merdeka, 2013).</li>
</ul>
```

- [ ] **Step 5: Replace the Digital School V2 bullet block in `app/pages/resume-ats.vue`**

Resulting block must contain exactly these two bullets:

```vue
<ul class="ats-print-list mt-1 list-disc space-y-1 pl-5 text-sm leading-7 text-foreground/80">
  <li><strong>Soft Proctoring & Exam Integrity:</strong> Built soft-proctoring and exam integrity workflows with tokenized sessions, device-bound access, activity tracking, and auditable session logs for digital assessments.</li>
  <li><strong>Payment Reconciliation & Attendance Operations:</strong> Integrated signed payment reconciliation workflows with biometric and web attendance operations, including geofencing and evidence-backed attendance records.</li>
</ul>
```

- [ ] **Step 6: Review the targeted diff and repository status**

Run:

```bash
git diff -- app/pages/resume.vue app/pages/resume-ats.vue
git status --short
```

Expected:
- Diff shows only the Digital School V2 bullet replacement in `app/pages/resume.vue`
- Diff shows only the Digital School V2 bullet replacement in `app/pages/resume-ats.vue`
- No V1 content, role labels, timeline lines, or V2 tech stack lines are changed
- `git status --short` includes the intended modified resume files and may also show pre-existing unrelated workspace changes; do not stage anything outside the two resume files for this task

- [ ] **Step 7: Verify the Digital School V2 blocks contain exactly 2 approved bullets, banned wording is absent, and key surrounding lines are unchanged**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re
checks = {
    Path('app/pages/resume.vue'): {
        'start': '<span class="text-muted-foreground text-xs">Platform Rebuild (2024–2025)</span>',
        'end': '<!-- UPI -->',
        'required': [
            'Soft Proctoring &amp; Exam Integrity:',
            'Payment Reconciliation &amp; Attendance Operations:'
        ],
        'absent': [
            'Automated Assessment Pipeline:',
            'Advanced Scheduling Solver:',
            'Multi-Curriculum Support:'
        ],
        'anchors': [
            '<span class="text-muted-foreground text-xs">Team-based Development (2019–2024)</span>',
            '<p class="text-xs text-muted-foreground italic mb-3">Led full platform rewrite with complete architecture ownership — solo execution from design to deployment.</p>',
            '<span class="border border-foreground/20 bg-foreground/5 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground/70">Python (OR-Tools)</span>'
        ],
    },
    Path('app/pages/resume-ats.vue'): {
        'start': '<p class="text-xs font-semibold text-foreground mt-4">[V2] Platform Rebuild (2024–2025)</p>',
        'end': '<!-- UPI SIMSARPRAS -->',
        'required': [
            'Soft Proctoring & Exam Integrity:',
            'Payment Reconciliation & Attendance Operations:'
        ],
        'absent': [
            'Automated Assessment Pipeline:',
            'Advanced Scheduling Solver:',
            'Multi-Curriculum Support:'
        ],
        'anchors': [
            '<p class="text-xs font-semibold text-foreground mt-3">[V1] Team-based Development (2019–2024)</p>',
            '<p class="text-xs text-muted-foreground italic">Led full platform rewrite with complete architecture ownership — solo execution from design to deployment.</p>',
            '<p class="text-xs text-foreground/60 mt-1">Tech: Vue 3, Inertia.js, Laravel 12, PHP 8.4, Python (OR-Tools), MySQL, Redis</p>'
        ],
    },
}
banned_patterns = [
    r'payment[ -]?gateway checkout',
    r'ai proctoring',
    r'webcam proctoring',
    r'face[ -]?recognition proctoring'
]
for path, cfg in checks.items():
    content = path.read_text()
    start = content.index(cfg['start'])
    end = content.index(cfg['end'], start)
    block = content[start:end]
    lowered = block.lower()
    print(path)
    print(f'  li_count={block.count("<li")}')
    for needle in cfg['required']:
        print(f'  required:{needle} {block.count(needle)}')
    for needle in cfg['absent']:
        print(f'  removed:{needle} {block.count(needle)}')
    for anchor in cfg['anchors']:
        print(f'  anchor:{anchor[:60]}... {content.count(anchor)}')
    for pattern in banned_patterns:
        print(f'  banned:{pattern} {len(re.findall(pattern, lowered, flags=re.IGNORECASE))}')
    sentence_endings = re.findall(r'[.!?]</span>|[.!?]</li>', block)
    print(f'  sentence_endings={len(sentence_endings)}')
PY
```

Expected:
- Each file reports `li_count=2` inside the Digital School V2 block
- Each file reports both required bullet headings exactly once inside the V2 block
- Each removed legacy heading count is `0`
- Each anchor line count is `1`, confirming the nearby V1 label, V2 ownership line, and V2 tech/context lines remain present
- Each banned pattern count is `0`, including case or punctuation variants such as `AI proctoring` / `ai proctoring` and `payment-gateway checkout`
- Sentence endings count matches the two bullet sentences in each file

- [ ] **Step 8: Commit the focused change**

Run:

```bash
git add app/pages/resume.vue app/pages/resume-ats.vue
git commit -m "feat(resume): strengthen Digital School v2 highlights"
```

Expected:
- Commit succeeds with only the two intended files staged

---

## Notes for implementers

- Do not append new V2 bullets; replace the current three-bullet V2 set so the final count is exactly two.
- Keep the visual and ATS bullets semantically aligned, even though the visual file uses escaped `&amp;` in HTML.
- Do not introduce unsupported claims about direct checkout flows or AI/webcam/face-recognition proctoring.
- Do not edit the V1 block, the V2 ownership sentence, or the V2 tech stack line.
- If line numbers shift, match the V2 bullet list by the surrounding `[V2] Platform Rebuild (2024–2025)` section rather than by line numbers alone.
