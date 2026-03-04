import { expect, test } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test('theme toggle button exists', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.locator('button:has-text("TOGGLE_THEME")')
    await expect(themeButton).toBeVisible()
  })

  test('clicking theme toggle changes theme', async ({ page }) => {
    await page.goto('/')

    // Get initial theme from html class
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class') || ''
    const isInitiallyDark = initialClass.includes('dark')

    // Click theme toggle
    await page.click('button:has-text("TOGGLE_THEME")')

    // Wait for theme change
    await page.waitForTimeout(500)

    // Verify theme changed
    const newClass = await html.getAttribute('class') || ''
    const isNowDark = newClass.includes('dark')

    expect(isNowDark).toBe(!isInitiallyDark)
  })

  test('theme persists on navigation', async ({ page }) => {
    await page.goto('/')

    // Set theme to dark
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class') || ''

    if (!initialClass.includes('dark')) {
      await page.click('button:has-text("TOGGLE_THEME")')
      await page.waitForTimeout(500)
    }

    // Navigate to another page
    await page.click('a[href="/articles"]')
    await page.waitForLoadState('networkidle')

    // Verify dark theme persists
    const newClass = await html.getAttribute('class') || ''
    expect(newClass).toContain('dark')
  })
})