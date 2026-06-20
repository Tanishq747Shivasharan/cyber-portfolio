// ─────────────────────────────────────────────
//  commands.js  —  AI providers + command runner
//
//  ADDING A NEW COMMAND:
//    1. Add its output array to CMDS in data.js
//    2. That's it — the router here picks it up automatically.
//
//  SWITCHING AI PROVIDER:
//    Change AI_PROVIDER below to 'ollama', 'gemini', or 'groq'
//    Then fill in the matching config section.
// ─────────────────────────────────────────────

// ── CONFIGURE YOUR AI BACKEND HERE ───────────
//
//  All AI calls go through YOUR OWN server (server/server.js).
//  The Groq API key lives in server/.env and never reaches the browser.
//
//  PROXY_URL must match where you run `npm start` inside server/.
//  server.js listens on port 3000 by default — so run the FRONTEND
//  on a different port, e.g.:
//    backend:  cd server && npm start         → http://localhost:3000
//    frontend: npx serve . -p 5500            → http://localhost:5500
//
const PROXY_URL = 'http://localhost:3000/api/ai';

// server.js currently only implements 'groq'. If you add gemini/ollama
// branches there later, you can switch this to match.
const AI_PROVIDER = 'groq';

const AI_CONFIG = {
  groq: {
    model: 'llama-3.3-70b-versatile',   // current Groq model — replaces decommissioned llama3-8b-8192
  },
};
// ─────────────────────────────────────────────


// ── Single fetch function — talks to YOUR proxy, never the AI vendor directly ──
async function fetchAI(userMsg) {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: AI_PROVIDER,
      model:    AI_CONFIG[AI_PROVIDER]?.model,
      message:  userMsg,
      profile:  PROFILE,   // from data.js — your system prompt
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error || `Proxy returned ${res.status}`);
  }

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text || '[no response from proxy]';
}

// ── askAI: wraps fetchAI with terminal UI ─────
async function askAI(cmd) {
  const thinking = Terminal.addLine('thinking', '  [AI] thinking...');
  Terminal.scroll();

  try {
    const text = await fetchAI(cmd);
    Terminal.out.removeChild(thinking);

    const badge = document.createElement('div');
    badge.className = 'line';
    badge.innerHTML = `<span class="ai-badge">AI</span><span class="g2">${AI_PROVIDER} (via proxy) responded:</span>`;
    Terminal.out.appendChild(badge);

    text.split('\n').forEach(l => Terminal.addLine('w', l));
    Terminal.addLine('', '');

  } catch (e) {
    Terminal.out.removeChild(thinking);

    // A network-level failure (server not running, wrong port, CORS block)
    // throws a generic TypeError from fetch — distinguish it from a proper
    // error response the server sent back on purpose.
    const isNetworkError = e instanceof TypeError;

    if (isNetworkError) {
      Terminal.addLine('r', '  [AI error] Could not reach the proxy server.');
      Terminal.addLine('w', `  Expected it running at: ${PROXY_URL}`);
      Terminal.addLine('w', '  Run: cd server && npm start');
    } else {
      Terminal.addLine('r', `  [AI error] ${e.message}`);
    }
    Terminal.addLine('', '');
  }

  Terminal.scroll();
  Terminal.busy = false;
}

// ── Command runner ────────────────────────────
function run(raw) {
  if (Terminal.busy) return;
  const cmd = raw.trim();
  Terminal.addPrompt(cmd);
  if (!cmd) { Terminal.scroll(); return; }

  const key = cmd.toLowerCase();

  if (key === 'clear') {
    Terminal.out.innerHTML = '';
    return;
  }

  // Static command — look up in CMDS from data.js
  if (CMDS[key]) {
    Terminal.renderLines(CMDS[key]);
    Terminal.scroll();
    return;
  }

  // Unknown → hand off to AI
  Terminal.busy = true;
  askAI(cmd);
}