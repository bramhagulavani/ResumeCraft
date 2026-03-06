import { ResumeData } from "./types";

export default function ModernTemplate({ name, email, summary, skills, experience, education, projects }: ResumeData) {
  return (
    <div style={{ display: "flex", background: "#0f172a", color: "#f1f5f9", fontFamily: "system-ui, sans-serif", minHeight: "100%" }}>

      {/* ── LEFT SIDEBAR ── */}
      <div style={{ width: "200px", flexShrink: 0, background: "#1e293b", padding: "32px 20px", display: "flex", flexDirection: "column", gap: "28px" }}>

        {/* Name / Email */}
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "#f1f5f9", lineHeight: 1.3, margin: 0 }}>
            {name || "Your Name"}
          </h1>
          <p style={{ color: "#6366f1", fontSize: "11px", marginTop: "6px", wordBreak: "break-all" }}>{email}</p>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: "8px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366f1", marginBottom: "10px" }}>
              Skills
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ fontSize: "11px", color: "#cbd5e1", padding: "3px 8px", background: "#0f172a", borderRadius: "3px", border: "1px solid #334155" }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.some((e) => e.college || e.degree) && (
          <div>
            <h2 style={{ fontSize: "8px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366f1", marginBottom: "10px" }}>
              Education
            </h2>
            {education.filter((e) => e.college || e.degree).map((edu, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={{ fontWeight: "600", color: "#f1f5f9", fontSize: "11px" }}>{edu.degree}</div>
                <div style={{ color: "#94a3b8", fontSize: "10px", marginTop: "2px" }}>{edu.college}</div>
                {edu.year && <div style={{ color: "#6366f1", fontSize: "10px" }}>{edu.year}</div>}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, padding: "32px 28px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Summary */}
        {summary && (
          <div>
            <h2 style={{ fontSize: "8px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366f1", marginBottom: "8px", borderBottom: "1px solid #1e293b", paddingBottom: "6px" }}>
              Profile
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: 1.7 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.some((e) => e.role || e.company) && (
          <div>
            <h2 style={{ fontSize: "8px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366f1", marginBottom: "12px", borderBottom: "1px solid #1e293b", paddingBottom: "6px" }}>
              Experience
            </h2>
            {experience.filter((e) => e.role || e.company).map((exp, i) => (
              <div key={i} style={{ marginBottom: "16px", paddingLeft: "10px", borderLeft: "2px solid #6366f1" }}>
                <div style={{ fontWeight: "bold", color: "#f1f5f9", fontSize: "13px" }}>{exp.role}</div>
                {exp.company && <div style={{ color: "#6366f1", fontSize: "11px", marginTop: "2px" }}>{exp.company}</div>}
                {exp.description && <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "6px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.some((p) => p.title) && (
          <div>
            <h2 style={{ fontSize: "8px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366f1", marginBottom: "12px", borderBottom: "1px solid #1e293b", paddingBottom: "6px" }}>
              Projects
            </h2>
            {projects.filter((p) => p.title).map((proj, i) => (
              <div key={i} style={{ marginBottom: "16px", paddingLeft: "10px", borderLeft: "2px solid #334155" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: "bold", color: "#f1f5f9", fontSize: "13px" }}>{proj.title}</span>
                  {proj.tech && <span style={{ color: "#818cf8", fontSize: "10px" }}>{proj.tech}</span>}
                </div>
                {proj.description && <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "6px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}