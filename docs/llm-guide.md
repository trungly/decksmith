# LLM Guide — AI-Assisted Presentation Generation

This guide is designed for LLMs and AI agents to generate Decksmith presentations. It provides schemas, templates, rules, and patterns that produce valid, well-structured output.

## Output Format

A Decksmith presentation is a single Svelte component. In the standard workflow, the LLM should generate the contents of `src/App.svelte`.

### Required Structure

```svelte
<script lang="ts">
  import { Deck, Slide, Fragment, Notes, Markdown, Code } from "decksmith";
</script>

<Deck theme="THEME" transition="TRANSITION">
  <Slide h={0} v={0}>
    <!-- Slide content -->
  </Slide>
</Deck>
```

Only import the components you use.

## Rules

1. **Every `<Slide>` must have `h` and `v` props.** The first slide is always `h={0} v={0}`.
2. **`h` values must be sequential** starting from 0. No gaps.
3. **`v` values must start at 0** for each `h` column. Vertical sub-slides increment: `v={0}`, `v={1}`, `v={2}`.
4. **Fragment `index` values start at 0** and increment sequentially within a slide.
5. **One `<Deck>` component per presentation.** All slides must be direct children of `<Deck>`.
6. **Use valid prop values only.** See the enums below.
7. **Inline styles only.** Do not generate `<style>` blocks unless specifically needed for global selectors like `:global(kbd)`.
8. **Escape backticks in template literals.** When `code` or `content` props contain backticks, escape them: `` \` ``.

## Valid Prop Values

### Themes
`"obsidian"` | `"air"` | `"executive"` | `"startup"` | `"editorial"` | `"technical"` | `"playful"` | `"cinematic"`

### Transitions
`"none"` | `"fade"` | `"slide"` | `"convex"` | `"concave"` | `"zoom"`

### Transition Speeds
`"default"` | `"fast"` | `"slow"`

### Fragment Styles
`"fade-in"` | `"fade-out"` | `"fade-up"` | `"fade-down"` | `"fade-left"` | `"fade-right"` | `"fade-in-then-out"` | `"fade-in-then-semi-out"` | `"grow"` | `"shrink"` | `"strike"` | `"highlight-red"` | `"highlight-green"` | `"highlight-blue"` | `"highlight-current-red"` | `"highlight-current-green"` | `"highlight-current-blue"`

## Slide Patterns

### Title Slide

```svelte
<Slide h={0} v={0}>
  <h1>{title}</h1>
  <p>{subtitle}</p>
  <Notes text="{speaker_notes}" />
</Slide>
```

### Bullet Points with Fragments

```svelte
<Slide h={N} v={0}>
  <h2>{heading}</h2>
  <Fragment index={0} style="fade-up"><p>{bullet_1}</p></Fragment>
  <Fragment index={1} style="fade-up"><p>{bullet_2}</p></Fragment>
  <Fragment index={2} style="fade-up"><p>{bullet_3}</p></Fragment>
</Slide>
```

### Code Walkthrough

```svelte
<Slide h={N} v={0}>
  <h2>{heading}</h2>
  <Code
    language="{language}"
    lineNumbers
    highlightLines="{step_spec}"
    code={`{code_content}`}
  />
</Slide>
```

`highlightLines` format: `"1-3|5-7|9"` — pipe-separated steps, each with line numbers or ranges.

### Two-Column Layout

```svelte
<Slide h={N} v={0}>
  <h2>{heading}</h2>
  <div style="display: flex; gap: 2em; margin-top: 1em; text-align: left;">
    <div style="flex: 1;">
      <h3>{left_title}</h3>
      <p>{left_content}</p>
    </div>
    <div style="flex: 1;">
      <h3>{right_title}</h3>
      <p>{right_content}</p>
    </div>
  </div>
</Slide>
```

### Image Slide

```svelte
<Slide h={N} v={0} backgroundImage="{image_url}" backgroundSize="cover">
  <h1 style="text-shadow: 0 2px 10px rgba(0,0,0,0.7);">{heading}</h1>
</Slide>
```

### Gradient Background

```svelte
<Slide h={N} v={0} background="linear-gradient(135deg, {color1}, {color2})">
  <h2>{heading}</h2>
  <p>{content}</p>
</Slide>
```

### Markdown Content

```svelte
<Slide h={N} v={0}>
  <Markdown content={`
## {heading}

- {item_1}
- {item_2}
- **{bold_item}**
  `} />
</Slide>
```

### Vertical Sub-Slides (Drill-Down)

```svelte
<Slide h={N} v={0}>
  <h2>{topic}</h2>
  <p>Press ↓ for details</p>
</Slide>
<Slide h={N} v={1}>
  <h3>{subtopic_1}</h3>
  <p>{detail}</p>
