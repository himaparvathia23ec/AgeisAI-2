from __future__ import annotations

import base64
import logging
import os
import re
from typing import Iterable

from dotenv import load_dotenv

logger = logging.getLogger("aegisai")


SUSPICIOUS_KEYWORDS: list[str] = [
    "urgent",
    "verify",
    "password",
    "click",
    "bank",
    "account",
    "login",
]


def load_env() -> None:
    """
    Load environment variables from a local .env file if present.
    This is safe in production (no-op if file doesn't exist).
    """

    load_dotenv(override=False)


def get_cors_origins() -> list[str]:
    raw = os.getenv("CORS_ORIGINS", "*").strip()
    if not raw:
        return ["*"]
    if raw == "*":
        return ["*"]
    return [o.strip() for o in raw.split(",") if o.strip()]


def find_suspicious_words(text: str, keywords: Iterable[str] | None = None) -> list[str]:
    haystack = (text or "").lower()
    words = keywords or SUSPICIOUS_KEYWORDS
    found: list[str] = []
    for kw in words:
        if kw.lower() in haystack:
            found.append(kw.lower())
    return sorted(set(found))


def risk_level_from_confidence(confidence: float) -> str:
    if confidence < 0.5:
        return "Low"
    if confidence <= 0.8:
        return "Medium"
    return "High"


_TAG_RE = re.compile(r"<[^>]+>")


def strip_html(html: str) -> str:
    if not html:
        return ""
    return _TAG_RE.sub(" ", html).replace("\u00a0", " ").strip()


def b64url_decode(data: str) -> bytes:
    if not data:
        return b""
    # Gmail uses URL-safe base64 without padding
    padding = "=" * (-len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)


def safe_get_env(name: str, default: str | None = None) -> str | None:
    v = os.getenv(name)
    if v is None:
        return default
    v = v.strip()
    return v if v else default

