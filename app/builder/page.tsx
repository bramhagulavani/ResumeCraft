"use client";

import { useState } from "react";

interface Experience {
  company: string;
  role: string;
  description: string;
}

interface Education {
  college: string;
  degree: string;
  year: string;
}

interface Project {
  title: string;
  description: string;
  tech: string;
}

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-3 mt-6 first:mt-0">
    {children}
  </h3>
);

const FormInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
  />
);

const FormTextarea = ({
  placeholder,
  value,
  onChange,
  rows = 3,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) => (
  <textarea
    placeholder={placeholder}
    value={value}
    rows={rows}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
  />
);

export default function BuilderPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([""]);
  const [experience, setExperience] = useState<Experience[]>([
    { company: "", role: "", description: "" },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { college: "", degree: "", year: "" },
  ]);
  const [projects, setProjects] = useState<Project[]>([
    { title: "", description: "", tech: "" },
  ]);
  const [saving, setSaving] = useState(false);

  // Skills
  const handleSkillChange = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };
  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));

  // Experience
  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };
  const addExperience = () => setExperience([...experience, { company: "", role: "", description: "" }]);
  const removeExperience = (index: number) => setExperience(experience.filter((_, i) => i !== index));

  // Education
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };
  const addEducation = () => setEducation([...education, { college: "", degree: "", year: "" }]);
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));

  // Projects
  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };
  const addProject = () => setProjects([...projects, { title: "", description: "", tech: "" }]);
  const removeProject = (index: number) => setProjects(projects.filter((_, i) => i !== index));

  // Save
  const handleSave = async () => {
    if (!name.trim()) { alert("Please enter your name"); return; }
    if (!email.trim()) { alert("Please enter your email"); return; }

    setSaving(true);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          summary: summary.trim(),
          skills: skills.filter((s) => s.trim() !== ""),
          experience,
          education,
          projects,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Error saving resume");

      alert("Resume saved successfully!");
      setName(""); setEmail(""); setSummary(""); setSkills([""]);
      setExperience([{ company: "", role: "", description: "" }]);
      setEducation([{ college: "", degree: "", year: "" }]);
      setProjects([{ title: "", description: "", tech: "" }]);
    } catch (error: any) {
      alert(`Error saving resume: ${error.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  const filledSkills = skills.filter((s) => s.trim());
  const isEmpty = !name && !email && !summary && filledSkills.length === 0;

  return (
    <div className="h-full flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold tracking-tight">Resume Builder</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-all shadow-lg shadow-violet-900/30"
        >
          {saving ? "Saving..." : "Save Resume"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">

        {/* ── LEFT: FORM ── */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-y-auto">
          <div className="p-5 space-y-1">

            <SectionHeader>Personal Info</SectionHeader>
            <div className="space-y-2">
              <FormInput placeholder="Full Name" value={name} onChange={setName} />
              <FormInput placeholder="Email Address" value={email} onChange={setEmail} type="email" />
            </div>

            <SectionHeader>Professional Summary</SectionHeader>
            <FormTextarea
              placeholder="Write a short professional summary..."
              value={summary}
              onChange={setSummary}
              rows={4}
            />

            <SectionHeader>Skills</SectionHeader>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <FormInput
                    placeholder="e.g. React, Node.js, TypeScript"
                    value={skill}
                    onChange={(v) => handleSkillChange(index, v)}
                  />
                  {skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-slate-500 hover:text-rose-400 transition-colors text-xl leading-none flex-shrink-0"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addSkill} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
                + Add Skill
              </button>
            </div>

            <SectionHeader>Experience</SectionHeader>
            <div className="space-y-3">
              {experience.map((exp, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <FormInput placeholder="Role / Position" value={exp.role} onChange={(v) => handleExperienceChange(index, "role", v)} />
                    <FormInput placeholder="Company" value={exp.company} onChange={(v) => handleExperienceChange(index, "company", v)} />
                  </div>
                  <FormTextarea placeholder="Responsibilities and achievements..." value={exp.description} onChange={(v) => handleExperienceChange(index, "description", v)} rows={2} />
                  {experience.length > 1 && (
                    <button onClick={() => removeExperience(index)} className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors">
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addExperience} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
                + Add Experience
              </button>
            </div>

            <SectionHeader>Education</SectionHeader>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 space-y-2">
                  <FormInput placeholder="College / University" value={edu.college} onChange={(v) => handleEducationChange(index, "college", v)} />
                  <div className="grid grid-cols-2 gap-2">
                    <FormInput placeholder="Degree" value={edu.degree} onChange={(v) => handleEducationChange(index, "degree", v)} />
                    <FormInput placeholder="Year (e.g. 2020–2024)" value={edu.year} onChange={(v) => handleEducationChange(index, "year", v)} />
                  </div>
                  {education.length > 1 && (
                    <button onClick={() => removeEducation(index)} className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors">
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addEducation} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
                + Add Education
              </button>
            </div>

            <SectionHeader>Projects</SectionHeader>
            <div className="space-y-3 pb-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 space-y-2">
                  <FormInput placeholder="Project Title" value={project.title} onChange={(v) => handleProjectChange(index, "title", v)} />
                  <FormInput placeholder="Tech Stack (e.g. React, MongoDB)" value={project.tech} onChange={(v) => handleProjectChange(index, "tech", v)} />
                  <FormTextarea placeholder="What you built and your impact..." value={project.description} onChange={(v) => handleProjectChange(index, "description", v)} rows={2} />
                  {projects.length > 1 && (
                    <button onClick={() => removeProject(index)} className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors">
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addProject} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
                + Add Project
              </button>
            </div>

          </div>
        </div>

        {/* ── RIGHT: LIVE PREVIEW ── */}
        <div className="bg-white rounded-2xl overflow-y-auto shadow-xl">
          <div className="p-8 min-h-full">

            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full text-center pt-20">
                <div className="text-5xl mb-4">📄</div>
                <p className="text-slate-300 text-sm font-medium">Your live preview will appear here</p>
                <p className="text-slate-400 text-xs mt-1">Start typing on the left to get started</p>
              </div>
            ) : (
              <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

                {/* Header */}
                <div className="border-b-2 border-slate-800 pb-5 mb-6">
                  <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
                    {name || <span className="text-slate-300">Your Name</span>}
                  </h1>
                  <p className="text-slate-500 text-sm mt-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {email || <span className="text-slate-300">your@email.com</span>}
                  </p>
                </div>

                {/* Summary */}
                {summary && (
                  <section className="mb-6">
                    <h2 className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Summary
                    </h2>
                    <p className="text-slate-700 text-sm leading-relaxed">{summary}</p>
                  </section>
                )}

                {/* Skills */}
                {filledSkills.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-2.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {filledSkills.map((skill, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded text-xs border border-slate-200" style={{ fontFamily: "system-ui, sans-serif" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Experience */}
                {experience.some((e) => e.role || e.company) && (
                  <section className="mb-6">
                    <h2 className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Experience
                    </h2>
                    <div className="space-y-4">
                      {experience.filter((e) => e.role || e.company).map((exp, i) => (
                        <div key={i}>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-slate-900 text-sm">{exp.role || "Role"}</span>
                            {exp.company && <span className="text-slate-400 text-sm">·</span>}
                            {exp.company && <span className="text-slate-600 text-sm">{exp.company}</span>}
                          </div>
                          {exp.description && (
                            <p className="text-slate-600 text-[13px] mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {education.some((e) => e.college || e.degree) && (
                  <section className="mb-6">
                    <h2 className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Education
                    </h2>
                    <div className="space-y-3">
                      {education.filter((e) => e.college || e.degree).map((edu, i) => (
                        <div key={i}>
                          <div className="font-bold text-slate-900 text-sm">{edu.degree || "Degree"}</div>
                          <div className="text-slate-500 text-[13px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                            {edu.college}
                            {edu.year && <span className="text-slate-400"> · {edu.year}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Projects */}
                {projects.some((p) => p.title) && (
                  <section className="mb-6">
                    <h2 className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Projects
                    </h2>
                    <div className="space-y-4">
                      {projects.filter((p) => p.title).map((project, i) => (
                        <div key={i}>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">{project.title}</span>
                            {project.tech && (
                              <span className="text-violet-600 text-xs font-medium" style={{ fontFamily: "system-ui, sans-serif" }}>
                                {project.tech}
                              </span>
                            )}
                          </div>
                          {project.description && (
                            <p className="text-slate-600 text-[13px] mt-1 leading-relaxed whitespace-pre-line">{project.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}