"use client";

import { useState } from "react";

interface ATSResult {
  score: number;
  verdict: "Excellent" | "Good" | "Average" | "Poor";
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

const VERDICT_CONFIG = {
  Excellent: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", ring: "stroke-emerald-400" },
  Good:      { color: "text-indigo-400",  bg: "bg-indigo-500/10 border-indigo-500/30",   ring: "stroke-indigo-400"  },
  Average:   { color: "text-amber-400",   bg: "bg-amber-500/10 border-amber-500/30",     ring: "stroke-amber-400"   },
  Poor:      { color: "text-rose-400",    bg: "bg-rose-500/10 border-rose-500/30",       ring: "stroke-rose-400"    },
};

function ScoreCircle({ score, verdict }: { score: number; verdict: keyof typeof VERDICT_CONFIG }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const config = VERDICT_CONFIG[verdict];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-200 dark:text-white/10" />
          <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={`${config.ring} transition-all duration-1000`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-extrabold ${config.color}`}>{score}</span>
          <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">/ 100</span>
        </div>
      </div>
      <span className={`text-sm font-bold px-4 py-1.5 rounded-full border ${config.bg} ${config.color}`}>
        {verdict}
      </span>
    </div>
  );
}

export default function ATSCheckerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "ATS check failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResumeText("");
    setJobDescription("");
    setResult(null);
    setError("");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          🎯 ATS Checker
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
          Paste your resume and a job description. Our AI will score your resume and suggest improvements.
        </p>
      </div>

      {/* Input Section — stacked on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 dark:text-slate-500 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full" />
            Your Resume
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            rows={12}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300 resize-none leading-relaxed"
          />
          <p className="text-xs text-gray-400 dark:text-slate-600">
            {resumeText.trim().split(/\s+/).filter(Boolean).length} words
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 dark:text-slate-500 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={12}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300 resize-none leading-relaxed"
          />
          <p className="text-xs text-gray-400 dark:text-slate-600">
            {jobDescription.trim().split(/\s+/).filter(Boolean).length} words
          </p>
        </div>
      </div>

      {error && (
        <p className="text-rose-500 dark:text-rose-400 text-sm mb-4 font-medium">{error}</p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleCheck}
          disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          className="flex-1 sm:flex-none px-6 md:px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-violet-800 disabled:to-indigo-800 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-900/20 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Analyzing...
            </>
          ) : "🎯 Check ATS Score"}
        </button>
        {(result || resumeText || jobDescription) && (
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.06] rounded-xl text-sm font-medium transition-all duration-300 text-gray-700 dark:text-slate-300"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5">

          {/* Score + Keywords — stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">

            {/* Score Circle */}
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6 flex items-center justify-center">
              <ScoreCircle score={result.score} verdict={result.verdict} />
            </div>

            {/* Matched Keywords */}
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-emerald-500 mb-3">✅ Matched</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.matchedKeywords.length > 0 ? result.matchedKeywords.map((kw, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full font-medium">
                    {kw}
                  </span>
                )) : <p className="text-xs text-gray-400">None found</p>}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-rose-500 mb-3">❌ Missing</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.missingKeywords.length > 0 ? result.missingKeywords.map((kw, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-full font-medium">
                    {kw}
                  </span>
                )) : <p className="text-xs text-gray-400">None missing 🎉</p>}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5 flex sm:flex-col justify-around sm:justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-emerald-400">{result.matchedKeywords.length}</div>
                <div className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Matched</div>
              </div>
              <div className="w-px sm:w-full sm:h-px bg-gray-100 dark:bg-white/[0.06]" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-rose-400">{result.missingKeywords.length}</div>
                <div className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Missing</div>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5 md:p-6">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-violet-500 mb-4">
              💡 AI Suggestions to Improve Your Score
            </h3>
            <div className="space-y-3">
              {result.suggestions.map((suggestion, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-violet-500/[0.04] border border-violet-500/10 rounded-xl">
                  <span className="text-violet-400 font-bold text-sm flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
          <div className="text-5xl md:text-6xl mb-4">🎯</div>
          <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">
            Paste your resume and a job description above to get your ATS score
          </p>
          <p className="text-gray-400 dark:text-slate-600 text-xs mt-1">
            AI will analyze keyword matches, gaps, and give improvement suggestions
          </p>
        </div>
      )}
    </div>
  );
}