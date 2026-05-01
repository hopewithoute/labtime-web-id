import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('home page loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Systems Built' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Recent Logs' })).toBeVisible()
  })

  test('mobile menu opens and navigates without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForFunction(() => document.cookie.includes('booted=true'))

    const menuButton = page.getByRole('button', { name: 'Open navigation menu' })

    await expect(menuButton).toBeVisible()
    await menuButton.click()
    await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible()
    await page.getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL('/projects')
    await expect(page.getByRole('heading', { name: 'Systems Built' })).toBeVisible()
  })

  test('mobile search action shows keyboard shortcut hint', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForFunction(() => document.cookie.includes('booted=true'))

    await page.getByRole('button', { name: 'Open navigation menu' }).click()

    const searchButton = page.getByRole('button', { name: 'SEARCH' })

    await expect(searchButton).toBeVisible()
    await expect(searchButton).toContainText('⌘K')
  })

  test('search opens and returns results', async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => document.cookie.includes('booted=true'))
    await expect(page.locator('button[aria-controls="mobile-navigation-drawer"]')).toHaveCount(1)
    await expect(page.getByRole('button', { name: '[ SEARCH ⌘K ]' })).toBeVisible()
    await page.getByRole('button', { name: '[ SEARCH ⌘K ]' }).click()

    const input = page.getByPlaceholder("grep -i 'query' ~/content/*")
    await expect(input).toBeVisible()
    await input.fill('cloudflare')

    await expect(page.getByRole('option', {
      name: 'LMS Certification Platform / Authenticating HLS streaming at the edge How I designed a stateless media gateway that secures segmented video playback with edge-side token verification instead of per-request backend authorization.',
    })).toBeVisible()
  })

  test('navigate to articles page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/articles"]')
    await expect(page.getByRole('heading', { name: 'System Logs' })).toBeVisible()
  })

  test('navigate to projects page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/projects"]')
    await expect(page.getByRole('heading', { name: 'Systems Built' })).toBeVisible()
  })

  test('navigate to resume page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/resume"]')
    await expect(page).toHaveURL('/resume')
  })

  test('resume page exposes ATS route access', async ({ page }) => {
    await page.goto('/resume')

    const atsLink = page.locator('a[href="/resume/ats"]')
    const atsLabel = atsLink.locator('span').last()
    const exportLink = page.locator('a[href="/resume"]').filter({ hasText: 'Export PDF Resume' })

    await expect(atsLink).toBeVisible()
    await expect(atsLabel).toHaveText('Open ATS')
    await expect(exportLink).toBeVisible()
    await expect(exportLink).toContainText('Export PDF Resume')

    const atsBox = await atsLink.boundingBox()
    const exportBox = await exportLink.boundingBox()

    expect(atsBox).not.toBeNull()
    expect(exportBox).not.toBeNull()
    expect(atsBox!.y).toBeLessThan(exportBox!.y)

    await atsLink.click()
    await expect(page).toHaveURL('/resume/ats')
    await expect(page.getByRole('heading', { name: 'Anggi Wibiyanto' })).toBeVisible()
    await expect(page.getByText('anggi.wibiyanto@gmail.com')).toBeVisible()
  })

  test('back navigation works', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/articles"]')
    await expect(page).toHaveURL('/articles')
    await page.goBack()
    await expect(page).toHaveURL('/')
  })
})
