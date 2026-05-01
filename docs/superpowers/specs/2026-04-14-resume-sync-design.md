# Resume Sync Design

**Goal:** Align `/resume` and `/resume/ats` with the English source of truth in `/var/www/resume/resume.md` while preserving the existing visual and ATS-specific layouts.

## Scope

- Update `app/pages/resume.vue` to reflect the English resume content, including contact details, summary, impact metrics, skill taxonomy, and full experience coverage.
- Update `app/pages/resume-ats.vue` so its wording and structure match the current English source more closely, including phone number, section labels, experience descriptions, and education labels.
- Keep `/resume` as the editorial/YorHa presentation and `/resume/ats` as the print- and parser-friendly presentation.

## Content Rules

- `/var/www/resume/resume.md` is the content baseline for English wording and facts.
- The two pages do not need line-for-line identical phrasing, but must stay aligned on:
  - names, dates, roles, and project labels
  - tech stack references
  - scale indicators and impact numbers
  - section ordering and key achievements

## Layout Strategy

### `/resume`

- Preserve the current two-column YorHa layout and section navigation.
- Expand the summary block to include the richer quantified narrative from the source resume.
- Add the missing phone number to the contact block.
- Replace the current compressed experience coverage with a fuller project list derived from the source resume.
- Expand the skills matrix so it reflects the broader skill categories from the source resume instead of the current reduced set.

### `/resume/ats`

- Preserve the current clean ATS/print structure and print rules.
- Update the copy to match the source resume more literally.
- Include the phone number and rename `Technical Skills` to `Core Skills` to match the source.
- Keep screen and print behavior intact.

## Verification

- Add integration tests for `/resume` and `/resume/ats` covering representative updated facts from the source resume.
- Run the new tests first to confirm they fail before implementation.
- Re-run those tests after implementation to confirm the sync landed as intended.

## Constraints

- Do not revert unrelated workspace changes.
- Do not introduce a shared data refactor in this pass.
- Keep changes localized to the two resume pages plus tests for the updated content.

## Notes

- The brainstorming skill requests subagent-based spec review, but this session is under a no-subagent constraint unless explicitly requested by the user. Proceeding with a local review pass instead.
