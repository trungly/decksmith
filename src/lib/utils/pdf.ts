export function isPrintMode(): boolean {
  return window.location.search.includes("print-pdf");
}

export function setupPrintStyles(width: number, height: number) {
  if (!isPrintMode()) return;

  const style = document.createElement("style");
  style.textContent = `
    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      html, body { width: auto; height: auto; overflow: visible; }
      .deck { transform: none !important; overflow: visible !important; }
      .deck-slides { transform: none !important; }
      .slide {
        position: relative !important;
        display: flex !important;
        width: ${width}px !important;
        height: ${height}px !important;
        page-break-after: always;
        transform: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      .deck-controls, .deck-progress, .deck-slide-number, .deck-overview { display: none !important; }
      .fragment { opacity: 1 !important; visibility: visible !important; transform: none !important; }
    }

    /* Print-pdf mode: lay out slides linearly */
    .print-pdf .deck { overflow: visible !important; transform: none !important; }
    .print-pdf .deck-slides {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      transform: none !important;
    }
    .print-pdf .slide {
      position: relative !important;
      display: flex !important;
      width: ${width}px !important;
      height: ${height}px !important;
      opacity: 1 !important;
      visibility: visible !important;
      transform: none !important;
      margin-bottom: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    .print-pdf .deck-controls, .print-pdf .deck-progress,
    .print-pdf .deck-slide-number, .print-pdf .deck-overview { display: none !important; }
    .print-pdf .fragment { opacity: 1 !important; visibility: visible !important; transform: none !important; }
  `;
  document.head.appendChild(style);

  if (isPrintMode()) {
    document.body.classList.add("print-pdf");
  }
}
