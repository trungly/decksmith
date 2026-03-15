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
    dusk: {
      name: "Dusk",
      description:
        "Deep navy tones with cool-blue accents. Professional, focused.",
    },
    parchment: {
      name: "Parchment",
      description:
        "Warm cream with editorial serif typography. Classic, refined.",
    },
    ember: {
      name: "Ember",
      description:
        "Dark plum background with warm rose-coral accents. Bold, dramatic.",
    },
  };
