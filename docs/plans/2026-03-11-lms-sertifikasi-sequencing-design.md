# LMS Sertifikasi sequencing design

**Date**: 2026-03-11
**Status**: Approved

## Overview
This design defines how the `LMS Sertifikasi` project writeup series should be ordered and surfaced on the project detail page.

The goal is to improve narrative flow for a system-first reader without changing the existing descriptive slugs. The current implementation already orders project articles by `date DESC`, so the simplest and safest approach is to use article dates as the narrative ordering mechanism for this series.

## Audience
Primary audience:
- engineering readers reviewing architecture decisions
- technical hiring managers scanning system design depth
- recruiters who need a readable progression from platform foundation to specialized subsystems

## Current state
Project articles are loaded in `app/pages/projects/[slug]/index.vue` and sorted using:

- `queryCollection('projectArticles')`
- filtered to `/projects/${slug}/%`
- ordered by `date DESC`

Because ordering is driven by date, slug changes are not required to improve sequencing.

## Decision
Keep the existing descriptive slugs.

Use article `date` values to establish a system-first reading order for the `lms-sertifikasi` series.

## Rationale
This approach fits the current implementation and avoids unnecessary URL churn.

It also preserves the strongest part of the current content structure:
- slugs remain specific and readable
- internal paths stay stable
- the narrative can be improved without changing routing behavior

A dedicated ordering field such as `series_order` would be cleaner if this pattern becomes common across many project series, but it is not necessary for the current scope.

## Recommended article order
The series should progress from core transport and synchronization primitives into domain rules and finally media delivery.

Recommended order:

1. `phoenix-react-websocket-bridge`
2. `surgical-realtime-sync`
3. `chat-architecture-scaling`
4. `unified-learning-telemetry`
5. `resilient-assessment-engine`
6. `immutable-certification-engine`
7. `dynamic-pdf-engine`
8. `media-pipeline`
9. `media-gateway-architecture`

## Narrative logic
### 1. Realtime foundation
Start with the Phoenix WebSocket layer and the backend-driven sync model. These two pieces explain how the product stays responsive without pushing business truth into the browser.

### 2. Realtime application example
Move next into chat. It gives a concrete example of how the realtime foundation is used under load.

### 3. Backend truth and domain control
After realtime, shift into telemetry, assessment control, and versioned certification workflows. This establishes how progress, integrity, and lifecycle rules are enforced.

### 4. Output and delivery systems
Finish with certificate PDF generation and the media stack. These are important subsystems, but they make more sense once the reader already understands the platform core.

## Implementation impact
No slug changes.

Expected changes:
- update `date` values in `content/projects/lms-sertifikasi/*.md`
- verify the resulting order on `/projects/lms-sertifikasi`
- optionally adjust cross-links or section wording later if the new order reveals weak transitions

## Alternatives considered
### Add `series_order`
Pros:
- keeps chronological dates separate from narrative order
- explicit metadata for ordered series

Cons:
- requires query and content model changes
- larger scope than needed for this adjustment

### Rename slugs with numeric prefixes
Pros:
- order becomes visible in URLs and filenames

Cons:
- worsens URL readability
- introduces routing churn without improving the reading experience enough to justify it

## Final recommendation
Keep descriptive slugs and reorder the series through `date` values only.

This gives the project a clearer system-first reading path with minimal implementation cost and no URL disruption.
