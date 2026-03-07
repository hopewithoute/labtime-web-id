import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('Home Page', () => {
  it('renders the page terminal header', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('whoami')
  })

  it('displays the LabTime operator name', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('Anggi Wibiyanto')
  })

  it('displays the operator role', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('Senior System Builder')
  })

  it('renders core operator content without relying on live decorative timers', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('SYS_UPTIME')
    expect(wrapper.text()).toContain('ONLINE')
    expect(wrapper.text()).toContain('load_module "elixir_ash"')
    expect(wrapper.text()).toContain('> mem_alloc: 0x00FFA1')
    expect(wrapper.text()).toContain('> thread_pool: idle [8]')
  })

  it('has navigation link styled as executable', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const resumeLink = wrapper.find('a[href="/resume"]')
    expect(resumeLink.exists()).toBe(true)
    expect(resumeLink.text()).toContain('./execute_resume.sh')
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