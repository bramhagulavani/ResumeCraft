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
    } catch (error: any) {
      alert(`Delete failed: ${error.message || "Unknown error"}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Resumes</h1>

      {loading ? (
        <p className="text-slate-400">Loading resumes...</p>
      ) : resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-slate-400 text-lg font-medium">No resumes created yet.</p>
          <p className="text-slate-500 text-sm mt-1 mb-6">
            Create your first resume and it will appear here.
          </p>
          <button
            onClick={() => router.push("/builder")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition"
          >
            + Create Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition"
            >
              <h2 className="text-xl font-semibold mb-1">{resume.name}</h2>
              <p className="text-slate-400 text-sm mb-3">{resume.email}</p>
              <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                {resume.summary || "No summary added."}
              </p>
              <div className="mt-4 text-xs text-slate-500">
                Created: {new Date(resume.createdAt).toLocaleDateString()}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => router.push(`/resume/${resume._id}`)}
                  className="px-3 py-1.5 bg-indigo-600 rounded-lg text-sm hover:bg-indigo-500 transition"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/builder?id=${resume._id}`)}
                  className="px-3 py-1.5 bg-yellow-600 rounded-lg text-sm hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteResume(resume._id)}
                  disabled={deletingId === resume._id}
                  className="px-3 py-1.5 bg-rose-600 rounded-lg text-sm hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {deletingId === resume._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}