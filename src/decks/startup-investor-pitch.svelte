<script lang="ts">
  import { Deck, Slide, Fragment, Notes } from "decksmith";
</script>

<Deck theme="startup" transition="slide">
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 3em;">Decksmith AI</h1>
    <p>The AI-native presentation builder for product and engineering teams.</p>
    <Notes text="Welcome! We're reimagining how teams create decks." />
  </Slide>

  <!-- Slide 2: Problem -->
  <Slide h={2} v={0}>
    <h2>The Problem</h2>
    <div style="text-align: left; margin-top: 1em;">
      <p>⚠️ Slides are slow and tedious to build manually.</p>
      <p>⚠️ Existing tools lack technical context (code, docs).</p>
      <p>⚠️ Consistency across teams is hard to maintain.</p>
    </div>
    <Notes text="Engineers hate slides because they're disconnected from their workflow." />
  </Slide>

  <!-- Slide 3: Solution -->
  <Slide h={3} v={0}>
    <h2>The Solution</h2>
    <p>Decksmith is a code-first, AI-native framework for presentations.</p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em; margin-top: 1em;">
      <div style="background: rgba(0,0,0,0.05); padding: 1em; border-radius: 8px;">
        <h3>AI-Powered</h3>
        <p>Generates content from docs and codebase.</p>
      </div>
      <div style="background: rgba(0,0,0,0.05); padding: 1em; border-radius: 8px;">
        <h3>Developer-First</h3>
        <p>Uses Svelte, Markdown, and standard Git workflows.</p>
      </div>
    </div>
    <Notes text="We bridge the gap between engineering and communication." />
  </Slide>

  <!-- Slide 4: Traction -->
  <Slide h={4} v={0}>
    <h2>Traction</h2>
    <div style="display: flex; justify-content: space-around; margin-top: 2em;">
      <div>
        <div style="font-size: 3em; font-weight: bold; color: var(--ds-accent);">50k</div>
        <p>Beta Users</p>
      </div>
      <div>
        <div style="font-size: 3em; font-weight: bold; color: var(--ds-accent);">200%</div>
        <p>MoM Growth</p>
      </div>
    </div>
    <Notes text="Our initial open-source launch saw incredible adoption." />
  </Slide>

  <!-- Slide 5: Product Demo Narrative -->
  <Slide h={5} v={0}>
    <h2>Product Demo</h2>
    <p>From prompt to polished deck in seconds.</p>
    <div style="background: #1e1e1e; padding: 1.5em; border-radius: 8px; margin-top: 1em; font-family: monospace;">
      <span style="color: #569cd6;">prompt></span> Build me a pitch for our new microservices architecture...
    </div>
    <Notes text="The AI understands your components and generates the structure." />
  </Slide>

  <!-- Slide 6: Business Model -->
  <Slide h={6} v={0}>
    <h2>Business Model</h2>
    <div style="text-align: left; margin-top: 1em;">
      <p><strong>Free:</strong> For individuals and open source.</p>
      <p><strong>Pro:</strong> $20/mo with advanced AI features.</p>
      <p><strong>Enterprise:</strong> SSO, audit logs, and custom themes.</p>
    </div>
    <Notes text="SaaS model with a strong free tier to drive adoption." />
  </Slide>

  <!-- Slide 7: Go-to-Market -->
  <Slide h={7} v={0}>
    <h2>Go-to-Market</h2>
    <p>Developer advocacy and community-led growth.</p>
    <div style="margin-top: 1em;">
      <p>🚀 Launching at DevConf 2026</p>
      <p>🤝 Strategic partnerships with cloud providers</p>
    </div>
    <Notes text="Focusing on the platforms where developers already live." />
  </Slide>

  <!-- Slide 8: Team -->
  <Slide h={8} v={0}>
    <h2>The Team</h2>
    <div style="display: flex; justify-content: center; gap: 2em; margin-top: 1em;">
      <div>
        <div style="width: 100px; height: 100px; background: #ccc; border-radius: 50%; margin: 0 auto;"></div>
        <p><strong>CEO</strong><br/>Serial Entrepreneur</p>
      </div>
      <div>
        <div style="width: 100px; height: 100px; background: #ccc; border-radius: 50%; margin: 0 auto;"></div>
        <p><strong>CTO</strong><br/>Ex-FAANG Lead</p>
      </div>
    </div>
    <Notes text="We have the technical and business expertise." />
  </Slide>

  <!-- Slide 9: Competitive Landscape -->
  <Slide h={9} v={0}>
    <h2>Why Now?</h2>
    <p>The convergence of generative AI and developer-centric workflows.</p>
    <Notes text="Traditional tools haven't evolved for the modern tech stack." />
  </Slide>

  <!-- Slide 10: The Ask -->
  <Slide h={10} v={0}>
    <h2>The Ask</h2>
    <div style="font-size: 2em; margin-top: 1em;">
      Raising <strong>$2M Seed</strong>
    </div>
    <p>To scale our AI engineering and reach 1M users.</p>
    <p style="margin-top: 2em; opacity: 0.6;">invest@decksmith.ai</p>
    <Notes text="Join us in building the future of presentations." />
  </Slide>
</Deck>
