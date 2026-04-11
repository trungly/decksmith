import type { DeckState } from "../state/deck-state.svelte.ts";

export function parseHash(): { h: number; v: number; f: number } {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").map(Number);
  return {
    h: parts[0] || 0,
    v: parts[1] || 0,
    f: parts[2] !== undefined ? parts[2] : -1,
  };
}

export function updateHash(h: number, v: number) {
  const hash = v > 0 ? `#/${h}/${v}` : `#/${h}`;
  if (window.location.hash !== hash) {
    history.replaceState(null, "", hash);
  }
}

export function setupHashRouting(deck: DeckState): () => void {
  if (!deck.config.hash) return () => {};

  // Restore position from hash on load
  const initial = parseHash();
  if (initial.h > 0 || initial.v > 0) {
    // Defer to let slides register first
    setTimeout(() => {
      deck.goTo(initial.h, initial.v, initial.f);
    }, 0);
  }

  function handleHashChange() {
    const pos = parseHash();
    if (pos.h !== deck.currentH || pos.v !== deck.currentV) {
      deck.goTo(pos.h, pos.v, pos.f);
    }
  }

  window.addEventListener("hashchange", handleHashChange);

  return () => {
    window.removeEventListener("hashchange", handleHashChange);
  };
}
