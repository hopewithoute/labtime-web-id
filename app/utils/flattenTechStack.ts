

/**
 * Flatten a grouped tech_stack object into an array of tech names.
 * Used for badge rendering on project list/card views.
 */
export function flattenTechStack(techStack: unknown): string[] {
    if (!techStack) return []
    // Backward compat: if already a flat array, return as-is
    if (Array.isArray(techStack)) return techStack as string[]

    if (typeof techStack === 'object') {
        return Object.values(techStack).flatMap(items =>
            Array.isArray(items) ? items.map(item => item?.name).filter(Boolean) : []
        ) as string[]
    }

    return []
}
