// ─────────────────────────────────────────────
//  data.js  —  All static content lives here.
//  To update your portfolio: edit ONLY this file.
//  No logic. No DOM. Pure data.
// ─────────────────────────────────────────────

// AI system prompt — injected into every AI request.
// Update this whenever your skills / projects change.
const PROFILE = `You are the terminal persona of Tanishq Shivasharan — a cybersecurity-focused developer from Pune, India.
Answer ONLY as this terminal. Be concise, technical, and stoic. Use short lines. Prefix each line with 2 spaces. No markdown headers or bullet chars. Max 14 lines.

Facts:
- Name: Tanishq Shivasharan
- Role: Cybersecurity learner & web developer
- Stack: Python, Java, JavaScript, Spring Boot, Node.js, HTML/CSS
- Projects: VIGIL (cybersecurity suite), CNRRS (Spring Boot noise-reporting app), JS_PY-Fun (security practice), WPD (web design), Traffic Light Simulator (Java)
- GitHub: github.com/Tanishq747Shivasharan (27 repos, 27 followers)
- LinkedIn: linkedin.com/in/tanishq-shivasharan-1120a0233
- Location: Pune, Maharashtra, India
- Philosophy: Be Stoic. Code daily. Break things to understand them.
- Interests: Network security, ethical hacking, cloud security, backend engineering
- GitHub achievements: Pull Shark, Quickdraw
- Open to: Internships, freelance, collaboration`;

// Line format: { t: 'css-class-string', v: 'text content' }
// CSS classes: g=green, g2=green2, c=cyan, y=yellow, r=red,
//              m=magenta, o=orange, w=white/muted, dim, sep, ascii, b=bold
// Combine with space: 'y b' = yellow + bold

