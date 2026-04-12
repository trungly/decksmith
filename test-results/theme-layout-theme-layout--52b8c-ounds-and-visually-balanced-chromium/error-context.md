# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-layout.spec.ts >> theme layout regression >> startup: first slide stays in-bounds and visually balanced
- Location: tests/theme-layout.spec.ts:16:5

# Error details

```
Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/startup-first-slide-chromium-darwin.png, writing actual.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - combobox "Select presentation deck" [ref=e4]:
    - option "Startup Investor Pitch (Startup Theme)" [selected]
    - option "Enterprise Roadmap (Executive Theme)"
    - option "Technical Design Review (Technical Theme)"
    - option "Internal Strategy Memo (Editorial Theme)"
    - option "Workshop Training (Air Theme)"
    - option "Storytelling Keynote (Cinematic Theme)"
    - option "Educational Classroom (Playful Theme)"
    - option "DevOps Strategy (Obsidian Theme)"
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - heading "Decksmith AI" [level=1] [ref=e8]
        - paragraph [ref=e9]: The AI-native presentation builder for product and engineering teams.
      - generic [ref=e10]:
        - heading "The Problem" [level=2] [ref=e11]
        - generic [ref=e12]:
          - paragraph [ref=e13]: ⚠️ Slides are slow and tedious to build manually.
          - paragraph [ref=e14]: ⚠️ Existing tools lack technical context (code, docs).
          - paragraph [ref=e15]: ⚠️ Consistency across teams is hard to maintain.
      - generic [ref=e16]:
        - heading "The Solution" [level=2] [ref=e17]
        - paragraph [ref=e18]: Decksmith is a code-first, AI-native framework for presentations.
        - generic [ref=e19]:
          - generic [ref=e20]:
            - heading "AI-Powered" [level=3] [ref=e21]
            - paragraph [ref=e22]: Generates content from docs and codebase.
          - generic [ref=e23]:
            - heading "Developer-First" [level=3] [ref=e24]
            - paragraph [ref=e25]: Uses Svelte, Markdown, and standard Git workflows.
      - generic [ref=e26]:
        - heading "Traction" [level=2] [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - generic [ref=e30]: 50k
            - paragraph [ref=e31]: Beta Users
          - generic [ref=e32]:
            - generic [ref=e33]: 200%
            - paragraph [ref=e34]: MoM Growth
      - generic [ref=e35]:
        - heading "Product Demo" [level=2] [ref=e36]
        - paragraph [ref=e37]: From prompt to polished deck in seconds.
        - generic [ref=e38]: prompt> Build me a pitch for our new microservices architecture...
      - generic [ref=e39]:
        - heading "Business Model" [level=2] [ref=e40]
        - generic [ref=e41]:
          - paragraph [ref=e42]:
            - strong [ref=e43]: "Free:"
            - text: For individuals and open source.
          - paragraph [ref=e44]:
            - strong [ref=e45]: "Pro:"
            - text: $20/mo with advanced AI features.
          - paragraph [ref=e46]:
            - strong [ref=e47]: "Enterprise:"
            - text: SSO, audit logs, and custom themes.
      - generic [ref=e48]:
        - heading "Go-to-Market" [level=2] [ref=e49]
        - paragraph [ref=e50]: Developer advocacy and community-led growth.
        - generic [ref=e51]:
          - paragraph [ref=e52]: 🚀 Launching at DevConf 2026
          - paragraph [ref=e53]: 🤝 Strategic partnerships with cloud providers
      - generic [ref=e54]:
        - heading "The Team" [level=2] [ref=e55]
        - generic [ref=e56]:
          - paragraph [ref=e59]:
            - strong [ref=e60]: CEO
            - text: Serial Entrepreneur
          - paragraph [ref=e63]:
            - strong [ref=e64]: CTO
            - text: Ex-FAANG Lead
      - generic [ref=e65]:
        - heading "Why Now?" [level=2] [ref=e66]
        - paragraph [ref=e67]: The convergence of generative AI and developer-centric workflows.
      - generic [ref=e68]:
        - heading "The Ask" [level=2] [ref=e69]
        - generic [ref=e70]:
          - text: Raising
          - strong [ref=e71]: $2M Seed
        - paragraph [ref=e72]: To scale our AI engineering and reach 1M users.
        - paragraph [ref=e73]: invest@decksmith.ai
    - generic [ref=e74]:
      - button "Previous horizontal slide":
        - img
      - button "Next horizontal slide" [ref=e75] [cursor=pointer]:
        - img [ref=e76]
      - button "Previous vertical slide":
        - img
      - button "Next vertical slide":
        - img
    - generic [ref=e80]: 1 / 10
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
     |       ^ Error: A snapshot doesn't exist at /Users/trung/Projects/decksmith/decksmith/tests/theme-layout.spec.ts-snapshots/startup-first-slide-chromium-darwin.png, writing actual.
  81 |         maxDiffPixelRatio: 0.02,
  82 |       });
  83 |     });
  84 |   }
  85 | });
  86 | 
```