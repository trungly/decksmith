# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-layout.spec.ts >> theme layout regression >> technical: first slide stays in-bounds and visually balanced
- Location: tests/theme-layout.spec.ts:16:5

# Error details

```
Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/technical-first-slide-chromium-darwin.png, writing actual.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - combobox "Select presentation deck" [ref=e4]:
    - option "Startup Investor Pitch (Startup Theme)"
    - option "Enterprise Roadmap (Executive Theme)"
    - option "Technical Design Review (Technical Theme)" [selected]
    - option "Internal Strategy Memo (Editorial Theme)"
    - option "Workshop Training (Air Theme)"
    - option "Storytelling Keynote (Cinematic Theme)"
    - option "Educational Classroom (Playful Theme)"
    - option "DevOps Strategy (Obsidian Theme)"
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - heading "Modular Prompt Pipeline" [level=1] [ref=e8]
        - paragraph [ref=e9]: Architecture Review & Migration Strategy
        - generic [ref=e10]: April 2026
      - generic [ref=e11]:
        - 'heading "Current State: Monolithic Pipeline" [level=2] [ref=e12]'
        - generic [ref=e13]:
          - paragraph [ref=e14]: ❌ High coupling between generation logic and provider SDKs.
          - paragraph [ref=e15]: ❌ Inability to swap LLM providers without major refactors.
          - paragraph [ref=e16]: ❌ Difficult to test individual prompt fragments in isolation.
      - generic [ref=e17]:
        - 'heading "Proposed: Modular Adapters" [level=2] [ref=e18]'
        - generic [ref=e19]:
          - generic [ref=e20]:
            - heading "Prompt Fragments" [level=4] [ref=e21]
            - paragraph [ref=e22]: Reusable, versioned templates stored in a central registry.
          - generic [ref=e23]:
            - heading "Provider Adapters" [level=4] [ref=e24]
            - paragraph [ref=e25]: Abstracted interfaces for OpenAI, Anthropic, and local models.
      - generic [ref=e26]:
        - heading "API Comparison" [level=2] [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - heading "Before" [level=4] [ref=e30]
            - code [ref=e33]:
              - generic [ref=e35]: "const res = await openai.chat.completions.create({"
              - generic [ref=e37]: "model: \"gpt-4\","
              - generic [ref=e39]:
                - text: "messages: [{ role: \"user\", content:"
                - generic [ref=e40]: "`Generate... ${context}`"
                - text: "}]"
              - generic [ref=e41]: "});"
          - generic [ref=e42]:
            - heading "After" [level=4] [ref=e43]
            - code [ref=e46]:
              - generic [ref=e48]: const pipeline = new Pipeline(provider);
              - generic [ref=e50]: const result = await pipeline.execute(
              - generic [ref=e52]: "\"main-prompt\","
              - generic [ref=e53]: "{"
              - generic [ref=e55]: "context: \"...\","
              - generic [ref=e57]: "fragments: [\"summary\", \"footer\"]"
              - generic [ref=e58]: "}"
              - generic [ref=e59]: );
      - generic [ref=e60]:
        - heading "Rollback Plan" [level=2] [ref=e61]
        - generic [ref=e62]:
          - paragraph [ref=e63]:
            - strong [ref=e64]: "Phase 1:"
            - text: Feature flag gated rollout to 5% of traffic.
          - paragraph [ref=e65]:
            - strong [ref=e66]: "Monitoring:"
            - text: Auto-revert if error rate > 0.5% or latency > 2s.
          - paragraph [ref=e67]:
            - strong [ref=e68]: "State:"
            - text: No state migration required (stateless pipeline).
      - generic [ref=e69]:
        - heading "Questions?" [level=1] [ref=e70]
        - paragraph [ref=e71]:
          - text: Internal documentation at
          - code [ref=e72]: /docs/arch/modular-pipeline.md
    - generic [ref=e73]:
      - button "Previous horizontal slide":
        - img
      - button "Next horizontal slide" [ref=e74] [cursor=pointer]:
        - img [ref=e75]
      - button "Previous vertical slide":
        - img
      - button "Next vertical slide":
        - img
    - generic [ref=e79]: 1 / 6
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
     |       ^ Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/technical-first-slide-chromium-darwin.png, writing actual.
  81 |         maxDiffPixelRatio: 0.02,
  82 |       });
  83 |     });
  84 |   }
  85 | });
  86 | 
```