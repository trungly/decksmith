import type { DeckConfig } from "../types.ts";

export function computeScale(config: DeckConfig): number {
  const windowW = window.innerWidth;
  const windowH = window.innerHeight;
  return Math.min(windowW / config.width, windowH / config.height);
}
