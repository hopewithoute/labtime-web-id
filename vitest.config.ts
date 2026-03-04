import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: '.',
      },
    },
    include: ['tests/unit/**/*.spec.ts', 'tests/integration/**/*.spec.ts'],
    exclude: ['tests/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'app/utils/**/*.ts',
        'app/lib/**/*.ts',
        'app/components/CornerFrame.vue',
        'app/components/MetricTag.vue',
      ],
      thresholds: {
        lines: 95,
        branches: 95,
        functions: 95,
        statements: 95,
      },
    },
  },
})