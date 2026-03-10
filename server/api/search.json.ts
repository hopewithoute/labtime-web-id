import { queryCollection } from '@nuxt/content/server'
import { cachedEventHandler } from 'nitropack/runtime'

interface SearchPayloadItem {
  path: string
  title: string
  description: string
  tags: string[]
  _type: 'project' | 'article' | 'projectArticle'
  _parentProject?: string
}

function toSearchPayloadItem(
  item: {
    path: string
    title?: string
    description?: string
    tags?: string[]
  },
  type: SearchPayloadItem['_type'],
  parentProject?: string,
): SearchPayloadItem {
  const payload: SearchPayloadItem = {
    path: item.path,
    title: item.title || '',
    description: item.description || '',
    tags: item.tags || [],
    _type: type,
  }

  if (parentProject) {
    payload._parentProject = parentProject
  }

  return payload
}

export default cachedEventHandler(
  async (event) => {
    const [projects, articles, projectArticles] = await Promise.all([
      queryCollection(event, 'projects').order('date', 'DESC').all(),
      queryCollection(event, 'articles')
        .order('date', 'DESC')
        .all(),
      queryCollection(event, 'projectArticles')
        .where('stem', 'NOT LIKE', '%/index')
        .order('date', 'DESC')
        .all(),
    ])

    const projectMap = Object.fromEntries(
      projects.map((project) => [
        project.path.replace('/projects/', ''),
        project.title || '',
      ]),
    )

    return [
      ...projects.map((project) => toSearchPayloadItem(project, 'project')),
      ...articles.map((article) => toSearchPayloadItem(article, 'article')),
      ...projectArticles.map((projectArticle) => {
        const parentSlug = projectArticle.path.split('/')[2] || ''
        const parentProject = projectMap[parentSlug] || parentSlug

        return toSearchPayloadItem(
          projectArticle,
          'projectArticle',
          parentProject,
        )
      }),
    ] satisfies SearchPayloadItem[]
  },
  {
    maxAge: 60 * 60,
    swr: true,
    name: 'search-payload',
  },
)
