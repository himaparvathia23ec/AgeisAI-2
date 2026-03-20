<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 180" width="860" height="180">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000"/>
      <stop offset="100%" style="stop-color:#030f03"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00ff41"/>
      <stop offset="45%" style="stop-color:#ccffcc"/>
      <stop offset="100%" style="stop-color:#00c832"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="softglow">
      <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="860" height="180" rx="12" fill="url(#bgGrad)"/>

  <!-- Scanline effect -->
  <rect width="860" height="180" rx="12" fill="url(#bgGrad)" opacity="0"/>
  <g opacity="0.07">
    <rect x="0" y="0" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="6" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="12" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="18" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="24" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="30" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="36" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="42" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="48" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="54" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="60" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="66" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="72" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="78" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="84" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="90" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="96" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="102" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="108" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="114" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="120" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="126" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="132" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="138" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="144" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="150" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="156" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="162" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="168" width="860" height="2" fill="#00ff41"/>
    <rect x="0" y="174" width="860" height="2" fill="#00ff41"/>
  </g>

  <!-- Decorative matrix rain characters (faint) -->
  <g font-family="'Courier New', monospace" font-size="11" fill="#00ff41" opacity="0.12">
    <text x="18" y="22">01</text><text x="18" y="44">10</text><text x="18" y="66">01</text>
    <text x="18" y="88">11</text><text x="18" y="110">00</text><text x="18" y="132">10</text>
    <text x="18" y="154">01</text><text x="18" y="176">11</text>
    <text x="820" y="22">10</text><text x="820" y="44">01</text><text x="820" y="66">11</text>
    <text x="820" y="88">00</text><text x="820" y="110">10</text><text x="820" y="132">01</text>
    <text x="820" y="154">11</text><text x="820" y="176">00</text>
  </g>

  <!-- Corner brackets -->
  <polyline points="12,44 12,12 44,12" fill="none" stroke="#00ff41" stroke-width="2.5" opacity="0.9"/>
  <polyline points="816,12 848,12 848,44" fill="none" stroke="#00ff41" stroke-width="2.5" opacity="0.9"/>
  <polyline points="12,136 12,168 44,168" fill="none" stroke="#00ff41" stroke-width="2.5" opacity="0.9"/>
  <polyline points="816,168 848,168 848,136" fill="none" stroke="#00ff41" stroke-width="2.5" opacity="0.9"/>

  <!-- Glow halo -->
  <text x="430" y="108" font-family="'Courier New', monospace" font-size="90" font-weight="900"
        text-anchor="middle" fill="#00ff41" opacity="0.2" filter="url(#softglow)" letter-spacing="16">AEGISAI</text>

  <!-- Main title -->
  <text x="430" y="108" font-family="'Courier New', monospace" font-size="90" font-weight="900"
        text-anchor="middle" fill="url(#textGrad)" filter="url(#glow)" letter-spacing="16">AEGISAI</text>

  <!-- Underline -->
  <line x1="160" y1="122" x2="700" y2="122" stroke="#00ff41" stroke-width="1" opacity="0.4"/>

  <!-- Tagline -->
  <text x="430" y="152" font-family="'Courier New', monospace" font-size="12"
        text-anchor="middle" fill="#00cc33" letter-spacing="5" opacity="0.9">AI-POWERED EMAIL THREAT DETECTION</text>

  <!-- Status dot -->
  <circle cx="245" cy="148" r="4" fill="#00ff41" opacity="0.8"/>
  <circle cx="245" cy="148" r="7" fill="none" stroke="#00ff41" stroke-width="1" opacity="0.4"/>
</svg>

**AI-powered email threat detection. Real-time. Ruthless.**

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## What is AegisAI?

AegisAI connects to your Gmail, scans every message with a machine learning model, and **automatically moves dangerous emails to Trash** — before you ever open them. Phishing links, spoofed senders, spam masquerading as legitimate mail: AegisAI catches them all and fires an SMS alert when it does.

> No manual rules. No allowlists to maintain. Just scan, score, and sweep.

---

## ✦ Features

