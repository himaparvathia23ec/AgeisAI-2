/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Threats from "./pages/Threats";

import React, { useState } from "react";
import {
  Shield,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Mail,
  Lock,
  ChevronRight,
  Bell,
  Search,
  Bolt,
  Bug,
  Link as LinkIcon,
  CheckCircle,
  LayoutDashboard,
  ShieldAlert,
  Network,
  Box,
  AlertTriangle,
  BarChart3,
  Trash2,
  Settings,
  Info,
  Brain,
  FileWarning,
  X,
  Eye,
  Ban
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { div, input } from "motion/react-m";

const API = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

type View = "landing" | "onboarding" | "dashboard";

interface EmailResult {
  text: string;
  from?: string;
  subject?: string;
  prediction: string;
  risk: string;
  risk_score?: number | null;
  risk_percent?: number | null;
  deleted?: boolean;
  is_from_spam?: boolean;
}

interface BinEmail {
  text: string;
  risk: string;
  movedAt: string;
}

interface Incident {
  id: string;
  timestamp: string;
  source: string;
  sourceDetail: string;
  category: string;
  severity: "CRITICAL" | "WARNING" | "LOW";
  type: "mail" | "link" | "network";
}

export default function App() {
  const [view, setView] = useState<View>("landing");

  React.useEffect(() => {
    if (window.location.search.includes("token")) {
      setView("onboarding");
    }
  }, []);

  return (
    <div className="font-display">
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <LandingPage onNext={() => setView("onboarding")} />
          </motion.div>
        )}
        
        {view === "onboarding" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <OnboardingPage onNext={() => setView("dashboard")} />
          </motion.div>
        )}

        {view === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Dashboard />

        </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}


function LandingPage({ onNext }: { onNext: () => void }) {

  async function loginWithGoogle() {
    try {
      const res = await fetch(`${API}/auth/gmail/url`);
      const data = await res.json();
      window.location.href = data.auth_url;
    } catch (err) {
      console.error(err);
      alert("Backend not reachable");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0b1220] text-white flex items-center justify-between px-20">

      {/* LEFT SIDE */}
      <div className="max-w-xl">
        <div className="mb-6 inline-block bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-sm">
          AI‑Driven Cybersecurity
        </div>

        <h1 className="text-6xl font-bold leading-tight">
          Your Intelligent <br />
          <span className="text-blue-500">Privacy Shield</span>
        </h1>

        <p className="text-slate-400 mt-6 text-lg">
          Advanced AI‑powered protection for your emails and URLs.
          Secure your digital footprint with real‑time threat detection
          and automated privacy guardrails.
        </p>

        <div className="flex gap-10 mt-10 text-sm text-slate-400">
          <div>
            <div className="text-slate-500">ENCRYPTION</div>
            <div className="text-white">AES‑256 Bit</div>
          </div>

          <div>
            <div className="text-slate-500">PROTECTION</div>
            <div className="text-white">Real‑time URL</div>
          </div>

          <div>
            <div className="text-slate-500">PRIVACY</div>
            <div className="text-white">Zero‑Knowledge</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN CARD */}
      <div className="bg-[#0b1220] border border-slate-800 p-10 rounded-2xl w-[420px] shadow-xl">

        <h2 className="text-2xl font-semibold mb-2">
          Welcome to AegisAI
        </h2>

        <p className="text-slate-400 mb-6">
          Securely sign in to your AegisAI account.
        </p>

        <button
          onClick={() => {
            loginWithGoogle();
            onNext();
          }}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold mb-4"
        >
          Continue with Google
        </button>


        <div className="text-center text-slate-500 text-sm mb-4">
          OR
        </div>

        <button className="w-full bg-slate-800 py-3 rounded-lg">
          Continue with Email
        </button>

        <div className="text-center mt-6 text-blue-400 text-sm">
          Create a new secure account
        </div>

        <div className="mt-6 bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-sm text-green-300">
          Your login is protected by advanced biometric verification
          and hardware‑level security protocols.
        </div>

      </div>
    </div>
  );
}

