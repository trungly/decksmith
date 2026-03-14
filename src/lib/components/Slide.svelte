<script lang="ts">
  import { getContext, onMount, type Snippet } from 'svelte';
  import type { DeckState } from '../state/deck-state.svelte.js';
  import type { TransitionType } from '../types.js';
  import { getSlidePosition, getTransitionStyles } from '../transitions/transitions.js';

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

  let {
    h = 0,
    v = 0,
    transition,
    background = '',
    backgroundImage = '',
    backgroundSize = 'cover',
    backgroundPosition = 'center',
    id,
    autoAnimate = false,
    children,
  }: Props = $props();

  const deck = getContext<DeckState>('deck');

  onMount(() => {
    deck.registerSlide({
      h,
      v,
      id,
      fragmentCount: 0,
      autoAnimate,
      notes: '',
    });
  });

  const position = $derived(getSlidePosition(h, v, deck.currentH, deck.currentV));
  const activeTransition = $derived(transition ?? deck.config.transition);
  const transitionStyle = $derived(getTransitionStyles(position, activeTransition, deck.config.transitionSpeed));

  const bgStyle = $derived(() => {
    let s = '';
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
  class:current={position === 'current'}
  class:auto-animate={autoAnimate}
  data-h={h}
  data-v={v}
  data-id={id}
  style="{transitionStyle} {bgStyle()}"
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
