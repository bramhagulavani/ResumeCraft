import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import mongoose from "mongoose";
import ResumeDownloadButton from "./ResumeDownloadButton";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const TEMPLATES = {
  classic: {
    wrapper: { background: "#ffffff", color: "#0f172a", fontFamily: "'Georgia', 'Times New Roman', serif", padding: "40px" },
    name: { fontSize: "28px", fontWeight: "bold", color: "#0f172a", letterSpacing: "-0.025em" },
    email: { color: "#64748b", fontSize: "14px", marginTop: "6px", fontFamily: "system-ui, sans-serif" },
    divider: { borderBottom: "2px solid #1e293b", paddingBottom: "20px", marginBottom: "24px" },
    sectionTitle: { fontSize: "9px", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: "10px", fontFamily: "system-ui, sans-serif" },
    bodyText: { color: "#374151", fontSize: "14px", lineHeight: 1.6 },
    roleText: { fontWeight: "bold", color: "#0f172a", fontSize: "14px" },
    companyText: { color: "#475569", fontSize: "14px" },
    descText: { color: "#475569", fontSize: "13px", marginTop: "4px", lineHeight: 1.6 },
    skillTag: { padding: "2px 10px", background: "#f1f5f9", color: "#334155", borderRadius: "4px", fontSize: "12px", border: "1px solid #e2e8f0", fontFamily: "system-ui, sans-serif" },
    techText: { color: "#7c3aed", fontSize: "12px", fontWeight: 500, fontFamily: "system-ui, sans-serif" },
    dot: { color: "#94a3b8", fontSize: "14px" },
    yearText: { color: "#94a3b8" },
  },
  modern: {
    wrapper: { background: "#0f172a", color: "#f1f5f9", fontFamily: "system-ui, sans-serif", padding: "40px" },
    name: { fontSize: "28px", fontWeight: "bold", color: "#f1f5f9", letterSpacing: "-0.025em" },
    email: { color: "#94a3b8", fontSize: "14px", marginTop: "6px", fontFamily: "system-ui, sans-serif" },
    divider: { borderBottom: "2px solid #334155", paddingBottom: "20px", marginBottom: "24px" },
    sectionTitle: { fontSize: "9px", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#6366f1", marginBottom: "10px", fontFamily: "system-ui, sans-serif" },
    bodyText: { color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6 },
    roleText: { fontWeight: "bold", color: "#f1f5f9", fontSize: "14px" },
    companyText: { color: "#94a3b8", fontSize: "14px" },
    descText: { color: "#94a3b8", fontSize: "13px", marginTop: "4px", lineHeight: 1.6 },
    skillTag: { padding: "2px 10px", background: "#1e293b", color: "#818cf8", borderRadius: "4px", fontSize: "12px", border: "1px solid #334155", fontFamily: "system-ui, sans-serif" },
    techText: { color: "#818cf8", fontSize: "12px", fontWeight: 500, fontFamily: "system-ui, sans-serif" },
    dot: { color: "#475569", fontSize: "14px" },
    yearText: { color: "#64748b" },
  },
  minimal: {
    wrapper: { background: "#ffffff", color: "#374151", fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "40px" },
    name: { fontSize: "26px", fontWeight: "300", color: "#111827", letterSpacing: "0.05em" },
    email: { color: "#9ca3af", fontSize: "13px", marginTop: "6px", fontFamily: "system-ui, sans-serif" },
    divider: { borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "24px" },
    sectionTitle: { fontSize: "10px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#d1d5db", marginBottom: "10px", fontFamily: "system-ui, sans-serif" },
    bodyText: { color: "#6b7280", fontSize: "13px", lineHeight: 1.7 },
    roleText: { fontWeight: "600", color: "#111827", fontSize: "13px" },
    companyText: { color: "#9ca3af", fontSize: "13px" },
    descText: { color: "#6b7280", fontSize: "12px", marginTop: "4px", lineHeight: 1.7 },
    skillTag: { padding: "2px 10px", background: "#f9fafb", color: "#6b7280", borderRadius: "2px", fontSize: "11px", border: "1px solid #e5e7eb", fontFamily: "system-ui, sans-serif" },
    techText: { color: "#9ca3af", fontSize: "11px", fontWeight: 400, fontFamily: "system-ui, sans-serif" },
    dot: { color: "#d1d5db", fontSize: "13px" },
    yearText: { color: "#d1d5db" },
  },
};

type TemplateKey = keyof typeof TEMPLATES;

export default async function ResumeView({ params }: Props) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <div className="p-10">Invalid Resume ID</div>;
  }

  await connectToDatabase();

  const resume = await Resume.findById(id).lean() as any;

  if (!resume) {
    return <div className="p-10">Resume not found</div>;
  }

  const resumeId = resume._id.toString(); // ✅ convert ObjectId to string for use in href
  const templateKey: TemplateKey = (resume.template in TEMPLATES ? resume.template : "classic") as TemplateKey;
  const t = TEMPLATES[templateKey];

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "#e2e8f0" }}>

      {/* ── Action bar — OUTSIDE the PDF capture area ── */}
      <div className="max-w-3xl mx-auto mb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm capitalize">
            Template: <strong>{templateKey}</strong>
          </span>
          {/* ✅ Edit button is here — outside id="resume-preview" so it won't appear in PDF */}
          <Link
            href={`/builder?id=${resumeId}`}
            className="px-4 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-sm font-semibold transition-all"
          >
            ✏️ Edit Resume
          </Link>
        </div>
        <ResumeDownloadButton name={resume.name} />
      </div>

      {/* ✅ id="resume-preview" — only resume content here, no buttons */}
      <div id="resume-preview" style={t.wrapper} className="max-w-3xl mx-auto rounded-lg shadow-lg">

        {/* Header */}
        <div style={t.divider}>
          <h1 style={t.name}>{resume.name}</h1>
          <p style={t.email}>{resume.email}</p>
        </div>

        {/* Summary */}
        {resume.summary && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={t.sectionTitle}>Summary</h2>
            <p style={t.bodyText}>{resume.summary}</p>
          </div>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={t.sectionTitle}>Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {resume.skills.map((skill: string, i: number) => (
                <span key={i} style={t.skillTag}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={t.sectionTitle}>Experience</h2>
            {resume.experience.map((exp: any, i: number) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={t.roleText}>{exp.role}</span>
                  {exp.company && <span style={t.dot}>·</span>}
                  {exp.company && <span style={t.companyText}>{exp.company}</span>}
                </div>
                {exp.description && (
                  <p style={{ ...t.descText, whiteSpace: "pre-line" }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={t.sectionTitle}>Education</h2>
            {resume.education.map((edu: any, i: number) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={t.roleText}>{edu.degree}</div>
                <div style={{ ...t.companyText, fontFamily: "system-ui, sans-serif" }}>
                  {edu.college}
                  {edu.year && <span style={t.yearText}> · {edu.year}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={t.sectionTitle}>Projects</h2>
            {resume.projects.map((proj: any, i: number) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                  <span style={t.roleText}>{proj.title}</span>
                  {proj.tech && <span style={t.techText}>{proj.tech}</span>}
                </div>
                {proj.description && (
                  <p style={{ ...t.descText, whiteSpace: "pre-line" }}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}