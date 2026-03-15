# Markdown

The `<Markdown>` component renders Markdown content inside a slide.

## Usage

```svelte
<Slide h={0} v={0}>
  <Markdown content={`
## Features

- **Bold** and *italic* text
- \`inline code\` snippets
- [Links](https://example.com)

> Blockquotes work too!
  `} />
</Slide>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `""` | Markdown string to render |

## Supported Syntax

All standard Markdown is supported (powered by [Marked](https://marked.js.org/)):

- Headings (`#`, `##`, `###`)
- Bold (`**text**`), italic (`*text*`)
- Bullet lists (`-` or `*`)
- Numbered lists (`1.`)
- Links (`[text](url)`)
- Inline code (`` `code` ``)
- Code blocks (triple backticks)
- Blockquotes (`>`)
- Horizontal rules (`---`)
- Images (`![alt](url)`)

## Mixing with Components

Use Markdown for text-heavy slides and combine with other components:

```svelte
<Slide h={0} v={0}>
  <h2>Overview</h2>
  <Markdown content={`
Key takeaways:

- Performance improved by **3x**
- Error rate dropped to *0.1%*
- User satisfaction at \`98%\`
  `} />
</Slide>
```

## Code Blocks

For syntax-highlighted code with line step-through, use the `<Code>` component instead. Markdown code blocks render as plain `<pre><code>` without highlighting.
