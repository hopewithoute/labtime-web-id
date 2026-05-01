export default defineNuxtPlugin(() => {
  if (!process.client) return

  const { playClick, playHover } = useYorhaAudio()

  // Define what elements trigger sounds
  const selectors = 'a, button, [role="button"], [role="link"], .yorha-btn, .yorha-nav-item'

  // Click Handler
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    const interactiveEl = target.closest(selectors) as HTMLElement | null
    if (interactiveEl && !interactiveEl.hasAttribute('data-yorha-silent')) {
      playClick()
    }
  }, { capture: true, passive: true })

  // Hover Handler (using mouseover with delegation)
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    const interactiveEl = target.closest(selectors) as HTMLElement | null
    if (!interactiveEl || interactiveEl.hasAttribute('data-yorha-silent')) return

    // Ensure we only trigger sound when entering the element, not moving between children
    const relatedTarget = e.relatedTarget as HTMLElement | null
    if (relatedTarget && interactiveEl.contains(relatedTarget)) return

    playHover()
  }, { capture: true, passive: true })
})
