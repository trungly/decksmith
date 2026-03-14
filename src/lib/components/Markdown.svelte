<script lang="ts">
  import { marked } from 'marked';

  interface Props {
    content?: string;
  }

  const { content = '' }: Props = $props();

  const html = $derived(marked.parse(content, { async: false }) as string);
</script>

<div class="markdown-content">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- intentional: content is rendered from marked, not user input -->
  {@html html}
</div>

<style>
  .markdown-content {
    text-align: left;
    width: 100%;
  }
  .markdown-content :global(h1) { font-size: 2em; margin-bottom: 0.5em; }
  .markdown-content :global(h2) { font-size: 1.6em; margin-bottom: 0.4em; }
  .markdown-content :global(h3) { font-size: 1.3em; margin-bottom: 0.3em; }
  .markdown-content :global(p) { margin-bottom: 0.8em; line-height: 1.6; }
  .markdown-content :global(ul), .markdown-content :global(ol) {
    margin-left: 1.5em;
    margin-bottom: 0.8em;
  }
  .markdown-content :global(li) { margin-bottom: 0.3em; line-height: 1.5; }
  .markdown-content :global(code) {
    background: rgba(255,255,255,0.1);
    padding: 0.1em 0.4em;
    border-radius: 4px;
    font-family: 'Fira Code', 'Cascadia Code', monospace;
    font-size: 0.9em;
  }
  .markdown-content :global(pre) {
    background: rgba(0,0,0,0.3);
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1em;
  }
  .markdown-content :global(pre code) {
    background: none;
    padding: 0;
  }
  .markdown-content :global(blockquote) {
    border-left: 4px solid currentColor;
    padding-left: 1em;
    opacity: 0.8;
    margin-bottom: 0.8em;
  }
  .markdown-content :global(img) { max-width: 100%; height: auto; border-radius: 4px; }
  .markdown-content :global(a) { text-decoration: underline; }
  .markdown-content :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1em;
  }
  .markdown-content :global(th), .markdown-content :global(td) {
    border: 1px solid rgba(255,255,255,0.2);
    padding: 0.5em 0.8em;
    text-align: left;
  }
  .markdown-content :global(th) { font-weight: bold; }
</style>
