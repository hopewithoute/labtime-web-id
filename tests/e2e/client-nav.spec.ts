import { test } from '@playwright/test';

test('client side navigation to sub article', async ({ page }) => {
    console.log('Navigating to project index...');
    await page.goto('http://localhost:3000/projects/digital-school');

    // Wait for the articles list
    await page.waitForSelector('text=ARCH_DECISION_RECORDS');

    // Click the link to ops-guardrails (or pick the first ADR)
    console.log('Clicking the link to the sub article...');
    await page.click('text=Guardrails, not hope'); // from the frontmatter title

    // wait for the article content to load
    await page.waitForSelector('article');

    console.log('Checking for images in prose after client navigation...');
    const imgs = await page.locator('div.article-prose img').all();
    console.log(`Found ${imgs.length} images.`);

    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        const src = await img.getAttribute('src');
        const isVisible = await img.isVisible();
        const box = await img.boundingBox();

        console.log(`\nImage ${i + 1}:`);
        console.log(`  src: ${src}`);
        console.log(`  visible: ${isVisible}`);
        console.log(`  box: ${JSON.stringify(box)}`);
    }
});
