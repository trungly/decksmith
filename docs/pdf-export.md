# PDF Export

Export your presentation to PDF using the browser's built-in print functionality.

## Usage

1. Add `?print-pdf` to the URL:

```
http://localhost:5173/?print-pdf
```

2. Open the browser print dialog: `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Select "Save as PDF" as the destination
4. Print

## How It Works

When `?print-pdf` is detected, Decksmith:

- Lays out all slides vertically in sequence
- Removes transitions and animations
- Applies print-optimized CSS
- Sets page dimensions to match the configured slide size (default 960×700)

## Tips

- Use Chrome or Chromium-based browsers for best results
- Set margins to "None" in the print dialog
- Enable "Background graphics" to preserve slide backgrounds
- The output is one slide per page
