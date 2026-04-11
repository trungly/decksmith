<script lang="ts">
  import { Deck, Slide, Code, Fragment, Notes } from "decksmith";
</script>

<Deck theme="obsidian" transition="fade">
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="color: #fff; font-size: 3.5em; letter-spacing: -0.03em;">Zero-Trust Infra</h1>
    <p style="opacity: 0.6; font-size: 1.2em;">DevOps Strategy for 2026</p>
    <div style="margin-top: 3em; font-family: monospace; font-size: 0.8em; color: var(--ds-accent);">root@ds-core:~# plan apply</div>
  </Slide>

  <!-- Slide 2: The Core Pillar -->
  <Slide h={2} v={0}>
    <h2>The Infrastructure Pillar</h2>
    <div style="text-align: left; margin: 1.5em auto; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 2em; max-width: 700px;">
      <p style="font-size: 1.3em;">Infrastructure as Code (IaC) is no longer optional. It's the source of truth.</p>
      <div style="display: flex; gap: 1em; margin-top: 2em;">
        <div style="background: rgba(255,255,255,0.02); padding: 1em; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05);">
          <h4>Automate</h4>
          <p style="font-size: 0.7em;">All environments must be reproducible from a single repo.</p>
        </div>
        <div style="background: rgba(255,255,255,0.02); padding: 1em; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05);">
          <h4>Secure</h4>
          <p style="font-size: 0.7em;">Rotate secrets every 24h via Hashicorp Vault.</p>
        </div>
      </div>
    </div>
  </Slide>

  <!-- Slide 3: Deployment Pipeline -->
  <Slide h={3} v={0}>
    <h2>Deployment Pipeline ⛓️</h2>
    <div style="text-align: left; margin-top: 1em;">
      <Code code={`stages:
  - test
  - build
  - security-scan
  - canary-deploy
  - monitor-and-promote`} language="yaml" />
    </div>
    <Notes text="Our pipeline is the gateway. No manual changes in prod." />
  </Slide>

  <!-- Slide 4: Observability -->
  <Slide h={4} v={0}>
    <h2>Observability & Feedback</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5em; margin-top: 2em;">
      <Fragment index={0} style="fade-in">
        <div style="text-align: center;">
          <div style="font-size: 2em; color: var(--ds-accent);">Metrics</div>
          <p style="font-size: 0.7em; opacity: 0.5;">Prometheus / Grafana</p>
        </div>
      </Fragment>
      <Fragment index={1} style="fade-in">
        <div style="text-align: center;">
          <div style="font-size: 2em; color: var(--ds-accent);">Logs</div>
          <p style="font-size: 0.7em; opacity: 0.5;">Elasticsearch / Kibana</p>
        </div>
      </Fragment>
      <Fragment index={2} style="fade-in">
        <div style="text-align: center;">
          <div style="font-size: 2em; color: var(--ds-accent);">Traces</div>
          <p style="font-size: 0.7em; opacity: 0.5;">OpenTelemetry / Jaeger</p>
        </div>
      </Fragment>
    </div>
  </Slide>

  <!-- Slide 5: The End State -->
  <Slide h={5} v={0}>
    <h2>The End Goal</h2>
    <div style="background: rgba(var(--ds-accent-rgb), 0.03); padding: 2em; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px;">
      <p style="font-size: 1.5em; color: var(--ds-accent); font-weight: 200;">100% Automated. 0% Surprise.</p>
    </div>
  </Slide>

  <Slide h={6} v={0}>
    <h1 style="font-size: 3em;">Stay Secure</h1>
    <p style="opacity: 0.3; margin-top: 2em; font-family: monospace;">Fingerprint: 4A7B-9D2E-1F0C-8B6A</p>
  </Slide>
</Deck>
