 HEAD
# AegisAI

AI-powered email security assistant that detects phishing and spam, scores risk, and can move high-risk messages to Gmail Trash with optional SMS alerts.



## Overview

AegisAI is a full-stack app that:

- Connects to Gmail via OAuth and scans **inbox and spam** in one unified list
- Analyzes each message with an ML model (TF-IDF + Logistic Regression) and URL risk
- Treats **spam-folder messages** as high risk and **risk above 60%** as high risk
- Moves **high-risk** emails to Gmail Trash and optionally sends an **SMS** (Twilio) when any are trashed
- Shows a **Security Dashboard** with recent incidents, risk levels, and an **Investigate** view (sender, subject, risk %)

No separate spam folder in the app: inbox and spam appear together; spam messages are tagged with a “Spam” badge and always shown as high risk.



## Tech Stack

| Layer | Stack |

| **Backend** | Python 3.x, FastAPI, Uvicorn |
| **ML** | scikit-learn, TF-IDF, Logistic Regression, joblib |
| **Integrations** | Gmail API (OAuth), Twilio (SMS) |
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS, Motion |

---

## Project Structure

```text
AegisAI/
├── backend/
│   ├── main.py           # FastAPI app, Gmail + Twilio + /fetch-emails, /analyze
│   ├── ml_service.py     # ML model load, analyze_email(), risk scoring
│   ├── utils.py
│   ├── requirements.txt
│   ├── .env              # Google + Twilio credentials (not committed)
│   ├── model.pkl
│   └── vectorizer.pkl
├── frontend/
│   ├── src/
│   │   ├── App.tsx       # Landing, onboarding, dashboard, pages (Home, Threats, Analysis, Emails in Bin, Settings)
│   │   └── pages/
│   │       └── Threats.tsx
│   ├── package.json
│   └── ...
└── README.md


## Prerequisites

- **Python 3.x** (backend)
- **Node.js** and npm (frontend)
- **Google Cloud** project with Gmail API enabled and OAuth 2.0 credentials (Web application)
- **Twilio** account (optional, for SMS when high-risk emails are trashed)



## Environment Setup

### Backend (`backend/.env`)

env
# Required for Gmail OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Optional for SMS when high-risk emails are moved to trash
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# For production deployment only (optional for local)
REDIRECT_URI=https://your-backend-url/auth/gmail/callback
FRONTEND_URL=https://your-frontend-url


- **Google**: Create OAuth 2.0 credentials (Web application), add `http://127.0.0.1:8000/auth/gmail/callback` as authorized redirect URI (and your production callback URL when deployed).
- **Twilio**: If omitted, the app still runs; SMS is skipped and a log line is written.

### Frontend (`frontend/.env` for production)

- `VITE_API_URL` = your deployed backend URL (e.g. `https://aegisai-api.onrender.com`). Omit for local dev (defaults to `http://127.0.0.1:8000`).


## Making the site public

To let anyone use the app in a browser without running code locally, deploy the backend and frontend and set the env vars above. See **[DEPLOYMENT.md](DEPLOYMENT.md)** for step-by-step instructions (Render/Railway + Vercel/Netlify, Google OAuth, and Docker).



## Running the App (local)

### 1. Backend

bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


- API: **http://127.0.0.1:8000**
- Docs: **http://127.0.0.1:8000/docs**

### 2. Frontend

bash
cd frontend
npm install
npm run dev


- App: **http://localhost:3000**

### 3. Using the app

1. Open **http://localhost:3000**
2. Sign in with Google (redirects to Gmail OAuth, then back to the dashboard with token in URL)
3. **Quick Scan** fetches inbox + spam, runs ML + URL risk, and moves high-risk messages to Gmail Trash
4. **Settings**: optional phone number for SMS when high-risk emails are trashed
5. **Recent Incidents**: one list for all messages; spam rows show a “Spam” badge and HIGH risk
6. **Investigate**: click to see sender, subject, risk %, and “From spam folder” when applicable



## API Summary

| Method | Endpoint | Description |
| GET | `/` | Health check |
| GET | `/auth/gmail/url` | Returns Google OAuth URL |
| GET | `/auth/gmail/callback?code=...` | OAuth callback; redirects to frontend with token |
| POST | `/fetch-emails` | Body: token data + optional `phone_number`. Fetches inbox + spam, analyzes, trashes high-risk, optionally sends SMS. Returns `user_email`, `emails`, `sms_sent` |
| POST | `/analyze` | Body: `{ "content": "..." }`. Returns ML + URL risk (prediction, confidence, risk_level, severity, URLs, etc.) |



## Risk Rules (Backend)

- **Spam folder**: Always treated as **high risk** (risk % = 95, moved to Trash).
- **Others**: Risk from ML model. If **risk % > 60**, treated as **high risk** (moved to Trash).
- High-risk messages are moved to Gmail Trash in the same run; if `phone_number` is present and Twilio is configured, one SMS is sent per scan when any message is trashed.



## Frontend Pages

- **Home**: Security Dashboard, Quick Scan, stats (scanned, threats, safe), Recent Incidents list with risk and “Investigate”.
- **Threats**: Threat-focused view of the same email list.
- **Analysis**: Paste text to check for phishing (AI + URL risk); “Analyze” button (calls `/analyze` when wired).
- **Emails in Bin**: List of emails moved to Trash in this session; empty state explains that high-risk emails are moved automatically.
- **Settings**: Save phone number for SMS alerts (stored in `localStorage`, sent with Quick Scan).



## License

MIT (or as specified in the repository).

# AgeisAI-2
 0c9223bd9f584657b3833f55d54439853fa8614e
