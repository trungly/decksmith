import type { ThemeName } from "../types.js";

export const THEMES: Record<ThemeName, { name: string; description: string }> =
  {
    obsidian: {
      name: "Obsidian",
      description:
        "Deep dark background with crisp blue accents. High contrast, modern.",
    },
    air: {
      name: "Air",
      description:
        "Light, open background with sharp typographic contrast. Clean, minimal.",
    },
    executive: {
      name: "Executive",
      description:
        "Clean, restrained, high-density. Perfect for enterprise and corporate decks.",
    },
    startup: {
      name: "Startup",
      description:
        "Modern, bright, and bold. Designed for products, pitches, and high-energy demos.",
    },
    editorial: {
      name: "Editorial",
      description:
        "Serif-forward and spacious. Ideal for quote-heavy or long-form narrative decks.",
    },
    technical: {
      name: "Technical",
      description:
        "Code and data-first. Grid-heavy and optimized for engineering and scientific presentations.",
    },
    playful: {
      name: "Playful",
      description:
        "Vibrant colors and lighthearted typography. Great for workshops and casual talks.",
    },
    cinematic: {
      name: "Cinematic",
      description:
        "High-impact imagery and sparse copy. Focused on storytelling and dramatic transitions.",
    },
  };
