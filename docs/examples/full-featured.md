# Full-Featured Presentation

Demonstrates all major Decksmith features: fragments, transitions, code highlighting, markdown, auto-animate, vertical slides, backgrounds, and speaker notes.

Paste this into `src/App.svelte`:

```svelte
<script lang="ts">
  import { Deck, Slide, Fragment, Notes, Markdown, Code } from "./lib/index.js";
</script>

<Deck theme="dusk" transition="slide">
  <!-- Title -->
  <Slide h={0} v={0}>
    <h1>Building Modern Web Apps</h1>
    <p>A comprehensive overview</p>
    <Notes text="Welcome the audience. This talk covers frontend, backend, and deployment." />
  </Slide>

  <!-- Fragments -->
  <Slide h={1} v={0}>
    <h2>The Modern Stack</h2>
    <Fragment index={0} style="fade-up"><p>Frontend: Svelte, React, or Vue</p></Fragment>
    <Fragment index={1} style="fade-up"><p>Backend: Node.js, Go, or Rust</p></Fragment>
    <Fragment index={2} style="fade-up"><p>Database: PostgreSQL or SQLite</p></Fragment>
    <Fragment index={3} style="fade-up"><p>Deploy: Containers + CDN</p></Fragment>
    <Notes text="Discuss why each layer matters." />
  </Slide>

  <!-- Vertical sub-slides -->
  <Slide h={2} v={0}>
    <h2>Frontend Deep Dive</h2>
    <p>Press ↓ to explore</p>
  </Slide>

  <Slide h={2} v={1} background="#1a1a2e">
    <h3>Component Architecture</h3>
    <Markdown content={`
- Encapsulated UI pieces
- Props for data flow
- Events for communication
- **Composition** over inheritance
    `} />
  </Slide>

  <Slide h={2} v={2} background="linear-gradient(135deg, #667eea, #764ba2)">
    <h3>State Management</h3>
    <p>Keep state close to where it's used</p>
  </Slide>

  <!-- Code walkthrough -->
  <Slide h={3} v={0}>
    <h2>Server Example</h2>
    <Code
      language="typescript"
      lineNumbers
      highlightLines="1-2|4-7|9-11"
      code={`import { serve } from "bun";
import { Database } from "bun:sqlite";

const db = new Database("app.db");
db.run(\`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY, name TEXT
)\`);

serve({
  port: 3000,
  fetch: (req) => new Response("Hello!"),
});`}
    />
  </Slide>

  <!-- Fade transition override -->
  <Slide h={4} v={0} transition="fade">
    <h2>Performance Matters</h2>
    <div style="display: flex; gap: 2em; margin-top: 1em; text-align: left;">
      <div style="flex: 1;">
        <h3>Before</h3>
        <p>3.2s load time</p>
        <p>12MB bundle</p>
      </div>
      <div style="flex: 1;">
        <h3>After</h3>
        <p>0.8s load time</p>
        <p>180KB bundle</p>
      </div>
    </div>
  </Slide>

  <!-- Auto-animate -->
  <Slide h={5} v={0} autoAnimate>
    <div data-id="metric" style="font-size: 2em; color: var(--ds-accent);">0.8s</div>
    <h2 data-id="label">Load Time</h2>
  </Slide>

  <Slide h={6} v={0} autoAnimate>
    <div data-id="metric" style="font-size: 4em; color: var(--ds-accent);">0.8s</div>
    <h2 data-id="label" style="font-size: 1.5em;">That's 4x faster</h2>
  </Slide>

  <!-- Closing -->
  <Slide h={7} v={0} background="linear-gradient(135deg, #0c0c1d, #1a1a3e)">
    <h1>Ship It</h1>
    <p style="margin-top: 0.5em; opacity: 0.7;">Build fast, deploy faster</p>
    <Notes text="Thank the audience. Open for Q&A." />
  </Slide>
</Deck>
```
