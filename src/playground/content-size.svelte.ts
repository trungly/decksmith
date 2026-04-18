import type { ContentSize } from "../lib/types.ts";

export const playgroundDeck = $state<{ contentSize: ContentSize }>({
  contentSize: "M",
});
