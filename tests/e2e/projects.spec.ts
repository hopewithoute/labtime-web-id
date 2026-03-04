import { expect, test } from '@playwright/test'

test.describe('Projects', () => {
  test('projects list page loads', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.locator('h1')).toContainText('Projects')
    await expect(page.locator('body')).toContainText('Deep dives')
  })

  test('project detail page renders', async ({ page }) => {
    await page.goto('/projects/lms-sertifikasi')
    await expect(page.locator('article')).toBeVisible()
  })

  test('project has tech badges', async ({ page }) => {
    await page.goto('/projects/lms-sertifikasi')
    const badges = page.locator('.font-mono.uppercase')
    await expect(badges.first()).toBeVisible()
  })

  test('project sub-article renders', async ({ page }) => {
    await page.goto('/projects/lms-sertifikasi/optimizing-websocket-fanout')
    await expect(page.locator('article')).toBeVisible()
  })
})