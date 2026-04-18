<script lang="ts">
  import { setContext, onMount, type Snippet } from "svelte";
  import { DeckState } from "../state/deck-state.svelte.ts";
  import type {
    TransitionType,
    ThemeName,
    ScrollLayout,
    ContentSize,
    AspectRatio,
  } from "../types.ts";
  import { setupKeyboard } from "../utils/keyboard.ts";
  import { setupTouch } from "../utils/touch.ts";
  import { setupHashRouting, updateHash } from "../utils/hash.ts";
  import { computeScale } from "../utils/scaling.ts";
  import { sendSpeakerUpdate } from "../utils/speaker.ts";
  import { setupPrintStyles, isPrintMode } from "../utils/pdf.ts";
  import { autoAnimate } from "../utils/auto-animate.ts";
  import Controls from "./Controls.svelte";
  import Progress from "./Progress.svelte";
  import SlideNumber from "./SlideNumber.svelte";
  import Overview from "./Overview.svelte";
  import ScrollProgress from "./ScrollProgress.svelte";

  // Import themes
  import "../themes/obsidian.css";
  import "../themes/air.css";
  import "../themes/executive.css";
  import "../themes/startup.css";
  import "../themes/editorial.css";
  import "../themes/technical.css";
  import "../themes/playful.css";
  import "../themes/cinematic.css";

  interface Props {
    theme?: ThemeName;
    transition?: TransitionType;
    transitionSpeed?: "default" | "fast" | "slow";
    contentSize?: ContentSize;
    aspectRatio?: AspectRatio;
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
    children?: Snippet;
  }

  const {
    theme = "obsidian",
    transition = "slide",
    transitionSpeed = "default",
    contentSize = "comfortable",
    aspectRatio = "16:9",
    controls = true,
    progress = true,
    slideNumber = true,
    hash = true,
    overview = true,
    touch = true,
    keyboard = true,
    loop = false,
    scrollView = false,
    scrollLayout = "full",
    scrollSnap = true,
    children,
  }: Props = $props();

  // Content-size presets map to a dimensionless multiplier. Themes read
  // `--ds-content-size-scale` and multiply it into their own base sizes (font-size,
  // padding, stack-gap), so each theme keeps its typographic identity while
  // contentSize scales everything proportionally.
  const CONTENT_SIZE_SCALE: Record<ContentSize, number> = {
    comfortable: 1.0,
    cozy: 0.85,
    compact: 0.7,
  };

  // Canonical virtual canvas anchored on 1080p height — matches modern screens
  // and PDF-export conventions. Width follows from aspect ratio.
  const BASE_HEIGHT = 1080;
  const RATIOS: Record<AspectRatio, number> = {
    "16:9": 16 / 9,
    "4:3": 4 / 3,
    "1:1": 1,
    "9:16": 9 / 16,
    "21:9": 21 / 9,
  };

  const ratio = $derived(RATIOS[aspectRatio]);
  const height = $derived(BASE_HEIGHT);
  const width = $derived(Math.round(BASE_HEIGHT * ratio));
  const contentSizeScale = $derived(CONTENT_SIZE_SCALE[contentSize]);
  const contentSizeVarsStyle = $derived(
    `--ds-content-size-scale: ${contentSizeScale};`,
  );

  // aspectRatio has no effect in scroll view; warn so misuse is visible.
  $effect(() => {
    if (scrollView && aspectRatio !== "16:9") {
      // eslint-disable-next-line no-console
      console.warn(
        `[decksmith] aspectRatio="${aspectRatio}" is ignored when scrollView is enabled`,
      );
    }
  });

  const deck = new DeckState();
  setContext("deck", deck);

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
      scrollView,
      scrollLayout,
      scrollSnap,
    };
  });

  // Scaling
  let scale = $state(1);
  let deckElement = $state<HTMLElement>(undefined!);
  let slidesElement = $state<HTMLElement>(undefined!);

  // Track previous position to detect slide changes for auto-animate
  let prevH = 0;
  let prevV = 0;

  // Auto-animate: trigger FLIP animation when navigating between two autoAnimate slides
  $effect(() => {
    if (scrollView) return; // auto-animate not applicable in scroll view
    const h = deck.currentH;
    const v = deck.currentV;
    if ((h !== prevH || v !== prevV) && slidesElement) {
      const fromSlide = deck.getSlideAt(prevH, prevV);
      const toSlide = deck.getSlideAt(h, v);
      if (fromSlide?.autoAnimate && toSlide?.autoAnimate) {
        const fromEl = slidesElement.querySelector<HTMLElement>(
          `.slide[data-h="${prevH}"][data-v="${prevV}"]`,
        );
        const toEl = slidesElement.querySelector<HTMLElement>(
          `.slide[data-h="${h}"][data-v="${v}"]`,
        );
        if (fromEl && toEl) {
          const duration =
            deck.config.transitionSpeed === "fast"
              ? 400
              : deck.config.transitionSpeed === "slow"
                ? 1200
                : 800;
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
    if (deck.config.hash && !scrollView) {
      updateHash(deck.currentH, deck.currentV);
    }
  });

  // Speaker notes sync
  $effect(() => {
    sendSpeakerUpdate({
      type: "state-update",
      currentH: deck.currentH,
      currentV: deck.currentV,
      currentFragment: deck.currentFragment,
      notes: deck.currentNotes,
      totalSlides: deck.totalSlides,
    });
  });

  // Scroll view: track scroll position to update current slide
  let scrollProgress = $state(0);
  let programmaticScroll = false;

  function scrollToSlide(h: number, v: number) {
    const slideEl = slidesElement?.querySelector<HTMLElement>(
      `.slide[data-h="${h}"][data-v="${v}"]`,
    );
    if (!slideEl) return;
    programmaticScroll = true;
    slideEl.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      programmaticScroll = false;
    }, 1000);
  }

  // Sync keyboard/programmatic navigation to scroll position in scroll view mode.
  // Runs whenever currentH/V changes; the programmaticScroll flag prevents
  // the resulting scroll event from immediately overwriting that change.
  $effect(() => {
    if (!scrollView || !slidesElement) return;
    scrollToSlide(deck.currentH, deck.currentV);
  });

  function setupScrollTracking() {
    if (!scrollView || !deckElement) return () => {};
    const scrollEl = deckElement;

    function onScroll() {
      if (programmaticScroll) return;

      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      scrollProgress = maxScroll > 0 ? scrollEl.scrollTop / maxScroll : 0;

      const slideEls = slidesElement.querySelectorAll<HTMLElement>(".slide");
      const viewportCenter = scrollEl.scrollTop + scrollEl.clientHeight / 2;

      for (const slideEl of slideEls) {
        const slideTop = slideEl.offsetTop;
        const slideBottom = slideTop + slideEl.offsetHeight;
        if (viewportCenter >= slideTop && viewportCenter < slideBottom) {
          const h = Number.parseInt(slideEl.dataset.h ?? "", 10);
          const v = Number.parseInt(slideEl.dataset.v ?? "", 10);
          if (Number.isNaN(h) || Number.isNaN(v)) {
            continue;
          }
          if (h !== deck.currentH || v !== deck.currentV) {
            deck.goTo(h, v); // resets currentFragment to -1
          }
          break;
        }
      }
    }

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }

  onMount(() => {
    if (!scrollView) {
      updateScale();
    }

    const cleanupKeyboard = setupKeyboard(deck);
    const cleanupTouch = scrollView ? () => {} : setupTouch(deck, deckElement);
    const cleanupHash = scrollView ? () => {} : setupHashRouting(deck);
    const cleanupScroll = setupScrollTracking();

    setupPrintStyles(width, height);

    const resizeHandler = () => {
      if (!scrollView) updateScale();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      cleanupKeyboard();
      cleanupTouch();
      cleanupHash();
      cleanupScroll();
      window.removeEventListener("resize", resizeHandler);
    };
  });

  const printMode = isPrintMode();
</script>

{#if scrollView}
  <!-- Scroll View Mode -->
  <div
    class="deck deck-scroll theme-{theme}"
    class:scroll-snap={scrollSnap}
    class:scroll-full={scrollLayout === "full"}
    class:scroll-compact={scrollLayout === "compact"}
    class:print-pdf={printMode}
    style={contentSizeVarsStyle}
    bind:this={deckElement}
  >
    <div class="deck-scroll-slides" bind:this={slidesElement}>
      {#if children}
        {@render children()}
      {/if}
    </div>
    <ScrollProgress value={scrollProgress} />
    {#if deck.isPaused}
      <div class="deck-pause-overlay"></div>
    {/if}
    <Overview />
  </div>
{:else}
  <!-- Standard Slide View Mode -->
  <div
    class="deck theme-{theme}"
    class:paused={deck.isPaused}
    class:print-pdf={printMode}
    style={contentSizeVarsStyle}
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
{/if}

<style>
  /* === Standard Slide View === */
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

  /* === Scroll View Mode === */
  .deck-scroll {
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
    height: 100vh;
    scroll-behavior: smooth;
  }

  .deck-scroll.scroll-snap {
    scroll-snap-type: y mandatory;
  }

  .deck-scroll-slides {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  /* In scroll view, slides are positioned statically, not absolute */
  .deck-scroll-slides :global(.slide) {
    position: relative;
    width: 100%;
    max-width: 960px;
    box-sizing: border-box;
  }

  .deck-scroll.scroll-full .deck-scroll-slides :global(.slide) {
    min-height: 100vh;
    scroll-snap-align: start;
  }

  .deck-scroll.scroll-compact .deck-scroll-slides :global(.slide) {
    min-height: auto;
    padding: 60px 40px;
    scroll-snap-align: start;
  }

  /* In scroll view, all slides are visible (no transition hiding) */
  .deck-scroll-slides :global(.slide) {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    z-index: auto !important;
  }

  /* Overlays must be fixed to the viewport in scroll view, not the scroll origin */
  .deck-scroll .deck-pause-overlay,
  .deck-scroll :global(.deck-overview) {
    position: fixed;
  }

  /* In scroll view, fragments are revealed based on scroll position */
  .deck-scroll-slides :global(.fragment) {
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
</style>
