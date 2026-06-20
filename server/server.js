const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ── Pull text out of whatever shape the AI vendor returns ──
function extractTextFromResponse(data) {
  if (!data) return null;
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
    } catch (e) { /* shape didn't match, try the next one */ }
  }
  return null;
}

// ── Health check — useful for deployment platforms & quick sanity tests ──
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AI proxy running. POST /api/ai with { provider, model, message, profile }.',
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', groqKeyConfigured: Boolean(process.env.GROQ_API_KEY) });
});

// ── Main proxy endpoint ──
app.post('/api/ai', async (req, res) => {
  const { provider, model, message, profile } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Missing or empty "message" field.' });
  }

  if (provider !== 'groq') {
    return res.status(400).json({ error: `Unsupported provider "${provider}". Only "groq" is implemented.` });
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Server misconfigured: GROQ_API_KEY is missing. Check server/.env.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: profile || process.env.SYSTEM_PROMPT || '' },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Groq returned an error (bad model, rate limit, etc.) — surface it clearly.
      const msg = data?.error?.message || `Groq API returned ${response.status}`;
      return res.status(response.status).json({ error: msg, raw: data });
    }

    const text = extractTextFromResponse(data);
    return res.json({ text, raw: data });

  } catch (e) {
    console.error('Proxy error:', e);
    return res.status(500).json({ error: e.message });
  }
});

// ── 404 fallback for anything else ──
app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
});

app.listen(PORT, () => {
  console.log(`AI proxy listening on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});