# Speaker Notes

Add notes to any slide that are visible only in the speaker view.

## Adding Notes

Place a `<Notes>` component inside a `<Slide>`:

```svelte
<Slide h={0} v={0}>
  <h1>Welcome</h1>
  <Notes text="Introduce yourself and thank the audience for coming." />
</Slide>
```

Notes are invisible in the main presentation view.

## Opening the Speaker View

Press `S` to open the speaker notes window. It displays:

- Current slide notes
- Elapsed time
- Current slide number

The speaker window stays in sync with the main presentation — navigate in either window and both update.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `""` | Notes content for this slide |

## Tips

- Keep notes concise — they're meant as reminders, not scripts
- Notes sync across windows using the `BroadcastChannel` API (same browser, same origin)
- Notes are included in the speaker window but excluded from PDF export
