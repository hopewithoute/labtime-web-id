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

  test('project article code blocks show highlighted syntax metadata', async ({ page }) => {
    await page.goto('/projects/lms-sertifikasi/chat-architecture-scaling')

    const codeBlock = page.locator('article pre.language-elixir').first()
    await expect(codeBlock).toBeVisible()
    await expect(codeBlock).toHaveClass(/shiki/)

    const highlightedTokenCount = await codeBlock.locator('code span').count()
    expect(highlightedTokenCount).toBeGreaterThan(0)
  })

  test('regular article code blocks show highlighted syntax metadata', async ({ page }) => {
    await page.goto('/articles/02-code-highlighting-example')

    const codeBlock = page.locator('article pre.language-css').first()
    await expect(codeBlock).toBeVisible()
    await expect(codeBlock).toHaveClass(/shiki/)

    const highlightedTokenCount = await codeBlock.locator('code span').count()
    expect(highlightedTokenCount).toBeGreaterThan(0)
  })
})