function OnboardingPage({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0b1220] text-white flex items-center justify-center">

      <div className="w-[720px] bg-[#0b1220] border border-slate-800 rounded-2xl p-10 text-center">

        <h1 className="text-3xl font-semibold mb-3">
          Grant Email Access
        </h1>

        <p className="text-slate-400 mb-10">
          AegisAI needs your permission to scan incoming threats and
          keep your inbox safe from sophisticated cyber attacks.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-10">

          {/* Card 1 */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 text-left">
            <div className="mb-4 text-blue-400 text-2xl">📧</div>

            <h3 className="text-lg font-semibold mb-2">
              Real‑time Scanning
            </h3>

            <p className="text-slate-400 text-sm mb-4">
              AI‑driven analysis of every incoming email to detect phishing
              and malicious links instantly.
            </p>

            <div className="text-blue-400 text-xs">
              ACTIVE PROTECTION
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0f172a] border border-blue-500/40 rounded-xl p-6 text-left">
            <div className="mb-4 text-blue-400 text-2xl">🔒</div>

            <h3 className="text-lg font-semibold mb-2">
              Private & Secure
            </h3>

            <p className="text-slate-400 text-sm mb-4">
              Your data is fully encrypted. AegisAI never reads personal
              content; we only analyze security metadata.
            </p>

            <div className="text-green-400 text-xs">
              END‑TO‑END ENCRYPTED
            </div>
          </div>

        </div>

        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-500 px-10 py-3 rounded-lg font-semibold"
        >
          Allow Access →
        </button>

        <div className="text-slate-500 text-sm mt-6">
          Why do we need this?
        </div>

      </div>

    </div>
  );
}

