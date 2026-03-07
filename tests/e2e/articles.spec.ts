import { expect, test } from '@playwright/test'

test.describe('Articles', () => {
  test('articles list page loads', async ({ page }) => {
    await page.goto('/articles')
    await expect(page.getByRole('heading', { name: 'System Logs' })).toBeVisible()
    await expect(page.locator('body')).toContainText('SYS_MONITOR')
  })

  test('article page renders content', async ({ page }) => {
    await page.goto('/articles/01-example-article')
    await expect(page.locator('article')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Understanding CSS in Modern UI Frameworks' })).toBeVisible()
  })

  test('article has readable content', async ({ page }) => {
    await page.goto('/articles/01-example-article')
    const content = page.locator('article .prose')
    await expect(content).toBeVisible()
  })
})