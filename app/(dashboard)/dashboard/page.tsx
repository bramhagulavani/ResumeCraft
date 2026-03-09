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
    } catch (error) {
      console.error("Error fetching resumes", error);
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
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch { }
        throw new Error(errorMessage);
      }

      await res.json();
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (error: any) {
      console.error("Delete error:", error.message || error);
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
        <p className="text-slate-400">No resumes created yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
            >
              <h2 className="text-xl font-semibold mb-2">{resume.name}</h2>
              <p className="text-slate-400 text-sm mb-4">{resume.email}</p>
              <p className="text-slate-300 text-sm line-clamp-3">{resume.summary}</p>
              <div className="mt-4 text-xs text-slate-500">
                Created: {new Date(resume.createdAt).toLocaleDateString()}
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => router.push(`/resume/${resume._id}`)}
                  className="px-3 py-1 bg-indigo-600 rounded-lg text-sm hover:bg-indigo-500"
                >
                  View
                </button>
                <button
                  onClick={() => deleteResume(resume._id)}
                  disabled={deletingId === resume._id}
                  className="px-3 py-1 bg-rose-600 rounded-lg text-sm hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === resume._id ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => router.push(`/builder?id=${resume._id}`)}
                  className="px-3 py-1 bg-yellow-600 rounded-lg text-sm hover:bg-yellow-500"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}