export type TransitionType =
  | "none"
  | "fade"
  | "slide"
  | "convex"
  | "concave"
  | "zoom";

export type FragmentStyle =
  | "fade-in"
  | "fade-out"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in-then-out"
  | "fade-in-then-semi-out"
  | "grow"
  | "shrink"
  | "strike"
  | "highlight-red"
  | "highlight-green"
  | "highlight-blue"
  | "highlight-current-red"
  | "highlight-current-green"
  | "highlight-current-blue";

export type ThemeName = "obsidian" | "air" | "dusk" | "parchment" | "ember";

export interface SlideInfo {
  h: number;
  v: number;
  id?: string;
  notes?: string;
  fragmentCount: number;
  autoAnimate?: boolean;
  autoAnimateId?: string;
}

export type ScrollLayout = "full" | "compact";

export interface DeckConfig {
  width: number;
  height: number;
  transition: TransitionType;
  transitionSpeed: "default" | "fast" | "slow";
  controls: boolean;
  progress: boolean;
  slideNumber: boolean;
  hash: boolean;
  overview: boolean;
  touch: boolean;
  keyboard: boolean;
  loop: boolean;
  theme: ThemeName;
  /** Enable scroll view mode (scrollable page instead of slide-by-slide) */
  scrollView: boolean;
  /** Scroll layout: 'full' (viewport-height slides) or 'compact' (natural height) */
  scrollLayout: ScrollLayout;
  /** Snap to slides when scrolling */
  scrollSnap: boolean;
}

export const DEFAULT_CONFIG: DeckConfig = {
  width: 960,
  height: 700,
  transition: "slide",
  transitionSpeed: "default",
  controls: true,
  progress: true,
  slideNumber: true,
  hash: true,
  overview: true,
  touch: true,
  keyboard: true,
  loop: false,
  theme: "obsidian",
  scrollView: false,
  scrollLayout: "full",
  scrollSnap: true,
};

export type NavigationDirection = "left" | "right" | "up" | "down";

export interface SlidePosition {
  h: number;
  v: number;
  f: number;
}
