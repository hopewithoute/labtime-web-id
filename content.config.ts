import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        articles: defineCollection({
            type: 'page',
            source: 'articles/**/*.md',
            schema: z.object({
                date: z.string(),
                tags: z.array(z.string()).optional(),
                category: z.string().optional(),
            }),
        }),
        projects: defineCollection({
            type: 'page',
            source: 'projects/**/index.md',
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
            source: 'projects/**/*.md',
            schema: z.object({
                date: z.string(),
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
        content: defineCollection({
            type: 'page',
            source: '**/*.md',
            schema: z.object({
                date: z.string(),
                tags: z.array(z.string()).optional(),
                category: z.string().optional(),
                role: z.string().optional(),
            }),
        }),
    },
})
