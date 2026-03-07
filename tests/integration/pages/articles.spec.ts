import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ArticlesPage from '~/pages/articles/index.vue'

describe('Articles Page', () => {
  it('renders the page component', async () => {
    const wrapper = await mountSuspended(ArticlesPage)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('displays the System Logs title', async () => {
    const wrapper = await mountSuspended(ArticlesPage)
    expect(wrapper.text()).toContain('System Logs')
  })

  it('displays the archive context', async () => {
    const wrapper = await mountSuspended(ArticlesPage)
    expect(wrapper.text()).toContain('/ARCHIVE/LOGS')
    expect(wrapper.text()).toContain('READ_ONLY')
  })

  it('has grid layout for articles', async () => {
    const wrapper = await mountSuspended(ArticlesPage)
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
  })
})