import { ref, watch, type Ref } from 'vue'
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

const isOpen = ref(false)
const query = ref('')
const results: Ref<GroupedResults> = ref({
    projects: [],
    articles: [],
    projectArticles: [],
})
const isLoaded = ref(false)

let fuseIndex: Fuse<SearchableItem> | null = null
let projectMap: Record<string, string> = {}

async function loadContent() {
    if (isLoaded.value) return

    const [projects, articles, projectArticles] = await Promise.all([
        queryCollection('projects').order('date', 'DESC').all(),
        queryCollection('articles').order('date', 'DESC').all(),
        queryCollection('projectArticles')
            .where('stem', 'NOT LIKE', '%/index')
            .order('date', 'DESC')
            .all(),
    ])

    // Build project slug → title map for parent context
    projectMap = {}
    for (const p of projects) {
        const slug = p.path.replace('/projects/', '')
        projectMap[slug] = p.title
    }

    const allItems: SearchableItem[] = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...projects.map((p: any) => ({
            path: p.path,
            title: p.title,
            description: p.description || '',
            tags: p.tags || [],
            stem: p.stem,
            _type: 'project' as const,
        })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...articles.map((a: any) => ({
            path: a.path,
            title: a.title,
            description: a.description || '',
            tags: a.tags || [],
            stem: a.stem,
            _type: 'article' as const,
        })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...projectArticles.map((pa: any) => {
            // Extract parent project slug from path: /projects/lms-sertifikasi/article-slug → lms-sertifikasi
            const parts = pa.path.split('/')
            const parentSlug = parts[2] || ''
            return {
                path: pa.path,
                title: pa.title,
                description: pa.description || '',
                tags: pa.tags || [],
                stem: pa.stem,
                _type: 'projectArticle' as const,
                _parentProject: projectMap[parentSlug] || parentSlug,
            }
        }),
    ]

    fuseIndex = new Fuse(allItems, {
        keys: [
            { name: 'title', weight: 2 },
            { name: 'tags', weight: 1.5 },
            { name: 'description', weight: 1 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
    })

    isLoaded.value = true
}

function search(q: string) {
    if (!fuseIndex || !q.trim()) {
        results.value = { projects: [], articles: [], projectArticles: [] }
        return
    }

    const fuseResults = fuseIndex.search(q, { limit: 15 })
    const grouped: GroupedResults = {
        projects: [],
        articles: [],
        projectArticles: [],
    }

    for (const r of fuseResults) {
        const item = r.item
        if (item._type === 'project') grouped.projects.push(item)
        else if (item._type === 'article') grouped.articles.push(item)
        else if (item._type === 'projectArticle')
            grouped.projectArticles.push(item)
    }

    results.value = grouped
}

export function useGlobalSearch() {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    watch(query, (q) => {
        if (debounceTimer) clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => search(q), 150)
    })

    async function open() {
        isOpen.value = true
        await loadContent()
    }

    function close() {
        isOpen.value = false
        query.value = ''
        results.value = { projects: [], articles: [], projectArticles: [] }
    }

    return { isOpen, query, results, open, close, isLoaded }
}
