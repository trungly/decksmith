# Code Highlighting

The `<Code>` component renders syntax-highlighted code blocks with optional line numbers and line-by-line step-through.

## Basic Usage

```svelte
<Slide h={0} v={0}>
  <Code language="javascript" code={`const greeting = "Hello, world!";
console.log(greeting);`} />
</Slide>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | `""` | The code to display |
| `language` | `string` | _(auto-detect)_ | Language for syntax highlighting |
| `lineNumbers` | `boolean` | `false` | Show line numbers |
| `highlightLines` | `string` | `""` | Line highlight steps (pipe-separated) |
| `lineNumberStart` | `number` | `1` | Starting line number |

## Language Support

Specify the language explicitly for best results:

```svelte
<Code language="typescript" code={`...`} />
<Code language="python" code={`...`} />
<Code language="svelte" code={`...`} />
<Code language="rust" code={`...`} />
```

If omitted, the language is auto-detected. Powered by [highlight.js](https://highlightjs.org/) — supports 190+ languages.

## Line Numbers

```svelte
<Code language="python" lineNumbers code={`def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`} />
```

Start line numbers from a different value:

```svelte
<Code language="python" lineNumbers lineNumberStart={10} code={`...`} />
```

## Line-by-Line Step-Through

The `highlightLines` prop creates fragment steps. Each `|`-separated group highlights specific lines. Non-highlighted lines dim to 35% opacity.

### Format

```
"1"           → Highlight line 1
"1-3"         → Highlight lines 1 through 3
"1,4,7"       → Highlight lines 1, 4, and 7
"1-2|3-5|7"   → 3 steps: lines 1-2, then 3-5, then line 7
```

### Example

```svelte
<Slide h={0} v={0}>
  <h2>Server Setup</h2>
  <Code
    language="typescript"
    lineNumbers
    highlightLines="1-2|4-6|8-10"
    code={`import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(3000, () => {
  console.log("Running on :3000");
});`}
  />
</Slide>
```

**Step 1**: Lines 1-2 highlighted (imports)
**Step 2**: Lines 4-6 highlighted (route handler)
**Step 3**: Lines 8-10 highlighted (server start)

Press Space or → to advance through each step.

## Styling

Code blocks use the atom-one-dark highlight.js theme. The block has:

- Dark semi-transparent background
- Monospace font (Fira Code, Cascadia Code, JetBrains Mono, or Consolas)
- 8px border radius
- Horizontal scrolling for long lines
