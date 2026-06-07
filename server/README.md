# AI Proxy for Cyber Portfolio

This small Express proxy keeps your AI API keys on the server and forwards client requests to the configured provider.

## Setup

1. Install dependencies:

```bash
cd server
npm install
```

2. Copy `.env.example` to `.env` and fill in your Groq key:

```bash
cd server
copy .env.example .env
```

Example `.env` contents:

```
PORT=3000
GROQ_API_KEY=
SYSTEM_PROMPT=Your system prompt here (optional)
```

3. Start the proxy:

```bash
npm start
```

4. The frontend will POST to `http://localhost:3000/api/ai`. Example request body:

```json
{ "provider": "groq", "model": "groq/compound-mini", "message": "Hello" }
```

5. In `js/commands.js`, set:

```js
const AI_PROVIDER = 'groq';
```

Then reload the portfolio page and enter a prompt like `hello`.

The proxy returns JSON: `{ "text": "...", "raw": { ... } }`.

## Notes
- Do NOT commit your `.env` file.
- This is minimal and intended for development; add auth/rate-limiting for production.
