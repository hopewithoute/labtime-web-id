# LMS Sertifikasi Sequencing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reorder the `LMS Sertifikasi` project sub-articles into a system-first reading sequence without changing existing descriptive slugs.

**Architecture:** The project page already loads sub-articles through `queryCollection('projectArticles')` and sorts them by `date DESC` in `app/pages/projects/[slug]/index.vue`. The implementation should keep that behavior and update the frontmatter `date` values in the `content/projects/lms-sertifikasi/*.md` files so the rendered order matches the approved narrative sequence. Verification should confirm the date ordering in content and the resulting order on the rendered project page.

**Tech Stack:** Nuxt 4, Nuxt Content, Markdown frontmatter, pnpm

---

### Task 1: Verify the current ordering mechanism

**Files:**
- Read: `app/pages/projects/[slug]/index.vue:299-306`
- Read: `content/projects/lms-sertifikasi/*.md`

**Step 1: Re-read the project article query**

Confirm that the project detail page loads child articles with:

```ts
queryCollection('projectArticles')
  .where('path', 'LIKE', `/projects/${slug}/%`)
  .where('path', '<>', `/projects/${slug}`)
  .order('date', 'DESC')
  .all()
```

**Step 2: Re-read the current article dates**

Record the current `date` values from these files:
- `content/projects/lms-sertifikasi/phoenix-react-websocket-bridge.md`
- `content/projects/lms-sertifikasi/surgical-realtime-sync.md`
- `content/projects/lms-sertifikasi/chat-architecture-scaling.md`
- `content/projects/lms-sertifikasi/unified-learning-telemetry.md`
- `content/projects/lms-sertifikasi/resilient-assessment-engine.md`
- `content/projects/lms-sertifikasi/immutable-certification-engine.md`
- `content/projects/lms-sertifikasi/dynamic-pdf-engine.md`
- `content/projects/lms-sertifikasi/media-pipeline.md`
- `content/projects/lms-sertifikasi/media-gateway-architecture.md`

**Step 3: Confirm the approved narrative target**

Use this exact target order:
1. `phoenix-react-websocket-bridge`
2. `surgical-realtime-sync`
3. `chat-architecture-scaling`
4. `unified-learning-telemetry`
5. `resilient-assessment-engine`
6. `immutable-certification-engine`
7. `dynamic-pdf-engine`
8. `media-pipeline`
9. `media-gateway-architecture`

**Step 4: Do not change application code**

Because the existing query already sorts by `date DESC`, this task should end with no changes to `app/pages/projects/[slug]/index.vue`.

**Step 5: Commit**

Do not commit yet. Continue to Task 2.

---

### Task 2: Reassign article dates to match the approved series order

**Files:**
- Modify: `content/projects/lms-sertifikasi/phoenix-react-websocket-bridge.md`
- Modify: `content/projects/lms-sertifikasi/surgical-realtime-sync.md`
- Modify: `content/projects/lms-sertifikasi/chat-architecture-scaling.md`
- Modify: `content/projects/lms-sertifikasi/unified-learning-telemetry.md`
- Modify: `content/projects/lms-sertifikasi/resilient-assessment-engine.md`
- Modify: `content/projects/lms-sertifikasi/immutable-certification-engine.md`
- Modify: `content/projects/lms-sertifikasi/dynamic-pdf-engine.md`
- Modify: `content/projects/lms-sertifikasi/media-pipeline.md`
- Modify: `content/projects/lms-sertifikasi/media-gateway-architecture.md`

**Step 1: Choose a descending date sequence**

Assign dates so the first article in the narrative has the newest date and the last article has the oldest date.

Use this exact mapping unless another nearby date range is required by adjacent content conventions:

- `phoenix-react-websocket-bridge.md` → `date: 2026-03-18`
- `surgical-realtime-sync.md` → `date: 2026-03-17`
- `chat-architecture-scaling.md` → `date: 2026-03-16`
- `unified-learning-telemetry.md` → `date: 2026-03-15`
- `resilient-assessment-engine.md` → `date: 2026-03-14`
- `immutable-certification-engine.md` → `date: 2026-03-13`
- `dynamic-pdf-engine.md` → `date: 2026-03-12`
- `media-pipeline.md` → `date: 2026-03-11`
- `media-gateway-architecture.md` → `date: 2026-03-10`

