import { ResumeData } from "./types";

export default function MinimalTemplate({ name, email, summary, skills, experience, education, projects }: ResumeData) {
  const hasExperience = experience.some((e) => e.role || e.company);
  const hasEducation = education.some((e) => e.college || e.degree);
  const hasProjects = projects.some((p) => p.title);

  return (
    <div className="bg-white text-gray-600 p-12 max-w-[800px] mx-auto" style={{ fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif" }}>

      {/* ═══ HEADER ═══ */}
      <div className="mb-10">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight leading-none">
          {name || "Your Name"}
        </h1>
        <div className="w-8 h-px bg-gray-900 mt-3 mb-2.5" />
        {email && (
          <p className="text-[11px] text-gray-400 tracking-wider">{email}</p>
        )}
      </div>

      {/* ═══ SUMMARY ═══ */}
      {summary && (
        <div className="mb-8 flex gap-6">
          <div className="w-20 flex-shrink-0 pt-0.5">
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-gray-400">
              About
            </span>
          </div>
          <div className="flex-1 border-t border-gray-100 pt-2">
            <p className="text-[13px] text-gray-500 leading-[1.8]">{summary}</p>
          </div>
        </div>
      )}

      {/* ═══ SKILLS ═══ */}
      {skills.length > 0 && (
        <div className="mb-8 flex gap-6">
          <div className="w-20 flex-shrink-0 pt-0.5">
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-gray-400">
              Skills
            </span>
          </div>
          <div className="flex-1 border-t border-gray-100 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] text-gray-500 px-2 py-0.5 border border-gray-200 rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ EXPERIENCE ═══ */}
      {hasExperience && (
        <div className="mb-8 flex gap-6">
          <div className="w-20 flex-shrink-0 pt-0.5">
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-gray-400">
              Work
            </span>
          </div>
          <div className="flex-1 border-t border-gray-100 pt-2">
            <div className="space-y-5">
              {experience.filter((e) => e.role || e.company).map((exp, i) => (
                <div key={i}>
                  <div className="text-gray-900 font-medium text-[14px] leading-tight">{exp.role}</div>
                  {exp.company && (
                    <div className="text-gray-400 text-[11px] italic mt-0.5">{exp.company}</div>
                  )}
                  {exp.description && (
                    <p className="text-gray-500 text-[12px] mt-2 leading-[1.7] whitespace-pre-line pl-3 border-l border-gray-200">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ EDUCATION ═══ */}
      {hasEducation && (
        <div className="mb-8 flex gap-6">
          <div className="w-20 flex-shrink-0 pt-0.5">
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-gray-400">
              Education
            </span>
          </div>
          <div className="flex-1 border-t border-gray-100 pt-2">
            <div className="space-y-3">
              {education.filter((e) => e.college || e.degree).map((edu, i) => (
                <div key={i} className="flex items-baseline justify-between">
                  <div>
                    <div className="font-medium text-gray-900 text-[13px]">{edu.degree}</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">{edu.college}</div>
                  </div>
                  {edu.year && (
                    <span className="text-gray-300 text-[10px] flex-shrink-0 tracking-wider">
                      {edu.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ PROJECTS ═══ */}
      {hasProjects && (
        <div className="mb-8 flex gap-6">
          <div className="w-20 flex-shrink-0 pt-0.5">
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-gray-400">
              Projects
            </span>
          </div>
          <div className="flex-1 border-t border-gray-100 pt-2">
            <div className="space-y-5">
              {projects.filter((p) => p.title).map((proj, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-medium text-gray-900 text-[13px]">{proj.title}</span>
                    {proj.tech && (
                      <span className="text-gray-300 text-[10px] tracking-wide">{proj.tech}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-gray-500 text-[12px] mt-2 leading-[1.7] whitespace-pre-line pl-3 border-l border-gray-200">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}