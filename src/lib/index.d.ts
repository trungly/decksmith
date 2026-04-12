import type { Component } from "svelte";

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

export type ThemeName =
  | "obsidian"
  | "air"
  | "executive"
  | "startup"
  | "editorial"
  | "technical"
  | "playful"
  | "cinematic";

export type ScrollLayout = "full" | "compact";

export type NavigationDirection = "left" | "right" | "up" | "down";

export interface SlideInfo {
  h: number;
  v: number;
  id?: string;
  notes?: string;
  fragmentCount: number;
  autoAnimate?: boolean;
  autoAnimateId?: string;
}

export interface SlidePosition {
  h: number;
  v: number;
  f: number;
}

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
  scrollView: boolean;
  scrollLayout: ScrollLayout;
  scrollSnap: boolean;
}

export interface ThemeDefinition {
  name: string;
  description: string;
}

export interface DeckProps {
  theme?: ThemeName;
  transition?: TransitionType;
  transitionSpeed?: "default" | "fast" | "slow";
  width?: number;
  height?: number;
  controls?: boolean;
  progress?: boolean;
  slideNumber?: boolean;
  hash?: boolean;
  overview?: boolean;
  touch?: boolean;
  keyboard?: boolean;
  loop?: boolean;
  scrollView?: boolean;
  scrollLayout?: ScrollLayout;
  scrollSnap?: boolean;
}

export interface SlideProps {
  h?: number;
  v?: number;
  transition?: TransitionType;
  background?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  id?: string;
  autoAnimate?: boolean;
}

export interface FragmentProps {
  index?: number;
  style?: FragmentStyle;
}

export interface NotesProps {
  slideH?: number;
  slideV?: number;
  text?: string;
}

export interface MarkdownProps {
  content?: string;
}

export interface CodeProps {
  code?: string;
  language?: string;
  lineNumbers?: boolean;
  highlightLines?: string;
  lineNumberStart?: number;
}

export type DiagramType =
  | "flow"
  | "timeline"
  | "hierarchy"
  | "comparison"
  | "matrix"
  | "pyramid";

export type DiagramLayout = "horizontal" | "vertical" | "auto";
export type DiagramDensity = "compact" | "normal" | "roomy";
export type DiagramEmphasis = "neutral" | "info" | "success" | "warning" | "danger";

export interface DiagramNode {
  id: string;
  label: string;
  detail?: string;
  icon?: string;
  group?: string;
  value?: number | string;
  children?: DiagramNode[];
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  kind?: "solid" | "dashed" | "arrow";
}

export interface DiagramProps {
  type: DiagramType;
  title?: string;
  nodes?: DiagramNode[];
  edges?: DiagramEdge[];
  layout?: DiagramLayout;
  density?: DiagramDensity;
  emphasis?: DiagramEmphasis;
  className?: string;
  ariaLabel?: string;
}

export type ChartType = "line" | "bar" | "area" | "donut";
export type ChartLegend = "hidden" | "top" | "right" | "bottom";
export type ChartAxisMode = "hidden" | "minimal" | "standard";
export type ChartValueFormat = "number" | "compact" | "percent" | "currency";
export type ChartPalette = "neutral" | "brand" | "categorical";

export interface ChartRow {
  [key: string]: string | number | null;
}

export interface ChartProps {
  type: ChartType;
  title?: string;
  rows?: ChartRow[];
  xKey?: string;
  yKeys?: string[];
  legend?: ChartLegend;
  axis?: ChartAxisMode;
  valueFormat?: ChartValueFormat;
  palette?: ChartPalette;
  renderer?: "auto" | "svg" | "external";
  className?: string;
  ariaLabel?: string;
}

export declare class DeckState {
  currentH: number;
  currentV: number;
  currentFragment: number;
  isOverview: boolean;
  isPaused: boolean;
  config: DeckConfig;
  slides: SlideInfo[][];
  currentNotes: string;
  totalHorizontal: number;
  totalSlides: number;
  progress: number;
  canGoLeft: boolean;
  canGoRight: boolean;
  canGoUp: boolean;
  canGoDown: boolean;
  currentFragmentCount: number;
  getSlideAt(h: number, v: number): SlideInfo | undefined;
  registerSlide(info: SlideInfo): void;
  updateFragmentCount(h: number, v: number, count: number): void;
  updateNotes(h: number, v: number, notes: string): void;
  next(): void;
  prev(): void;
  left(): void;
  right(): void;
  up(): void;
  down(): void;
  goTo(h: number, v?: number, f?: number): void;
  toggleOverview(): void;
  togglePause(): void;
  getPosition(): SlidePosition;
  goToFirst(): void;
  goToLast(): void;
}

export declare const Deck: Component<DeckProps>;
export declare const Slide: Component<SlideProps>;
export declare const Fragment: Component<FragmentProps>;
export declare const Notes: Component<NotesProps>;
export declare const Markdown: Component<MarkdownProps>;
export declare const Code: Component<CodeProps>;
export declare const Diagram: Component<DiagramProps>;
export declare const Chart: Component<ChartProps>;

export declare const THEMES: Record<ThemeName, ThemeDefinition>;
