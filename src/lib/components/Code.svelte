<script lang="ts">
  import { getContext } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.js";
  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";

  interface Props {
    /** The code string to display */
    code?: string;
    /** Language for syntax highlighting (auto-detected if omitted) */
    language?: string;
    /** Show line numbers */
    lineNumbers?: boolean;
    /**
     * Line highlight steps, pipe-separated.
     * Each step highlights the specified lines/ranges.
     * e.g. "1|2-3|4,6-10" creates 3 fragment steps.
     */
    highlightLines?: string;
    /** Starting line number offset (default 1) */
    lineNumberStart?: number;
  }

  const {
    code = "",
    language,
    lineNumbers = false,
    highlightLines = "",
    lineNumberStart = 1,
  }: Props = $props();

  const deck = getContext<DeckState>("deck");
  const slide = getContext<{
    h: number;
    v: number;
    registerFragment: (i: number) => void;
  }>("slide");

  // Parse highlight steps: "1|2-3|4,6-10" → [[1], [2,3], [4,6,7,8,9,10]]
  function parseHighlightSteps(spec: string): number[][] {
    if (!spec) return [];
    return spec.split("|").map((step) => {
      const lines: number[] = [];
      for (const part of step.split(",")) {
        const trimmed = part.trim();
        const range = trimmed.split("-");
        if (range.length === 2) {
          const start = parseInt(range[0], 10);
          const end = parseInt(range[1], 10);
          for (let i = start; i <= end; i++) lines.push(i);
        } else {
          lines.push(parseInt(trimmed, 10));
        }
      }
      return lines;
    });
  }

  const steps = $derived(parseHighlightSteps(highlightLines));
  const hasSteps = $derived(steps.length > 0);

  // Register each highlight step as a fragment (synchronously, like Fragment does)
  // svelte-ignore state_referenced_locally
  {
    const initSteps = parseHighlightSteps(highlightLines);
    for (let i = 0; i < initSteps.length; i++) {
      slide.registerFragment(i);
    }
  }

  // Which step is currently active (for line highlighting)
  const isCurrentSlide = $derived(
    slide.h === deck.currentH && slide.v === deck.currentV,
  );
  const activeStep = $derived.by(() => {
    if (!hasSteps || !isCurrentSlide) return -1;
    return deck.currentFragment;
  });

  // Highlighted HTML from highlight.js
  const highlightedHtml = $derived.by(() => {
    const trimmed = code.replace(/^\n/, "").replace(/\n$/, "");
    if (language) {
      try {
        return hljs.highlight(trimmed, { language }).value;
      } catch {
        return hljs.highlightAuto(trimmed).value;
      }
    }
    return hljs.highlightAuto(trimmed).value;
  });

  // Split into lines for line-number and line-highlight rendering
  const lines = $derived(highlightedHtml.split("\n"));

  // Check if a line number is highlighted in the current step
  function isLineHighlighted(lineNum: number): boolean {
    if (activeStep < 0 || activeStep >= steps.length) return false;
    return steps[activeStep].includes(lineNum);
  }
</script>

<!-- eslint-disable svelte/no-at-html-tags -- highlight.js output is trusted -->
<div
  class="code-block"
  class:has-line-numbers={lineNumbers}
  class:has-highlights={hasSteps}
>
  <pre><code class={language ? `hljs language-${language}` : "hljs"}
      >{#each lines as line, i (i)}{@const lineNum = i + lineNumberStart}<span
          class="code-line"
          class:highlighted={hasSteps &&
            activeStep >= 0 &&
            isLineHighlighted(lineNum)}
          class:dimmed={hasSteps &&
            activeStep >= 0 &&
            !isLineHighlighted(lineNum)}
          >{#if lineNumbers}<span class="line-number">{lineNum}</span>{/if}<span
            class="line-content">{@html line}</span
          >
</span>{/each}</code
    ></pre>
</div>

<style>
  .code-block {
    width: 100%;
    text-align: left;
    font-size: 0.85em;
    border-radius: var(--ds-code-radius, 8px);
    overflow: hidden;
  }

  pre {
    margin: 0;
    padding: 1em;
    overflow-x: auto;
    background: var(--ds-pre-bg, rgba(0, 0, 0, 0.4));
    border-radius: var(--ds-code-radius, 8px);
    border: 1px solid var(--ds-border, transparent);
  }

  code {
    font-family: var(--ds-code-font, "Fira Code", "Cascadia Code", "JetBrains Mono", "Consolas", monospace);
    line-height: 1.6;
    tab-size: 2;
    background: none !important;
    padding: 0 !important;
  }

  .code-line {
    display: block;
    padding: 0 0.5em;
    margin: 0 -0.5em;
    border-radius: 2px;
    transition:
      opacity 0.3s ease,
      background 0.3s ease;
  }

  .code-line.highlighted {
    background: var(--ds-code-highlight-bg, rgba(255, 255, 100, 0.12));
    opacity: 1;
  }

  .code-line.dimmed {
    opacity: 0.35;
  }

  .line-number {
    display: inline-block;
    width: 3em;
    text-align: right;
    padding-right: 1em;
    margin-right: 0.5em;
    opacity: 0.35;
    user-select: none;
    border-right: 1px solid var(--ds-border, rgba(255, 255, 255, 0.1));
  }

  .code-line.highlighted .line-number {
    opacity: 0.6;
  }

  .line-content {
    /* inline to flow with line-number */
  }
</style>
