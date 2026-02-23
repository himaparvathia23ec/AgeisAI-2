# AegisAI backend - run with: docker build -t aegisai-backend . && docker run -p 8000:8000 --env-file .env aegisai-backend
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# model.pkl and vectorizer.pkl must be present in backend/ when building
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
