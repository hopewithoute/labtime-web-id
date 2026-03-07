# README Language Switch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework the README so English appears first, Indonesian is reachable through an in-document switch link, and the tech stack is displayed with icons instead of bullet points.

**Architecture:** Keep the change localized to `README.md`. Restructure the bilingual document order, add lightweight internal navigation links between language sections, and replace the bulleted stack lists with icon-led line blocks that stay easy to edit in plain Markdown.

**Tech Stack:** Markdown, GitHub-flavored Markdown, repository README conventions

---

### Task 1: Reorder the bilingual README structure

**Files:**
- Modify: `README.md:1-95`

**Step 1: Write the failing check**

Read `README.md` and confirm the current structure starts with `## ID` before `## EN`.

Expected: FAIL against the new requirement because English is not the main section yet.

**Step 2: Verify the current structure manually**

Inspect the top of `README.md`.
Expected: the first language section is Indonesian.

**Step 3: Write minimal implementation**

Reorder the README so the structure becomes:

```md
# LabTime

English · [Bahasa Indonesia](#id)

## EN
...

## ID
...
```

Keep the existing content meaning intact. Do not reintroduce setup, install, deploy, or script sections.

**Step 4: Run verification**

Read `README.md` again.
Expected: the first language section is `## EN` and the language switch row appears directly below the title.

**Step 5: Commit**

```bash
git add README.md
git commit -m "docs(readme): make english the default section"
```

### Task 2: Add in-document language switch links

**Files:**
- Modify: `README.md:1-95`

**Step 1: Write the failing check**

Read `README.md` and confirm there is currently no two-way in-document language switch between the English and Indonesian sections.

Expected: FAIL because the README does not yet include both top-level switch access and a return link in the Indonesian section.

**Step 2: Verify the missing navigation manually**

Inspect the heading area and the start of the Indonesian section.
Expected: no link pair that lets the reader switch between languages.

**Step 3: Write minimal implementation**

Add a top switch row and an Indonesian return link using the simplest GitHub-friendly anchor approach.

Target shape:

```md
English · [Bahasa Indonesia](#id)
```

and near the Indonesian section:

```md
[Back to English](#en)
```

If needed for stable anchors, use explicit HTML anchors like:

```md
<a id="en"></a>
<a id="id"></a>
```

Prefer the lightest markup that renders cleanly.

**Step 4: Run verification**

Read `README.md` again.
Expected: a reader can see a link to Indonesian near the top and a link back to English near the Indonesian section.

**Step 5: Commit**

```bash
git add README.md
git commit -m "docs(readme): add language switch links"
```

### Task 3: Replace bulleted tech stack lists with icon-led lines

**Files:**
- Modify: `README.md:28-41`
- Modify: `README.md:75-88`

**Step 1: Write the failing check**

Read both tech stack sections and confirm they are currently written as Markdown bullet lists.

Expected: FAIL against the new requirement because each stack item still starts with `-`.

**Step 2: Verify current rendering intent**

Inspect the stack sections in both languages.
Expected: the entries use bullets and no icons.

**Step 3: Write minimal implementation**

Replace each bulleted stack list with non-bulleted icon-led lines.

Use this pattern:

```md
⚡ Nuxt 4
🟢 Vue 3
📘 TypeScript
🎨 Tailwind CSS
📚 Nuxt Content
```

Guidelines:
- do not use Markdown bullets for the stack items
- use one icon per item
- keep the stack entries consistent between English and Indonesian
- keep the same stack content already present in the README

**Step 4: Run verification**

Read `README.md` again.
Expected: the tech stack sections use icon-led lines with no leading `-` bullets.

**Step 5: Commit**

```bash
git add README.md
git commit -m "docs(readme): add icon-led tech stack list"
```

### Task 4: Run final README verification

**Files:**
- Verify: `README.md`

**Step 1: Review the complete README**

Inspect the final file and confirm:
- English appears first
- a visible link to Indonesian appears near the top
- the Indonesian section links back to English
- the tech stack uses icons without bullet points
- no setup or deploy guidance has been reintroduced

**Step 2: Run git diff for the final scope**

Run: `git diff -- README.md`
Expected: only the intended README structure and presentation changes appear.

**Step 3: Commit any final README-only adjustment if needed**

If no extra changes were needed, do not create another commit.
If a small README-only adjustment was required during verification, commit it with a narrow docs message.
