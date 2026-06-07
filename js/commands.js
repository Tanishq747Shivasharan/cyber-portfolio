// ─────────────────────────────────────────────
//  commands.js  —  AI providers + command runner
//
//  ADDING A NEW COMMAND:
//    1. Add its output array to CMDS in data.js
//    2. That's it — the router here picks it up automatically.
//
// ─────────────────────────────────────────────
//  commands.js  —  AI provider + command runner
//
//  This portfolio uses Groq only, routed through a server-side proxy.
//  The proxy keeps the Groq key secret in `server/.env`.
// ─────────────────────────────────────────────

const AI_PROVIDER = 'groq';
const AI_PROXY_URL = 'http://localhost:3000/api/ai';

const AI_CONFIG = {
  groq: {
    model: 'groq/compound-mini',
  },
};
// ─────────────────────────────────────────────

// Helper: try common response shapes and return the first found text
function extractTextFromResponse(data) {
  if (!data) return null;
  // Common shapes across providers
  const checks = [
    () => data.content?.[0]?.text,
    () => data.message?.content,
    () => data.candidates?.[0]?.content?.parts?.[0]?.text,
    () => data.candidates?.[0]?.message?.content,
    () => data.choices?.[0]?.message?.content,
    () => data.choices?.[0]?.text,
    () => data.output?.[0]?.content?.text,
    () => data.result,
  ];
  for (const fn of checks) {
    try {
      const v = fn();
      if (v) return v;
    } catch (e) { /* continue */ }
  }
  return null;
}

function formatAIResponse(text, userMsg) {
  const cleanText = (text || '[no response]').trim();
  const header = `  [AI response to your query]`;
  const query = `  Query: ${userMsg}`;
  const divider = '  ───────────────────────────────────────';
  return `${header}\n${query}\n${divider}\n${cleanText}`;
}

// ── AI provider implementations ───────────────

async function fetchGroq(userMsg) {
  const res = await fetch(AI_PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider: 'groq', model: AI_CONFIG.groq.model, message: userMsg, profile: PROFILE }),
  });
  if (!res.ok) {
    let errBody = '';
    try { errBody = JSON.stringify(await res.json()); } catch (e) { errBody = await res.text(); }
    throw new Error(`Proxy Groq request failed (${res.status}): ${errBody}`);
  }
  const data = await res.json();
  return data.text || '[no response]';
}

// ── Route to the selected provider ────────────
async function fetchAI(userMsg) {
  if (AI_PROVIDER !== 'groq') {
    throw new Error(`Unsupported AI_PROVIDER: "${AI_PROVIDER}"`);
  }
  return fetchGroq(userMsg);
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
    badge.innerHTML = `<span class="ai-badge">AI</span><span class="g2">${AI_PROVIDER} responded:</span>`;
    Terminal.out.appendChild(badge);

    const formatted = formatAIResponse(text, cmd);
    formatted.split('\n').forEach(l => Terminal.addLine('w', l));
    Terminal.addLine('', '');

  } catch (e) {
    Terminal.out.removeChild(thinking);
    Terminal.addLine('r', `  [AI error] ${e.message}`);
    Terminal.addLine('w', `  Provider set to: "${AI_PROVIDER}"`);
    Terminal.addLine('w', '  Check your API key and proxy server, then try again.');
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

