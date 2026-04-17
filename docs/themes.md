# Themes

Decksmith includes 8 built-in themes. Set the theme on the `<Deck>` component:

```svelte
<Deck theme="obsidian">
```

## Built-in Themes

| Theme | Background | Text | Accent | Style |
| ----------- | ------------------- | -------------------- | ------------------- | ---------------------- |
| `obsidian` | #0f1117 (deep dark) | #c9d1d9 (light gray) | #58a6ff (blue) | Modern, high contrast |
| `air` | #f8fafc (off-white) | #334155 (slate) | #2563eb (blue) | Clean, minimal |
| `executive` | #ffffff (white) | #1a1a1a (dark gray) | #0056b3 (dark blue) | Clean, restrained, corporate |
| `startup` | #fdfdfd (off-white) | #1d1d1f (near black) | #3d5afe (indigo) | Modern, bright, bold |
| `editorial` | #fcfaf7 (warm cream) | #2c241e (warm brown) | #8d6e63 (taupe) | Serif, spacious, editorial |
| `technical` | #0d1117 (dark) | #c9d1d9 (light gray) | #238636 (green) | Code-first, data-heavy |
| `playful` | #fffcf2 (warm white) | #252422 (dark) | #eb5e28 (orange) | Vibrant, lighthearted |
| `cinematic` | #050505 (near black) | #ffffff (white) | #ff3e00 (red-orange) | High-impact, dramatic |

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

/* Slide layout (set per theme; overridable on :global(.theme-…)) */
--ds-slide-padding           /* Inner padding of each slide */
--ds-slide-stack-gap         /* Vertical gap between direct children of <Slide> */
--ds-slide-text-align        /* Default text alignment inside slides */
--ds-slide-align-items       /* Flex cross-axis alignment for slide content */
--ds-slide-justify-content   /* Flex main-axis alignment for slide content */
--ds-content-max-width       /* Max line length for headings / body blocks on slides */
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

- **Obsidian, Air, Technical, Startup, Executive, Playful, Cinematic**: `system-ui` / `-apple-system` / `"Segoe UI"` sans-serif
- **Editorial**: `Georgia` / `"Times New Roman"` serif for both headings and body

### Font sizes (all themes)

- **h1**: 2.5em
- **h2**: 1.8em
- **h3**: 1.3em
- **Body**: 24px base
- **Line height**: 1.5 (1.7 for Editorial)
- **Code**: 0.9em, monospace, subtle background