const CMDS = {
  help: [
    { t: 'c b', v: 'AVAILABLE COMMANDS' },
    { t: 'sep', v: '─'.repeat(46) },
    { t: 'w',   v: '  help          this list' },
    { t: 'w',   v: '  about         who is Tanishq' },
    { t: 'w',   v: '  skills        tech stack & proficiency' },
    { t: 'w',   v: '  projects      featured builds' },
    { t: 'w',   v: '  education     background & learning path' },
    { t: 'w',   v: '  contact       socials & links' },
    { t: 'w',   v: '  neofetch      sysinfo + ASCII art' },
    { t: 'w',   v: '  clear         wipe terminal' },
    { t: 'sep', v: '─'.repeat(46) },
    { t: 'g2',  v: '  ↳ anything else → answered by AI' },
    { t: '',    v: '' },
  ],

  about: [
    { t: 'y b', v: 'ABOUT' },
    { t: 'sep', v: '─'.repeat(46) },
    { t: '',    v: '' },
    { t: 'w',   v: '  Tanishq Shivasharan — Pune, Maharashtra, IN' },
    { t: 'w',   v: '  Cybersecurity Dev & Scalable Web Engineer' },
    { t: '',    v: '' },
    { t: 'w',   v: '  Building systems. Breaking systems.' },
    { t: 'w',   v: '  Learning daily — with zero shortcuts.' },
    { t: '',    v: '' },
    { t: 'w',   v: '  Focus: Network Sec · Backend Eng · Cloud Sec' },
    { t: 'g',   v: '  Motto: "Be Stoic. Code daily. Break things."' },
    { t: '',    v: '' },
  ],

  skills: [
    { t: 'm b', v: 'TECH STACK' },
    { t: 'sep', v: '─'.repeat(46) },
    { t: '',    v: '' },
    { t: 'c',   v: '  Languages' },
    { t: 'w',   v: '  Python      ████████████████░░░░  80%' },
    { t: 'w',   v: '  Java        ██████████████░░░░░░  70%' },
    { t: 'w',   v: '  JavaScript  ████████████░░░░░░░░  60%' },
    { t: 'w',   v: '  HTML/CSS    ████████████████████  95%' },
    { t: '',    v: '' },
    { t: 'c',   v: '  Frameworks & Tools' },
    { t: 'w',   v: '  Spring Boot · Node.js · React · Git · MySQL · Linux' },
    { t: '',    v: '' },
    { t: 'c',   v: '  Cybersecurity' },
    { t: 'w',   v: '  Nmap · Wireshark · OWASP Top 10 · Ethical Hacking' },
    { t: '',    v: '' },
    { t: 'c',   v: '  Growing toward' },
    { t: 'w',   v: '  Cloud Sec (AWS/GCP) · Penetration Testing · Sec Eng' },
    { t: '',    v: '' },
  ],

  projects: [
    { t: 'o b', v: 'PROJECTS' },
    { t: 'sep', v: '─'.repeat(46) },
    { t: '',    v: '' },
    { t: 'y b', v: '  [01] VIGIL — End-to-End Cybersecurity Suite' },
    { t: 'w',   v: '       Mobile network scans → web-app security integration' },
    { t: 'g2',  v: '       Status: Active Development' },
    { t: '',    v: '' },
    { t: 'y b', v: '  [02] CNRRS — Community Noise Reporting System' },
    { t: 'w',   v: '       Spring Boot · Java · MySQL · HTML' },
    { t: 'w',   v: '       Geo-tagged civic reports + admin dashboard' },
    { t: 'c',   v: '       ⭐ 1 star on GitHub' },
    { t: '',    v: '' },
    { t: 'y b', v: '  [03] JS_PY-Fun — Security Practice Platform' },
    { t: 'w',   v: '       CTF-style JS + Python security exercises' },
    { t: 'g2',  v: '       Status: Active Development' },
    { t: '',    v: '' },
    { t: 'y b', v: '  [04] WPD — Web Page Designing Collection' },
    { t: 'w',   v: '       HTML/CSS/JS resources for Polytechnic students' },
    { t: 'c',   v: '       ⭐ 1 star on GitHub' },
    { t: '',    v: '' },
    { t: 'y b', v: '  [05] Traffic Light Simulator — Java' },
    { t: 'w',   v: '       State machine traffic control system' },
    { t: '',    v: '' },
    { t: 'w',   v: '  → All 27 repos: github.com/Tanishq747Shivasharan' },
    { t: '',    v: '' },
  ],

  education: [
    { t: 'c b', v: 'EDUCATION' },
    { t: 'sep', v: '─'.repeat(46) },
    { t: '',    v: '' },
    { t: 'y',   v: '  Diploma in Computer Engineering' },
    { t: 'w',   v: '  Polytechnic Institute, Maharashtra, India' },
    { t: 'w',   v: '  Core: Web Dev · Networking · Programming' },
    { t: '',    v: '' },
    { t: 'g',   v: '  Self-Learning Path' },
    { t: 'w',   v: '  Cybersecurity · Cloud Computing · DSA (Java)' },
    { t: 'w',   v: '  Open Source contribution · Security Engineering' },
    { t: '',    v: '' },
    { t: 'g2',  v: '  GitHub Achievements: Pull Shark · Quickdraw' },
    { t: '',    v: '' },
  ],

  contact: [
    { t: 'm b', v: 'CONTACT & SOCIALS' },
    { t: 'sep', v: '─'.repeat(46) },
    { t: '',    v: '' },
    { t: 'w',   v: '  GitHub   → github.com/Tanishq747Shivasharan' },
    { t: 'w',   v: '  LinkedIn → linkedin.com/in/tanishq-shivasharan-1120a0233' },
    { t: '',    v: '' },
    { t: 'w',   v: '  Location: Pune, Maharashtra, India' },
    { t: '',    v: '' },
    { t: 'g',   v: '  Open to: Internships · Freelance · Collaboration' },
    { t: '',    v: '' },
  ],

  neofetch: [
    { t: 'ascii', v: '  ████████╗ ███████╗' },
    { t: 'ascii', v: '  ╚══██╔══╝ ██╔════╝      tanishq@portfolio' },
    { t: 'ascii', v: '     ██║    ███████╗       ────────────────────────────' },
    { t: 'ascii', v: '     ██║    ╚════██║       OS:    Curiosity Linux 4.7' },
    { t: 'ascii', v: '     ██║    ███████║       Shell: bash (stoic edition)' },
    { t: 'ascii', v: '     ╚═╝    ╚══════╝       Role:  Cybersecurity Dev' },
    { t: '',      v: '' },
    { t: 'w',     v: '  Stack   : Python · Java · JS · Spring Boot' },
    { t: 'w',     v: '  Repos   : 27  |  Followers: 27' },
    { t: 'w',     v: '  Mission : Build. Break. Understand. Repeat.' },
    { t: 'g',     v: '  Status  : Actively grinding' },
    { t: '',      v: '' },
  ],
};