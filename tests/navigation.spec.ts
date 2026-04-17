import { expect, test, type Page } from "@playwright/test";

async function openDeckPicker(page: Page) {
  await page.getByRole("button", { name: "Choose presentation deck" }).click();
  return page.getByRole("combobox", { name: "Select presentation deck" });
}

test("App loads and shows the startup deck", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Decksmith/);
  await expect(page.getByRole("heading", { name: "Decksmith AI" })).toBeVisible();
});

test("deck picker is collapsed by default and switching decks works", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("combobox", { name: "Select presentation deck" }),
  ).toBeHidden();

  const select = await openDeckPicker(page);
  await select.selectOption("executive");

  await expect(
    page.getByRole("heading", { name: "Modernization Roadmap 2026" }),
  ).toBeVisible();
  await expect(select).toBeHidden();
});

test("deck picker can be dismissed without changing decks", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", {
    name: "Choose presentation deck",
  });

  await button.click();
  const select = page.getByRole("combobox", {
    name: "Select presentation deck",
  });
  await expect(select).toBeVisible();

  await button.click();
  await expect(select).toBeHidden();

  await button.click();
  await expect(select).toBeVisible();
  await select.press("Escape");
  await expect(select).toBeHidden();
  await expect(button).toBeFocused();
});

test("switching decks preserves keyboard navigation", async ({ page }) => {
  await page.goto("/");
  const select = await openDeckPicker(page);
  await select.selectOption("executive");

  await expect(
    page.getByRole("button", { name: "Choose presentation deck" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");

  await expect(
    page.getByRole("heading", { name: "Strategic Context" }),
  ).toBeVisible();
});

test("edge navigation controls reflect linear presentation flow", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator(".control-left")).toBeDisabled();
  await expect(page.locator(".control-up")).toBeDisabled();
  await expect(page.locator(".control-right")).toBeEnabled();
  await expect(page.locator(".control-down")).toBeEnabled();
});

test("visible controls follow the same linear flow as the keyboard", async ({
  page,
}) => {
  await page.goto("/");

  await page.locator(".control-down").click();
  await expect(page.getByRole("heading", { name: "The Problem" })).toBeVisible();

  await page.locator(".control-up").click();
  await expect(page.getByRole("heading", { name: "Decksmith AI" })).toBeVisible();
});

test("selected deck persists in the URL and survives reload", async ({
  page,
}) => {
  await page.goto("/");
  const select = await openDeckPicker(page);
  await select.selectOption("technical");

  await expect(page).toHaveURL(/deck=technical/);
  await page.reload();

  await expect(
    page.getByRole("heading", { name: "Modular Prompt Pipeline" }),
  ).toBeVisible();
});

test("overview still closes with backdrop click", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Escape");

  const overview = page.locator(".deck-overview");
  await expect(overview).toBeVisible();
  await overview.click({ position: { x: 8, y: 8 } });
  await expect(overview).toBeHidden();
});