</Slide>
<Slide h={N} v={2}>
  <h3>{subtopic_2}</h3>
  <p>{detail}</p>
</Slide>
```

### Auto-Animate Between Slides

```svelte
<Slide h={N} v={0} autoAnimate>
  <div data-id="box" style="width: 100px; height: 100px; background: var(--ds-accent);"></div>
  <h2 data-id="title">{text_v1}</h2>
</Slide>
<Slide h={N+1} v={0} autoAnimate>
  <div data-id="box" style="width: 200px; height: 200px; background: var(--ds-accent); border-radius: 50%;"></div>
  <h2 data-id="title" style="font-size: 2.5em;">{text_v2}</h2>
</Slide>
```

### Thank You / Closing Slide

```svelte
<Slide h={LAST} v={0} background="linear-gradient(135deg, #0c0c1d, #1a1a3e)">
  <h1>Thank You</h1>
  <p style="margin-top: 0.5em; opacity: 0.7;">{closing_text}</p>
</Slide>
```

## Theme Selection Guide

| Audience/Context | Recommended Theme |
|-----------------|-------------------|
| Tech conference | `obsidian` or `technical` |
| Business/corporate | `executive` or `air` |
| Academic/research | `air` or `editorial` |
| Creative/bold | `playful` or `cinematic` |
| General purpose | `obsidian` |

## Transition Selection Guide

| Content Type | Recommended Transition |
|-------------|----------------------|
| Technical/code-heavy | `none` or `fade` |
| Storytelling/narrative | `slide` |
| Dramatic reveals | `zoom` |
| Professional/polished | `convex` or `concave` |
| Fast-paced | `fade` with `transitionSpeed="fast"` |

## Fragment Style Selection Guide

| Use Case | Recommended Style |
|----------|-------------------|
| Sequential bullet points | `fade-up` |
| Key reveals | `grow` |
| Before/after comparison | `fade-in-then-out` |
| Progressive highlighting | `highlight-current-blue` |
| Emphasis | `highlight-red` |
| Strikethrough (corrections) | `strike` |

## Generation Workflow

Given a user prompt like "Create a 5-slide presentation about microservices":

1. **Plan the structure**: Title, 3 content slides, closing
2. **Assign coordinates**: h=0 through h=4, all v=0
3. **Choose theme**: `obsidian` for a tech topic
4. **Choose transition**: `slide` for general purpose
5. **Generate each slide** using the patterns above
6. **Add fragments** for bullet points (2-4 per slide)
7. **Add speaker notes** for key slides
8. **Include a code example** if relevant

## Complete Example

User prompt: "Create a presentation about REST APIs with 4 slides"

```svelte
<script lang="ts">
  import { Deck, Slide, Fragment, Notes, Code } from "decksmith";
</script>

<Deck theme="technical" transition="slide">
  <Slide h={1} v={0}>
    <h1>REST APIs</h1>
    <p>Designing Clean, Scalable Interfaces</p>
    <Notes text="Introduce REST as the dominant API paradigm for web services." />
  </Slide>

  <Slide h={1} v={0}>
    <h2>Core Principles</h2>
    <Fragment index={0} style="fade-up"><p>Stateless communication</p></Fragment>
    <Fragment index={1} style="fade-up"><p>Resource-based URLs</p></Fragment>
    <Fragment index={2} style="fade-up"><p>Standard HTTP methods (GET, POST, PUT, DELETE)</p></Fragment>
    <Fragment index={3} style="fade-up"><p>JSON as the data format</p></Fragment>
  </Slide>

  <Slide h={2} v={0}>
    <h2>Example Endpoint</h2>
    <Code
      language="typescript"
      lineNumbers
      highlightLines="1-3|5-7|9-11"
      code={`// GET /api/users/:id
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await db.users.findById(id);
  if (!user) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({ data: user });
});`}
    />
  </Slide>

  <Slide h={3} v={0} background="linear-gradient(135deg, #0c0c1d, #1a1a3e)">
    <h1>Thank You</h1>
    <p style="margin-top: 0.5em; opacity: 0.7;">Questions?</p>
  </Slide>
</Deck>
```

## Editing an Existing Presentation

When asked to modify an existing presentation:

1. **Preserve the overall structure** — don't change slide coordinates unless adding/removing slides
2. **When adding slides**, increment `h` values and renumber all subsequent slides
3. **When removing slides**, renumber `h` values to close gaps
4. **When editing text**, replace only the text content, preserving the surrounding component structure
5. **When changing animations**, only modify the `style` prop on `<Fragment>` or `transition` prop on `<Deck>`/`<Slide>`
6. **Return the complete file** — never return partial snippets
