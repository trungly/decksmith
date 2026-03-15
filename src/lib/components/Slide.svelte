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
    h = 0,
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
  // Props are stable per-instance; intentionally capturing initial value.
  // svelte-ignore state_referenced_locally
  const slideH = h;
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
    deck.registerSlide({ h, v, id, fragmentCount, autoAnimate, notes: "" });
  });

  const position = $derived(
    getSlidePosition(h, v, deck.currentH, deck.currentV),
  );
  const activeTransition = $derived(transition ?? deck.config.transition);
  const transitionStyle = $derived(
    getTransitionStyles(
      position,
      activeTransition,
      deck.config.transitionSpeed,
    ),
  );

  const bgStyle = $derived.by(() => {
    let s = "";
    if (background) s += `background: ${background};`;
    if (backgroundImage) {
      s += `background-image: url('${backgroundImage}');`;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    perspective: 800px;
    overflow: hidden;
    text-align: center;
  }
</style>
