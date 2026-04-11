import type { DeckState } from "../state/deck-state.svelte.ts";
import { openSpeakerWindow } from "./speaker.ts";

export function setupKeyboard(deck: DeckState): () => void {
  function handleKeydown(e: KeyboardEvent) {
    if (!deck.config.keyboard) return;

    // Ignore when typing in inputs
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        e.preventDefault();
        if (deck.isOverview) {
          deck.right();
        } else {
          deck.next();
        }
        break;

      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        if (deck.isOverview) {
          deck.left();
        } else {
          deck.prev();
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (deck.isOverview) {
          deck.down();
        } else {
          deck.next();
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (deck.isOverview) {
          deck.up();
        } else {
          deck.prev();
        }
        break;

      case " ":
        e.preventDefault();
        if (e.shiftKey) {
          deck.prev();
        } else {
          deck.next();
        }
        break;

      case "Escape":
        e.preventDefault();
        if (deck.isOverview) {
          deck.isOverview = false;
        } else {
          deck.toggleOverview();
        }
        break;

      case "Home":
        e.preventDefault();
        deck.goToFirst();
        break;

      case "End":
        e.preventDefault();
        deck.goToLast();
        break;

      case "f":
      case "F":
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleFullscreen();
        }
        break;

      case "s":
      case "S":
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          openSpeakerWindow();
        }
        break;

      case ".":
      case "b":
      case "B":
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          deck.togglePause();
        }
        break;
    }
  }

  window.addEventListener("keydown", handleKeydown);
  return () => window.removeEventListener("keydown", handleKeydown);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}