**Step 2: Edit only the frontmatter date line in each file**

Make the smallest possible change. Do not rewrite titles, descriptions, or body content.

**Step 3: Re-read the edited frontmatter**

Open each file again and verify the date values are correct and unique.

**Step 4: Check for accidental content drift**

Ensure that only the `date` line changed in those article files.

**Step 5: Commit**

Do not commit yet. Continue to Task 3.

---

### Task 3: Verify the resulting order in code and content

**Files:**
- Read: `content/projects/lms-sertifikasi/*.md`
- Optional read: `app/pages/projects/[slug]/index.vue`

**Step 1: Validate the descending order manually**

Re-read the frontmatter dates and confirm they sort into this exact order:

1. `/projects/lms-sertifikasi/phoenix-react-websocket-bridge`
2. `/projects/lms-sertifikasi/surgical-realtime-sync`
3. `/projects/lms-sertifikasi/chat-architecture-scaling`
4. `/projects/lms-sertifikasi/unified-learning-telemetry`
5. `/projects/lms-sertifikasi/resilient-assessment-engine`
6. `/projects/lms-sertifikasi/immutable-certification-engine`
7. `/projects/lms-sertifikasi/dynamic-pdf-engine`
8. `/projects/lms-sertifikasi/media-pipeline`
9. `/projects/lms-sertifikasi/media-gateway-architecture`

**Step 2: Run formatting or lint only if needed**

Because only Markdown frontmatter dates changed, formatting should usually be unnecessary. If repository hooks or formatting conventions require it, run:

```bash
pnpm run format:check
```

Expected: no formatting errors related to the edited files.

**Step 3: Run a focused verification path**

If a local preview or dev check is needed, use the smallest useful command:

```bash
pnpm run dev
```

Then verify the project page at `/projects/lms-sertifikasi` shows the articles in the approved order.

**Step 4: Stop after visual verification**

Do not make unrelated UI or copy changes during this task.

**Step 5: Commit**

If the order is correct, create a commit such as:

```bash
git add content/projects/lms-sertifikasi/phoenix-react-websocket-bridge.md \
  content/projects/lms-sertifikasi/surgical-realtime-sync.md \
  content/projects/lms-sertifikasi/chat-architecture-scaling.md \
  content/projects/lms-sertifikasi/unified-learning-telemetry.md \
  content/projects/lms-sertifikasi/resilient-assessment-engine.md \
  content/projects/lms-sertifikasi/immutable-certification-engine.md \
  content/projects/lms-sertifikasi/dynamic-pdf-engine.md \
  content/projects/lms-sertifikasi/media-pipeline.md \
  content/projects/lms-sertifikasi/media-gateway-architecture.md

git commit -m "docs(portfolio): reorder LMS certification article sequence"
```

---

### Task 4: Optional follow-up if narrative transitions feel weak

**Files:**
- Optional modify: `content/projects/lms-sertifikasi/index.md`
- Optional modify: individual article intros or closers only if a transition problem is obvious after reordering

**Step 1: Re-read the project page intro after the new ordering is live**

Check whether `content/projects/lms-sertifikasi/index.md` still introduces the sequence cleanly.

**Step 2: Only adjust transition copy if a real problem appears**

Examples of valid problems:
- the first linked article no longer matches the framing paragraph
- adjacent article cards feel misleading after reordering
- a closing sentence implies a different next topic

**Step 3: Keep any copy edit minimal**

Do not rewrite the series again. Limit changes to the smallest wording needed to improve flow.

**Step 4: Re-verify the page**

Confirm the order still matches the approved system-first sequence.

**Step 5: Commit**

If this optional task was needed, create a second commit such as:

```bash
git add content/projects/lms-sertifikasi/index.md

git commit -m "docs(portfolio): tighten LMS article flow after reordering"
```
