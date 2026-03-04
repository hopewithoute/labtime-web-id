import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ArticlesPage from '~/pages/articles/index.vue'

describe('Articles Page', () => {
  it('renders the page component', async () => {
    const wrapper = await mountSuspended(ArticlesPage)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('displays the Articles title', async () => {
    const wrapper = await mountSuspended(ArticlesPage)
    expect(wrapper.text()).toContain('Articles')
  })

  it('displays the description', async () => {
    const wrapper = await mountSuspended(ArticlesPage)
    expect(wrapper.text()).toContain('Short-form notes, tutorials, and development logs')
  })

  it('has grid layout for articles', async () => {
    const wrapper = await mountSuspended(ArticlesPage)
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
  })
})