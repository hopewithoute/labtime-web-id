import { beforeAll, describe, expect, it, vi } from 'vitest'

let nuxtConfig: Awaited<typeof import('../../nuxt.config')>['default']

beforeAll(async () => {
  vi.stubGlobal('defineNuxtConfig', (config: unknown) => config)
  nuxtConfig = (await import('../../nuxt.config')).default
})

describe('nuxt.config route rules', () => {
  it('marks public entry routes for prerendering', () => {
    expect(nuxtConfig.routeRules).toMatchObject({
      '/': { prerender: true },
      '/articles': { prerender: true },
      '/projects': { prerender: true },
      '/resume': { prerender: true },
      '/resume/ats': { prerender: true },
    })
  })

  it('keeps dynamic content routes cache-friendly', () => {
    expect(nuxtConfig.routeRules).toMatchObject({
      '/articles/**': { swr: 3600 },
      '/projects/**': { swr: 3600 },
    })
  })
})
