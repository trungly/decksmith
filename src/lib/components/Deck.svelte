<script lang="ts">
  import { setContext, onMount, type Snippet } from 'svelte';
  import { DeckState } from '../state/deck-state.svelte.js';
  import type { TransitionType, ThemeName } from '../types.js';
  import { setupKeyboard } from '../utils/keyboard.js';
  import { setupTouch } from '../utils/touch.js';
  import { setupHashRouting, updateHash } from '../utils/hash.js';
  import { computeScale } from '../utils/scaling.js';
  import { sendSpeakerUpdate } from '../utils/speaker.js';
  import { setupPrintStyles, isPrintMode } from '../utils/pdf.js';
  import { autoAnimate } from '../utils/auto-animate.js';
  import Controls from './Controls.svelte';
  import Progress from './Progress.svelte';
  import SlideNumber from './SlideNumber.svelte';
  import Overview from './Overview.svelte';

  // Import themes
  import '../themes/black.css';
  import '../themes/white.css';
  import '../themes/moon.css';
  import '../themes/serif.css';
  import '../themes/blood.css';

  interface Props {
    theme?: ThemeName;
    transition?: TransitionType;
    transitionSpeed?: 'default' | 'fast' | 'slow';
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
    children?: Snippet;
  }

  const {
    theme = 'black',
    transition = 'slide',
    transitionSpeed = 'default',
    width = 960,
    height = 700,
    controls = true,
    progress = true,
    slideNumber = true,
    hash = true,
    overview = true,
    touch = true,
    keyboard = true,
    loop = false,
    children,
  }: Props = $props();

  const deck = new DeckState();
  setContext('deck', deck);

  // Apply config
  $effect(() => {
    deck.config = {
      width,
      height,
      transition,
      transitionSpeed,
      controls,
      progress,
      slideNumber,
      hash,
      overview,
      touch,
      keyboard,
      loop,
      theme,
    };
  });

  // Scaling
  let scale = $state(1);
  let deckElement: HTMLElement;
  let slidesElement: HTMLElement;

  // Track previous position to detect slide changes for auto-animate
  let prevH = 0;
  let prevV = 0;

  // Auto-animate: trigger FLIP animation when navigating between two autoAnimate slides
  $effect(() => {
    const h = deck.currentH;
    const v = deck.currentV;
    if ((h !== prevH || v !== prevV) && slidesElement) {
      const fromSlide = deck.getSlideAt(prevH, prevV);
      const toSlide = deck.getSlideAt(h, v);
      if (fromSlide?.autoAnimate && toSlide?.autoAnimate) {
        const fromEl = slidesElement.querySelector<HTMLElement>(
          `.slide[data-h="${prevH}"][data-v="${prevV}"]`
        );
        const toEl = slidesElement.querySelector<HTMLElement>(
          `.slide[data-h="${h}"][data-v="${v}"]`
        );
        if (fromEl && toEl) {
          const duration = deck.config.transitionSpeed === 'fast' ? 400
            : deck.config.transitionSpeed === 'slow' ? 1200 : 800;
          autoAnimate(fromEl, toEl, duration);
        }
      }
      prevH = h;
      prevV = v;
    }
  });

  function updateScale() {
    scale = computeScale(deck.config);
  }

  // Hash sync
  $effect(() => {
    if (deck.config.hash) {
      updateHash(deck.currentH, deck.currentV);
    }
  });

  // Speaker notes sync
  $effect(() => {
    sendSpeakerUpdate({
      type: 'state-update',
      currentH: deck.currentH,
      currentV: deck.currentV,
      currentFragment: deck.currentFragment,
      notes: deck.currentNotes,
      totalSlides: deck.totalSlides,
    });
  });

  onMount(() => {
    updateScale();

    const cleanupKeyboard = setupKeyboard(deck);
    const cleanupTouch = setupTouch(deck, deckElement);
    const cleanupHash = setupHashRouting(deck);

    setupPrintStyles(width, height);

    const resizeHandler = () => updateScale();
    window.addEventListener('resize', resizeHandler);

    return () => {
      cleanupKeyboard();
      cleanupTouch();
      cleanupHash();
      window.removeEventListener('resize', resizeHandler);
    };
  });

  const printMode = isPrintMode();
</script>

<div
  class="deck theme-{theme}"
  class:paused={deck.isPaused}
  class:print-pdf={printMode}
  bind:this={deckElement}
>
  <div
    class="deck-slides"
    style="width: {width}px; height: {height}px; transform: scale({scale});"
    bind:this={slidesElement}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>

  {#if deck.isPaused}
    <div class="deck-pause-overlay"></div>
  {/if}

  <Controls />
  <Progress />
  <SlideNumber />
  <Overview />
</div>

<style>
  .deck {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .deck-slides {
    position: relative;
    transform-origin: center center;
  }

  .deck-pause-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 100;
    cursor: pointer;
  }
</style>
