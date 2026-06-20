# Cyber Portfolio

A browser-based terminal-style portfolio for **Tanishq Shivasharan**, built with HTML, CSS, and vanilla JavaScript — with an AI fallback so any question typed into the terminal gets a real answer, not just "command not found."

## How it works

- Type one of the known commands (`help`, `about`, `skills`, etc.) → instant static response.
- Type anything else → the frontend sends it to a local Node/Express proxy, which forwards it to Groq's API (with your project context as a system prompt) and streams the answer back into the terminal.
- The Groq API key never reaches the browser — it lives only in `server/.env`.

## Project Structure

```
cyber-portfolio/
├── index.html            Terminal UI shell — markup + CSS + script tags
├── css/
│   └── style.css         Visual theme (if pulled out of index.html)
├── js/
│   ├── data.js            Content only: PROFILE (AI system prompt) + CMDS (command outputs)
│   ├── commands.js        AI proxy client + command router
│   └── terminal.js         DOM rendering, input handling, keyboard history, boot sequence
└── server/
    ├── server.js          Express proxy — calls Groq, keeps the API key server-side
    ├── package.json
    ├── .env                Your real GROQ_API_KEY (gitignored, never committed)
    └── .env.example       Template showing required env vars
```

## Available Commands

| Command     | Description                          |
|-------------|---------------------------------------|
| `help`      | List all commands                     |
| `about`     | Short introduction                    |
| `skills`    | Tech stack & proficiency bars         |
| `projects`  | Featured GitHub projects              |
| `education` | Academic background & learning path   |
| `contact`   | Socials and links                     |
| `neofetch`  | ASCII art + sysinfo summary           |
| `clear`     | Wipe the terminal                     |
| *anything else* | Routed to AI via the proxy        |

Use `ArrowUp` / `ArrowDown` to cycle through command history.

## Local Setup

**1. Install and start the backend:**
```bash
cd server
npm install
cp .env.example .env      # then paste your real Groq key into .env
npm start
```
This runs the proxy at `http://localhost:3000`.

**2. Serve the frontend on a different port:**
```bash
# from the project root
npx serve . -p 5500
```
Open `http://localhost:5500` in your browser.

> The frontend and backend must run on different ports. `commands.js` is hard-coded to call the proxy at `http://localhost:3000/api/ai` — update `PROXY_URL` there if you change the backend port.

**3. Verify the backend independently (optional):**
```bash
curl http://localhost:3000/health
```

## Getting a free Groq API key

1. Sign up at [console.groq.com](https://console.groq.com)
2. Create an API key
3. Paste it into `server/.env` as `GROQ_API_KEY=...`

Groq's free tier is generous and the responses are fast.

## Updating Content

Everything you'd want to change as your skills/projects grow lives in **`js/data.js`** only:
- `PROFILE` — the system prompt sent with every AI request (keep it current with your real stack/projects)
- `CMDS` — the static command outputs

No other file should need touching for routine content updates.

## Deployment Notes

This project has two parts that deploy separately:
- **Frontend** (`index.html`, `css/`, `js/`) → any static host: GitHub Pages, Vercel, Netlify
- **Backend** (`server/`) → needs a Node host: Render, Railway, Fly.io, or a Vercel serverless function

Once deployed, update `PROXY_URL` in `js/commands.js` to point at your live backend URL instead of `localhost:3000`, and set `GROQ_API_KEY` as an environment variable on whichever platform hosts `server/`.

## License

MIT