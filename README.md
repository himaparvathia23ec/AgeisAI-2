# 🛡️ AegisAI  
AI‑Powered Automated Email Security Assistant  

An intelligent machine learning–driven email protection system that detects, analyzes, and neutralizes spam and phishing threats in real time.

---

## 🚀 Overview

**AegisAI** is a full‑stack AI security application designed to automatically detect and handle malicious emails using Machine Learning and backend automation.  

Once a user grants Gmail access, AegisAI continuously monitors incoming emails, analyzes their content using a trained TF‑IDF + Logistic Regression model, calculates a risk score, and automatically takes action on suspicious emails — while notifying the user instantly.  

It functions as a background AI‑powered protection layer, minimizing phishing risks and eliminating manual spam filtering.

---

## 🧠 Problem Statement

Phishing and spam emails remain one of the leading cybersecurity threats worldwide. Users often rely on traditional filters that:  

- Lack transparency  
- Fail to provide confidence levels  
- Do not notify users proactively  
- Require manual review  

AegisAI addresses these limitations by combining AI classification, automation, and user transparency into one integrated system.

---

## ⚙️ How AegisAI Works

```text
Incoming Email
        ↓
Gmail API (Authorized Access)
        ↓
Backend (FastAPI Server)
        ↓
TF‑IDF Text Vectorization
        ↓
Logistic Regression Classifier
        ↓
Prediction + Confidence Score
        ↓
If Spam → Move to Bin / Quarantine
        ↓
Log Detection Event
        ↓
Notify User (App + SMS)
```

---

## 🔍 Key Features

- 🤖 Machine Learning–Based Spam Detection  
- 🔐 Secure Gmail API Integration  
- 📊 Confidence Score (Risk Probability)  
- 🗑 Automatic Spam Removal / Quarantine  
- 🔔 Real‑Time Notifications (App + SMS)  
- 📈 Dashboard with Detection Analytics  
- 🧾 Spam History & Activity Logs  
- 🛠 REST API Architecture  

---

## 🏗 Tech Stack

### 🧠 Machine Learning

- Scikit‑Learn  
- TF‑IDF Vectorization  
- Logistic Regression  
- Joblib (Model Serialization)  

### ⚙ Backend

- FastAPI  
- Uvicorn  
- Python 3.x  
- RESTful API Design  

### 🔗 Integration

- Gmail API  
- Notification Service (SMS + App Alerts)  

### 🛠 Tools

- Git & GitHub  
- VS Code / Cursor  
- PowerShell / Terminal  

---

## 📁 Project Structure

```text
AegisAI/
│
├── backend/
│   ├── main.py
│   ├── ml_service.py
│   ├── utils.py
│   ├── requirements.txt
│   ├── model.pkl
│   └── vectorizer.pkl
│
└── README.md
```

---

## 🧪 Machine Learning Details

- **Algorithm Used:** Logistic Regression  
- **Feature Extraction:** TF‑IDF (Term Frequency–Inverse Document Frequency)  
- **Training Dataset:** Labeled email dataset (spam / safe)  

**Output:**

- `prediction` → `0` (Safe) / `1` (Spam)  
- `confidence` → Probability score (risk level)  

### Example API Response

```json
{
  "prediction": 1,
  "confidence": 0.93
}
```

---

## ▶ Running the Backend Locally

1️⃣ **Navigate to backend folder**

```bash
cd backend
```

2️⃣ **Install dependencies**

```bash
pip install -r requirements.txt
```

3️⃣ **Run the server**

```bash
uvicorn main:app --reload
```

4️⃣ **Open API Documentation**

Open in browser:  
http://127.0.0.1:8000/docs

---

## 📡 API Endpoint

**POST** `/analyze`  

### Request Body

```json
{
  "content": "Urgent! Verify your bank account immediately."
}
```

### Response

```json
{
  "prediction": 1,
  "confidence": 0.92
}
```

---

## 📊 Why AegisAI Stands Out

Unlike traditional spam filters, AegisAI:

- Provides probability‑based risk scoring  
- Automatically removes malicious emails  
- Notifies users instantly  
- Maintains transparent detection logs  
- Integrates ML directly into backend automation  

It transforms passive spam filtering into **active** AI‑driven protection.

---

## 🔮 Future Enhancements

- 🔍 Suspicious URL Extraction & Analysis  
- 📈 Threat Trend Visualization Dashboard  
- 🧠 Continuous Model Retraining Pipeline  
- 📱 Full Mobile Application Deployment  
- 🏢 Enterprise Email Gateway Version  

---

## 👥 Team Responsibilities

- **Machine Learning Engineer** – Model training & optimization  
- **Backend Developer** – API integration & automation logic  
- **Frontend/App Developer** – Dashboard & user interface  

---

## 🏆 Vision

AegisAI aims to evolve into a scalable AI‑powered cybersecurity assistant capable of protecting individuals and organizations from evolving phishing and email‑based threats.

---

## ⭐ Conclusion

AegisAI is not just a spam classifier —  
it is an integrated AI security system combining machine learning, backend automation, API architecture, and real‑time notifications to create a proactive email defense mechanism.
```
