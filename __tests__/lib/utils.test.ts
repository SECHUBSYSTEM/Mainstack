import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('should merge and deduplicate Tailwind classes with conditional logic', () => {
    // Test the core functionality: merging, deduplication, and conditionals
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    expect(cn('base', true && 'active', false && 'inactive', undefined)).toBe('base active')
  })
})

