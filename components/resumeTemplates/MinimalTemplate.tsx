import { ResumeData } from "./types";

export default function MinimalTemplate({ name, email, summary, skills, experience, education, projects }: ResumeData) {
  return (
    <div style={{ background: "#ffffff", color: "#374151", fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "48px 40px" }}>

      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "300", color: "#111827", letterSpacing: "0.08em", margin: 0, textTransform: "uppercase" }}>
          {name || "Your Name"}
        </h1>
        <div style={{ width: "40px", height: "2px", background: "#111827", margin: "12px 0" }} />
        <p style={{ color: "#9ca3af", fontSize: "12px", letterSpacing: "0.05em" }}>{email}</p>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: "32px", display: "flex", gap: "24px" }}>
          <div style={{ width: "80px", flexShrink: 0 }}>
            <span style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d1d5db" }}>
              About
            </span>
          </div>
          <p style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.8, margin: 0, flex: 1 }}>{summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "32px", display: "flex", gap: "24px" }}>
          <div style={{ width: "80px", flexShrink: 0 }}>
            <span style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d1d5db" }}>
              Skills
            </span>
          </div>
          <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {skills.map((skill, i) => (
              <span key={i} style={{ fontSize: "11px", color: "#6b7280", padding: "2px 8px", border: "1px solid #e5e7eb", borderRadius: "2px" }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.some((e) => e.role || e.company) && (
        <div style={{ marginBottom: "32px", display: "flex", gap: "24px" }}>
          <div style={{ width: "80px", flexShrink: 0 }}>
            <span style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d1d5db" }}>
              Work
            </span>
          </div>
          <div style={{ flex: 1 }}>
            {experience.filter((e) => e.role || e.company).map((exp, i) => (
              <div key={i} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: "600", color: "#111827", fontSize: "13px" }}>{exp.role}</span>
                  {exp.company && <span style={{ color: "#9ca3af", fontSize: "11px" }}>{exp.company}</span>}
                </div>
                {exp.description && <p style={{ color: "#6b7280", fontSize: "12px", marginTop: "4px", lineHeight: 1.7, whiteSpace: "pre-line" }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.some((e) => e.college || e.degree) && (
        <div style={{ marginBottom: "32px", display: "flex", gap: "24px" }}>
          <div style={{ width: "80px", flexShrink: 0 }}>
            <span style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d1d5db" }}>
              Education
            </span>
          </div>
          <div style={{ flex: 1 }}>
            {education.filter((e) => e.college || e.degree).map((edu, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div style={{ fontWeight: "600", color: "#111827", fontSize: "13px" }}>{edu.degree}</div>
                <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "2px" }}>
                  {edu.college}{edu.year && <span> · {edu.year}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.some((p) => p.title) && (
        <div style={{ marginBottom: "32px", display: "flex", gap: "24px" }}>
          <div style={{ width: "80px", flexShrink: 0 }}>
            <span style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d1d5db" }}>
              Projects
            </span>
          </div>
          <div style={{ flex: 1 }}>
            {projects.filter((p) => p.title).map((proj, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontWeight: "600", color: "#111827", fontSize: "13px" }}>{proj.title}</span>
                  {proj.tech && <span style={{ color: "#9ca3af", fontSize: "10px" }}>{proj.tech}</span>}
                </div>
                {proj.description && <p style={{ color: "#6b7280", fontSize: "12px", marginTop: "4px", lineHeight: 1.7, whiteSpace: "pre-line" }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}