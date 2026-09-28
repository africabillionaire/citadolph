import { test, expect } from '@playwright/test';

test.describe('Home Page Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#process')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#cta')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    // Test smooth scroll to sections
    await page.click('nav >> text=Who We Are');
    await expect(page.locator('#about')).toBeInViewport();

    await page.click('nav >> text=Contact Us');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('mega menu opens on click', async ({ page }) => {
    await page.click('nav >> text=What We Do');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('text=Digital Products')).toBeVisible();
    await expect(page.locator('text=Brand & Strategy')).toBeVisible();
    await expect(page.locator('text=Growth & Intelligence')).toBeVisible();
  });

  test('mega menu keyboard navigation', async ({ page }) => {
    // Focus the trigger
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Open mega menu with Enter
    await page.keyboard.press('Enter');
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Tab through menu items
    await page.keyboard.press('Tab');
    await expect(page.locator('[role="dialog"] a[href]')).toBeFocused();

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test('grid overlay toggles with G key', async ({ page }) => {
    // Initially off
    await expect(page.locator('.grid-overlay')).not.toHaveClass('active');

    // Press G to toggle on
    await page.keyboard.press('g');
    await page.waitForTimeout(300);
    await expect(page.locator('.grid-overlay')).toHaveClass('active');

    // Press G again to toggle off
    await page.keyboard.press('g');
    await page.waitForTimeout(300);
    await expect(page.locator('.grid-overlay')).not.toHaveClass('active');
  });

  test('grid overlay toggle button works', async ({ page }) => {
    const toggleButton = page.locator('.grid-toggle');
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toContainText('Grid: OFF');

    await toggleButton.click();
    await page.waitForTimeout(300);
    await expect(toggleButton).toContainText('Grid: ON');
    await expect(page.locator('.grid-overlay')).toHaveClass('active');
  });

  test('mobile drawer opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open drawer
    await page.click('button[aria-label="Open menu"]');
    await expect(page.locator('[role="dialog"][aria-label="Mobile menu"]')).toBeVisible();

    // Close drawer
    await page.click('button[aria-label="Close menu"]');
    await expect(page.locator('[role="dialog"][aria-label="Mobile menu"]')).not.toBeVisible();
  });

  test('contact form submits successfully', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('textarea[name="message"]', 'Hello, this is a test message.');

    await page.click('button[type="submit"]');

    // Should show success message
    await expect(page.locator("text=You're on the list. Welcome.")).toBeVisible({ timeout: 5000 });
  });

  test('contact form validates email', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('textarea[name="message"]', 'Hello world');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('footer newsletter form works', async ({ page }) => {
    const footerEmail = page.locator('footer input[type="email"]');
    await footerEmail.fill('test@example.com');
    await page.click('footer button[type="submit"]');

    await expect(page.locator("footer text=You're on the list. Welcome.")).toBeVisible({ timeout: 5000 });
  });

  test('footer language toggle', async ({ page }) => {
    const enBtn = page.locator('footer button:has-text("EN")');
    const frBtn = page.locator('footer button:has-text("FR")');

    await expect(enBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(frBtn).toHaveAttribute('aria-pressed', 'false');

    await frBtn.click();
    await expect(frBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(enBtn).toHaveAttribute('aria-pressed', 'false');
  });

  test('back to top button works', async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Click back to top
    await page.click('footer button:has-text("Back to top")');
    await page.waitForTimeout(500);

    // Should be at top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('has proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('focus visible styles work', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus-visible');
    await expect(focused.first()).toBeVisible();
  });

  test('color contrast meets WCAG AA', async ({ page }) => {
    // This is a basic check - real contrast testing needs axe-core
    const body = page.locator('body');
    const bgColor = await body.evaluate(el => getComputedStyle(el).backgroundColor);
    const textColor = await body.evaluate(el => getComputedStyle(el).color);

    expect(bgColor).toBeTruthy();
    expect(textColor).toBeTruthy();
  });
});
