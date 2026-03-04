import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('home page loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('LabTime')
  })

  test('navigate to articles page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/articles"]')
    await expect(page.locator('h1')).toContainText('Articles')
  })

  test('navigate to projects page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/projects"]')
    await expect(page.locator('h1')).toContainText('Projects')
  })

  test('navigate to resume page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/resume"]')
    await expect(page).toHaveURL('/resume')
  })

  test('back navigation works', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/articles"]')
    await expect(page).toHaveURL('/articles')
    await page.goBack()
    await expect(page).toHaveURL('/')
  })
})