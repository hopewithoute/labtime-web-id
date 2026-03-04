import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        articles: defineCollection({
            type: 'page',
            source: 'articles/**/*.md',
        }),
        projects: defineCollection({
            type: 'page',
            source: 'projects/**/index.md',
        }),
        projectArticles: defineCollection({
            type: 'page',
            source: 'projects/**/*.md',
        }),
        content: defineCollection({
            type: 'page',
            source: '**/*.md',
        }),
    },
})
