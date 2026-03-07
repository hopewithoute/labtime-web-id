import { expect, test } from '@playwright/test'

test.describe('Projects', () => {
  test('projects list page loads', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByRole('heading', { name: 'Systems Built' })).toBeVisible()
    await expect(page.locator('body')).toContainText('Topology_Map')
  })

  test('project detail page renders', async ({ page }) => {
    await page.goto('/projects/lms-sertifikasi')
    await expect(page.locator('article')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'LMS Sertifikasi' })).toBeVisible()
  })

  test('project has tech badges', async ({ page }) => {
    await page.goto('/projects/lms-sertifikasi')
    const badges = page.locator('[title="stack_module"]')
    await expect(badges.first()).toBeVisible()
  })

  test('project sub-article renders', async ({ page }) => {
    await page.goto('/projects/lms-sertifikasi/chat-architecture-scaling')
    await expect(page.locator('article')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Chat at certification scale' })).toBeVisible()
  })
})