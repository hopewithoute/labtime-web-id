# Performance Runtime Cloudflare Design

**Date:** 2026-03-07

## Objective
Improve user-perceived loading speed while keeping Cloudflare Workers as the primary runtime environment. The design should avoid treating this as a binary choice between full build-time generation and full runtime rendering. Instead, it should reduce unnecessary per-request work inside Workers while preserving the flexibility needed for request-time logic.

## Selected Approach
Implement a **hybrid rendering strategy with Worker-first runtime optimization**.

The system should continue to use Cloudflare Workers for request-time behavior, but public and stable content should be prepared so Workers do less work on each request. Build-time generation is used as a supporting optimization, not as a replacement for the runtime platform.

## 1. Architecture Direction
The architecture should remain hybrid:
- **build-time / pre-rendered outputs** for content that is known ahead of time,
- **Cloudflare Worker runtime** for logic that genuinely depends on the incoming request.

This keeps runtime flexibility while preventing Workers from doing unnecessary page assembly for routes whose content is already stable.

The key rule is:
- if content is known at build time, prepare it ahead of time,
- if content depends on the request, handle it at runtime.

## 2. Route Classification
Routes should be split by behavior rather than by framework default.

### Public content routes
These include pages such as:
- landing page,
- project pages,
- article pages,
- resume pages.

These routes should be as light and cacheable as possible. Even when served through the Cloudflare stack, they should avoid expensive request-time composition.

### Runtime routes
These include request-sensitive features such as:
- auth or token checks,
- dynamic search or API behavior,
- telemetry ingestion,
- any feature that requires request context or user-specific logic.

These routes should stay in Cloudflare Workers, but should be scoped narrowly so the runtime only handles what truly must happen per request.

## 3. Worker Optimization Principles
Cloudflare Workers should act as **edge coordinators**, not as a place to perform heavy page assembly for every request.

The runtime optimization principles are:
- avoid unnecessary internal fetch chains,
- reduce payload size returned from runtime endpoints,
- minimize the amount of logic executed on public requests,
- let cacheable responses take the fast path whenever safe.

This means performance work should prioritize removing avoidable request-time work before adding more runtime features or abstractions.

## 4. Data Flow
### Build-time path
- Nuxt reads stable content from the content layer.
- Stable routes are prepared ahead of time.
- Public-facing page output should already be lightweight before reaching the Worker layer.

### Runtime path
- Cloudflare Workers handle only request-specific concerns.
- Dynamic endpoints should return the minimum data necessary.
- Runtime logic should remain isolated so failures or latency in one dynamic feature do not degrade all public routes.

## 5. Caching Strategy
Caching should be treated as a first-class part of runtime performance.

The design requires:
- clear separation between cacheable public routes and non-cacheable private routes,
- explicit cache behavior for repeated public requests,
- edge-friendly response shapes that make repeated requests cheap.

A cache miss may still require Worker execution, but the design goal is for repeated public requests to benefit from edge caching wherever safe and correct.

## 6. Error Handling Direction
The design should not depend on complex fallback systems.

Instead:
- public routes should avoid long runtime dependency chains,
- dynamic endpoints should fail fast with simple and predictable responses,
- runtime failures in non-critical features should not break the main page experience when the base page can still render.

This keeps failure domains small and protects perceived performance.

## 7. Verification Criteria
Success should be evaluated with runtime-oriented performance indicators:

1. **Public route TTFB improves or remains consistently low**.
2. **Per-request Worker work decreases**, especially on public content routes.
3. **Repeated requests become more cache-efficient**.
4. **Initial page load remains lightweight**, with HTML being useful before non-critical hydration completes.

## Constraints
- Keep Cloudflare Workers as the main runtime environment.
- Do not redesign the site around full static generation as the only delivery model.
- Use build-time generation only where it reduces unnecessary Worker work.
- Focus on user-perceived loading speed, not only framework-level rendering purity.
