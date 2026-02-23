# Deploying AegisAI for Public Access

This guide helps you host AegisAI so anyone can use it in a browser without running code locally.

---

## Overview

- **Frontend**: React app (static build) → host on **Vercel**, **Netlify**, or **Cloudflare Pages**
- **Backend**: FastAPI (Python) → host on **Render**, **Railway**, **Fly.io**, or **Google Cloud Run**
- **Google OAuth**: Add your production URLs in Google Cloud Console

---

## 1. Deploy the Backend

### Option A: Render (free tier)

1. Go to [render.com](https://render.com), sign up, and create a **Web Service**.
2. Connect your GitHub repo and set:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Add **Environment Variables**:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `REDIRECT_URI` = `https://YOUR-RENDER-SERVICE.onrender.com/auth/gmail/callback`
   - `FRONTEND_URL` = `https://your-frontend-url.vercel.app` (set after deploying frontend)
   - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` (optional)
4. Deploy. Note your backend URL (e.g. `https://aegisai-api.onrender.com`).

### Option B: Railway

1. Go to [railway.app](https://railway.app), connect the repo.
2. Add a service from the `backend` folder.
3. Set the same env vars as above; Railway assigns a public URL.
4. Set `REDIRECT_URI` and `FRONTEND_URL` to your Railway backend URL and frontend URL.

### Option C: Docker (any host)

From the repo root:

```bash
cd backend
docker build -t aegisai-backend .
docker run -p 8000:8000 -e GOOGLE_CLIENT_ID=... -e GOOGLE_CLIENT_SECRET=... -e REDIRECT_URI=... -e FRONTEND_URL=... aegisai-backend
```

Use your server’s public URL for `REDIRECT_URI` and `FRONTEND_URL`.

---

## 2. Deploy the Frontend

### Option A: Vercel (recommended)

1. Go to [vercel.com](https://vercel.com), sign up, and import your GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Add **Environment Variable**:
   - `VITE_API_URL` = your backend URL (e.g. `https://aegisai-api.onrender.com`)
4. Deploy. Vercel gives you a URL like `https://aegisai-xxx.vercel.app`.

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com), add the repo.
2. Build settings: **Base directory** = `frontend`, **Build command** = `npm run build`, **Publish directory** = `frontend/dist`.
3. Add env var `VITE_API_URL` = your backend URL.
4. Deploy and note the site URL.

### Option C: Cloudflare Pages

1. Connect your repo to Cloudflare Pages, set build to `frontend`.
2. Build command: `npm run build`; output directory: `dist`.
3. Add `VITE_API_URL` in **Settings → Environment variables**.
4. Deploy.

---

## 3. Google Cloud Console (Required)

1. Open [Google Cloud Console](https://console.cloud.google.com) → your project → **APIs & Services** → **Credentials**.
2. Edit your **OAuth 2.0 Client ID** (Web application).
3. **Authorized redirect URIs**: add  
   `https://YOUR-BACKEND-URL/auth/gmail/callback`  
   (e.g. `https://aegisai-api.onrender.com/auth/gmail/callback`).
4. **Authorized JavaScript origins**: add  
   - `https://YOUR-FRONTEND-URL` (e.g. `https://aegisai-xxx.vercel.app`)  
   - Keep `http://localhost:3000` if you still develop locally.

---

## 4. Set URLs in Backend

After the frontend is live, set on the backend host:

- `FRONTEND_URL` = your frontend URL (e.g. `https://aegisai-xxx.vercel.app`)
- `REDIRECT_URI` = `https://YOUR-BACKEND-URL/auth/gmail/callback`

Redeploy the backend if you change these.

---

## 5. Summary Checklist

| Step | What to do |
|------|------------|
| 1 | Deploy backend (Render/Railway/Docker), get backend URL |
| 2 | Deploy frontend (Vercel/Netlify), set `VITE_API_URL` = backend URL |
| 3 | In Google Console, add production redirect URI and JS origin |
| 4 | Set `FRONTEND_URL` and `REDIRECT_URI` on backend and redeploy if needed |

After this, anyone can open your frontend URL in a browser, sign in with Google, and use AegisAI without having the code on their machine.

---

## Local vs Production

- **Local**: No env needed for URLs; defaults are `http://127.0.0.1:8000` and `http://localhost:3000`.
- **Production**: Set `VITE_API_URL`, `FRONTEND_URL`, and `REDIRECT_URI` as above so the app and OAuth work from your public URLs.
