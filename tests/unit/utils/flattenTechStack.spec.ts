import { describe, expect, it } from 'vitest'
import { flattenTechStack } from '~/utils/flattenTechStack'

describe('flattenTechStack', () => {
  it('returns empty array for undefined input', () => {
    expect(flattenTechStack(undefined)).toEqual([])
  })

  it('returns empty array for empty object', () => {
    expect(flattenTechStack({})).toEqual([])
  })

  it('returns flat array as-is (backward compat)', () => {
    const input = ['Vue', 'Nuxt', 'TypeScript']
    expect(flattenTechStack(input)).toEqual(['Vue', 'Nuxt', 'TypeScript'])
  })

  it('flattens grouped tech stack object', () => {
    const input = {
      frontend: [
        { name: 'Vue', reason: 'Reactive framework' },
        { name: 'Tailwind', reason: 'Utility-first CSS' },
      ],
      backend: [
        { name: 'Node.js', reason: 'JavaScript runtime' },
      ],
    }
    expect(flattenTechStack(input)).toEqual(['Vue', 'Tailwind', 'Node.js'])
  })

  it('handles empty groups', () => {
    const input = {
      frontend: [],
      backend: [],
    }
    expect(flattenTechStack(input)).toEqual([])
  })

  it('handles single group', () => {
    const input = {
      tools: [
        { name: 'Git', reason: 'Version control' },
      ],
    }
    expect(flattenTechStack(input)).toEqual(['Git'])
  })

  it('returns empty array for empty flat array', () => {
    expect(flattenTechStack([])).toEqual([])
  })
})