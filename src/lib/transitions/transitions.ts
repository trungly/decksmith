import type { TransitionType } from '../types.js';

/**
 * Slide position relative to the current slide.
 * Used to determine which transition CSS to apply.
 */
export type SlideRelativePosition = 'current' | 'past-h' | 'future-h' | 'past-v' | 'future-v' | 'hidden';

export function getSlidePosition(
  slideH: number, slideV: number,
  currentH: number, currentV: number
): SlideRelativePosition {
  if (slideH === currentH && slideV === currentV) return 'current';
  if (slideH < currentH) return 'past-h';
  if (slideH > currentH) return 'future-h';
  // Same horizontal, different vertical
  if (slideV < currentV) return 'past-v';
  if (slideV > currentV) return 'future-v';
  return 'hidden';
}

/**
 * Returns inline CSS styles for a slide based on its position and transition type.
 */
export function getTransitionStyles(
  position: SlideRelativePosition,
  transition: TransitionType,
  speed: 'default' | 'fast' | 'slow' = 'default'
): string {
  const duration = speed === 'fast' ? '400ms' : speed === 'slow' ? '1200ms' : '800ms';

  const base = `transition: all ${duration} cubic-bezier(0.26, 0.86, 0.44, 0.985);`;

  if (position === 'current') {
    return `${base} transform: translate(0, 0) scale(1); opacity: 1; visibility: visible; z-index: 2;`;
  }

  const styles = TRANSITION_MAP[transition]?.[position];
  if (styles) {
    return `${base} ${styles} visibility: visible; z-index: 1;`;
  }

  return `${base} opacity: 0; visibility: hidden; z-index: 0;`;
}

const TRANSITION_MAP: Record<TransitionType, Partial<Record<SlideRelativePosition, string>>> = {
  none: {
    'past-h': 'opacity: 0; transform: translate(0, 0);',
    'future-h': 'opacity: 0; transform: translate(0, 0);',
    'past-v': 'opacity: 0; transform: translate(0, 0);',
    'future-v': 'opacity: 0; transform: translate(0, 0);',
  },
  fade: {
    'past-h': 'opacity: 0; transform: translate(0, 0);',
    'future-h': 'opacity: 0; transform: translate(0, 0);',
    'past-v': 'opacity: 0; transform: translate(0, 0);',
    'future-v': 'opacity: 0; transform: translate(0, 0);',
  },
  slide: {
    'past-h': 'opacity: 0; transform: translate(-150%, 0);',
    'future-h': 'opacity: 0; transform: translate(150%, 0);',
    'past-v': 'opacity: 0; transform: translate(0, -150%);',
    'future-v': 'opacity: 0; transform: translate(0, 150%);',
  },
  convex: {
    'past-h': 'opacity: 0; transform: translate(-100%, 0) rotateY(-90deg); transform-origin: right center;',
    'future-h': 'opacity: 0; transform: translate(100%, 0) rotateY(90deg); transform-origin: left center;',
    'past-v': 'opacity: 0; transform: translate(0, -100%) rotateX(90deg); transform-origin: bottom center;',
    'future-v': 'opacity: 0; transform: translate(0, 100%) rotateX(-90deg); transform-origin: top center;',
  },
  concave: {
    'past-h': 'opacity: 0; transform: translate(-100%, 0) rotateY(90deg); transform-origin: right center;',
    'future-h': 'opacity: 0; transform: translate(100%, 0) rotateY(-90deg); transform-origin: left center;',
    'past-v': 'opacity: 0; transform: translate(0, -100%) rotateX(-90deg); transform-origin: bottom center;',
    'future-v': 'opacity: 0; transform: translate(0, 100%) rotateX(90deg); transform-origin: top center;',
  },
  zoom: {
    'past-h': 'opacity: 0; transform: scale(16);',
    'future-h': 'opacity: 0; transform: scale(0.2);',
    'past-v': 'opacity: 0; transform: scale(16);',
    'future-v': 'opacity: 0; transform: scale(0.2);',
  },
};
