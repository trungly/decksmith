# Technical Talk

A code-heavy presentation using the black theme with multiple code walkthroughs.

```svelte
<script lang="ts">
  import Deck from "./lib/components/Deck.svelte";
  import Slide from "./lib/components/Slide.svelte";
  import Fragment from "./lib/components/Fragment.svelte";
  import Notes from "./lib/components/Notes.svelte";
  import Code from "./lib/components/Code.svelte";
</script>

<Deck theme="black" transition="none">
  <Slide h={0} v={0}>
    <h1>Zero-Cost Abstractions in Rust</h1>
    <p style="opacity: 0.6;">How the compiler does the heavy lifting</p>
    <Notes text="Target audience: developers familiar with systems programming." />
  </Slide>

  <Slide h={1} v={0}>
    <h2>The Promise</h2>
    <Fragment index={0} style="fade-up">
      <p>Write high-level, expressive code</p>
    </Fragment>
    <Fragment index={1} style="fade-up">
      <p>Get low-level, optimal machine code</p>
    </Fragment>
    <Fragment index={2} style="grow">
      <p style="font-size: 1.3em; margin-top: 0.5em;"><strong>No runtime cost for abstraction</strong></p>
    </Fragment>
  </Slide>

  <Slide h={2} v={0}>
    <h2>Iterators vs Loops</h2>
    <Code
      language="rust"
      lineNumbers
      highlightLines="1-4|6-8"
      code={`// Imperative loop
let mut sum = 0;
for i in 0..1000 {
    sum += i * i;
}

// Iterator chain — same assembly output
let sum: i32 = (0..1000).map(|i| i * i).sum();`}
    />
    <Notes text="Show godbolt.org comparison of both versions." />
  </Slide>

  <Slide h={3} v={0}>
    <h2>Generics: Monomorphization</h2>
    <Code
      language="rust"
      lineNumbers
      highlightLines="1-3|5-6|8-9"
      code={`fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
    a + b
}

// Compiler generates specialized versions:
// fn add_i32(a: i32, b: i32) -> i32

// fn add_f64(a: f64, b: f64) -> f64
// No vtable, no dynamic dispatch`}
    />
  </Slide>

  <Slide h={4} v={0}>
    <h2>Traits vs Interfaces</h2>
    <div style="display: flex; gap: 1.5em; text-align: left;">
      <div style="flex: 1;">
        <h3>Static dispatch</h3>
        <Code
          language="rust"
          code={`fn process(item: impl Display) {
    println!("{}", item);
}
// Inlined at compile time`}
        />
      </div>
      <div style="flex: 1;">
        <h3>Dynamic dispatch</h3>
        <Code
          language="rust"
          code={`fn process(item: &dyn Display) {
    println!("{}", item);
}
// vtable lookup at runtime`}
        />
      </div>
    </div>
  </Slide>

  <Slide h={5} v={0}>
    <h2>Benchmarks</h2>
    <div style="text-align: left; font-size: 0.85em;">
      <Fragment index={0} style="fade-in">
        <p><code>Vec&lt;i32&gt;</code> iteration: <strong>identical</strong> to C array loop</p>
      </Fragment>
      <Fragment index={1} style="fade-in">
        <p><code>HashMap</code> lookup: within <strong>5%</strong> of hand-optimized C</p>
      </Fragment>
      <Fragment index={2} style="fade-in">
        <p><code>async/await</code>: zero-alloc state machines, no GC</p>
      </Fragment>
      <Fragment index={3} style="highlight-blue">
        <p>Abstractions compile away — you pay for what you use</p>
      </Fragment>
    </div>
  </Slide>

  <Slide h={6} v={0} background="linear-gradient(135deg, #1a1a2e, #16213e)">
    <h1>Write Clean Code</h1>
    <p style="opacity: 0.7;">Let the compiler optimize</p>
    <Notes text="Wrap up. Encourage attendees to try Rust for their next systems project." />
  </Slide>
</Deck>
```
