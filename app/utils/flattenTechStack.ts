interface TechItem {
    name: string
    reason: string
}

type TechStack = Record<string, TechItem[]>

/**
 * Flatten a grouped tech_stack object into an array of tech names.
 * Used for badge rendering on project list/card views.
 */
export function flattenTechStack(techStack: TechStack | string[] | undefined): string[] {
    if (!techStack) return []
    // Backward compat: if already a flat array, return as-is
    if (Array.isArray(techStack)) return techStack
    return Object.values(techStack).flatMap(items =>
        items.map(item => item.name)
    )
}
