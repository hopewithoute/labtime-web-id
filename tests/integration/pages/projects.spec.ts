import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProjectsPage from '~/pages/projects/index.vue'

describe('Projects Page', () => {
  it('renders the page component', async () => {
    const wrapper = await mountSuspended(ProjectsPage)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('displays the Systems Built title', async () => {
    const wrapper = await mountSuspended(ProjectsPage)
    expect(wrapper.text()).toContain('Systems Built')
  })

  it('displays the systems context', async () => {
    const wrapper = await mountSuspended(ProjectsPage)
    expect(wrapper.text()).toContain('/CORE/SYSTEMS')
    expect(wrapper.text()).toContain('ONLINE')
  })

  it('has container for projects list', async () => {
    const wrapper = await mountSuspended(ProjectsPage)
    const container = wrapper.find('.space-y-12')
    expect(container.exists()).toBe(true)
  })
})