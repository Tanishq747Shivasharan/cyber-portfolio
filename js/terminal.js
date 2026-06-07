// ─────────────────────────────────────────────
//  terminal.js  —  DOM, input, rendering, boot
//
//  This file never touches AI or command data.
//  It exposes a global `Terminal` object that
//  commands.js uses to write to the screen.
// ─────────────────────────────────────────────

const Terminal = (() => {
  // ── DOM refs ────────────────────────────────
  const out = document.getElementById('out');
  const inp = document.getElementById('ci');

  // ── State ───────────────────────────────────
  let hist  = [];
  let hidx  = -1;
  let busy  = false;   // true while AI is fetching

  // ── Helpers ─────────────────────────────────
  function esc(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function addLine(cls, text) {
    const d = document.createElement('div');
    d.className = 'line';
    (cls || '').split(' ').forEach(c => { if (c) d.classList.add(c); });
    d.textContent = text ?? '';
    out.appendChild(d);
    return d;
  }

  function addPrompt(cmd) {
    const d = document.createElement('div');
    d.className = 'line';
    d.innerHTML =
      `<span style="color:#00e57f">tanishq` +
      `<span style="color:#1e5a1e">@</span>portfolio` +
      `<span style="color:#1e5a1e">:</span>` +
      `<span style="color:#27c85a">~</span>` +
      `<span style="color:#1e5a1e">$</span></span> ` +
      `<span style="color:#39ff14">${esc(cmd)}</span>`;
    out.appendChild(d);
  }

  function renderLines(lines) {
    lines.forEach(l => addLine(l.t || '', l.v ?? ''));
  }

  function scroll() {
    setTimeout(() => { out.scrollTop = out.scrollHeight; }, 10);
  }

  // ── Input handling ───────────────────────────
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = inp.value;
      if (v.trim()) { hist.unshift(v); hidx = -1; }
      run(v);       // run() is defined in commands.js
      inp.value = '';

    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hidx < hist.length - 1) { hidx++; inp.value = hist[hidx]; }

    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hidx > 0) { hidx--; inp.value = hist[hidx]; }
      else { hidx = -1; inp.value = ''; }
    }
  });

  out.addEventListener('click', () => inp.focus());

  // ── Boot sequence ────────────────────────────
  function boot() {
    renderLines([
      { t: 'dim', v: '╔══════════════════════════════════════════════════╗' },
      { t: 'dim', v: '║     TANISHQ SHIVASHARAN — AI TERMINAL  v3.0     ║' },
      { t: 'dim', v: '╚══════════════════════════════════════════════════╝' },
      { t: '',    v: '' },
      { t: 'g',   v: '  System online. AI engine connected.' },
      { t: 'w',   v: "  Type 'help' for commands — or ask me anything." },
      { t: '',    v: '' },
    ]);
    scroll();
    inp.focus();
  }

  // ── Public API ───────────────────────────────
  // commands.js accesses Terminal.out, Terminal.busy, etc.
  return {
    get out()  { return out;  },
    get busy() { return busy; },
    set busy(v){ busy = v;    },
    addLine,
    addPrompt,
    renderLines,
    scroll,
    boot,
  };
})();

// Auto-boot when the DOM is ready
document.addEventListener('DOMContentLoaded', () => Terminal.boot());