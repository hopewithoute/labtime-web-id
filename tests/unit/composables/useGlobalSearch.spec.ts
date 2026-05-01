import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import {
  resetGlobalSearchForTests,
  type SearchableItem,
  useGlobalSearch,
} from '~/composables/useGlobalSearch'

const waitForDebounce = async () => {
  await vi.advanceTimersByTimeAsync(160)
  await nextTick()
}

describe('useGlobalSearch', () => {
  const mockItems: SearchableItem[] = [
    {
      path: '/projects/lms-sertifikasi',
      title: 'LMS Certification Platform',
      description: 'A learning management system',
      tags: ['elixir', 'react'],
      stem: 'projects/lms-sertifikasi/index',
      _type: 'project',
    },
    {
      path: '/articles/understanding-css',
      title: 'Understanding CSS',
      description: 'A deep dive into CSS',
      tags: ['css', 'frontend'],
      stem: 'articles/understanding-css',
      _type: 'article',
    },
    {
      path: '/projects/lms-sertifikasi/chat-architecture-scaling',
      title: 'Chat Architecture',
      description: 'How we scaled chat',
      tags: ['elixir', 'phoenix'],
      stem: 'projects/lms-sertifikasi/chat-architecture-scaling',
      _type: 'projectArticle',
      _parentProject: 'LMS Certification Platform',
    },
  ]

  beforeEach(() => {
    resetGlobalSearchForTests()
    vi.useFakeTimers()
    vi.unstubAllGlobals()
  })

  it('exports closed state with empty query and results by default', () => {
    const { isOpen, query, results, isLoaded } = useGlobalSearch()

    expect(isOpen.value).toBe(false)
    expect(query.value).toBe('')
    expect(isLoaded.value).toBe(false)
    expect(results.value).toEqual({
      projects: [],
      articles: [],
      projectArticles: [],
    })
  })

  it('opens without triggering content queries and uses prepared items when provided', async () => {
    const preparedItems = ref<SearchableItem[] | null>(mockItems)
    const queryCollectionMock = vi.fn()
    vi.stubGlobal('queryCollection', queryCollectionMock)

    const { open, isOpen, isLoaded } = useGlobalSearch({ preparedItems })

    await open()

    expect(isOpen.value).toBe(true)
    expect(isLoaded.value).toBe(true)
    expect(queryCollectionMock).not.toHaveBeenCalled()
  })

  it('groups results by item type from the prepared index', async () => {
    const preparedItems = ref<SearchableItem[] | null>(mockItems)
    const { query, results } = useGlobalSearch({ preparedItems })

    query.value = 'elixir'
    await waitForDebounce()

    expect(results.value.projects).toHaveLength(1)
    expect(results.value.projects[0]?.title).toBe('LMS Certification Platform')
    expect(results.value.articles).toHaveLength(0)
    expect(results.value.projectArticles).toHaveLength(1)
    expect(results.value.projectArticles[0]?._parentProject).toBe('LMS Certification Platform')
  })

  it('rebuilds the index when prepared items change', async () => {
    const preparedItems = ref<SearchableItem[] | null>([])
    const { query, results, isLoaded } = useGlobalSearch({ preparedItems })

    expect(isLoaded.value).toBe(false)

    preparedItems.value = mockItems
    await nextTick()

    expect(isLoaded.value).toBe(true)

    query.value = 'css'
    await waitForDebounce()

    expect(results.value.articles).toHaveLength(1)
    expect(results.value.articles[0]?.title).toBe('Understanding CSS')
  })

  it('rebinds to a new prepared items ref on repeated initialization', async () => {
    const firstPreparedItems = ref<SearchableItem[] | null>(mockItems)
    const secondPreparedItems = ref<SearchableItem[] | null>([
      {
        path: '/articles/runtime-cloudflare',
        title: 'Runtime on Cloudflare',
        description: 'Notes on the runtime move',
        tags: ['cloudflare'],
        stem: 'articles/runtime-cloudflare',
        _type: 'article',
      },
    ])

    useGlobalSearch({ preparedItems: firstPreparedItems })
    const { query, results } = useGlobalSearch({ preparedItems: secondPreparedItems })

    query.value = 'cloudflare'
    await waitForDebounce()

    expect(results.value.projects).toHaveLength(0)
    expect(results.value.projectArticles).toHaveLength(0)
    expect(results.value.articles).toHaveLength(1)
    expect(results.value.articles[0]?.title).toBe('Runtime on Cloudflare')

    firstPreparedItems.value = []
    await nextTick()
    await waitForDebounce()

    expect(results.value.articles).toHaveLength(1)
    expect(results.value.articles[0]?.title).toBe('Runtime on Cloudflare')
  })

  it('keeps prepared items active when another consumer initializes without prepared items', async () => {
    const preparedItems = ref<SearchableItem[] | null>([
      {
        path: '/articles/runtime-cloudflare',
        title: 'Runtime on Cloudflare',
        description: 'Notes on the runtime move',
        tags: ['cloudflare'],
        stem: 'articles/runtime-cloudflare',
        _type: 'article',
      },
    ])

    useGlobalSearch({ preparedItems })
    const { query, results } = useGlobalSearch()

    query.value = 'cloudflare'
    await waitForDebounce()

    expect(results.value.articles).toHaveLength(1)
    expect(results.value.articles[0]?.title).toBe('Runtime on Cloudflare')
  })

  it('clears query and grouped results when closed', async () => {
    const preparedItems = ref<SearchableItem[] | null>(mockItems)
    const { query, results, close } = useGlobalSearch({ preparedItems })

    query.value = 'chat'
    await waitForDebounce()
    expect(results.value.projectArticles).toHaveLength(1)

    close()

    expect(query.value).toBe('')
    expect(results.value).toEqual({
      projects: [],
      articles: [],
      projectArticles: [],
    })
  })
})
