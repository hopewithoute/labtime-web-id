import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        articles: defineCollection({
            type: 'page',
            source: 'articles/*.md', // Only top-level articles
            schema: z.object({
                date: z.string(),
                tags: z.array(z.string()).optional(),
                category: z.string().optional(),
            }),
        }),
        projects: defineCollection({
            type: 'page',
            source: 'projects/*/index.md', // Only project index files
            schema: z.object({
                date: z.string(),
                tags: z.array(z.string()).optional(),
                role: z.string().optional(),
                problem: z.string().optional(),
                approach: z.string().optional(),
                outcome: z.string().optional(),
                tech_stack: z.record(z.string(), z.array(z.object({
                    name: z.string(),
                    reason: z.string().optional()
                }))).optional(),
                screenshots: z.array(z.object({
                    src: z.string(),
                    alt: z.string().optional()
                })).optional(),
            }),
        }),
        projectArticles: defineCollection({
            type: 'page',
            source: {
                include: 'projects/**/*.md',
                exclude: ['projects/*/index.md'] // Exclude the parent project files
            },
            schema: z.object({
                date: z.string(),
                order: z.number().optional(),
                tags: z.array(z.string()).optional(),
                category: z.string().optional(),
                role: z.string().optional(),
                problem: z.string().optional(),
                approach: z.string().optional(),
                outcome: z.string().optional(),
                tech_stack: z.record(z.string(), z.array(z.object({
                    name: z.string(),
                    reason: z.string().optional()
                }))).optional(),
                screenshots: z.array(z.object({
                    src: z.string(),
                    alt: z.string().optional()
                })).optional(),
            }),
        }),
    },
})
