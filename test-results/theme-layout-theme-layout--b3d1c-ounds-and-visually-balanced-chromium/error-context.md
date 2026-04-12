# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-layout.spec.ts >> theme layout regression >> playful: first slide stays in-bounds and visually balanced
- Location: tests/theme-layout.spec.ts:16:5

# Error details

```
Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/playful-first-slide-chromium-darwin.png, writing actual.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - combobox "Select presentation deck" [ref=e4]:
    - option "Startup Investor Pitch (Startup Theme)"
    - option "Enterprise Roadmap (Executive Theme)"
    - option "Technical Design Review (Technical Theme)"
    - option "Internal Strategy Memo (Editorial Theme)"
    - option "Workshop Training (Air Theme)"
    - option "Storytelling Keynote (Cinematic Theme)"
    - option "Educational Classroom (Playful Theme)" [selected]
    - option "DevOps Strategy (Obsidian Theme)"
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - heading "Building with Prompts! 🏗️" [level=1] [ref=e8]
        - paragraph [ref=e9]: Modular prompts, checks, and harnesses for better engineering.
      - generic [ref=e10]:
        - heading "What is Modularity? 📦" [level=2] [ref=e11]
        - generic [ref=e12]:
          - paragraph [ref=e13]: Modularity means breaking down big prompts into small, reusable chunks.
          - paragraph [ref=e14]: Think LEGO blocks for LLMs.
      - generic [ref=e15]:
        - heading "The Prompt Engine 🚂" [level=2] [ref=e16]
        - generic [ref=e17]:
          - generic [ref=e18]:
            - heading "Base" [level=3] [ref=e19]
            - paragraph [ref=e20]: The core instructions.
          - generic [ref=e21]:
            - heading "Add-on" [level=3] [ref=e22]
            - paragraph [ref=e23]: Extra details or context.
          - generic [ref=e24]:
            - heading "Style" [level=3] [ref=e25]
            - paragraph [ref=e26]: Tone and formatting rules.
      - generic [ref=e27]:
        - heading "Testing Your AI 🧪" [level=2] [ref=e28]
        - paragraph [ref=e29]:
          - text: How do we know if it's actually good? We use
          - strong [ref=e30]: Eval Harnesses
          - text: .
        - generic [ref=e31]:
          - paragraph [ref=e33]:
            - text: ✅
            - strong [ref=e34]: "Deterministic Checks:"
            - text: Does it contain specific words?
          - paragraph [ref=e36]:
            - text: ✅
            - strong [ref=e37]: "LLM-as-a-Judge:"
            - text: Ask another AI to score it.
          - paragraph [ref=e39]:
            - text: ✅
            - strong [ref=e40]: "Regression Tests:"
            - text: Did it get worse than before?
      - generic [ref=e41]:
        - heading "Coding Challenge! 💻" [level=2] [ref=e42]
        - paragraph [ref=e43]: Build an eval check that ensures the AI doesn't leak secrets.
        - code [ref=e46]:
          - generic [ref=e48]: "test(\"No secrets in prompt\", () => {"
          - generic [ref=e50]: const result = generatePrompt("My password is 123");
          - generic [ref=e52]: expect(result).not.toContain("123");
          - generic [ref=e53]: "});"
      - generic [ref=e54]:
        - heading "Go Build! 🚀" [level=1] [ref=e55]
        - paragraph [ref=e56]: "Homework: Build a modular prompt system for a chatbot."
    - generic [ref=e57]:
      - button "Previous horizontal slide":
        - img
      - button "Next horizontal slide" [ref=e58] [cursor=pointer]:
        - img [ref=e59]
      - button "Previous vertical slide":
        - img
      - button "Next vertical slide":
        - img
    - generic [ref=e63]: 1 / 6
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
     |       ^ Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/playful-first-slide-chromium-darwin.png, writing actual.
  81 |         maxDiffPixelRatio: 0.02,
  82 |       });
  83 |     });
  84 |   }
  85 | });
  86 | 
```