import { describe, expect, it } from 'vitest'
import { cn } from '~/utils/cn'

describe('cn', () => {
  it('returns single class unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('merges multiple classes', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
  })

  it('handles conditional classes with falsy values', () => {
    const isHidden = false
    const isVisible = true
    expect(cn('base', isHidden && 'hidden', isVisible && 'visible')).toBe('base visible')
  })

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end')
  })

  it('merges Tailwind conflict classes correctly', () => {
    // tailwind-merge should keep the last conflicting class
    expect(cn('px-4', 'px-8')).toBe('px-8')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })

  it('handles object notation for conditional classes', () => {
    expect(cn({ 'active': true, 'disabled': false })).toBe('active')
  })

  it('handles array of classes', () => {
    expect(cn(['flex', 'items-center'])).toBe('flex items-center')
  })

  it('handles complex combination', () => {
    const result = cn(
      'base-class',
      { 'conditional-true': true, 'conditional-false': false },
      ['array-class'],
      undefined,
      'override-class'
    )
    expect(result).toContain('base-class')
    expect(result).toContain('conditional-true')
    expect(result).toContain('array-class')
    expect(result).toContain('override-class')
    expect(result).not.toContain('conditional-false')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
  })

  it('handles only falsy values', () => {
    expect(cn(false, undefined, null)).toBe('')
  })
})