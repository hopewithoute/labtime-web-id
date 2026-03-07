# ATS-friendly resume design

## Goal

Add an ATS-friendly alternate version of the existing `/resume` page, expose it with a clear access button above the current export button, and ensure the ATS version is print-friendly.

## Recommended approach

Use a separate route at `/resume/ats`.

This keeps the current cyber/terminal resume intact as the portfolio-facing version while giving recruiters and ATS systems a cleaner version with a simpler DOM, clearer semantic structure, and dedicated print behavior.

## Why this approach

- Keeps the current `/resume` page visually distinctive without diluting its aesthetic.
- Reduces the chance that decorative UI or CRT-style treatments interfere with ATS parsing.
- Makes print behavior easier to control because the ATS page can have its own print-focused structure and CSS.
- Gives users a clear, direct URL they can share with recruiters.

## User-facing behavior

### Existing resume page

The existing `/resume` page remains the visual, cyber-styled version.

A new button is added in the left sidebar above the current `export_pdf.sh` button. The recommended label is `view_ats_resume` so it stays aligned with the current interface language while still being understandable.

### ATS resume page

Create a new route at `/resume/ats`.

This page should:
- use a single-column layout
- remove decorative framing, CRT overlays, sticky panels, and hover-dependent presentation
- keep a clean content hierarchy with clear section headings
- remain easy to read on screen and when printed

## Content structure for `/resume/ats`

### Header

The top of the page should contain:
- Anggi Wibiyanto
- primary role line such as `Senior Software Engineer` with optional secondary framing like `Senior System Builder`
- location
- email
- website
- GitHub

The content should favor plain text and real links. Avoid fragmented visual layout that could make parsing harder.

### Professional summary

Use the current summary content in a tighter ATS-friendly paragraph form.

### Technical skills

Present skills in clearly labeled groups, for example:
- Architecture
- Frontend
- Backend & Performance
- Database & Tools
- Infrastructure & DevOps

This should be text-first, not badge-heavy.

### Professional experience

For each entry:
- role
- organization or project name
- date range
- 2 to 4 bullets with direct impact language

Keep the content aligned with the current curated resume copy, but structured more traditionally for parsing and print.

### Education

Present education in a compact standard format.

## Print-friendly requirements

The `/resume/ats` page should have dedicated print behavior.

### Print goals

- clean black-and-white output
- no decorative overlays or interactive-only elements
- no sticky layout artifacts
- sections should break naturally across pages
- links should remain readable when printed

### Print behavior

At print time:
- collapse to a simple document layout
- remove unnecessary borders, effects, and background-heavy treatments
- keep consistent spacing between sections
- avoid page breaks inside small grouped blocks where possible

## Files likely affected

- `app/pages/resume.vue`
  - add a new ATS access button above the export button
- `app/pages/resume/ats.vue` or equivalent route file
  - create the ATS-friendly version
- shared styling utilities only if necessary
  - but avoid introducing abstractions unless they clearly reduce duplication

## Implementation notes

- Prefer copying only the content needed into the ATS route rather than trying to make one component serve both radically different layouts.
- Keep markup semantic with headings, paragraphs, lists, and clearly grouped sections.
- Ensure metadata for the ATS page is recruiter-friendly and specific.
- Keep the page robust even if printed directly from the browser without extra setup.

## Validation

After implementation, verify:
- the new ATS button appears above the export button on `/resume`
- the new route loads correctly
- the ATS layout reads clearly on desktop and mobile
- browser print preview for `/resume/ats` is clean and complete
- the print version does not show cyber-only decorations
