# Themes

Decksmith includes 5 built-in themes. Set the theme on the `<Deck>` component:

```svelte
<Deck theme="dusk">
```

## Built-in Themes

| Theme | Background | Text | Accent | Style |
| ----------- | ------------------- | -------------------- | ------------------- | ---------------------- |
| `obsidian` | #0f1117 (deep dark) | #c9d1d9 (light gray) | #58a6ff (blue) | Modern, high contrast |
| `air` | #f8fafc (off-white) | #334155 (slate) | #2563eb (blue) | Clean, minimal |
| `dusk` | #1e2433 (deep navy) | #a9b1d6 (cool gray) | #7aa2f7 (periwinkle) | Professional, focused |
| `parchment` | #f6f1e7 (warm cream) | #3d2e1e (warm brown) | #8b5e3c (amber) | Classic, editorial |
| `ember` | #1a1520 (dark plum) | #ddd0e6 (lavender) | #e07b99 (rose-coral) | Bold, dramatic |

## CSS Variables

Each theme defines CSS custom properties you can use in your slides:

```css
--ds-bg              /* Background color */
--ds-fg              /* Text color */
--ds-heading         /* Heading color */
--ds-link            /* Link color */
--ds-link-hover      /* Link hover color */
--ds-accent          /* Accent color (controls, progress bar) */
--ds-muted           /* De-emphasized text color */
--ds-border          /* Subtle border/separator color */
--ds-code-bg         /* Inline code background */
--ds-pre-bg          /* Code block background */
--ds-selection-bg    /* Text selection background */
--ds-selection-fg    /* Text selection text color */
```

### Using Variables in Slides

```svelte
<Slide h={0} v={0}>
  <div style="border: 2px solid var(--ds-accent); padding: 1em; border-radius: 8px;">
    <p>Themed border</p>
  </div>
  <p style="color: var(--ds-muted);">De-emphasized text</p>
</Slide>
```

## Custom Styling

Override theme variables with inline styles or a `<style>` block:

```svelte
<Deck theme="obsidian">
  <Slide h={0} v={0}>
    <h1 style="color: coral;">Custom Color</h1>
  </Slide>
</Deck>

<style>
  :global(.theme-obsidian) {
    --ds-accent: #ff6b6b;
  }
</style>
```

## Typography

- **Obsidian, Air, Dusk, Ember**: `system-ui` / `-apple-system` / `"Segoe UI"` sans-serif
- **Parchment**: `Georgia` / `"Times New Roman"` serif for both headings and body

### Font sizes (all themes)

- **h1**: 2.5em
- **h2**: 1.8em
- **h3**: 1.3em
- **Body**: 24px base
- **Line height**: 1.5 (1.7 for Parchment)
- **Code**: 0.9em, monospace, subtle background
