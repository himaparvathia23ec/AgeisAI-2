from __future__ import annotations

import logging
import os
from dataclasses import dataclass
from typing import Any

import joblib
import numpy as np
from streamlit import text

from utils import (
    find_suspicious_words,
    risk_level_from_confidence,
    extract_urls,
    get_domain,
    url_risk_score,
    severity_level,
)


logger = logging.getLogger("aegisai")


@dataclass(frozen=True)
class AnalyzeResult:
    prediction: int
    confidence: float
    risk_level: str
    suspicious_words: list[str]

    # NEW FIELDS
    urls_detected: list[str]
    domains: list[str]
    url_risk_score: float
    final_risk_score: float
    severity: str



class ModelLoadError(RuntimeError):
    pass


class MLService:
    """
    Loads a vectorizer + model (joblib) and produces predictions.

    Expected artifacts (relative to this file's directory by default):
    - model.pkl
    - vectorizer.pkl
    """

    def __init__(
        self,
        model_path: str | None = None,
        vectorizer_path: str | None = None,
    ) -> None:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.model_path = model_path or os.path.join(base_dir, "model.pkl")
        self.vectorizer_path = vectorizer_path or os.path.join(base_dir, "vectorizer.pkl")
        self.model: Any | None = None
        self.vectorizer: Any | None = None

    def load(self) -> None:
        try:
            self.model = joblib.load(self.model_path)
            self.vectorizer = joblib.load(self.vectorizer_path)
        except Exception as e:  # noqa: BLE001 - surface as load failure
            raise ModelLoadError(
                f"Failed to load ML artifacts. model='{self.model_path}', vectorizer='{self.vectorizer_path}'. "
                f"Original error: {e}"
            ) from e

        if self.model is None or self.vectorizer is None:
            raise ModelLoadError("Loaded ML artifacts are empty or invalid.")

    def ensure_loaded(self) -> None:
        if self.model is None or self.vectorizer is None:
            self.load()

    def _confidence_and_pred(self, X: Any) -> tuple[float, int]:
        """
        Returns (confidence, prediction) where:
        - prediction is 0/1 (1 = phishing)
        - confidence is probability-like in [0, 1]
        """

        if hasattr(self.model, "predict_proba"):
            proba = self.model.predict_proba(X)
            # proba shape: (n, 2) for binary models
            phishing_proba = float(proba[0][1])
            pred = 1 if phishing_proba >= 0.5 else 0
            return phishing_proba, pred

        # Fallback: decision_function -> sigmoid to (0,1)
        if hasattr(self.model, "decision_function"):
            score = float(np.asarray(self.model.decision_function(X)).ravel()[0])
            phishing_proba = float(1.0 / (1.0 + np.exp(-score)))
            pred = 1 if phishing_proba >= 0.5 else 0
            return phishing_proba, pred

        # Last resort: predict only (no usable confidence)
        pred = int(np.asarray(self.model.predict(X)).ravel()[0])
        return float(pred), pred

    def analyze(self, content: str) -> AnalyzeResult:
        self.ensure_loaded()

        text = content or ""
        suspicious = find_suspicious_words(text)

        X = self.vectorizer.transform([text])
        confidence, pred = self._confidence_and_pred(X)
        confidence = float(np.clip(confidence, 0.0, 1.0))
        # =========================
        # URL EXTRACTION + SCORING
        # =========================

        urls = extract_urls(text)

        domains = []
        total_url_risk = 0.0

        for url in urls:
            domains.append(get_domain(url))
            total_url_risk += url_risk_score(url)

        # Combine ML confidence + URL risk
        final_risk = min(confidence + total_url_risk, 1.0)

        # New severity system (stronger than old risk_level)
        severity = severity_level(final_risk)


        return AnalyzeResult(
            prediction=int(pred),
            confidence=confidence,
            risk_level=risk_level_from_confidence(confidence),
            suspicious_words=suspicious,

            urls_detected=urls,
            domains=domains,
            url_risk_score=total_url_risk,
            final_risk_score=final_risk,
            severity=severity,
        )


def train_fallback_and_save(model_path: str, vectorizer_path: str) -> None:
    """
    Generates a tiny baseline model so the backend can start even without real artifacts.
    Replace these artifacts with your trained phishing model + vectorizer for production.
    """

    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import LogisticRegression

    phishing = [
        "urgent verify your account password now",
        "click this link to login and confirm bank details",
        "your account has been suspended click to verify",
        "reset your password now urgent action required",
    ]
    benign = [
        "team meeting moved to 3pm tomorrow",
        "here is the invoice for last month thank you",
        "lunch plans for friday",
        "project update attached please review",
    ]

    X_text = phishing + benign
    y = np.array([1] * len(phishing) + [0] * len(benign))

    vectorizer = TfidfVectorizer(
        lowercase=True,
        stop_words="english",
        max_features=5000,
        ngram_range=(1, 2),
    )
    X = vectorizer.fit_transform(X_text)

    model = LogisticRegression(max_iter=500)
    model.fit(X, y)

    os.makedirs(os.path.dirname(os.path.abspath(model_path)), exist_ok=True)
    joblib.dump(model, model_path)
    joblib.dump(vectorizer, vectorizer_path)


_global_ml_service: MLService | None = None


def _get_ml_service() -> MLService:
    """
    Lazily construct a process-wide MLService instance.
    This keeps model/vectorizer in memory across requests.
    """

    global _global_ml_service
    if _global_ml_service is None:
        _global_ml_service = MLService()
    return _global_ml_service


def analyze_email(content: str) -> AnalyzeResult:
    """
    Convenience function used by the FastAPI layer.
    """

    service = _get_ml_service()
    return service.analyze(content)

