# Cloudflare D1 Deployment Design for Nuxt Content v3

## Context
LabTime is deployed on Cloudflare Workers. With the upgrade to `@nuxt/content` v3, the internal architecture shifted from in-memory JSON to a SQLite database query engine. Edge Workers cannot directly read a local SQLite file generated during the build process.

## Chosen Approach: Cloudflare D1 Integration
We will configure Nuxt Content to use Cloudflare D1 (Serverless SQL) for production deployment. This allows the application to remain a dynamic Server-Side Rendered (SSR) app running on Cloudflare Workers, leveraging SQLite's high performance for querying content schemas at the Edge.

### Architecture
- **Development**: `@nuxt/content` uses a local `.data/content.sqlite` file via `better-sqlite3`.
- **Build Step**: During the CI/CD pipeline, Nuxt will generate the SQLite database for the content.
- **Production**: Cloudflare Pages/Workers uses the `DB` binding to interact with a Cloudflare D1 database. Nuxt's Nitro worker is configured with a `cloudflare-pages` or `cloudflare` preset that connects to D1 using the `hub` module.

### Advantages
- Retains full SSR capabilities for dynamically rendering pages on the Edge.
- Fast scalable querying.
- Maintains the official recommended approach for `@nuxt/content` v3 on Cloudflare.

### Steps Required for Implementation
1. **Cloudflare Setup**: Create a D1 database via the Cloudflare dashboard or wrangler CLI.
2. **Configuration (`wrangler.toml` / `wrangler.json`)**: Map the D1 database binding (typically `DB`) to the newly created database.
3. **Nuxt Hub Integration**: We may utilize `@nuxthub/core` for zero-config D1 integration as recommended by Nuxt Content v3 docs, or use standard Nitro `database` config.
4. **Build Pipeline**: Ensure the deployment script handles `nuxt build` correctly and uploads the local database build output to D1.

## Alternatives Considered
**Static Site Generation (SSG)**: Dismissed. While it avoids the D1 requirement by prerendering everything to static HTML, it sacrifices real-time edge computing (Cloudflare Workers) which is already currently in use by the project.
