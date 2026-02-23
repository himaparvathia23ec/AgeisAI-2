from __future__ import annotations

import os
import logging

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

from ml_service import AnalyzeResult, ModelLoadError, analyze_email

# Load environment variables
load_dotenv()

logger = logging.getLogger("aegisai")

# ================================
# Google OAuth Config
# ================================
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

REDIRECT_URI = os.getenv("REDIRECT_URI", "http://127.0.0.1:8000/auth/gmail/callback")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

SCOPES = [
    "https://www.googleapis.com/auth/gmail.modify"
]

# ================================
# Twilio SMS Config (optional)
# ================================
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

# ================================
# FastAPI App
# ================================
app = FastAPI(
    title="AegisAI Email Security Backend",
    version="1.0.0",
    description="FastAPI service exposing phishing detection and Gmail scanning.",
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================================
# Request / Response Models
# ================================
class AnalyzeRequest(BaseModel):
    content: str


class AnalyzeResponse(BaseModel):
    prediction: int
    confidence: float
    risk_level: str
    suspicious_words: list[str]

    urls_detected: list[str]
    domains: list[str]
    url_risk_score: float
    final_risk_score: float
    severity: str

from typing import List

class TokenData(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_uri: str
    client_id: str
    client_secret: str
    scopes: List[str]


class FetchEmailsRequest(TokenData):
    """TokenData plus optional phone for SMS notification when high-risk emails are trashed."""
    phone_number: str | None = None


def send_sms(to: str, body: str) -> bool:
    """Send SMS via Twilio. Returns True on success, False otherwise. No-op if Twilio not configured."""
    if not (TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN and TWILIO_PHONE_NUMBER):
        logger.info("Twilio not configured; skipping SMS")
        return False
    try:
        from twilio.rest import Client
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(to=to, from_=TWILIO_PHONE_NUMBER, body=body)
        return True
    except Exception as e:
        logger.exception("Twilio SMS failed: %s", e)
        return False


# ================================
# Health Check
# ================================
@app.get("/", include_in_schema=False)
async def root_health():
    return {"status": "AegisAI backend running"}


# ================================
# Email Analyzer
# ================================
@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(payload: AnalyzeRequest):
    try:
        result: AnalyzeResult = analyze_email(payload.content)
    except ModelLoadError as exc:
        logger.exception("Model failed")
        raise HTTPException(status_code=500, detail="Model unavailable") from exc
    except Exception as exc:
        logger.exception("Unexpected error")
        raise HTTPException(status_code=500, detail="Internal error") from exc

    return AnalyzeResponse(
        prediction=result.prediction,
        confidence=float(result.confidence),
        risk_level=result.risk_level,
        suspicious_words=result.suspicious_words,
        urls_detected=result.urls_detected,
        domains=result.domains,
        url_risk_score=float(result.url_risk_score),
        final_risk_score=float(result.final_risk_score),
        severity=result.severity,
    )


# ================================
# Gmail OAuth URL
# ================================
@app.get("/auth/gmail/url")
async def get_gmail_auth_url():

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI,
    )

    auth_url, _ = flow.authorization_url(
        access_type="offline",
        prompt="consent"
    )

    return {"auth_url": auth_url}

from fastapi.responses import RedirectResponse
import json
import urllib.parse

@app.get("/auth/gmail/callback")
async def gmail_callback(code: str):

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI,
    )

    flow.fetch_token(code=code)

    credentials = flow.credentials

    token_data = {
        "access_token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "scopes": credentials.scopes,
    }

    encoded = urllib.parse.quote(json.dumps(token_data))

    return RedirectResponse(
        url=f"{FRONTEND_URL.rstrip('/')}/dashboard?token={encoded}"
    )


