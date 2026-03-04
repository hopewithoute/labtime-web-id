export function formatDate(dateString: string | Date | undefined): string {
    if (!dateString) return ''

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return String(dateString)

    // Format explicitly as "Mar 01, 2026"
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })

    return formatter.format(date)
}
