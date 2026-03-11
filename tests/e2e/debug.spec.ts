import { test } from '@playwright/test';

test('debug image visibility', async ({ page }) => {
    console.log('Navigating to local dev server...');
    await page.goto('http://localhost:3000/projects/digital-school/ops-guardrails');

    // Wait for content
    await page.waitForSelector('article');

    console.log('Checking for images in prose...');
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

        // Get computed styles
        const styles = await img.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
                display: computed.display,
                visibility: computed.visibility,
                opacity: computed.opacity,
                width: computed.width,
                height: computed.height,
                position: computed.position
            };
        });
        console.log(`  computed styles:`, styles);
    }
});
