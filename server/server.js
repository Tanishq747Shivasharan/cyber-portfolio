const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

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
    } catch (e) { }
  }
  return null;
}

app.get('/', (req, res) => {
  res.send('AI proxy running. POST /api/ai with provider/model/message.');
});

app.post('/api/ai', async (req, res) => {
  const { provider, model, message, profile } = req.body;
  if (provider !== 'groq') return res.status(400).json({ error: 'Only Groq is supported' });

  const key = process.env.GROQ_API_KEY;
  if (!key) return res.status(500).json({ error: 'Missing GROQ_API_KEY' });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model: model || 'groq/compound-mini',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: profile || process.env.SYSTEM_PROMPT || '' },
          { role: 'user', content: message },
        ],
      }),
    });
    const data = await response.json();
    const text = extractTextFromResponse(data) || null;
    return res.json({ text, raw: data });
  } catch (e) {
    console.error('Proxy error:', e);
    return res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI proxy listening on http://localhost:${PORT}`);
});
