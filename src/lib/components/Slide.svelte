<script lang="ts">
  import { getContext, onMount, setContext, type Snippet } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.js";
  import type { TransitionType } from "../types.js";
  import {
    getSlidePosition,
    getTransitionStyles,
  } from "../transitions/transitions.js";

  interface Props {
    h?: number;
    v?: number;
    transition?: TransitionType;
    background?: string;
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    id?: string;
    autoAnimate?: boolean;
    children?: Snippet;
  }

  const {
    h = 1,
    v = 0,
    transition,
    background = "",
    backgroundImage = "",
    backgroundSize = "cover",
    backgroundPosition = "center",
    id,
    autoAnimate = false,
    children,
  }: Props = $props();

  const deck = getContext<DeckState>("deck");

  // Fragment children call this synchronously during their initialization,
  // before this Slide's onMount fires, so the count is correct by mount time.
  let fragmentCount = $state(0);
  // h/v props are 1-based in source; convert to 0-based for all internal use.
  // Props are stable per-instance; intentionally capturing initial value.
  // svelte-ignore state_referenced_locally
  const slideH = h - 1;
  // svelte-ignore state_referenced_locally
  const slideV = v;
  setContext("slide", {
    get h() {
      return slideH;
    },
    get v() {
      return slideV;
    },
    registerFragment(idx: number) {
      if (idx + 1 > fragmentCount) fragmentCount = idx + 1;
    },
  });

  onMount(() => {
    deck.registerSlide({ h: slideH, v: slideV, id, fragmentCount, autoAnimate, notes: "" });
  });

  const position = $derived(
    getSlidePosition(slideH, slideV, deck.currentH, deck.currentV),
  );
  const activeTransition = $derived(transition ?? deck.config.transition);
  const transitionStyle = $derived(
    getTransitionStyles(
      position,
      activeTransition,
      deck.config.transitionSpeed,
    ),
  );

  function isSafeUrl(url: string): boolean {
    try {
      const parsed = new URL(url, window.location.href);
      return ["http:", "https:", "data:", "blob:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  }

  const bgStyle = $derived.by(() => {
    let s = "";
    if (background) s += `background: ${background};`;
    if (backgroundImage && isSafeUrl(backgroundImage)) {
      // Escape characters that could break out of the CSS url('...') context
      const safeUrl = backgroundImage.replace(/['\\()]/g, (c) => "\\" + c);
      s += `background-image: url('${safeUrl}');`;
      s += `background-size: ${backgroundSize};`;
      s += `background-position: ${backgroundPosition};`;
    }
    return s;
  });
</script>

<section
  class="slide"
  class:current={position === "current"}
  class:auto-animate={autoAnimate}
  data-h={h}
  data-v={v}
  data-id={id}
  style="{transitionStyle} {bgStyle}"
>
  {#if children}
    {@render children()}
  {/if}
</section>

<style>
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: var(--ds-slide-display, flex);
    flex-direction: var(--ds-slide-flex-direction, column);
    align-items: var(--ds-slide-align-items, center);
    justify-content: var(--ds-slide-justify-content, center);
    padding: var(--ds-slide-padding, 40px);
    perspective: 800px;
    overflow: hidden;
    text-align: var(--ds-slide-text-align, center);
  }
</style>
