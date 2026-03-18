import { ResumeData } from "./types";

export default function ModernTemplate({ name, email, phone, linkedin, summary, skills, experience, education, projects }: ResumeData) {
  const hasExperience = experience.some((e) => e.role || e.company);
  const hasEducation = education.some((e) => e.college || e.degree);
  const hasProjects = projects.some((p) => p.title);

  return (
    <div className="flex bg-white max-w-[800px] mx-auto min-h-[500px]" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* LEFT SIDEBAR */}
      <div className="w-[220px] flex-shrink-0 bg-slate-800 text-white p-6 flex flex-col gap-6">

        {/* Name & Contact */}
        <div>
          <h1 className="text-lg font-bold text-white leading-tight tracking-tight">
            {name || "Your Name"}
          </h1>
          {email && (
            <p className="text-indigo-300 text-[11px] mt-2 break-all leading-relaxed">{email}</p>
          )}
          {phone && (
            <p className="text-slate-300 text-[11px] mt-1 flex items-center gap-1.5">
              <span>📞</span>{phone}
            </p>
          )}
          {linkedin && (
            <p className="text-slate-300 text-[11px] mt-1 flex items-center gap-1.5 break-all">
              <span>🔗</span>{linkedin}
            </p>
          )}
        </div>

        <div className="w-8 h-px bg-slate-600" />

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">
              Skills
            </h2>
            <div className="flex flex-col gap-1.5">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-[11px] text-slate-300 leading-tight">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education in sidebar */}
        {hasEducation && (
          <div>
            <h2 className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.filter((e) => e.college || e.degree).map((edu, i) => (
                <div key={i}>
                  <div className="font-semibold text-white text-[11px] leading-tight">{edu.degree}</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">{edu.college}</div>
                  {edu.year && (
                    <div className="text-indigo-300 text-[10px] mt-0.5">{edu.year}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-7 flex flex-col gap-5">

        {/* Summary */}
        {summary && (
          <div>
            <h2 className="text-[10px] font-bold tracking-[0.15em] uppercase text-indigo-600 mb-2 pb-1.5 border-b border-gray-200 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-violet-500 rounded-full inline-block" />
              Profile
            </h2>
            <p className="text-gray-600 text-[13px] leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div>
            <h2 className="text-[10px] font-bold tracking-[0.15em] uppercase text-indigo-600 mb-3 pb-1.5 border-b border-gray-200 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-violet-500 rounded-full inline-block" />
              Experience
            </h2>
            <div className="space-y-4">
              {experience.filter((e) => e.role || e.company).map((exp, i) => (
                <div key={i} className="pl-3 border-l-4 border-violet-500">
                  <div className="font-bold text-gray-900 text-[13px]">{exp.role}</div>
                  {exp.company && (
                    <div className="text-indigo-500 text-[11px] mt-0.5 font-medium">{exp.company}</div>
                  )}
                  {exp.description && (
                    <p className="text-gray-500 text-[12px] mt-1.5 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div>
            <h2 className="text-[10px] font-bold tracking-[0.15em] uppercase text-indigo-600 mb-3 pb-1.5 border-b border-gray-200 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-violet-500 rounded-full inline-block" />
              Projects
            </h2>
            <div className="space-y-4">
              {projects.filter((p) => p.title).map((proj, i) => (
                <div key={i} className="pl-3 border-l-4 border-violet-500">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-gray-900 text-[13px]">{proj.title}</span>
                  </div>
                  {proj.tech && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {proj.tech.split(",").map((t, j) => (
                        <span key={j} className="text-[9px] px-1.5 py-px bg-indigo-50 text-indigo-600 rounded font-medium">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-gray-500 text-[12px] mt-1.5 leading-relaxed whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}