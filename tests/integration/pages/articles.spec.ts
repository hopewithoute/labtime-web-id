import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ArticlesPage from '~/pages/articles/index.vue'

const mountArticlesPage = () => mountSuspended(ArticlesPage)

describe('Articles Page', () => {
  it('renders the page component', async () => {
    const wrapper = await mountArticlesPage()
    expect(wrapper.text()).toContain('System Logs')
  })

  it('renders the diagnostic panel content', async () => {
    const wrapper = await mountArticlesPage()
    expect(wrapper.text()).toContain('SYS_MONITOR')
    expect(wrapper.text()).toContain('Activity Log')
  })

  it('renders archive diagnostics without waiting for runtime timers', async () => {
    const wrapper = await mountArticlesPage()
    const text = wrapper.text()

    expect(text).toContain('SYS_MONITOR')
    expect(text).toContain('0x00FFa1')
    expect(text).toContain('active [8/8]')
    expect(text).toContain('Querying archive shards...')
    expect(text).toContain('Manifest validation: OK')
    expect(text).toContain('Decrypting metadata headers...')
    expect(text).toContain('Index compilation successful.')
    expect(text).toContain('Awaiting operator input_')
  })

  it('displays the archive context', async () => {
    const wrapper = await mountArticlesPage()
    expect(wrapper.text()).toContain('/ARCHIVE/LOGS')
    expect(wrapper.text()).toContain('READ_ONLY')
  })

  it('has grid layout for articles', async () => {
    const wrapper = await mountArticlesPage()
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
  })
})
