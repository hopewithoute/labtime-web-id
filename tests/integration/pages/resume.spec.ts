import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResumePage from '~/pages/resume.vue'

describe('Resume Page', () => {
  it('surfaces the synced source contact and impact details', async () => {
    const wrapper = await mountSuspended(ResumePage)

    expect(wrapper.text()).toContain('+6285723960603')
    expect(wrapper.text()).toContain('Senior Full-Stack Engineer')
    expect(wrapper.text()).toContain('Selected Achievements')
    expect(wrapper.text()).toContain('Independent Freelance Delivery')
    expect(wrapper.text()).toContain('West Bandung Regency Government')
  })
})
