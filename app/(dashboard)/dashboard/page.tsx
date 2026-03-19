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
        const errorData = await res.json();
        throw new Error(errorData.message || `Delete failed (${res.status})`);
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

      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/[0.04] blur-[100px] rounded-full pointer-events-none dark:opacity-100 opacity-0" />

      {/* Page Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            My <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">Resumes</span>
          </h1>
          <p className="text-gray-500 dark:text-slate-500 text-sm mt-1.5">
            Manage and organize all your resumes in one place.
          </p>
        </div>
        <button
          onClick={() => router.push("/builder")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-900/25 hover:scale-[1.02]"
        >
          <span className="text-lg leading-none">+</span>
          Create Resume
        </button>
      </div>

      {/* Stats Bar */}
      {!loading && resumes.length > 0 && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Resumes", value: resumes.length, icon: "📄" },
            { label: "Latest Update", value: new Date(resumes[0].createdAt).toLocaleDateString(), icon: "🕐" },
            { label: "Templates Used", value: "3 Available", icon: "🎨" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl shadow-sm dark:shadow-none transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-violet-100 dark:bg-violet-500/[0.08] rounded-lg text-lg flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">{stat.value}</div>
                <div className="text-gray-500 dark:text-slate-500 text-xs font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 dark:text-slate-500 text-sm font-medium">Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-violet-600/10 blur-[40px] rounded-full" />
              <div className="relative w-24 h-24 flex items-center justify-center bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-3xl text-5xl">
                📄
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">No resumes yet</h3>
            <p className="text-gray-500 dark:text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
              Create your first professional resume and it will appear here.
            </p>
            <button
              onClick={() => router.push("/builder")}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-xl shadow-violet-900/30 hover:scale-[1.03]"
            >
              <span className="text-lg leading-none">+</span>
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="group relative bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-5 md:p-6 transition-all duration-500 hover:shadow-xl hover:shadow-violet-900/10 overflow-hidden shadow-sm dark:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <h2 className="text-base md:text-lg font-bold group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors duration-300 tracking-tight truncate">
                        {resume.name}
                      </h2>
                      <p className="text-gray-500 dark:text-slate-500 text-xs font-medium mt-0.5 truncate">{resume.email}</p>
                    </div>
                  </div>

                  <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                    {resume.summary || "No summary added."}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-600 mb-4">
                    <span>🕐</span>
                    <span>Created {new Date(resume.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/resume/${resume._id}`)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-indigo-50 dark:bg-violet-600/10 hover:bg-indigo-100 dark:hover:bg-violet-600/20 border border-indigo-200 dark:border-violet-500/20 text-indigo-600 dark:text-violet-400 rounded-lg text-xs font-semibold transition-all duration-300"
                    >
                      👁 View
                    </button>
                    <button
                      onClick={() => router.push(`/builder?id=${resume._id}`)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-amber-50 dark:bg-amber-600/10 hover:bg-amber-100 dark:hover:bg-amber-600/20 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-semibold transition-all duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteResume(resume._id)}
                      disabled={deletingId === resume._id}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-rose-50 dark:bg-rose-600/10 hover:bg-rose-100 dark:hover:bg-rose-600/20 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      🗑 {deletingId === resume._id ? "..." : "Delete"}
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