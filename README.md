# AegisAI – AI Email Security Assistant

AegisAI is an **AI-powered email security assistant** that detects phishing and spam, scores risk, and can automatically move high‑risk messages to Gmail Trash, with optional SMS alerts via Twilio.[page:1]

---

## Overview

AegisAI is a full‑stack app that:

- Connects to Gmail via OAuth and scans **Inbox and Spam** in a single unified view.[page:1]
- Analyzes each message with an ML model (**TF‑IDF + Logistic Regression**) and URL‑based risk checks.[page:1]
- Treats **Spam-folder messages** as high risk and any message with **risk above 60%** as high risk.[page:1]
- Automatically moves **high‑risk** emails to Gmail Trash and can send an **SMS alert** (Twilio) when any are trashed.[page:1]
- Displays a **Security Dashboard** with recent incidents, risk levels, and an **Investigate** view (sender, subject, risk %).[page:1]

There is no separate spam folder inside the app: Inbox and Spam appear together; spam messages are tagged with a “Spam” badge and are always shown as high risk.[page:1]

---

## Tech Stack

| Layer          | Stack                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Backend**   | Python 3.x, FastAPI, Uvicorn                                          |
| **ML**        | scikit‑learn, TF‑IDF, Logistic Regression, joblib                     |
| **Integrations** | Gmail API (OAuth), Twilio (SMS)                                   |
| **Frontend**  | React 19, Vite, TypeScript, Tailwind CSS, Motion                      |[page:1]

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
│   │   ├── App.tsx       # Landing, onboarding, dashboard and pages
│   │   └── pages/
│   │       └── Threats.tsx
│   ├── package.json
│   └── ...
└── README.md
```

---

## Prerequisites

- **Python 3.x** (for the backend).[page:1]
- **Node.js** and npm (for the frontend).[page:1]
- **Google Cloud** project with:
  - Gmail API enabled.
  - OAuth 2.0 credentials (Web application).[page:1]
- **Twilio** account (optional, for SMS alerts when high‑risk emails are trashed).[page:1]

---

## Environment Setup

### Backend – `backend/.env`

```env
# Required for Gmail OAuth
GOOGLE_CLIENT_ID=705542226066-6nsigsnm20f88u8g1d109p06ub3sqa1n.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Optional for SMS when high-risk emails are moved to trash
TWILIO_ACCOUNT_SID=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
TWILIO_AUTH_TOKEN=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
TWILIO_PHONE_NUMBER=+18312573782

# For production deployment only (optional for local)
REDIRECT_URI=https://your-backend-url/auth/gmail/callback
FRONTEND_URL=https://your-frontend-url
```

- **Google**: Create OAuth 2.0 credentials (Web application) and add  
  `http://127.0.0.1:8000/auth/gmail/callback` as an authorized redirect URI (plus your production callback URL when deployed).
- **Twilio**: If Twilio variables are omitted, the app still runs; SMS sending is skipped and a log entry is written instead.

### Frontend – `frontend/.env` (for production)

```env
VITE_API_URL=https://your-deployed-backend-url   # e.g. https://aegisai-api.onrender.com
```

For local development, you can omit this (defaults to `http://127.0.0.1:8000`).

---

## Making the Site Public

To let users access AegisAI in a browser without running code locally:

1. Deploy the **backend** (e.g. Render, Railway, Docker).[page:1]
2. Deploy the **frontend** (e.g. Vercel, Netlify).[page:1]
3. Configure the environment variables above in your deployment environments.[page:1]
4. Set up Google OAuth for the deployed URLs.[page:1]

See **`DEPLOYMENT.md`** for detailed step‑by‑step deployment instructions (Render/Railway + Vercel/Netlify, Google OAuth, Docker, etc.).[page:1]

---

## Running the App Locally

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

- API base URL: **http://127.0.0.1:8000**.[page:1]
- Interactive API docs: **http://127.0.0.1:8000/docs**.[page:1]

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

- App URL: **http://localhost:3000**.[page:1]

### 3. Using the App

1. Open **http://localhost:3000** in your browser.[page:1]
2. Sign in with Google (you are redirected to Gmail OAuth and then back to the dashboard with the token in the URL).[page:1]
3. Click **Quick Scan** to fetch Inbox + Spam, run ML + URL risk analysis, and move high‑risk messages to Gmail Trash.[page:1]
4. In **Settings**, optionally add a phone number for SMS alerts when high‑risk emails are trashed.[page:1]
5. **Recent Incidents** shows a single list of all messages; spam rows have a “Spam” badge and HIGH risk.[page:1]
6. Use **Investigate** to view sender, subject, risk %, and whether a message came from the spam folder.[page:1]

---

## API Summary

| Method | Endpoint                     | Description |
|--------|------------------------------|-------------|
| GET    | `/`                          | Health check. |
| GET    | `/auth/gmail/url`            | Returns the Google OAuth URL for Gmail login. |
| GET    | `/auth/gmail/callback`       | OAuth callback; redirects to the frontend with a token. |
| POST   | `/fetch-emails`              | Body: token data + optional `phone_number`. Fetches Inbox + Spam, analyzes messages, moves high‑risk emails to Trash, optionally sends SMS. Returns `user_email`, `emails`, `sms_sent`. |
| POST   | `/analyze`                   | Body: `{ "content": "..." }`. Returns ML + URL risk (prediction, confidence, risk_level, severity, URLs, etc.). |[page:1]

---

## Risk Rules (Backend)

- **Spam folder** messages are always treated as **high risk** (risk % = 95, automatically moved to Trash).[page:1]
- All other messages receive a risk score from the ML model; if **risk % > 60**, the message is treated as **high risk** and moved to Trash.[page:1]
- High‑risk messages are moved to Gmail Trash in the same scan; if `phone_number` is provided and Twilio is configured, **one SMS is sent per scan** when any message is trashed.[page:1]

---

## Frontend Pages

- **Home**  
  Security Dashboard with Quick Scan, stats (scanned, threats, safe), and Recent Incidents list with risk indicators and **Investigate** actions.[page:1]

- **Threats**  
  Threat‑focused view over the same email list, emphasizing risky and high‑risk messages.[page:1]

- **Analysis**  
  Text analysis tool where you can paste content to check for phishing using AI + URL risk; the **Analyze** button calls the `/analyze` API.[page:1]

- **Emails in Bin**  
  Shows emails moved to Trash in the current session, with an empty state explaining that high‑risk emails are moved automatically.[page:1]

- **Settings**  
  Lets the user save a phone number for SMS alerts (stored in `localStorage` and sent along with Quick Scan requests).[page:1]

---

## License

This project is licensed under the **MIT License** (or as specified in the repository).[page:1]

---

> Repo: **AgeisAI-2** – commit `0c9223bd9f584657b3833f55d54439853fa8614e`.[page:1]
```
