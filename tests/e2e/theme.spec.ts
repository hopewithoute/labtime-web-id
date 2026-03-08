import { expect, test, type Page } from '@playwright/test'

const waitForAppReady = async (page: Page) => {
  await page.waitForFunction(() => document.cookie.includes('booted=true'))
}

test.describe('Theme Toggle', () => {
  test('theme toggle button exists', async ({ page }) => {
    await page.goto('/')
    await waitForAppReady(page)
    const themeButton = page.locator('button:has-text("TOGGLE_THEME")')
    await expect(themeButton).toBeVisible()
  })

  test('clicking theme toggle changes theme', async ({ page }) => {
    await page.goto('/')
    await waitForAppReady(page)

    const html = page.locator('html')
    const initialClass = await html.getAttribute('class') || ''
    const isInitiallyDark = initialClass.includes('dark')

    await page.click('button:has-text("TOGGLE_THEME")')
    await page.waitForFunction(previousClass => document.documentElement.className !== previousClass, initialClass)

    const newClass = await html.getAttribute('class') || ''
    const isNowDark = newClass.includes('dark')

    expect(isNowDark).toBe(!isInitiallyDark)
  })

  test('theme persists on navigation', async ({ page }) => {
    await page.goto('/')
    await waitForAppReady(page)

    const html = page.locator('html')
    const initialClass = await html.getAttribute('class') || ''

    if (!initialClass.includes('dark')) {
      await page.click('button:has-text("TOGGLE_THEME")')
      await page.waitForFunction(previousClass => document.documentElement.className !== previousClass, initialClass)
    }

    await page.click('a[href="/articles"]')
    await page.waitForLoadState('networkidle')

    const newClass = await html.getAttribute('class') || ''
    expect(newClass).toContain('dark')
  })
})