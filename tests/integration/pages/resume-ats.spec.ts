import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResumeAtsPage from '~/pages/resume-ats.vue'

describe('Resume ATS Page', () => {
  it('matches the synced ATS source details', async () => {
    const wrapper = await mountSuspended(ResumeAtsPage)

    expect(wrapper.text()).toContain('+6285723960603')
    expect(wrapper.text()).toContain('Core Skills')
    expect(wrapper.text()).toContain('Selected Achievements')
    expect(wrapper.text()).toContain('Senior Full-Stack Engineer')
    expect(wrapper.text()).toContain('Academic System & LMS - SMA PGRI Depok')
    expect(wrapper.text()).toContain('West Bandung Regency Government')
  })
})
