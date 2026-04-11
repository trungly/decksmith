import type { DeckState } from "../state/deck-state.svelte.ts";

const SWIPE_THRESHOLD = 40;

export function setupTouch(deck: DeckState, element: HTMLElement): () => void {
  if (!deck.config.touch) return () => {};

  let startX = 0;
  let startY = 0;
  let startTime = 0;

  function handleTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
  }

  function handleTouchEnd(e: TouchEvent) {
    if (e.changedTouches.length !== 1) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    const dt = Date.now() - startTime;

    // Only count quick swipes (under 300ms)
    if (dt > 300) return;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) return;

    if (absDx > absDy) {
      // Horizontal swipe
      if (dx < 0) {
        deck.next();
      } else {
        deck.prev();
      }
    } else {
      // Vertical swipe
      if (dy < 0) {
        deck.down();
      } else {
        deck.up();
      }
    }
  }

  element.addEventListener("touchstart", handleTouchStart, { passive: true });
  element.addEventListener("touchend", handleTouchEnd, { passive: true });

  return () => {
    element.removeEventListener("touchstart", handleTouchStart);
    element.removeEventListener("touchend", handleTouchEnd);
  };
}
