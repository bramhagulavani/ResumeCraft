"use client";

import { useState } from "react";

type Tone = "professional" | "formal" | "creative";

const TONE_OPTIONS: { key: Tone; label: string; desc: string; icon: string }[] = [
  { key: "professional", label: "Professional", desc: "Balanced and confident", icon: "💼" },
  { key: "formal", label: "Formal", desc: "Corporate and traditional", icon: "🏛️" },
  { key: "creative", label: "Creative", desc: "Enthusiastic and personable", icon: "🎨" },
];

export default function CoverLetterPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please fill in both your resume and the job description.");
      return;
    }
    setLoading(true);
    setError("");
    setCoverLetter("");

    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription, tone }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Generation failed");
      }

      const data = await res.json();
      setCoverLetter(data.coverLetter);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([coverLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setResumeText("");
    setJobDescription("");
    setCoverLetter("");
    setError("");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          ✉️ Cover Letter Generator
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
          Paste your resume and a job description. AI will generate a tailored, professional cover letter in seconds.
        </p>
      </div>

      {/* Tone Selector */}
      <div className="mb-6">
        <label className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 dark:text-slate-500 mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full" />
          Writing Tone
        </label>
        <div className="flex flex-wrap gap-3">
          {TONE_OPTIONS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTone(t.key)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                tone === t.key
                  ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/10 border-violet-500/30 text-violet-700 dark:text-violet-300 shadow-sm"
                  : "bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-slate-400 hover:border-violet-500/20 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span>{t.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-sm">{t.label}</div>
                <div className="text-[10px] opacity-70">{t.desc}</div>
              </div>
              {tone === t.key && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        {/* Resume */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 dark:text-slate-500 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full" />
            Your Resume
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here...&#10;&#10;Include your name, skills, experience, education, and projects."
            rows={12}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300 resize-none leading-relaxed"
          />
          <p className="text-xs text-gray-400 dark:text-slate-600">
            {resumeText.trim().split(/\s+/).filter(Boolean).length} words
          </p>
        </div>

        {/* Job Description */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 dark:text-slate-500 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here...&#10;&#10;Include role, responsibilities, and required skills."
            rows={12}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300 resize-none leading-relaxed"
          />
          <p className="text-xs text-gray-400 dark:text-slate-600">
            {jobDescription.trim().split(/\s+/).filter(Boolean).length} words
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-rose-500 dark:text-rose-400 text-sm mb-4 font-medium">{error}</p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleGenerate}
          disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          className="flex-1 sm:flex-none px-6 md:px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-violet-800 disabled:to-indigo-800 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-900/20 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Generating...
            </>
          ) : "✉️ Generate Cover Letter"}
        </button>
        {(coverLetter || resumeText || jobDescription) && (
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.06] rounded-xl text-sm font-medium transition-all duration-300 text-gray-700 dark:text-slate-300"
          >
            Clear
          </button>
        )}
      </div>

      {/* Result */}
      {coverLetter && (
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden">

          {/* Result Header */}
          <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-gray-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="text-base">✉️</span>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Your Cover Letter</h3>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                tone === "professional" ? "bg-violet-500/10 text-violet-500 border-violet-500/20" :
                tone === "formal" ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" :
                "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              }`}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.06] rounded-lg text-xs font-medium transition-all duration-300 text-gray-600 dark:text-slate-300"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-xs font-medium transition-all duration-300 text-white"
              >
                ⬇ Download
              </button>
            </div>
          </div>

          {/* Cover Letter Text */}
          <div className="p-5 md:p-8">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                {coverLetter}
              </pre>
            </div>
          </div>

          {/* Footer tip */}
          <div className="px-5 md:px-6 py-4 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.01]">
            <p className="text-xs text-gray-400 dark:text-slate-600 flex items-center gap-2">
              <span>💡</span>
              Tip: Personalize the cover letter by adding the hiring manager&apos;s name and specific company details before sending.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!coverLetter && !loading && (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
          <div className="text-5xl md:text-6xl mb-4">✉️</div>
          <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">
            Your AI-generated cover letter will appear here
          </p>
          <p className="text-gray-400 dark:text-slate-600 text-xs mt-1">
            Paste your resume and job description above, choose a tone, and click Generate
          </p>
        </div>
      )}
    </div>
  );
}