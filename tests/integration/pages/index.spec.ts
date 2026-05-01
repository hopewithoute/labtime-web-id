import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('Home Page', () => {
  it('renders the operator dossier identity block', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('OPERATOR DOSSIER')
    expect(wrapper.text()).toContain('Anggi Wibiyanto')
    expect(wrapper.text()).toContain('Senior full-stack engineer focused on architecture')
  })

  it('renders the tactical landing hero', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('Tactical Dossier')
    expect(wrapper.text()).toContain('Building systems that survive operational pressure.')
    expect(wrapper.text()).toContain('Operational Thesis')
  })

  it('keeps primary navigation actions visible', async () => {
    const wrapper = await mountSuspended(IndexPage)

    const resumeLink = wrapper.find('a[href="/resume"]')
    expect(resumeLink.exists()).toBe(true)
    expect(resumeLink.text()).toContain('EXECUTE : RESUME')

    const githubLink = wrapper.find('a[target="_blank"]')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('href')).toBe('https://github.com/hopewithoute')
  })

  it('renders systems built and recent logs sections', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('Systems Built')
    expect(wrapper.text()).toContain('Recent Logs')
    expect(wrapper.text()).toContain('OPEN_CASE_FILE')
    expect(wrapper.text()).toContain('Case 01')
  })
})
