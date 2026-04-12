# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-layout.spec.ts >> theme layout regression >> editorial: first slide stays in-bounds and visually balanced
- Location: tests/theme-layout.spec.ts:16:5

# Error details

```
Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/editorial-first-slide-chromium-darwin.png, writing actual.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - combobox "Select presentation deck" [ref=e4]:
    - option "Startup Investor Pitch (Startup Theme)"
    - option "Enterprise Roadmap (Executive Theme)"
    - option "Technical Design Review (Technical Theme)"
    - option "Internal Strategy Memo (Editorial Theme)" [selected]
    - option "Workshop Training (Air Theme)"
    - option "Storytelling Keynote (Cinematic Theme)"
    - option "Educational Classroom (Playful Theme)"
    - option "DevOps Strategy (Obsidian Theme)"
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - heading "Strategic Pivot" [level=1] [ref=e8]
        - paragraph [ref=e9]: Growth vs. Product Depth
        - generic [ref=e10]: Founder Update | April 2026
      - generic [ref=e11]:
        - heading "The Current Dilemma" [level=2] [ref=e12]
        - generic [ref=e13]:
          - paragraph [ref=e14]: "We've reached product-market fit. Now, we face a critical choice:"
          - list [ref=e15]:
            - listitem [ref=e16]: Accelerate user acquisition via aggressive marketing
            - listitem [ref=e17]: Deepen the product moat with advanced AI integrations
      - generic [ref=e18]:
        - heading "Growth Initiative Options" [level=2] [ref=e19]
        - generic [ref=e20]:
          - generic [ref=e21]:
            - 'heading "Option A: Expansion" [level=4] [ref=e22]'
            - paragraph [ref=e23]: Launch enterprise tier and dedicated sales outbound.
            - paragraph [ref=e24]: "Cost: $50k/mo"
          - generic [ref=e25]:
            - 'heading "Option B: Innovation" [level=4] [ref=e26]'
            - paragraph [ref=e27]: Build the "Context Engine" for automated asset ingestion.
            - paragraph [ref=e28]: "Cost: $20k/mo"
      - generic [ref=e29]:
        - heading "Decision Criteria" [level=2] [ref=e30]
        - generic [ref=e31]:
          - paragraph [ref=e33]:
            - text: 📊
            - strong [ref=e34]: "Runway:"
            - text: Maintain >18 months of cash.
          - paragraph [ref=e36]:
            - text: 📈
            - strong [ref=e37]: "Defensibility:"
            - text: Can competition copy us in 6 months?
          - paragraph [ref=e39]:
            - text: 🚀
            - strong [ref=e40]: "Founder Passion:"
            - text: Where do I want to spend 80h/week?
      - generic [ref=e41]:
        - 'heading "Recommendation: Innovation First" [level=2] [ref=e42]'
        - paragraph [ref=e44]: "\"Build the platform that others can't ignore, then build the sales team that won't have to sell.\""
      - generic [ref=e45]:
        - heading "The 30-Day Plan" [level=2] [ref=e46]
        - generic [ref=e47]:
          - paragraph [ref=e48]:
            - text: 📅
            - strong [ref=e49]: "Week 1:"
            - text: Prototype Context Engine v1 (internal only)
          - paragraph [ref=e50]:
            - text: 📅
            - strong [ref=e51]: "Week 2:"
            - text: Design beta program for top 5% of power users
          - paragraph [ref=e52]:
            - text: 📅
            - strong [ref=e53]: "Week 4:"
            - text: First 'Context-Aware' deck live for beta users
    - generic [ref=e54]:
      - button "Previous horizontal slide":
        - img
      - button "Next horizontal slide" [ref=e55] [cursor=pointer]:
        - img [ref=e56]
      - button "Previous vertical slide":
        - img
      - button "Next vertical slide":
        - img
    - generic [ref=e60]: 1 / 6
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | const deckKeys = [
  4  |   "startup",
  5  |   "executive",
  6  |   "technical",
  7  |   "editorial",
  8  |   "air",
  9  |   "cinematic",
  10 |   "playful",
  11 |   "obsidian",
  12 | ] as const;
  13 | 
  14 | test.describe("theme layout regression", () => {
  15 |   for (const key of deckKeys) {
  16 |     test(`${key}: first slide stays in-bounds and visually balanced`, async ({
  17 |       page,
  18 |     }) => {
  19 |       await page.goto("/");
  20 | 
  21 |       const select = page.locator("select");
  22 |       await select.selectOption(key);
  23 | 
  24 |       const currentSlide = page.locator(".slide.current");
  25 |       await expect(currentSlide).toBeVisible();
  26 | 
  27 |       // Use layout metrics first to catch clipping before visual diffing.
  28 |       const metrics = await page.evaluate(() => {
  29 |         const slide = document.querySelector<HTMLElement>(".slide.current");
  30 |         if (!slide) {
  31 |           throw new Error("No active slide found.");
  32 |         }
  33 | 
  34 |         const slideRect = slide.getBoundingClientRect();
  35 |         const children = Array.from(slide.children).filter(
  36 |           (node): node is HTMLElement => node instanceof HTMLElement,
  37 |         );
  38 | 
  39 |         let minTop = slideRect.bottom;
  40 |         let maxBottom = slideRect.top;
  41 | 
  42 |         for (const child of children) {
  43 |           const rect = child.getBoundingClientRect();
  44 |           if (rect.width < 1 || rect.height < 1) continue;
  45 |           minTop = Math.min(minTop, rect.top);
  46 |           maxBottom = Math.max(maxBottom, rect.bottom);
  47 |         }
  48 | 
  49 |         const topWhitespace = Math.max(0, minTop - slideRect.top);
  50 |         const bottomWhitespace = Math.max(0, slideRect.bottom - maxBottom);
  51 | 
  52 |         return {
  53 |           slideHeight: slide.clientHeight,
  54 |           scrollOverflowY: slide.scrollHeight - slide.clientHeight,
  55 |           scrollOverflowX: slide.scrollWidth - slide.clientWidth,
  56 |           topWhitespace,
  57 |           bottomWhitespace,
  58 |         };
  59 |       });
  60 | 
  61 |       expect(
  62 |         metrics.scrollOverflowY,
  63 |         `${key} overflows vertically`,
  64 |       ).toBeLessThanOrEqual(2);
  65 |       expect(
  66 |         metrics.scrollOverflowX,
  67 |         `${key} overflows horizontally`,
  68 |       ).toBeLessThanOrEqual(2);
  69 | 
  70 |       const whitespaceGap = Math.abs(
  71 |         metrics.topWhitespace - metrics.bottomWhitespace,
  72 |       );
  73 |       // Keep vertical composition reasonably centered without being overly strict.
  74 |       expect(
  75 |         whitespaceGap,
  76 |         `${key} appears vertically off-center`,
  77 |       ).toBeLessThanOrEqual(metrics.slideHeight * 0.22);
  78 | 
  79 |       // Visual regression snapshot per theme.
> 80 |       await expect(currentSlide).toHaveScreenshot(`${key}-first-slide.png`, {
     |       ^ Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/editorial-first-slide-chromium-darwin.png, writing actual.
  81 |         maxDiffPixelRatio: 0.02,
  82 |       });
  83 |     });
  84 |   }
  85 | });
  86 | 
```