# ================================
# Fetch Gmail Emails
# ================================
@app.post("/fetch-emails")
async def fetch_emails(payload: FetchEmailsRequest):
    token_data = payload  # FetchEmailsRequest extends TokenData
    phone_number = getattr(payload, "phone_number", None) or None
    if phone_number:
        phone_number = phone_number.strip() or None

    try:
        creds = Credentials(
            token=token_data.access_token,
            refresh_token=token_data.refresh_token if token_data.refresh_token else None,
            token_uri=token_data.token_uri,
            client_id=token_data.client_id,
            client_secret=token_data.client_secret,
            scopes=token_data.scopes,
        )

        service = build("gmail", "v1", credentials=creds)

        profile = service.users().getProfile(userId="me").execute()

        # Single unified list: inbox + spam together (no separate spam folder).
        # Same treatment for all: analyze risk, show in dashboard, move high-risk to trash.
        # includeSpamTrash=True is required so SPAM messages are included in results.
        messages = []
        try:
            results = service.users().messages().list(
                userId="me",
                q="in:inbox OR in:spam",
                maxResults=30,
                includeSpamTrash=True,
            ).execute()
            messages = results.get("messages") or []
        except Exception as e:
            logger.warning("messages.list failed: %s", e)
            # Fallback: inbox only
            try:
                results = service.users().messages().list(
                    userId="me",
                    labelIds=["INBOX"],
                    maxResults=20,
                    includeSpamTrash=True,
                ).execute()
                messages = results.get("messages") or []
            except Exception as e2:
                logger.exception("Fallback inbox list failed: %s", e2)

        logger.info("Fetch: %d messages (inbox + spam)", len(messages))

        emails = []
        trashed_count = 0

        for msg in messages:
            msg_data = service.users().messages().get(
                userId="me",
                id=msg["id"],
                format="full"
            ).execute()

            snippet = msg_data.get("snippet", "")

            # Extract basic headers like From / Subject for investigation view
            payload = msg_data.get("payload") or {}
            headers = payload.get("headers") or []
            from_header = ""
            subject_header = ""
            for h in headers:
                name = (h.get("name") or "").lower()
                if name == "from":
                    from_header = h.get("value") or ""
                elif name == "subject":
                    subject_header = h.get("value") or ""

            analysis = analyze_email(snippet)

            label_ids = msg_data.get("labelIds") or []
            is_from_spam = "SPAM" in label_ids

            # Spam folder messages are always treated as high risk (show HIGH, move to trash)
            HIGH_RISK_THRESHOLD_PERCENT = 60  # risk_percent > 60 => high risk
            if is_from_spam:
                effective_risk = "high"
                risk_score = 0.95
                risk_percent = 95
            else:
                try:
                    risk_score = float(analysis.final_risk_score)
                    if 0.0 <= risk_score <= 1.0:
                        risk_percent = int(round(risk_score * 100))
                    else:
                        risk_percent = int(round(risk_score))
                except Exception:
                    risk_score = None
                    risk_percent = None
                # Above 60% risk percentage => treat as high risk
                if risk_percent is not None and risk_percent > HIGH_RISK_THRESHOLD_PERCENT:
                    effective_risk = "high"
                else:
                    effective_risk = analysis.risk_level

            deleted = False
            if effective_risk == "high":
                service.users().messages().trash(
                    userId="me",
                    id=msg["id"]
                ).execute()
                deleted = True
                trashed_count += 1

            emails.append({
                "text": snippet,
                "from": from_header,
                "subject": subject_header,
                "prediction": analysis.prediction,
                "risk": effective_risk,
                "risk_score": risk_score if not is_from_spam else 0.95,
                "risk_percent": risk_percent,
                "deleted": deleted,
                "is_from_spam": is_from_spam,
            })

        sms_sent = False
        if trashed_count > 0 and phone_number and len(phone_number) >= 10:
            msg_text = (
                f"AegisAI: {trashed_count} high-risk email(s) were moved to Trash. "
                "Check Emails in Bin in the app."
            )
            sms_sent = send_sms(phone_number, msg_text)

        return {
            "user_email": profile["emailAddress"],
            "emails": emails,
            "sms_sent": sms_sent,
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

