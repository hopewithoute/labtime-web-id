# Resume Structure Refinement: Single Company with Client Engagements

## Problem

Current resume presents project work as separate, overlapping entries that appear like independent jobs. This creates confusion for hiring managers who may interpret it as job-hopping or fragmented freelance work.

**Current perception:**
```
Job 1: Rail System (2013 – Present)
Job 2: LMS Certification Platform (2025 – Present)
Job 3: Digital School Platform (2019 – 2025)
Job 4: Universitas Pendidikan Indonesia (2022 – 2024)
...
```

**Desired perception:**
```
One Employer: Rail System (2013 – Present)
├── Client Engagement: LMS Certification Platform
├── Client Engagement: Digital School Platform
├── Client Engagement: Universitas Pendidikan Indonesia
...
```

## Solution

Restructure both resume pages to clearly establish Rail System as the single employer with client engagements nested underneath.

### Information Architecture

**Before:**
```
Professional Experience
├── Rail System (company header)
├── LMS Certification Platform (ambiguous)
├── Digital School Platform (ambiguous)
├── ...
```

**After:**
```
Professional Experience
└── Rail System | Tech Partner & Senior Software Engineer | 2013 – Present
    └── Client Engagements
        ├── LMS Certification Platform | 2025 – Present
        ├── Digital School Platform | 2019 – 2025
        ├── Universitas Pendidikan Indonesia | 2022 – 2024
        ├── SIBER Election Platform | 2024
        ├── Media Infrastructure | 2016 – 2024
        └── Pemkab Bandung Barat | 2013 – 2016
```

## Implementation Details

### ATS Resume (`app/pages/resume-ats.vue`)

**HTML Structure Changes:**

```html
<section aria-labelledby="experience-heading">
  <h2>Professional Experience</h2>

  <!-- Single company block -->
  <div class="company-entry">
    <div class="company-header">
      <h3>Rail System</h3>
      <p class="role">Tech Partner & Senior Software Engineer</p>
      <p class="date-range">2013 – Present · Remote</p>
    </div>
    <p class="company-description">
      Independent tech partner delivering end-to-end software systems...
    </p>

    <!-- Explicit engagements label -->
    <h4 class="engagements-label">Client Engagements</h4>

    <!-- Engagements as nested subsections -->
    <div class="engagements-list">
      <article class="engagement">
        <h5>LMS Certification Platform</h5>
        <p class="engagement-date">2025 – Present</p>
        <ul>...</ul>
      </article>
      <!-- more engagements -->
    </div>
  </div>
</section>
```

**Visual Hierarchy:**
- Company name: `text-xl font-bold` (primary)
- Engagement title: `text-base font-bold` (secondary)
- Engagement date: `text-sm text-foreground/70` (tertiary, no accent color)
- "Client Engagements" label: `text-sm font-semibold text-foreground/80` with top margin

### Creative Resume (`app/pages/resume.vue`)

**Visual Weight Adjustments:**

| Element | Current | Proposed |
|---------|---------|----------|
| Company name | `text-2xl font-black uppercase` | Same (primary) |
| Project title | `text-xl font-black uppercase` | `text-lg font-bold uppercase` (secondary) |
| Project date badge (active) | `text-accent border-accent/30` | `text-muted-foreground border-foreground/30` (muted) |
| Project date badge (past) | `text-muted-foreground border-foreground/30` | Same |

**Add Engagement Indicator:**
- Add small label above first project entry:
  `<div class="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Client Engagements</div>`

## Files Modified

1. `app/pages/resume-ats.vue` — restructure experience section
2. `app/pages/resume.vue` — adjust visual hierarchy, add label

## Validation

- [ ] Company header clearly reads as single employer
- [ ] "Client Engagements" label is visible
- [ ] Project entries visually subordinate to company
- [ ] ATS resume prints cleanly with new structure
- [ ] Creative resume maintains visual identity while clarifying hierarchy
- [ ] Mobile layout works on both pages