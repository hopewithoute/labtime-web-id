# Rail System Description Refinement Design

**Date:** 2026-03-13
**Status:** Approved for Planning
**Scope:** Refine the Rail System company-level description in `resume.vue` and `resume-ats.vue` so it clearly communicates both internal product development and external client delivery, without changing the approved resume structure or broader content.

---

## Background

The current Rail System company description was revised from consultancy framing to product-company framing, but it now over-indexes on products and no longer clearly communicates external client delivery.

The user clarified that Rail System covers both:
- internal products (for example: Digital School, limawaktu.id, SIBER, LMS)
- external client delivery / consulting engagements

The resume already has the right overall structure, title, and project breakdown. The remaining gap is the company-level description under the Rail System header.

---

## Goals

- Make the Rail System description explicitly cover both internal products and external client work
- Keep the wording ATS-friendly and recruiter-readable
- Preserve the existing resume narrative around architecture, full-stack implementation, infrastructure, and long-term ownership
- Apply the same wording to both visual and ATS resume pages for consistency

## Non-Goals

- Do not change project bullets
- Do not change role labels or titles
- Do not change section structure, styling, or layout
- Do not rewrite project ordering or timelines
- Do not broaden this work into other resume content updates

---

## Design Decision

### Recommended wording

> Software company building digital products while also delivering external client platforms across education, government, and media sectors. Responsible for architecture, full-stack implementation, infrastructure, and long-term operational ownership across both internal products and client engagements.

### Why this wording

- **Balanced framing:** clearly communicates both business modes without implying one invalidates the other
- **ATS-safe terminology:** uses standard resume language such as "digital products," "client platforms," "architecture," and "full-stack implementation"
- **Consistent with approved positioning:** fits the existing "Senior Software Engineer" and full product ownership narrative
- **Minimal change surface:** replaces only the company description paragraph and nothing else

---

## Files to Modify

| File | Change |
|------|--------|
| `app/pages/resume.vue` | Replace the Rail System company description paragraph with the approved wording |
| `app/pages/resume-ats.vue` | Replace the Rail System company description paragraph with the same approved wording |

---

## Acceptance Criteria

1. Both resume pages use identical Rail System company description text
2. The wording explicitly mentions both product building and external client delivery
3. No other content changes are introduced
4. Existing role/title/section structure remains unchanged

---

## Notes

This is a focused follow-up refinement to previously approved resume work. The intent is precision, not expansion.
