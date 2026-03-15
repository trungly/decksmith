import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      decksmith: fileURLToPath(new URL("./src/lib/index.js", import.meta.url)),
    },
  },
});
