import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile-se', width: 375, height: 667 },
  { name: 'mobile-modern', width: 390, height: 844 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop-fhd', width: 1920, height: 1080 },
  { name: 'ultrawide', width: 3440, height: 1440 },
];

for (const vp of VIEWPORTS) {
  test(`renders responsive 3D room at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');

    // Verify main room title is rendered in HUD
    const titleBadge = page.locator('text=The Waiting Room');
    await expect(titleBadge).toBeVisible();

    // Verify Canvas element exists
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Ensure no scrollbars
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    // Test interaction: click Vending Machine to open projects modal
    const inspectVendingBtn = page.getByRole('button', { name: /Inspect Vending Machine/i });
    if (await inspectVendingBtn.isVisible()) {
      await inspectVendingBtn.click();
      const modalHeader = page.locator('text=Vending Machine: Projects');
      await expect(modalHeader).toBeVisible();

      // Close modal
      const closeBtn = page.getByRole('button', { name: /Close dialog/i });
      await closeBtn.click();
      await expect(modalHeader).not.toBeVisible();
    }

    // Save screenshot artifact for verification
    await page.screenshot({ path: `playwright-screenshots/${vp.name}.png` });
  });
}

test('renders 404 page for unknown routes', async ({ page }) => {
  await page.goto('/unknown-route-123');
  const notFoundHeading = page.locator('text=404: Room Not Found');
  await expect(notFoundHeading).toBeVisible();
});
