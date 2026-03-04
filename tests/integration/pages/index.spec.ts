import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('Home Page', () => {
  it('renders the page component', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('displays the LabTime title', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('LabTime')
  })

  it('contains hero section with Status tag', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('Status')
    expect(wrapper.text()).toContain('Ready')
  })

  it('has navigation link to resume', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const resumeLink = wrapper.find('a[href="/resume"]')
    expect(resumeLink.exists()).toBe(true)
  })

  it('has GitHub profile link', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const githubLink = wrapper.find('a[target="_blank"]')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('href')).toBe('https://github.com/hopewithoute')
  })

  it('displays Systems Built section', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('Systems Built')
  })

  it('displays Recent Logs section', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('Recent Logs')
  })

  it('has View All links for projects and articles', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const viewAllLinks = wrapper.findAll('a').filter(a => a.text().includes('View All'))
    expect(viewAllLinks.length).toBeGreaterThan(0)
  })
})