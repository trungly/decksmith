const SPEAKER_CHANNEL = "decksmith-speaker";
let speakerWindow: Window | null = null;
let channel: BroadcastChannel | null = null;

export interface SpeakerMessage {
  type: "state-update";
  currentH: number;
  currentV: number;
  currentFragment: number;
  notes: string;
  totalSlides: number;
}

export function openSpeakerWindow() {
  if (speakerWindow && !speakerWindow.closed) {
    speakerWindow.focus();
    return;
  }

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Decksmith Speaker View</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #1a1a2e;
      color: #eee;
      font-family: system-ui, -apple-system, sans-serif;
      padding: 20px;
      height: 100vh;
      display: grid;
      grid-template-rows: 1fr auto;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .notes {
      grid-column: 1 / -1;
      background: #16213e;
      border-radius: 8px;
      padding: 20px;
      overflow-y: auto;
      font-size: 1.2em;
      line-height: 1.6;
      max-height: 40vh;
    }
    .notes h2 { margin-bottom: 10px; color: #0f3460; font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px; }
    .info {
      grid-column: 1 / -1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: #16213e;
      border-radius: 8px;
    }
    .timer { font-size: 2em; font-variant-numeric: tabular-nums; }
    .slide-info { font-size: 1.2em; opacity: 0.8; }
    .clock { font-size: 1.2em; opacity: 0.6; }
  </style>
</head>
<body>
  <div class="notes">
    <h2>Speaker Notes</h2>
    <div id="notes-content">Waiting for presentation...</div>
  </div>
  <div class="info">
    <div class="timer" id="timer">00:00:00</div>
    <div class="slide-info" id="slide-info">-</div>
    <div class="clock" id="clock"></div>
  </div>
  <script>
    const channel = new BroadcastChannel('${SPEAKER_CHANNEL}');
    const startTime = Date.now();

    channel.onmessage = (e) => {
      const data = e.data;
      if (!data || typeof data !== 'object') return;
      if (data.type !== 'state-update') return;
      if (typeof data.currentH !== 'number' || typeof data.currentV !== 'number' || typeof data.totalSlides !== 'number') return;
      const notes = typeof data.notes === 'string' ? data.notes : '';
      document.getElementById('notes-content').textContent = notes || 'No notes for this slide';
      document.getElementById('slide-info').textContent =
        'Slide ' + (data.currentH + 1) + (data.currentV > 0 ? '.' + (data.currentV + 1) : '') +
        ' / ' + data.totalSlides;
    };

    setInterval(() => {
      const elapsed = Date.now() - startTime;
      const s = Math.floor(elapsed / 1000) % 60;
      const m = Math.floor(elapsed / 60000) % 60;
      const h = Math.floor(elapsed / 3600000);
      document.getElementById('timer').textContent =
        String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      document.getElementById('clock').textContent = new Date().toLocaleTimeString();
    }, 1000);
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  speakerWindow = window.open(url, "decksmith-speaker", "width=800,height=600");
}

export function sendSpeakerUpdate(msg: SpeakerMessage) {
  if (!channel) {
    channel = new BroadcastChannel(SPEAKER_CHANNEL);
  }
  channel.postMessage(msg);
}

export function closeSpeakerWindow() {
  if (speakerWindow && !speakerWindow.closed) {
    speakerWindow.close();
  }
  speakerWindow = null;
  if (channel) {
    channel.close();
    channel = null;
  }
}
