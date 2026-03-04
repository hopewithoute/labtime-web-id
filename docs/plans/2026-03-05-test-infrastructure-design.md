# Test Infrastructure Design

**Date**: 2026-03-05
**Status**: Approved
**Coverage Target**: 95%+ across all layers

## Overview

Comprehensive testing strategy for labtime-web-id using Vitest, @nuxt/test-utils, and Playwright. Covers unit tests, integration tests, and E2E tests with maximum coverage.

## Architecture

### Test Layers

1. **Unit Tests** (Vitest)
   - Pure functions: `formatDate.ts`, `flattenTechStack.ts`, `cn()`
   - Vue components: isolated component behavior
   - Run in parallel, fast feedback loop

2. **Integration Tests** (Vitest + @nuxt/test-utils)
   - Pages with Nuxt context: routing, composables, content fetching
   - Component interactions: props, events, slots
   - @nuxt/content rendering verification

3. **E2E Tests** (Playwright)
   - Critical user journeys: navigation, article reading, theme toggle
   - Visual regression for key pages
   - Cross-page flows

## Dependencies

```json
{
  "devDependencies": {
    "vitest": "^3.x",
    "@nuxt/test-utils": "^3.x",
    "@vue/test-utils": "^2.x",
    "happy-dom": "^17.x",
    "@vitest/coverage-v8": "^3.x",
    "@playwright/test": "^1.x"
  }
}
```

## File Structure

```
/var/www/labtime-web-id/
├── tests/
│   ├── unit/
│   │   ├── utils/
│   │   │   ├── formatDate.spec.ts
│   │   │   └── flattenTechStack.spec.ts
│   │   ├── lib/
│   │   │   └── utils.spec.ts
│   │   └── components/
│   │       ├── MetricTag.spec.ts
│   │       ├── CornerFrame.spec.ts
│   │       └── ThemeToggle.spec.ts
│   │
│   ├── integration/
│   │   └── pages/
│   │       ├── index.spec.ts
│   │       ├── articles.spec.ts
│   │       └── projects.spec.ts
│   │
│   └── e2e/
│       ├── navigation.spec.ts
│       ├── articles.spec.ts
│       ├── projects.spec.ts
│       └── theme.spec.ts
│
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

## Configuration

### Vitest (vitest.config.ts)

- Test environment: `happy-dom`
- Coverage provider: v8
- Include: `tests/**/*.spec.ts`
- Coverage thresholds: 95% lines, branches, functions, statements

### Playwright (playwright.config.ts)

- Browser: Chromium only
- Base URL: `http://localhost:3000`
- Auto-start dev server before tests
- Screenshot on failure, trace on retry

### Package Scripts

```json
{
  "test": "vitest",
  "test:unit": "vitest run tests/unit",
  "test:integration": "vitest run tests/integration",
  "test:e2e": "playwright test",
  "test:all": "vitest run && playwright test",
  "test:coverage": "vitest run --coverage"
}
```

## Testing Strategy

### Unit Tests

| File | Test Cases |
|------|------------|
| `formatDate.ts` | Valid date string, Date object, undefined, invalid date, empty string |
| `flattenTechStack.ts` | Object with groups, flat array (backward compat), undefined, empty object |
| `cn()` utility | Single class, multiple classes, conditional classes, Tailwind merge conflicts |

### Integration Tests

| Page | Test Cases |
|------|------------|
| `index.vue` | Renders hero section, navigation links work |
| `articles/index.vue` | Lists articles, handles empty state |
| `articles/[slug].vue` | Renders article content, handles 404 |
| `projects/index.vue` | Lists projects, tech badges render |
| `projects/[slug]/index.vue` | Project details, sub-article links |
| `projects/[slug]/[article].vue` | Sub-article rendering, navigation back to parent |

### E2E Tests

| Flow | Test Cases |
|------|------------|
| Navigation | Home → Articles → Article → Back, Home → Projects flow |
| Theme | Toggle dark/light, persists across navigation |
| Content | Article renders correctly, code syntax highlighting works |

## Mocking Strategy

- `@nuxt/content`: Use `@nuxt/test-utils` mockContent feature
- `useRoute`/`useRouter`: Auto-mocked by `@nuxt/test-utils`
- No external API mocking needed (static content site)

## CI Integration

- Run unit/integration tests on every PR
- Run E2E tests on merge to main
- Coverage report as CI artifact
- Block merge if coverage < 95%

## Motivation

1. Confidence in refactoring
2. CI/CD quality gate
3. Documentation through tests