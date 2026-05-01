import { expect, test } from '@playwright/test'

async function skipBootSequence(page: import('@playwright/test').Page) {
  await page.context().addCookies([
    {
      name: 'booted',
      value: 'true',
      url: 'http://localhost:3000',
    },
  ])
}

test.describe('YorhaPanel links', () => {
  test('project cards render as real anchors and navigate', async ({ page }) => {
    await skipBootSequence(page)
    await page.goto('/projects')

    const card = page.locator('a.yorha-panel[href^="/projects/"]').first()

    await expect(card).toBeVisible()

    const href = await card.getAttribute('href')
    expect(href).toBeTruthy()

    await card.click()
    await expect(page).toHaveURL(new RegExp(`${href}/?$`))
  })

  test('article cards opt into hover inversion styles', async ({ page }) => {
    await skipBootSequence(page)
    await page.goto('/articles')

    const card = page.locator('a.yorha-panel').first()

    await expect(card).toBeVisible()

    await expect(card).toHaveClass(/hover:bg-foreground/)
    await expect(card).toHaveClass(/hover:text-background/)
  })

  test('home recent logs hover stays isolated to the active item', async ({ page }) => {
    await skipBootSequence(page)
    await page.goto('/')

    const recentLogs = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Recent Logs' }),
    })

    const items = recentLogs.locator('a:has(h3)')
    const firstTitle = items.nth(0).locator('h3')
    const secondTitle = items.nth(1).locator('h3')

    await expect(firstTitle).toBeVisible()
    await expect(secondTitle).toBeVisible()

    const secondBefore = await secondTitle.evaluate((element) => getComputedStyle(element).color)

    await items.nth(0).hover()

    const firstAfter = await firstTitle.evaluate((element) => getComputedStyle(element).color)
    const secondAfter = await secondTitle.evaluate((element) => getComputedStyle(element).color)

    expect(firstAfter).not.toBe(secondBefore)
    expect(secondAfter).toBe(secondBefore)
  })
})
