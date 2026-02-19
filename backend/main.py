from __future__ import annotations

import logging

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from ml_service import AnalyzeResult, ModelLoadError, analyze_email

logger = logging.getLogger("aegisai")


class AnalyzeRequest(BaseModel):
    content: str


class AnalyzeResponse(BaseModel):
    prediction: int
    confidence: float


app = FastAPI(
    title="AegisAI Email Security Backend",
    version="1.0.0",
    description="FastAPI service exposing a phishing/spam analysis endpoint for AegisAI.",
)


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(payload: AnalyzeRequest) -> AnalyzeResponse:
    """
    Analyze raw email content and return a spam/phishing prediction.
    """

    try:
        result: AnalyzeResult = analyze_email(payload.content)
    except ModelLoadError as exc:
        logger.exception("Failed to load or use ML model.")
        raise HTTPException(status_code=500, detail="Model is not available") from exc
    except Exception as exc:  # noqa: BLE001 - unexpected failure
        logger.exception("Unexpected error during analysis.")
        raise HTTPException(status_code=500, detail="Internal server error") from exc

    return AnalyzeResponse(
        prediction=result.prediction,
        confidence=float(result.confidence),
    )


@app.get("/", include_in_schema=False)
async def root_health() -> dict[str, str]:
    """
    Lightweight health check so the deployment platform can verify liveness.
    """

    return {"status": "AegisAI backend running"}

