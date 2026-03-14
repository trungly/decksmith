// Decksmith — Svelte 5 Presentation Framework
// Public API

export { default as Deck } from './components/Deck.svelte';
export { default as Slide } from './components/Slide.svelte';
export { default as Fragment } from './components/Fragment.svelte';
export { default as Notes } from './components/Notes.svelte';
export { default as Markdown } from './components/Markdown.svelte';

export { DeckState } from './state/deck-state.svelte.js';

export type {
  TransitionType,
  FragmentStyle,
  ThemeName,
  DeckConfig,
  SlideInfo,
  SlidePosition,
  NavigationDirection,
} from './types.js';

export { THEMES } from './themes/theme.js';
