import { test, expect } from '@playwright/test';

test('App loads and navigation works', async ({ page }) => {
  await page.goto('/');
  // Expect page title to contain 'Decksmith'
  await expect(page).toHaveTitle(/Decksmith/);
});

test('Switching decks works', async ({ page }) => {
  await page.goto('/');
  const select = page.locator('select');
  await select.selectOption('executive');
  // Confirm executive-enterprise-roadmap content is visible
  await expect(page.getByText('Modernization Roadmap 2026')).toBeVisible();
});

test('edge navigation controls are semantically disabled', async ({ page }) => {
  await page.goto('/');
  const left = page.locator('.control-left');
  const up = page.locator('.control-up');
  const right = page.locator('.control-right');

  await expect(left).toBeDisabled();
  await expect(up).toBeDisabled();
  await expect(right).toBeEnabled();
});

test('disabled control cannot navigate via keyboard activation', async ({ page }) => {
  await page.goto('/');
  const left = page.locator('.control-left');
  await left.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Decksmith AI' })).toBeVisible();
});

test('overview traps focus and restores previous focus on close', async ({ page }) => {
  await page.goto('/');
  const select = page.locator('select');
  await select.focus();

  await page.keyboard.press('Escape');
  const overview = page.locator('.deck-overview');
  await expect(overview).toBeVisible();

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const focusStaysInsideOverview = await page.evaluate(() => {
    const active = document.activeElement;
    return !!active?.closest('.deck-overview');
  });
  expect(focusStaysInsideOverview).toBe(true);

  await page.keyboard.press('Escape');
  await expect(overview).toBeHidden();
  await expect(select).toBeFocused();
});

test('overview closes with backdrop click', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Escape');
  const overview = page.locator('.deck-overview');
  await expect(overview).toBeVisible();
  await overview.click({ position: { x: 8, y: 8 } });
  await expect(overview).toBeHidden();
});

test('slides expose normalized zero-based data coordinates', async ({ page }) => {
  await page.goto('/');
  const firstSlide = page.locator('.deck-slides .slide').first();
  await expect(firstSlide).toHaveAttribute('data-h', '0');
  await expect(firstSlide).toHaveAttribute('data-v', '0');
});
