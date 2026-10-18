# ⚡ MD SHAKIB FARAZI // FULL-STACK 3D PORTFOLIO & ADMIN PLATFORM

> **Leader of Team Unique • Free Fire Esports Competitor • Creative Graphic Designer • Self-Taught Programmer • Cyber Security Explorer**

A cutting-edge, responsive 3D personal website and full-stack web application featuring real-time WebGL graphics (Three.js), synthesized cyber sound effects (Web Audio API), Free Fire tournament tools, live cyber security recon simulation, and a full-featured **Cyber Admin Dashboard** allowing complete live editing of every single detail on the site.

---

## 🚀 Quick Start (Run Locally in VS Code)

### 1. Open in Visual Studio Code
Open VS Code, click **File > Open Folder...**, and select the directory containing this README.

### 2. Install Dependencies
Open the integrated terminal in VS Code (`Ctrl + ~`) and run:
```bash
npm install
```

### 3. Configure Admin Access
Set `ADMIN_PIN` to a private passphrase of at least 12 characters in the server environment. Do not put the passphrase in source files or commit it to GitHub.

In PowerShell, you can set it for the current terminal session with:
```powershell
$env:ADMIN_PIN = Read-Host "Enter a private admin passphrase"
```

For online hosting, configure `ADMIN_PIN` in the hosting provider's environment-variable settings.

### 4. Launch Full-Stack Server
```bash
npm start
```
Your full-stack application is now live at:
👉 **`http://localhost:5000`**

## 💬 Portfolio Chat

The floating Portfolio Chat answers from the portfolio using a local fallback, including when the site is hosted as static files. When running the full-stack server with `OPENAI_API_KEY` configured, it can also use the optional AI service for conversational answers. The API key stays on the server; chat messages are sent to that service only when it is configured. If the service is unavailable, the chat falls back to portfolio-based answers.

To enable AI responses, set `OPENAI_API_KEY` in the server environment before starting the app. You can optionally set `OPENAI_MODEL`; it defaults to `gpt-4o-mini`.

---

## 🛡️ Cyber Admin Dashboard Panel

The built-in Admin Command Center allows you to update **ANY** information on the website at any time without touching code:

- **How to Open**:
  - Click the **`ADMIN PORTAL ⚡`** floating pill on the bottom-left of the website.
  - Or press **`Ctrl + Shift + A`** on your keyboard.
  - Or type **`admin`** in the interactive Cyber CLI Terminal!
- **Admin passcode**: Set `ADMIN_PIN` on the server. It is not stored in the public portfolio files. Admin sign-in and editing require the full-stack server; protected API routes require a server-issued session.

### Admin Capabilities:
1. **Hero & Profile**: Change your name, roles, bio, profile photo (upload from computer or input URL), statistics, and all social links.
2. **Esports & Team Unique**: Edit clan identity, roles, stats (win rate, K/D, tier), and tournament milestone tickers.
3. **Design Vault Manager**: Add, edit, or delete portfolio designs with custom tags, categories, descriptions, and images.
4. **Smart Software Tools**: Add, edit, or delete coding projects, automation bots, and tech stacks.
5. **Site Builder**: Edit page copy, add or reorder skill cards, hide or rearrange sections, and customize colors, typography, content width, and spacing.
6. **Growth Metrics & Contact**: Update impressions, views, asset counts, contact details, and social links.
7. **Inbox Transmissions**: View contact messages submitted by visitors.
8. **Backups & Security**: Export complete site data as a single JSON backup, import backups, or reset to original defaults.

With the full-stack server running and `ADMIN_PIN` configured, sign in to publish changes to the server. Static hosting supports the public portfolio and local chat fallback, but does not provide the authenticated admin API or shared server-side edits.

---

## 🌐 Publishing & Deploying Online

Push the project to GitHub, then deploy it to a Node.js host that runs `npm start`. Set `ADMIN_PIN` (at least 12 characters) in the host's environment settings before enabling admin sign-in. The server writes portfolio edits and contact messages to `data/portfolio.json`, so choose a host with persistent storage and configure that file on a persistent disk; otherwise changes may be lost when the service restarts or redeploys. Check the host's current storage and pricing limits.

Static hosting such as GitHub Pages or Netlify can display the public site, but does not run this Express server. Admin edits will not sync to the server, and server-backed contact submissions and AI chat require a running backend. Do not rely on serverless or ephemeral filesystems for persistent admin edits.

### Docker
Run anywhere with Docker Compose:
```bash
docker-compose up -d
```

---

---

## 📁 Project Architecture

```
team-unique-portfolio/
├── .vscode/                 # VS Code IDE launch & editor settings
│   ├── launch.json
│   └── settings.json
├── data/                    # Server-side persistent storage
│   └── portfolio.json       # Central JSON database file
├── index.html               # Main website markup & admin views
├── style.css                # Futuristic cyberpunk design system
├── admin.css                # Admin command center glassmorphism styles
├── main.js                  # Core frontend application & interactive tools
├── threeScene.js            # Three.js 3D WebGL engine & arsenal inspector
├── audio.js                 # Web Audio API sci-fi sound synthesizer
├── data.js                  # Hybrid client data store & REST API sync
├── admin.js                 # Admin dashboard controller & CRUD logic
├── server.js                # Full-Stack Express REST API backend
├── profile-current.png      # Current portfolio profile photo
├── profile.png              # Previous profile photo kept for existing custom links
├── profile.jpg              # Previous profile photo kept for existing custom links
├── package.json             # NPM dependencies & scripts
├── vercel.json              # Vercel deployment configuration
├── netlify.toml             # Netlify deployment configuration
├── Dockerfile               # Production Docker container
├── docker-compose.yml       # Docker Compose orchestration
└── README.md                # Full documentation & guides
```

---

## 🎮 Developed for Md Shakib Farazi
**Leader of Team Unique • 2026**
