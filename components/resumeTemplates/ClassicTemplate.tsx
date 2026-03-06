import { ResumeData } from "./types";

export default function ClassicTemplate({ name, email, summary, skills, experience, education, projects }: ResumeData) {
  return (
    <div style={{ background: "#ffffff", color: "#0f172a", fontFamily: "'Georgia', 'Times New Roman', serif", padding: "40px" }}>

      {/* Header */}
      <div style={{ borderBottom: "2px solid #0f172a", paddingBottom: "20px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#0f172a", letterSpacing: "-0.025em", margin: 0 }}>
          {name || "Your Name"}
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px", fontFamily: "system-ui, sans-serif" }}>
          {email}
        </p>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "9px", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "8px", fontFamily: "system-ui, sans-serif" }}>
            Summary
          </h2>
          <p style={{ color: "#374151", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "9px", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "10px", fontFamily: "system-ui, sans-serif" }}>
            Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {skills.map((skill, i) => (
              <span key={i} style={{ padding: "2px 10px", background: "#f1f5f9", color: "#334155", borderRadius: "4px", fontSize: "12px", border: "1px solid #e2e8f0", fontFamily: "system-ui, sans-serif" }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.some((e) => e.role || e.company) && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "9px", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "12px", fontFamily: "system-ui, sans-serif" }}>
            Experience
          </h2>
          {experience.filter((e) => e.role || e.company).map((exp, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontWeight: "bold", color: "#0f172a", fontSize: "14px" }}>{exp.role}</span>
                {exp.company && <span style={{ color: "#94a3b8" }}>·</span>}
                {exp.company && <span style={{ color: "#475569", fontSize: "14px" }}>{exp.company}</span>}
              </div>
              {exp.description && <p style={{ color: "#475569", fontSize: "13px", marginTop: "4px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.some((e) => e.college || e.degree) && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "9px", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "12px", fontFamily: "system-ui, sans-serif" }}>
            Education
          </h2>
          {education.filter((e) => e.college || e.degree).map((edu, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", color: "#0f172a", fontSize: "14px" }}>{edu.degree}</div>
              <div style={{ color: "#64748b", fontSize: "13px", fontFamily: "system-ui, sans-serif" }}>
                {edu.college}{edu.year && <span style={{ color: "#94a3b8" }}> · {edu.year}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.some((p) => p.title) && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "9px", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "12px", fontFamily: "system-ui, sans-serif" }}>
            Projects
          </h2>
          {projects.filter((p) => p.title).map((proj, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontWeight: "bold", color: "#0f172a", fontSize: "14px" }}>{proj.title}</span>
                {proj.tech && <span style={{ color: "#7c3aed", fontSize: "12px", fontFamily: "system-ui, sans-serif" }}>{proj.tech}</span>}
              </div>
              {proj.description && <p style={{ color: "#475569", fontSize: "13px", marginTop: "4px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}