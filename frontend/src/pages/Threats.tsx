import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export interface ThreatEmail {
  text: string;
  from?: string;
  subject?: string;
  prediction?: string;
  risk: string;
  risk_score?: number | null;
  risk_percent?: number | null;
  deleted?: boolean;
  is_from_spam?: boolean;
}

export interface BinEmailItem {
  text: string;
  risk: string;
  movedAt: string;
}

interface ThreatsProps {
  emails?: ThreatEmail[];
  emailsInBin?: BinEmailItem[];
  onInvestigate?: (email: ThreatEmail) => void;
}

export default function Threats({
  emails = [],
  emailsInBin = [],
  onInvestigate,
}: ThreatsProps) {
  const highThreats = emails.filter((e) => (e.risk ?? "").toLowerCase() === "high");
  const mediumThreats = emails.filter((e) => (e.risk ?? "").toLowerCase() === "medium");
  const lowThreats = emails.filter((e) => (e.risk ?? "").toLowerCase() === "low");
  // Include both high and medium; sort so high-risk appear first in the list
  const threatEmails = [...emails]
    .filter(
      (e) =>
        (e.risk ?? "").toLowerCase() === "high" ||
        (e.risk ?? "").toLowerCase() === "medium"
    )
    .sort((a) => ((a.risk ?? "").toLowerCase() === "high" ? -1 : 1));

  const mediumCount = mediumThreats.length;
  const lowCount = lowThreats.length;

  const data = {
    labels: ["Medium", "Low"],
    datasets: [
      {
        label: "Threats",
        data: [mediumCount, lowCount],
        backgroundColor: ["#fbbf24", "#22c55e"],
      },
    ],
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Threats Overview</h1>

      <div className="w-full max-w-md h-56 mb-2">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1 } },
            },
          }}
        />
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Medium: <span className="text-yellow-400 font-medium">{mediumCount}</span>
        {" · "}
        Low: <span className="text-green-400 font-medium">{lowCount}</span>
      </p>

      <h2 className="text-lg font-semibold mb-4">Threat Emails</h2>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 font-semibold text-slate-300 grid grid-cols-5 gap-2">
          <span>Time</span>
          <span>Subject / Preview</span>
          <span>Type</span>
          <span>Risk</span>
          <span>Action</span>
        </div>
        <div className="divide-y divide-slate-800">
          {threatEmails.length === 0 && emailsInBin.length === 0 ? (
            <div className="p-6 text-slate-400 text-center">
              No high or medium threat emails in this scan.
            </div>
          ) : (
            <>
              {highThreats.length > 0 && (
                <div className="px-4 py-2 bg-red-500/10 border-b border-slate-800 text-red-400 text-sm font-medium">
                  High risk ({highThreats.length})
                </div>
              )}
              {highThreats.map((email, i) => (
                <div
                  key={`high-${i}`}
                  className="grid grid-cols-5 gap-2 p-4 border-b border-slate-800 items-center"
                >
                  <div className="text-slate-400 text-sm">
                    {new Date().toLocaleTimeString()}
                  </div>
                  <div className="flex items-center gap-2 min-w-0 flex-wrap">
                    <span className="truncate">
                      {email.subject ?? email.text.slice(0, 40)}
                    </span>
                    {email.is_from_spam && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        Spam
                      </span>
                    )}
                    {email.deleted && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/40">
                        Moved to trash
                      </span>
                    )}
                  </div>
                  <div className="text-slate-400">Phishing</div>
                  <div className="text-red-400">
                    {(email.risk ?? "low").toUpperCase()}
                    {typeof email.risk_percent === "number" && (
                      <span className="text-slate-400 text-xs ml-1">
                        ({email.risk_percent}%)
                      </span>
                    )}
                  </div>
                  {onInvestigate ? (
                    <button
                      type="button"
                      onClick={() => onInvestigate(email)}
                      className="text-blue-400 hover:text-blue-300 cursor-pointer text-left"
                    >
                      Investigate
                    </button>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </div>
              ))}
              {emailsInBin.length > 0 && (
                <div className="px-4 py-2 bg-slate-500/20 border-b border-slate-800 text-slate-300 text-sm font-medium">
                  Emails in bin ({emailsInBin.length})
                </div>
              )}
              {emailsInBin.map((item, i) => (
                <div
                  key={`bin-${i}`}
                  className="grid grid-cols-5 gap-2 p-4 border-b border-slate-800 items-center"
                >
                  <div className="text-slate-400 text-sm">
                    {new Date(item.movedAt).toLocaleTimeString()}
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate">{item.text.slice(0, 40)}</span>
                    <span className="shrink-0 px-1.5 py-0.5 rounded text-xs font-medium bg-slate-500/20 text-slate-400 border border-slate-500/40">
                      In bin
                    </span>
                  </div>
                  <div className="text-slate-400">Phishing</div>
                  <div className="text-red-400">{item.risk.toUpperCase()}</div>
                  <span className="text-slate-500">—</span>
                </div>
              ))}
              {mediumThreats.length > 0 && (
                <div className="px-4 py-2 bg-yellow-500/10 border-b border-slate-800 text-yellow-400 text-sm font-medium">
                  Medium risk ({mediumThreats.length})
                </div>
              )}
              {mediumThreats.map((email, i) => (
                <div
                  key={`medium-${i}`}
                  className="grid grid-cols-5 gap-2 p-4 border-b border-slate-800 items-center"
                >
                  <div className="text-slate-400 text-sm">
                    {new Date().toLocaleTimeString()}
                  </div>

                  <div className="flex items-center gap-2 min-w-0 flex-wrap">
                    <span className="truncate">
                      {email.subject ?? email.text.slice(0, 40)}
                    </span>
                    {email.is_from_spam && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        Spam
                      </span>
                    )}
                    {email.deleted && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/40">
                        Moved to trash
                      </span>
                    )}
                  </div>

                  <div className="text-slate-400">Phishing</div>

                  <div className="text-yellow-400">
                    {(email.risk ?? "low").toUpperCase()}
                    {typeof email.risk_percent === "number" && (
                      <span className="text-slate-400 text-xs ml-1">
                        ({email.risk_percent}%)
                      </span>
                    )}
                  </div>

                  {onInvestigate ? (
                    <button
                      type="button"
                      onClick={() => onInvestigate(email)}
                      className="text-blue-400 hover:text-blue-300 cursor-pointer text-left"
                    >
                      Investigate
                    </button>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