function Dashboard() 
 {
  const [page, setPage] = useState<"home" | "threats" | "analysis" | "bin" | "settings">("home");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );

  const [emails, setEmails] = useState<EmailResult[]>([]);
  const [emailsInBin, setEmailsInBin] = useState<BinEmail[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailResult | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem(PHONE_STORAGE_KEY) ?? "" : ""
  );
  React.useEffect(() => {
    quickScan();
  }, []);

  const [stats, setStats] = useState({
    scanned: 0,
    threats: 0,
    safe: 0
  });

  async function quickScan() {
    try {
      setLoading(true);

      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        alert("Login expired. Please login again.");
        setLoading(false);
        return;
      }

      const tokenData = JSON.parse(decodeURIComponent(token));
      const body = { ...tokenData, phone_number: phoneNumber?.trim() || null };

      const res = await fetch(`${API}/fetch-emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (data.user_email) {
        setUserEmail(data.user_email);
    }

      const list: EmailResult[] = data?.emails ?? [];
      const movedToTrash = list.filter((e) => e.deleted === true);
      if (movedToTrash.length > 0) {
        const now = new Date().toISOString();
        setEmailsInBin((prev) => [
          ...prev,
          ...movedToTrash.map((e) => ({ text: e.text, risk: e.risk, movedAt: now }))
        ]);
      }

      // #region agent log
      fetch('http://127.0.0.1:7356/ingest/af3d5be1-349c-4b6a-8173-2134bba54164',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'141c1b'},body:JSON.stringify({sessionId:'141c1b',location:'App.tsx:quickScan',message:'emails from API',data:{count:list.length,sampleRisks:list.slice(0,5).map(e=>e?.risk),threatCountStrict:list.filter(e=>e.risk==='high'||e.risk==='medium').length},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      setEmails(list);

      const threats = list.filter(
        (e) => (e.risk ?? "").toLowerCase() === "high" || (e.risk ?? "").toLowerCase() === "medium"
      ).length;

      setStats({
        scanned: list.length,
        threats,
        safe: list.length - threats
      });
    } catch (err) {
      console.error(err);
      alert("Backend not reachable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0b1220] to-[#020617] text-white">
      <aside className="w-64 bg-[#0b1220] border-r border-slate-800 p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold mb-10 flex items-center gap-2">
            🛡 AEGISAI
          </h2>

          <div className="text-xs text-slate-500 mb-4">MAIN MENU</div>

          <nav className="space-y-3 text-slate-300">

            <div
              onClick={() => setPage("home")}
              className={`px-3 py-2 rounded-lg cursor-pointer ${
                page === "home" ? "bg-blue-600/20 text-blue-400" : "hover:text-white"
              }`}
            >
              Home
            </div>

            <div
              onClick={() => setPage("threats")}
              className={`px-3 py-2 rounded-lg cursor-pointer ${
                page === "threats" ? "bg-blue-600/20 text-blue-400" : "hover:text-white"
              }`}
            >
              Threats
            </div>

            <div
              onClick={() => setPage("analysis")}
              className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 ${
                page === "analysis" ? "bg-blue-600/20 text-blue-400" : "hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analysis
            </div>

            <div className="pt-6 text-xs text-slate-500">AEGISAI GUARD</div>

            <div
              onClick={() => setPage("bin")}
              className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 ${
                page === "bin" ? "bg-blue-600/20 text-blue-400" : "hover:text-white"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Emails in Bin
            </div>

            <div
              onClick={() => setPage("settings")}
              className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 ${
                page === "settings" ? "bg-blue-600/20 text-blue-400" : "hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </div>

          </nav>
        </div>

        <div className="bg-slate-900 p-3 rounded-lg mt-6">
          <div className="text-sm font-semibold">
            {userEmail || "Loading..."}
          </div>
          <div className="text-xs text-slate-400">
            Connected Gmail
          </div>
        </div>

      </aside>

      <main className="flex-1 p-8 overflow-auto">

        {page === "home" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Security Dashboard</h1>

                <div className="flex gap-4">
                  <input
                    placeholder="Search threats, IPs, or logs..."
                    className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg"
                  />

                  <button
                    onClick={quickScan}
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    {loading ? "Scanning..." : "Quick Scan"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <Card title="Emails Scanned" value={stats.scanned} />
                <Card title="Threats Detected" value={stats.threats} />
                <Card title="Safe Emails" value={stats.safe} />
              </div>

              <div className="bg-slate-900 rounded-xl border border-slate-800">
                <div className="p-6 border-b border-slate-800 font-bold">
                  Recent Incidents
                </div>

                <div className="divide-y divide-slate-800">
                  {emails.map((email, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2 p-4 border-b border-slate-800 items-center">
                      <div className="text-slate-400 text-sm">
                        {new Date().toLocaleTimeString()}
                      </div>

                      <div className="flex items-center gap-2 min-w-0">
                        <span className="truncate">{email.text.slice(0, 40)}</span>
                        {email.is_from_spam && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">
                            Spam
                          </span>
                        )}
                      </div>

                      <div className="text-slate-400">
                        Phishing
                      </div>

                      <div
                        className={
                          (email.risk ?? "").toLowerCase() === "high"
                            ? "text-red-400"
                            : (email.risk ?? "").toLowerCase() === "medium"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }
                      >
                        {(email.risk ?? "low").toUpperCase()}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedEmail(email)}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer text-left"
                      >
                        Investigate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {page === "threats" && (
            <Threats
              emails={emails ?? []}
              emailsInBin={emailsInBin}
              onInvestigate={setSelectedEmail}
            />
          )}

          {page === "analysis" && (
            <AnalysisView />
          )}

          {page === "bin" && (
            <EmailsInBinView emailsInBin={emailsInBin} />
          )}

          {page === "settings" && (
            <SettingsView
              phoneNumber={phoneNumber}
              onPhoneNumberChange={setPhoneNumber}
            />
          )}

          {selectedEmail && (
            <EmailDetailModal
              email={selectedEmail}
              onClose={() => setSelectedEmail(null)}
            />
          )}

        </main>

</div>
);
}


const PHONE_STORAGE_KEY = "aegisai_phone";

function EmailDetailModal({
  email,
  onClose
}: {
  email: EmailResult;
  onClose: () => void;
}) {
  const riskLabel = (email.risk ?? "low").toUpperCase();
  const riskPercent =
    typeof email.risk_percent === "number"
      ? `${email.risk_percent}%`
      : email.risk_score != null
      ? `${Math.round(email.risk_score * 100)}%`
      : "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-3xl w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">Email investigation</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-400">From</div>
              <div className="text-white break-words">
                {email.from || "Unknown sender"}
              </div>
            </div>
            <div>
              <div className="text-slate-400">Risk</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={
                    email.risk?.toLowerCase() === "high"
                      ? "text-red-400 font-semibold"
                      : email.risk?.toLowerCase() === "medium"
                      ? "text-yellow-400 font-semibold"
                      : "text-green-400 font-semibold"
                  }
                >
                  {riskLabel}
                </span>
                <span className="text-slate-400 text-xs">({riskPercent} risk)</span>
                {email.is_from_spam && (
                  <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    From spam folder
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-sm mb-1">Subject</div>
            <div className="text-white text-sm">
              {email.subject || email.text.slice(0, 120) || "No subject"}
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-sm mb-1">Preview</div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 max-h-60 overflow-y-auto whitespace-pre-wrap">
              {email.text || "No content available for this email snippet."}
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsView({
  phoneNumber,
  onPhoneNumberChange
}: {
  phoneNumber: string;
  onPhoneNumberChange: (value: string) => void;
}) {
  const [localPhone, setLocalPhone] = useState(phoneNumber);
  const [saved, setSaved] = useState(false);
  React.useEffect(() => {
    setLocalPhone(phoneNumber);
  }, [phoneNumber]);

  const handleSave = () => {
    const value = localPhone.trim();
    onPhoneNumberChange(value);
    if (typeof window !== "undefined") {
      if (value) localStorage.setItem(PHONE_STORAGE_KEY, value);
      else localStorage.removeItem(PHONE_STORAGE_KEY);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Phone number for SMS alerts
        </label>
        <p className="text-slate-400 text-sm mb-4">
          When a high-risk email is moved to Trash, we’ll send you an SMS to this number (e.g. +1 234 567 8900).
        </p>
        <input
          type="tel"
          value={localPhone}
          onChange={(e) => setLocalPhone(e.target.value)}
          placeholder="+1 234 567 8900"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

function EmailsInBinView({ emailsInBin }: { emailsInBin: BinEmail[] }) {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Emails in Bin</h1>
      {emailsInBin.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
          <p className="text-slate-300 text-lg">
            No emails moved to Trash yet. High-risk emails from Quick Scan are moved automatically.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 font-semibold text-slate-300 grid grid-cols-3 gap-4">
            <span>Moved at</span>
            <span>Subject / Preview</span>
            <span>Risk</span>
          </div>
          <div className="divide-y divide-slate-800">
            {emailsInBin.map((item, i) => (
              <div key={i} className="p-4 grid grid-cols-3 gap-4 items-center">
                <span className="text-slate-400 text-sm">
                  {new Date(item.movedAt).toLocaleString()}
                </span>
                <span className="text-white truncate">{item.text.slice(0, 60)}</span>
                <span className="text-red-400 font-medium">{item.risk.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisView() {
  const [text, setText] = useState("");

  async function handleAnalyze() {
    if (!text.trim()) return;
    // TODO: call analysis API
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">Analyze content</h1>
      <p className="text-slate-400 mb-6">
        Paste email or text to check for phishing. Uses AI + URL risk scoring.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste email body or suspicious text here..."
        className="w-full min-h-[200px] bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y"
      />
      <button
        onClick={handleAnalyze}
        className="mt-4 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold"
      >
        Analyze
      </button>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-[#0b1220] border border-slate-800 p-6 rounded-xl">
      <div className="text-slate-400 text-sm">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}