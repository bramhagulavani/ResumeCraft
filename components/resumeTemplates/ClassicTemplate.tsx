import { ResumeData } from "./types";

export default function ClassicTemplate({ name, email, phone, linkedin, summary, skills, experience, education, projects }: ResumeData) {
  const hasExperience = experience.some((e) => e.role || e.company);
  const hasEducation = education.some((e) => e.college || e.degree);
  const hasProjects = projects.some((p) => p.title);

  return (
    <div className="bg-white text-gray-900 p-10 max-w-[800px] mx-auto" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* HEADER */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-none">
          {name || "Your Name"}
        </h1>
        {(email || phone || linkedin) && (
          <p className="text-sm text-gray-500 mt-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>
            {[email, phone, linkedin].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: "system-ui, sans-serif" }}>
            Professional Summary
          </h2>
          <p className="text-[13px] text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2.5 pb-1 border-b border-gray-300" style={{ fontFamily: "system-ui, sans-serif" }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-[11px] text-gray-700 border border-gray-300 rounded-sm bg-gray-50"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {hasExperience && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3 pb-1 border-b border-gray-300" style={{ fontFamily: "system-ui, sans-serif" }}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.filter((e) => e.role || e.company).map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <span className="font-bold text-gray-900 text-[14px]">{exp.role}</span>
                    {exp.company && (
                      <>
                        <span className="text-gray-300 mx-1.5">|</span>
                        <span className="text-gray-600 text-[13px]">{exp.company}</span>
                      </>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-600 text-[12px] mt-1.5 leading-relaxed whitespace-pre-line pl-0.5">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {hasEducation && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3 pb-1 border-b border-gray-300" style={{ fontFamily: "system-ui, sans-serif" }}>
            Education
          </h2>
          <div className="space-y-3">
            {education.filter((e) => e.college || e.degree).map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between">
                <div>
                  <div className="font-bold text-gray-900 text-[14px]">{edu.degree}</div>
                  <div className="text-gray-500 text-[12px] mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {edu.college}
                  </div>
                </div>
                {edu.year && (
                  <span className="text-gray-400 text-[11px] flex-shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {edu.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {hasProjects && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3 pb-1 border-b border-gray-300" style={{ fontFamily: "system-ui, sans-serif" }}>
            Projects
          </h2>
          <div className="space-y-4">
            {projects.filter((p) => p.title).map((proj, i) => (
              <div key={i}>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 text-[14px]">{proj.title}</span>
                  {proj.tech && (
                    <div className="flex gap-1 flex-wrap">
                      {proj.tech.split(",").map((t, j) => (
                        <span key={j} className="text-[10px] px-1.5 py-px bg-violet-50 text-violet-700 border border-violet-200 rounded-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {proj.description && (
                  <p className="text-gray-600 text-[12px] mt-1.5 leading-relaxed whitespace-pre-line pl-0.5">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}