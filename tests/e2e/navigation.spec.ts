import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('home page loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('LabTime')
  })

  test('mobile menu opens and navigates without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const menuButton = page.getByRole('button', { name: 'Open navigation menu' })

    await expect(menuButton).toBeVisible()
    await menuButton.click()
    await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible()
    await page.getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL('/projects')
  })

  test('mobile search action shows keyboard shortcut hint', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    await page.getByRole('button', { name: 'Open navigation menu' }).click()

    const searchButton = page.getByRole('button', { name: 'Search' })

    await expect(searchButton).toBeVisible()
    await expect(searchButton).toContainText('⌘K')
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