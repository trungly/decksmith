# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-layout.spec.ts >> theme layout regression >> air: first slide stays in-bounds and visually balanced
- Location: tests/theme-layout.spec.ts:16:5

# Error details

```
Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/air-first-slide-chromium-darwin.png, writing actual.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - combobox "Select presentation deck" [ref=e4]:
    - option "Startup Investor Pitch (Startup Theme)"
    - option "Enterprise Roadmap (Executive Theme)"
    - option "Technical Design Review (Technical Theme)"
    - option "Internal Strategy Memo (Editorial Theme)"
    - option "Workshop Training (Air Theme)" [selected]
    - option "Storytelling Keynote (Cinematic Theme)"
    - option "Educational Classroom (Playful Theme)"
    - option "DevOps Strategy (Obsidian Theme)"
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - heading "Mastering AI Prompts" [level=1] [ref=e8]
        - paragraph [ref=e9]: A workshop for developers
      - generic [ref=e10]:
        - heading "The Golden Rule" [level=2] [ref=e11]
        - generic [ref=e12]:
          - paragraph [ref=e13]: Context is King 👑
          - paragraph [ref=e14]: An AI only knows what you tell it. The better the context, the better the code.
      - generic [ref=e15]:
        - heading "Anatomy of a Great Prompt" [level=2] [ref=e16]
        - generic [ref=e17]:
          - paragraph [ref=e19]:
            - text: 🏷️
            - strong [ref=e20]: "Role:"
            - text: Act as a senior systems engineer...
          - paragraph [ref=e22]:
            - text: 🎯
            - strong [ref=e23]: "Objective:"
            - text: Refactor this function for O(n) complexity...
          - paragraph [ref=e25]:
            - text: 🛠️
            - strong [ref=e26]: "Constraints:"
            - text: Use only standard library, no extra deps...
          - paragraph [ref=e28]:
            - text: 📦
            - strong [ref=e29]: "Context:"
            - text: Here is the related interface definition...
      - generic [ref=e30]:
        - 'heading "Exercise 1: The Vague Prompt" [level=2] [ref=e31]'
        - paragraph [ref=e32]: "Turn this into a \"pro\" prompt:"
        - code [ref=e35]:
          - generic [ref=e36]: "\"Write a script to clean some data\""
        - paragraph [ref=e38]: "Hint: Consider the format, the cleaning logic, and the error handling."
      - generic [ref=e39]:
        - heading "Chain of Thought" [level=2] [ref=e40]
        - paragraph [ref=e41]:
          - text: Ask the AI to explain its reasoning
          - strong [ref=e42]: before
          - text: writing code.
        - code [ref=e45]:
          - generic [ref=e46]: "\"Think step by step before generating the final implementation.\""
      - generic [ref=e47]:
        - heading "品質 Loop" [level=2] [ref=e48]
        - generic [ref=e49]:
          - generic [ref=e50]:
            - generic [ref=e51]: "1"
            - paragraph [ref=e52]: Generate
          - generic [ref=e53]:
            - generic [ref=e54]: "2"
            - paragraph [ref=e55]: Review
          - generic [ref=e56]:
            - generic [ref=e57]: "3"
            - paragraph [ref=e58]: Refine
      - generic [ref=e59]:
        - heading "Happy Coding!" [level=1] [ref=e60]
        - paragraph [ref=e61]: "Feedback link: bit.ly/prompt-workshop-feedback"
    - generic [ref=e62]:
      - button "Previous horizontal slide":
        - img
      - button "Next horizontal slide" [ref=e63] [cursor=pointer]:
        - img [ref=e64]
      - button "Previous vertical slide":
        - img
      - button "Next vertical slide":
        - img
    - generic [ref=e68]: 1 / 7
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
     |       ^ Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/air-first-slide-chromium-darwin.png, writing actual.
  81 |         maxDiffPixelRatio: 0.02,
  82 |       });
  83 |     });
  84 |   }
  85 | });
  86 | 
```