
  <circle cx="254" cy="158" r="3.5" fill="#ff69b4" opacity="0.9" filter="url(#subtleGlow)"/>
  <circle cx="254" cy="158" r="6" fill="none" stroke="#ff69b4" stroke-width="0.8" opacity="0.4"/>
  <circle cx="606" cy="158" r="3.5" fill="#ff69b4" opacity="0.9" filter="url(#subtleGlow)"/>
  <circle cx="606" cy="158" r="6" fill="none" stroke="#ff69b4" stroke-width="0.8" opacity="0.4"/>
  <g fill="#ffb6d9" opacity="0.55" filter="url(#subtleGlow)">
  </g>
</svg>

### *AI-powered email threat detection. Real-time. Ruthless.*

<br>

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-ff69b4?style=flat-square)](LICENSE)

</div>

<br>

---

## ♡ What is AegisAI?

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
╭─────────────────────────────────────────────────────╮
│  Frontend       React 19 · TypeScript · Vite        │
│                 Tailwind CSS · Motion                │
├─────────────────────────────────────────────────────┤
│  Backend        Python 3.x · FastAPI · Uvicorn      │
├─────────────────────────────────────────────────────┤
│  ML             scikit-learn · TF-IDF               │
│                 Logistic Regression · joblib         │
├─────────────────────────────────────────────────────┤
│  Integrations   Gmail API (OAuth 2.0) · Twilio SMS  │
╰─────────────────────────────────────────────────────╯
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

✦ &nbsp; Built to keep your inbox clean — automatically. &nbsp; ✦

</div>
