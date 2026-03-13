# Digital School V2 Highlight Strengthening Design

**Date:** 2026-03-13
**Status:** Approved for Planning
**Scope:** Strengthen the Digital School V2 resume highlights in `resume.vue` and `resume-ats.vue` using evidence from `/var/www/digital-school`, focusing on ATS-friendly product and backend achievements around soft proctoring, payment reconciliation, and integrated attendance.

---

## Background

The current Digital School V2 resume section already covers assessment automation, scheduling, and multi-curriculum support, but it still undersells several important platform capabilities visible in the V2 codebase.

A review of `/var/www/digital-school` found strong evidence for:
- soft-proctoring and exam integrity workflows
- payment reconciliation through signed Moota webhook processing
- integrated attendance operations spanning fingerprint ingestion, web attendance, geofencing, and evidence capture
- attendance analytics and operational processing

These patterns support stronger V2 bullets that better reflect the breadth of the school platform.

---

## Goals

- Make the Digital School V2 subsection end with exactly 2 achievement bullets total in each resume file
- Base wording on verifiable evidence from `/var/www/digital-school`
- Emphasize product breadth, operational workflows, and backend/system integration
- Keep wording concise and recruiter-readable
- Preserve the existing V1/V2 structure and role framing

## Non-Goals

- Do not introduce unsupported claims about direct payment-gateway checkout flows
- Do not introduce unsupported claims about webcam, face-recognition, or AI proctoring
- Do not rewrite the overall Digital School section structure
- Do not change the V2 ownership narrative, timeline, or role framing
- Do not broaden this into a general rewrite of the Digital School section

---

## Design Decision

### Recommended emphasis

Use two complementary bullet themes for Digital School V2:

1. **Soft proctoring and exam integrity**
2. **Payment reconciliation and integrated attendance operations**

This creates a stronger product-platform narrative than only emphasizing scheduling and grading, while staying grounded in the V2 codebase.

### Candidate wording direction

**Bullet A — Soft proctoring / exam integrity**
> Built soft-proctoring and exam integrity workflows with tokenized sessions, device-bound access, activity tracking, and auditable session logs for digital assessments.

**Bullet B — Payment + attendance operations**
> Integrated signed payment reconciliation workflows with biometric and web attendance operations, including geofencing and evidence-backed attendance records.

### Precision note

In this spec, **soft proctoring** means non-AI exam integrity controls such as tokenized sessions, device-bound access, activity tracking, and auditable session logs. It does **not** mean webcam, face-recognition, or AI proctoring.

### Traceability

| Bullet | Claim fragment | Evidence |
|--------|----------------|----------|
| A | "soft-proctoring and exam integrity workflows" | `app/Actions/UjianSessionStartAction.php`, `app/Actions/UjianSessionTrackAction.php`, `routes/api/ujian.php` |
| A | "tokenized sessions" | `app/Actions/UjianSessionStartAction.php` |
| A | "device-bound access" | `app/Actions/UjianSessionStartAction.php` |
| A | "activity tracking" | `resources/js/Pages/UjianSiswa/PengerjaanUjian.vue`, `app/Actions/UjianSessionTrackAction.php` |
| A | "auditable session logs" | `database/migrations/2024_01_18_070015_create_log_sesi_ujian_table.php`, `resources/js/Pages/Ujian/Session.vue` |
| B | "payment reconciliation" | `app/Services/MootaService.php`, `app/Actions/PembayaranVerifyAction.php` |
| B | "signed webhook processing" | `app/Http/Controllers/MootaController.php`, `app/Services/MootaService.php`, `routes/web/moota.php` |
| B | "biometric and web attendance flows" | `routes/api/iclock.php`, `app/Http/Controllers/Api/IclockController.php`, `app/Actions/AbsensiHarianWebCreateAction.php` |
| B | "geofencing" | `app/Supports/AbsensiHarianHelper.php` |
| B | "evidence-backed attendance records" | `app/Data/AbsensiHarianWebData.php`, `app/Actions/AbsensiHarianWebCreateAction.php`, `app/Jobs/ProsesAbsensiFingerprintJob.php` |

### ATS and readability guardrails

- Keep exactly 2 bullets for Digital School V2
- Keep each bullet to a single sentence
- Prefer concrete product/backend keywords over stacked jargon
- Do not use unsupported terms such as "payment gateway checkout," "AI proctoring," "webcam proctoring," or "face-recognition proctoring"
- Keep the visual and ATS resume bullets semantically aligned even if phrasing is slightly adapted for layout

### Why this wording

- **ATS-friendly:** includes keywords like session tracking, webhook processing, attendance, geofencing, and reconciliation
- **Evidence-based:** grounded in identifiable code patterns from `/var/www/digital-school`
- **Product-breadth oriented:** shows that V2 expanded into assessments, finance, and attendance operations
- **Scoped correctly:** improves V2 highlights without disturbing the rest of the resume

---

## Files to Modify

| File | Change |
|------|--------|
| `app/pages/resume.vue` | Update the Digital School V2 achievement list to reflect stronger product and operational systems highlights |
| `app/pages/resume-ats.vue` | Update the Digital School V2 achievement list with ATS-friendly versions of the same evidence-backed highlights |

---

## Evidence Reference Points

Representative evidence in `/var/www/digital-school`:
- `app/Actions/UjianSessionStartAction.php` — tokenized/device-bound exam session start
- `app/Actions/UjianSessionTrackAction.php` — session activity tracking
- `resources/js/Pages/UjianSiswa/PengerjaanUjian.vue` — focus/visibility activity capture
- `resources/js/Pages/Ujian/Session.vue` — admin session monitoring UI
- `routes/web/moota.php` — Moota webhook route
- `app/Http/Controllers/MootaController.php` — signed webhook handling
- `app/Services/MootaService.php` — webhook verification and payment matching
- `app/Actions/PembayaranVerifyAction.php` — payment-to-invoice success flow
- `routes/api/iclock.php` — biometric attendance device endpoints
- `app/Actions/IclockProcessAttendanceLogsAction.php` — raw log ingestion
- `app/Jobs/ProsesAbsensiFingerprintJob.php` — attendance record processing
- `app/Actions/AbsensiHarianWebCreateAction.php` — web attendance creation
- `app/Supports/AbsensiHarianHelper.php` — geofencing and attendance calculation helpers

---

## Acceptance Criteria

1. Digital School V2 ends with exactly 2 achievement bullets total in both resume files, replacing the current V2 bullet set rather than appending additional bullets
2. Both bullets are grounded in code evidence from `/var/www/digital-school` and can be traced to the files listed in the Traceability table
3. No unsupported claims about direct gateway checkout, AI/webcam/face-recognition proctoring, or other speculative implementation details are introduced
4. Existing V1/V2 structure, role framing, and timeline remain intact
5. Each bullet is a single sentence and remains recruiter-readable while preserving keywords around proctoring, session tracking, webhook processing, attendance, or geofencing

---

## Notes

This is a focused content-strengthening pass for Digital School V2, not a broader rewrite. Precision and credibility matter more than listing every subsystem present in the product.
