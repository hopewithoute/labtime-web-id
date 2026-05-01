import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('public resume markdown', () => {
  it('stays aligned with the synced English resume source', () => {
    const content = readFileSync(resolve(process.cwd(), 'public/resume.md'), 'utf8')

    expect(content).toContain('+6285723960603')
    expect(content).toContain('Senior Full-Stack Engineer')
    expect(content).toContain('Selected Achievements')
    expect(content).toContain('linkedin.com/in/hopewithoute')
    expect(content).toContain('West Bandung Regency Government')
  })
})
