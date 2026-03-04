import { describe, expect, it } from 'vitest'
import { formatDate } from '~/utils/formatDate'

describe('formatDate', () => {
  it('returns empty string for undefined input', () => {
    expect(formatDate(undefined)).toBe('')
  })

  it('returns empty string for null input', () => {
    expect(formatDate(null as unknown as undefined)).toBe('')
  })

  it('formats valid date string correctly', () => {
    expect(formatDate('2026-03-05')).toBe('Mar 05, 2026')
  })

  it('formats Date object correctly', () => {
    const date = new Date('2026-03-05')
    expect(formatDate(date)).toBe('Mar 05, 2026')
  })

  it('returns original string for invalid date', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date')
  })

  it('returns empty string for empty string input', () => {
    expect(formatDate('')).toBe('')
  })

  it('formats ISO date string correctly', () => {
    expect(formatDate('2026-01-15T10:30:00Z')).toBe('Jan 15, 2026')
  })

  it('handles different date formats', () => {
    expect(formatDate('December 25, 2025')).toBe('Dec 25, 2025')
  })
})