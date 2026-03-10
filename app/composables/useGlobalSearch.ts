import { ref, watch, type Ref, type WatchStopHandle } from 'vue'
import { watchDebounced } from '@vueuse/core'
import Fuse from 'fuse.js'

export interface SearchableItem {
  path: string
  title: string
  description: string
  tags?: string[]
  stem?: string
  _type: 'project' | 'article' | 'projectArticle'
  _parentProject?: string
}

export interface GroupedResults {
  projects: SearchableItem[]
  articles: SearchableItem[]
  projectArticles: SearchableItem[]
}

interface UseGlobalSearchOptions {
  preparedItems?: Ref<SearchableItem[] | null | undefined>
}

const emptyResults = (): GroupedResults => ({
  projects: [],
  articles: [],
  projectArticles: [],
})

const isOpen = ref(false)
const query = ref('')
const results: Ref<GroupedResults> = ref(emptyResults())
const isLoaded = ref(false)

let fuseIndex: Fuse<SearchableItem> | null = null
let searchWatcherStop: WatchStopHandle | null = null
let preparedItemsWatcherStop: WatchStopHandle | null = null
let activePreparedItemsRef: Ref<SearchableItem[] | null | undefined> | null = null

function buildIndex(items: SearchableItem[]) {
  fuseIndex = new Fuse(items, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'tags', weight: 1.5 },
      { name: 'description', weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  })
}

function search(q: string) {
  if (!fuseIndex || !q.trim()) {
    results.value = emptyResults()
    return
  }

  const fuseResults = fuseIndex.search(q, { limit: 15 })
  const grouped = emptyResults()

  for (const { item } of fuseResults) {
    if (item._type === 'project') grouped.projects.push(item)
    else if (item._type === 'article') grouped.articles.push(item)
    else if (item._type === 'projectArticle') grouped.projectArticles.push(item)
  }

  results.value = grouped
}

function applyPreparedItems(items: SearchableItem[] | null | undefined) {
  if (!items?.length) {
    fuseIndex = null
    isLoaded.value = false
    results.value = emptyResults()
    return
  }

  buildIndex(items)
  isLoaded.value = true
  search(query.value)
}

function initializeSearchWatcher() {
  if (searchWatcherStop) return

  searchWatcherStop = watchDebounced(query, (q) => search(q), { debounce: 150 })
}

function stopPreparedItemsWatcher() {
  preparedItemsWatcherStop?.()
  preparedItemsWatcherStop = null
  activePreparedItemsRef = null
}

function initializePreparedItemsWatcher(
  preparedItems?: Ref<SearchableItem[] | null | undefined>,
) {
  if (!preparedItems) {
    stopPreparedItemsWatcher()
    return
  }

  if (activePreparedItemsRef === preparedItems && preparedItemsWatcherStop) return

  stopPreparedItemsWatcher()
  activePreparedItemsRef = preparedItems
  preparedItemsWatcherStop = watch(preparedItems, (items) => {
    applyPreparedItems(items)
  }, { immediate: true })
}

export function useGlobalSearch(options: UseGlobalSearchOptions = {}) {
  initializeSearchWatcher()
  initializePreparedItemsWatcher(options.preparedItems)

  function setPreparedItems(items: SearchableItem[] | null | undefined) {
    applyPreparedItems(items)
  }

  async function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    query.value = ''
    results.value = emptyResults()
  }

  return { isOpen, query, results, open, close, isLoaded, setPreparedItems }
}

export function resetGlobalSearchForTests() {
  searchWatcherStop?.()
  searchWatcherStop = null
  stopPreparedItemsWatcher()
  isOpen.value = false
  query.value = ''
  results.value = emptyResults()
  isLoaded.value = false
  fuseIndex = null
}
