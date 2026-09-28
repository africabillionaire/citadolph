import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Wait for fonts to load
    await page.waitForFunction(() => document.fonts.ready);
  });

  test('full page screenshot @visual', async ({ page }) => {
    await expect(page).toHaveScreenshot('home-full-page.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('hero section screenshot @visual', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toHaveScreenshot('hero-section.png', {
      animations: 'disabled',
    });
  });

  test('services section screenshot @visual', async ({ page }) => {
    const services = page.locator('#services');
    await expect(services).toHaveScreenshot('services-section.png', {
      animations: 'disabled',
    });
  });

  test('process section screenshot @visual', async ({ page }) => {
    const process = page.locator('#process');
    await expect(process).toHaveScreenshot('process-section.png', {
      animations: 'disabled',
    });
  });

  test('about section screenshot @visual', async ({ page }) => {
    const about = page.locator('#about');
    await expect(about).toHaveScreenshot('about-section.png', {
      animations: 'disabled',
    });
  });

  test('cta section screenshot @visual', async ({ page }) => {
    const cta = page.locator('#cta');
    await expect(cta).toHaveScreenshot('cta-section.png', {
      animations: 'disabled',
    });
  });

  test('contact section screenshot @visual', async ({ page }) => {
    const contact = page.locator('#contact');
    await expect(contact).toHaveScreenshot('contact-section.png', {
      animations: 'disabled',
    });
  });

  test('footer screenshot @visual', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Visual Regression - Grid Overlay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => document.fonts.ready);
  });

  test('grid overlay OFF @visual', async ({ page }) => {
    await expect(page).toHaveScreenshot('grid-off.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('grid overlay ON @visual', async ({ page }) => {
    await page.keyboard.press('g');
    await page.waitForTimeout(300); // Wait for transition
    await expect(page).toHaveScreenshot('grid-on.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

test.describe('Visual Regression - Responsive', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
    { name: 'wide', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`home page at ${vp.name} (${vp.width}x${vp.height}) @visual`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForFunction(() => document.fonts.ready);

      await expect(page).toHaveScreenshot(`home-${vp.name}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});

test.describe('Visual Regression - Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => document.fonts.ready);
  });

  test('home page dark mode @visual', async ({ page }) => {
    await expect(page).toHaveScreenshot('home-dark-mode.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});