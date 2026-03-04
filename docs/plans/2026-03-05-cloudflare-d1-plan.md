# Cloudflare D1 Integration for Nuxt Content Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Configure Nuxt Content v3 and Nitro to use a Cloudflare D1 database for production deployment on Cloudflare Pages.

**Architecture:** We will set up the necessary Wrangler database bindings and configure `nuxt.config.ts` so that Nuxt Nitro uses the D1 database in production, allowing the Edge Workers to query the SQLite content.

**Tech Stack:** Nuxt 4, Nuxt Content v3, Cloudflare Pages, Cloudflare D1, Wrangler.

---

### Task 1: Configure Nuxt for Cloudflare D1

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `wrangler.toml` (Create if missing)

**Step 1: Write the failing test**
N/A - Infrastructure configuration. To verify, we will run the build process.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
1. Add a `wrangler.toml` file with the D1 database binding:
```toml
name = "labtime-web-id"
pages_build_output_dir = "dist"
compatibility_date = "2024-04-01"

[[d1_databases]]
binding = "DB"
database_name = "content-db"
database_id = "<to-be-filled-by-user>"
```

2. Update `nuxt.config.ts` to explicitly configure the database for production:
```ts
export default defineNuxtConfig({
  // ... existing config
  nitro: {
    preset: 'cloudflare-pages',
    experimental: {
      database: true
    }
  }
})
```

**Step 4: Run test to verify it passes**
Run: `pnpm nuxi build`
Expected: PASS with Cloudflare Pages output generated.

**Step 5: Commit**
```bash
git add nuxt.config.ts wrangler.toml
git commit -m "chore: configure Cloudflare D1 binding for Nuxt Content"
```

### Task 2: Update Deployment CI/CD (If applicable)

**Files:**
- Check: GitHub Actions workflow or Cloudflare build settings.

**Step 1-4:** 
Verify how the project is being built on Cloudflare. If using GitHub Actions, ensure the `wrangler d1 execute` command is run to seed the database with `.data/content.sqlite` during the build step.
*Note: Nuxt Content v3 has a script for this, usually `npx nuxthub database d1:push` or similar depending on the exact NuxtHub/Nitro setup.*

**Step 5: Commit**
```bash
git commit -m "ci: update deployment workflow for D1 seeding"
```
