import { test, expect } from '@playwright/test';

test('App loads and navigation works', async ({ page }) => {
  await page.goto('/');
  // Expect title to contain 'Startup' since that's the default in App.svelte
  await expect(page).toHaveTitle(/Decksmith/);
});

test('Switching decks works', async ({ page }) => {
  await page.goto('/');
  const select = page.locator('select');
  await select.selectOption('executive');
  // Confirm executive-enterprise-roadmap content is visible
  await expect(page.getByText('Modernization Roadmap 2026')).toBeVisible();
});
