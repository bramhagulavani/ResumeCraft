"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Resume {
  _id: string;
  name: string;
  email: string;
  summary: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);
      
  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resume");
      const data = await res.json();
      // ✅ Always ensure we set an array
      setResumes(Array.isArray(data) ? data : []);
    } catch {
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this resume?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/resume/${id}`, { method: "DELETE" });

      if (!res.ok) {
        let errorMessage = `Delete failed (${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch { }
        throw new Error(errorMessage);
      }

      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (error: unknown) {
      alert(`Delete failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative">

      {/* ═══ Ambient Glow ═══ */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/[0.04] blur-[100px] rounded-full pointer-events-none" />

      {/* ═══ Page Header ═══ */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            My <span className="gradient-text">Resumes</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">Manage and organize all your resumes in one place.</p>
        </div>
        <button
          onClick={() => router.push("/builder")}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-900/25 hover:shadow-violet-800/40 hover:scale-[1.02]"
        >
          <span className="text-lg leading-none">+</span>
          Create Resume
        </button>
      </div>

      {/* ═══ Stats Bar ═══ */}
      {!loading && resumes.length > 0 && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Resumes", value: resumes.length, icon: "📄" },
            { label: "Latest Update", value: resumes.length > 0 ? new Date(resumes[0].createdAt).toLocaleDateString() : "—", icon: "🕐" },
            { label: "Templates Used", value: "3 Available", icon: "🎨" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 bg-white/[0.02] border border-white/[0.06] rounded-xl backdrop-blur-sm"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-violet-500/[0.08] rounded-lg text-lg">
                {stat.icon}
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">{stat.value}</div>
                <div className="text-slate-500 text-xs font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ Content ═══ */}
      <div className="relative z-10">
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 text-sm font-medium">Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-violet-600/10 blur-[40px] rounded-full" />
              <div className="relative w-24 h-24 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded-3xl text-5xl">
                📄
              </div>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">No resumes yet</h3>
            <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
              Create your first professional resume and it will appear here. Get started in minutes with our AI-powered builder.
            </p>
            <button
              onClick={() => router.push("/builder")}
              className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-xl shadow-violet-900/30 hover:shadow-violet-800/50 hover:scale-[1.03]"
            >
              <span className="text-lg leading-none">+</span>
              Create Your First Resume
            </button>
          </div>
        ) : (
          /* Resume Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="group relative bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/10 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10">
                  {/* Name & Email */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors duration-300 tracking-tight">
                        {resume.name}
                      </h2>
                      <p className="text-slate-500 text-xs font-medium mt-0.5">{resume.email}</p>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center bg-violet-500/[0.08] rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                      📄
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                    {resume.summary || "No summary added."}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-5">
                    <span>🕐</span>
                    <span>Created {new Date(resume.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/resume/${resume._id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/20 hover:border-violet-500/40 text-violet-400 hover:text-violet-300 rounded-lg text-xs font-semibold transition-all duration-300"
                    >
                      <span>👁</span> View
                    </button>
                    <button
                      onClick={() => router.push(`/builder?id=${resume._id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/20 hover:border-amber-500/40 text-amber-400 hover:text-amber-300 rounded-lg text-xs font-semibold transition-all duration-300"
                    >
                      <span>✏️</span> Edit
                    </button>
                    <button
                      onClick={() => deleteResume(resume._id)}
                      disabled={deletingId === resume._id}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/20 hover:border-rose-500/40 text-rose-400 hover:text-rose-300 rounded-lg text-xs font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-rose-600/10 disabled:hover:text-rose-400"
                    >
                      <span>🗑</span> {deletingId === resume._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}