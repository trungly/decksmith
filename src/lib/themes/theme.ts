import type { ThemeName } from '../types.js';

export const THEMES: Record<ThemeName, { name: string; description: string }> = {
  black: { name: 'Black', description: 'Dark background with white text. High contrast, modern.' },
  white: { name: 'White', description: 'Light background with dark text. Clean, minimal.' },
  moon: { name: 'Moon', description: 'Dark blue-grey background. Soft, professional.' },
  serif: { name: 'Serif', description: 'Warm tones with serif typography. Classic, editorial.' },
  blood: { name: 'Blood', description: 'Dark background with red accents. Bold, dramatic.' },
};