| Feature | Description |
|---|---|
| 🔍 **Unified Inbox Scanner** | Scans both Inbox and Spam in one pass — spam messages always flagged as HIGH risk |
| 🤖 **ML Risk Scoring** | TF-IDF + Logistic Regression model scores every message; anything above 60% risk is auto-trashed |
| 🔗 **URL Risk Analysis** | Embedded link inspection runs alongside the ML model for deeper threat context |
| 🗑️ **Auto-Trash** | High-risk messages are moved to Gmail Trash in the same scan — zero clicks required |
| 📲 **SMS Alerts** | Optional Twilio integration sends one SMS per scan when threats are removed |
| 📊 **Security Dashboard** | Live stats, recent incidents, risk levels, and per-message investigation view |

---

## 🏗 Tech Stack

```
┌─────────────────────────────────────────────────────┐
│  Frontend       React 19 · TypeScript · Vite        │
│                 Tailwind CSS · Motion                │
├─────────────────────────────────────────────────────┤
│  Backend        Python 3.x · FastAPI · Uvicorn      │
├─────────────────────────────────────────────────────┤
│  ML             scikit-learn · TF-IDF               │
│                 Logistic Regression · joblib         │
├─────────────────────────────────────────────────────┤
│  Integrations   Gmail API (OAuth 2.0) · Twilio SMS  │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
AegisAI/
├── backend/
│   ├── main.py           ← FastAPI app, Gmail + Twilio routes
│   ├── ml_service.py     ← ML model, analyze_email(), risk scoring
│   ├── utils.py
│   ├── requirements.txt
│   ├── .env              ← credentials (never commit this)
│   ├── model.pkl
│   └── vectorizer.pkl
└── frontend/
    ├── src/
    │   ├── App.tsx        ← landing, onboarding, dashboard
    │   └── pages/
    │       └── Threats.tsx
    └── package.json
```

---

## ⚡ Quick Start

### Prerequisites

- Python 3.x
- Node.js + npm
- Google Cloud project with Gmail API enabled and OAuth 2.0 credentials
- *(Optional)* Twilio account for SMS alerts

---

### 1 — Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API live at → `http://127.0.0.1:8000`  
Interactive docs → `http://127.0.0.1:8000/docs`

---

### 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

App live at → `http://localhost:3000`

---

### 3 — Environment Variables

Create `backend/.env`:

```env
# Gmail OAuth (required)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Twilio SMS (optional)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx

# Production only
REDIRECT_URI=https://your-backend-url/auth/gmail/callback
FRONTEND_URL=https://your-frontend-url
```

> Add `http://127.0.0.1:8000/auth/gmail/callback` as an authorized redirect URI in your Google Cloud OAuth config.

For production frontend, create `frontend/.env`:

```env
VITE_API_URL=https://your-deployed-backend-url
```

---

## 🛡 Risk Scoring Logic

```
Spam folder message    →  risk = 95%  →  AUTO-TRASH
ML score > 60%         →  HIGH RISK   →  AUTO-TRASH + optional SMS
ML score ≤ 60%         →  Safe / Monitor
```

One SMS is sent **per scan** (not per message) when any emails are trashed.

---

## 🌐 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/auth/gmail/url` | Returns Google OAuth URL |
| `GET` | `/auth/gmail/callback` | OAuth callback → redirects to frontend with token |
| `POST` | `/fetch-emails` | Fetch + analyze + trash high-risk emails; optional SMS |
| `POST` | `/analyze` | Analyze arbitrary text for phishing/risk |

**`POST /fetch-emails` body:**
```json
{
  "token": "...",
  "phone_number": "+91xxxxxxxxxx"
}
```

**`POST /analyze` body:**
```json
{
  "content": "Paste email text here"
}
```

---

## 📱 App Pages

| Page | Description |
|---|---|
| **Home** | Security dashboard: Quick Scan, stats, Recent Incidents with Investigate actions |
| **Threats** | Threat-focused view highlighting risky and high-risk messages |
| **Analysis** | Paste any text to check for phishing using ML + URL risk |
| **Emails in Bin** | Messages moved to Trash in the current session |
| **Settings** | Save phone number for SMS alerts |

---

## 🚀 Deployment

Deploy backend to **Render / Railway / Docker**, frontend to **Vercel / Netlify**.  
See [`DEPLOYMENT.md`](DEPLOYMENT.md) for full step-by-step instructions including Google OAuth configuration for production URLs.

---

## 📄 License

MIT © AegisAI Contributors

---

<div align="center">

Built to keep your inbox clean — automatically.

</div>
