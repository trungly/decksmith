# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-layout.spec.ts >> theme layout regression >> executive: first slide stays in-bounds and visually balanced
- Location: tests/theme-layout.spec.ts:16:5

# Error details

```
Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/executive-first-slide-chromium-darwin.png, writing actual.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - combobox "Select presentation deck" [ref=e4]:
    - option "Startup Investor Pitch (Startup Theme)"
    - option "Enterprise Roadmap (Executive Theme)" [selected]
    - option "Technical Design Review (Technical Theme)"
    - option "Internal Strategy Memo (Editorial Theme)"
    - option "Workshop Training (Air Theme)"
    - option "Storytelling Keynote (Cinematic Theme)"
    - option "Educational Classroom (Playful Theme)"
    - option "DevOps Strategy (Obsidian Theme)"
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - heading "Modernization Roadmap 2026" [level=1] [ref=e8]
        - paragraph [ref=e9]: Q3-Q4 Strategic Technical Initiatives
        - generic [ref=e10]: Confidential | Engineering Leadership
      - generic [ref=e11]:
        - heading "Strategic Context" [level=2] [ref=e12]
        - generic [ref=e13]:
          - paragraph [ref=e14]: Our goal is to reduce technical debt and improve developer velocity by 30% through modular architecture.
          - generic [ref=e15]:
            - generic [ref=e16]:
              - heading "Efficiency" [level=4] [ref=e17]
              - paragraph [ref=e18]: Consolidate redundant services into a shared platform layer.
            - generic [ref=e19]:
              - heading "Reliability" [level=4] [ref=e20]
              - paragraph [ref=e21]: Targeting 99.99% uptime for core checkout and search services.
      - generic [ref=e22]:
        - heading "Roadmap Overview" [level=2] [ref=e23]
        - generic [ref=e24]:
          - generic [ref=e26]:
            - paragraph [ref=e27]: "Q3: Foundation"
            - paragraph [ref=e28]: Modular infra & adapter patterns
          - generic [ref=e30]:
            - paragraph [ref=e31]: "Q4: Migration"
            - paragraph [ref=e32]: Phased service cutover & e2e testing
          - generic [ref=e34]:
            - paragraph [ref=e35]: "2027: Scale"
            - paragraph [ref=e36]: Global expansion & performance tuning
      - generic [ref=e37]:
        - heading "Sequencing & Dependencies" [level=2] [ref=e38]
        - list [ref=e40]:
          - listitem [ref=e41]:
            - strong [ref=e42]: "Step 1:"
            - text: Interface definition and mock adapters
          - listitem [ref=e43]:
            - strong [ref=e44]: "Step 2:"
            - text: Parallel run of modular vs monolithic pipeline
          - listitem [ref=e45]:
            - strong [ref=e46]: "Step 3:"
            - text: Shadow-mode validation with production traffic
          - listitem [ref=e47]:
            - strong [ref=e48]: "Step 4:"
            - text: Gradual canary rollout (1% -> 10% -> 100%)
      - generic [ref=e49]:
        - heading "Risk Management" [level=2] [ref=e50]
        - table [ref=e51]:
          - rowgroup [ref=e52]:
            - row "Risk Impact Mitigation" [ref=e53]:
              - columnheader "Risk" [ref=e54]
              - columnheader "Impact" [ref=e55]
              - columnheader "Mitigation" [ref=e56]
            - row "Data Inconsistency Critical Dual-write with integrity checks" [ref=e57]:
              - cell "Data Inconsistency" [ref=e58]
              - cell "Critical" [ref=e59]
              - cell "Dual-write with integrity checks" [ref=e60]
            - row "Performance Regression Moderate Pre-production load benchmarks" [ref=e61]:
              - cell "Performance Regression" [ref=e62]
              - cell "Moderate" [ref=e63]
              - cell "Pre-production load benchmarks" [ref=e64]
      - generic [ref=e65]:
        - heading "Measurable Outcomes" [level=2] [ref=e66]
        - generic [ref=e67]:
          - generic [ref=e68]:
            - generic [ref=e69]: "-40%"
            - paragraph [ref=e70]: Build Duration
          - generic [ref=e71]:
            - generic [ref=e72]: +25%
            - paragraph [ref=e73]: Deployment Frequency
          - generic [ref=e74]:
            - generic [ref=e75]: "-15%"
            - paragraph [ref=e76]: Cloud Infrastructure Spend
      - generic [ref=e77]:
        - heading "Next Steps" [level=1] [ref=e78]
        - paragraph [ref=e79]: Bi-weekly progress updates via the Modernization Steering Committee.
    - generic [ref=e80]:
      - button "Previous horizontal slide":
        - img
      - button "Next horizontal slide" [ref=e81] [cursor=pointer]:
        - img [ref=e82]
      - button "Previous vertical slide":
        - img
      - button "Next vertical slide":
        - img
    - generic [ref=e86]: 1 / 7
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
     |       ^ Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/executive-first-slide-chromium-darwin.png, writing actual.
  81 |         maxDiffPixelRatio: 0.02,
  82 |       });
  83 |     });
  84 |   }
  85 | });
  86 | 
```