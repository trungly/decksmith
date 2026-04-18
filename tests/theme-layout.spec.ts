import { expect, test } from "@playwright/test";

const deckKeys = [
  "startup",
  "executive",
  "technical",
  "editorial",
  "air",
  "cinematic",
  "playful",
  "obsidian",
] as const;

test.describe("theme layout regression", () => {
  for (const key of deckKeys) {
    test(`${key}: first slide stays in-bounds and visually balanced`, async ({
      page,
    }) => {
      await page.goto("/?size=L");

      await page
        .getByRole("button", { name: "Choose presentation deck" })
        .click();

      const select = page.getByRole("combobox", {
        name: "Select presentation deck",
      });
      await select.selectOption(key);

      const currentSlide = page.locator(".slide.current");
      await expect(currentSlide).toBeVisible();

      // Use layout metrics first to catch clipping before visual diffing.
      const metrics = await page.evaluate(() => {
        const slide = document.querySelector<HTMLElement>(".slide.current");
        if (!slide) {
          throw new Error("No active slide found.");
        }

        const slideRect = slide.getBoundingClientRect();
        const children = Array.from(slide.children).filter(
          (node): node is HTMLElement => node instanceof HTMLElement,
        );

        let minTop = slideRect.bottom;
        let maxBottom = slideRect.top;

        for (const child of children) {
          const rect = child.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) continue;
          minTop = Math.min(minTop, rect.top);
          maxBottom = Math.max(maxBottom, rect.bottom);
        }

        const topWhitespace = Math.max(0, minTop - slideRect.top);
        const bottomWhitespace = Math.max(0, slideRect.bottom - maxBottom);

        return {
          slideHeight: slide.clientHeight,
          scrollOverflowY: slide.scrollHeight - slide.clientHeight,
          scrollOverflowX: slide.scrollWidth - slide.clientWidth,
          topWhitespace,
          bottomWhitespace,
        };
      });

      expect(
        metrics.scrollOverflowY,
        `${key} overflows vertically`,
      ).toBeLessThanOrEqual(2);
      expect(
        metrics.scrollOverflowX,
        `${key} overflows horizontally`,
      ).toBeLessThanOrEqual(2);

      const whitespaceGap = Math.abs(
        metrics.topWhitespace - metrics.bottomWhitespace,
      );
      // Keep vertical composition reasonably centered without being overly strict.
      expect(
        whitespaceGap,
        `${key} appears vertically off-center`,
      ).toBeLessThanOrEqual(metrics.slideHeight * 0.22);

      // Visual regression snapshot per theme.
      await expect(currentSlide).toHaveScreenshot(`${key}-first-slide.png`, {
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
