<script lang="ts">
  import {
    Deck,
    Slide,
    Code,
    Fragment,
    Notes,
    Split,
    Card,
    Stat,
    Callout,
  } from "decksmith";
  import { playgroundDeck } from "../playground/content-size.svelte.ts";
</script>

<Deck theme="obsidian" transition="fade" contentSize={playgroundDeck.contentSize}>
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="color: #fff; font-size: 3.5em; letter-spacing: -0.03em;">Zero-Trust Infra</h1>
    <p style="opacity: 0.6; font-size: 1.2em;">DevOps Strategy for 2026</p>
    <div style="margin-top: 3em; font-family: monospace; font-size: 0.8em; color: var(--ds-accent);">root@ds-core:~# plan apply</div>
  </Slide>

  <!-- Slide 2: The Core Pillar -->
  <Slide h={2} v={0}>
    <h2>The Infrastructure Pillar</h2>
    <div style="text-align: left; margin: 1.5em auto; max-width: 700px;">
      <p style="font-size: 1.3em;">Infrastructure as Code (IaC) is no longer optional. It's the source of truth.</p>
      <div style="margin-top: 2em;">
        <Split gap="1em">
          {#snippet first()}
            <Card title="Automate">
              <p style="font-size: 0.85em;">All environments must be reproducible from a single repo.</p>
            </Card>
          {/snippet}
          {#snippet second()}
            <Card title="Secure">
              <p style="font-size: 0.85em;">Rotate secrets every 24h via Hashicorp Vault.</p>
            </Card>
          {/snippet}
        </Split>
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
    <div style="margin-top: 2em;">
      <Split columns={3} gap="1.25em">
        {#snippet first()}
          <Fragment index={0} style="fade-in">
            <Stat value="Metrics" label="Prometheus / Grafana" />
          </Fragment>
        {/snippet}
        {#snippet second()}
          <Fragment index={1} style="fade-in">
            <Stat value="Logs" label="Elasticsearch / Kibana" />
          </Fragment>
        {/snippet}
        {#snippet third()}
          <Fragment index={2} style="fade-in">
            <Stat value="Traces" label="OpenTelemetry / Jaeger" />
          </Fragment>
        {/snippet}
      </Split>
    </div>
  </Slide>

  <!-- Slide 5: The End State -->
  <Slide h={5} v={0}>
    <h2>The End Goal</h2>
    <div style="margin-top: 1.5em;">
      <Callout variant="info" title="North star">
        <p style="font-size: 1.35em; font-weight: 200; margin: 0;">100% automated. 0% surprise.</p>
      </Callout>
    </div>
  </Slide>

  <Slide h={6} v={0}>
    <h1 style="font-size: 3em;">Stay Secure</h1>
    <p style="opacity: 0.3; margin-top: 2em; font-family: monospace;">Fingerprint: 4A7B-9D2E-1F0C-8B6A</p>
  </Slide>
</Deck>
