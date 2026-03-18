"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ClassicTemplate from "@/components/resumeTemplates/ClassicTemplate";
import ModernTemplate from "@/components/resumeTemplates/ModernTemplate";
import MinimalTemplate from "@/components/resumeTemplates/MinimalTemplate";
import { ResumeData } from "@/components/resumeTemplates/types";

type TemplateKey = "classic" | "modern" | "minimal";

const TEMPLATE_META: Record<TemplateKey, { label: string }> = {
  classic: { label: "Classic" },
  modern: { label: "Modern" },
  minimal: { label: "Minimal" },
};

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-slate-400 mb-3 mt-8 first:mt-0">
    <span className="w-1 h-4 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full" />
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
    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300"
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
    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300 resize-none"
  />
);

// ── Inner component that uses useSearchParams ──
function BuilderPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeId = searchParams.get("id");

  // ── AI States ──
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiDescription, setAiDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // ── Form States ──
  const [template, setTemplate] = useState<TemplateKey>("classic");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([""]);
  const [experience, setExperience] = useState<ResumeData["experience"]>([
    { company: "", role: "", description: "" },
  ]);
  const [education, setEducation] = useState<ResumeData["education"]>([
    { college: "", degree: "", year: "" },
  ]);
  const [projects, setProjects] = useState<ResumeData["projects"]>([
    { title: "", description: "", tech: "" },
  ]);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

  // ── Prefill form when editing ──
  useEffect(() => {
    if (!resumeId) return;

    const fetchResume = async () => {
      setLoadingResume(true);
      try {
        const res = await fetch(`/api/resume/${resumeId}`);
        if (!res.ok) throw new Error("Failed to load resume");
        const data = await res.json();

        setName(data.name || "");
        setEmail(data.email || "");
        setSummary(data.summary || "");
        setSkills(data.skills?.length ? data.skills : [""]);
        setExperience(
          data.experience?.length
            ? data.experience
            : [{ company: "", role: "", description: "" }]
        );
        setEducation(
          data.education?.length
            ? data.education
            : [{ college: "", degree: "", year: "" }]
        );
        setProjects(
          data.projects?.length
            ? data.projects
            : [{ title: "", description: "", tech: "" }]
        );
        setTemplate(data.template || "classic");
      } catch {
        alert("Failed to load resume for editing.");
      } finally {
        setLoadingResume(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  // ── Skills Handlers ──
  const handleSkillChange = (i: number, v: string) => {
    const u = [...skills];
    u[i] = v;
    setSkills(u);
  };
  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (i: number) => setSkills(skills.filter((_, j) => j !== i));

  // ── Experience Handlers ──
  const handleExpChange = (
    i: number,
    field: keyof ResumeData["experience"][0],
    v: string
  ) => {
    const u = [...experience];
    u[i][field] = v;
    setExperience(u);
  };
  const addExp = () =>
    setExperience([...experience, { company: "", role: "", description: "" }]);
  const removeExp = (i: number) =>
    setExperience(experience.filter((_, j) => j !== i));

  // ── Education Handlers ──
  const handleEduChange = (
    i: number,
    field: keyof ResumeData["education"][0],
    v: string
  ) => {
    const u = [...education];
    u[i][field] = v;
    setEducation(u);
  };
  const addEdu = () =>
    setEducation([...education, { college: "", degree: "", year: "" }]);
  const removeEdu = (i: number) =>
    setEducation(education.filter((_, j) => j !== i));

  // ── Project Handlers ──
  const handleProjChange = (
    i: number,
    field: keyof ResumeData["projects"][0],
    v: string
  ) => {
    const u = [...projects];
    u[i][field] = v;
    setProjects(u);
  };
  const addProj = () =>
    setProjects([...projects, { title: "", description: "", tech: "" }]);
  const removeProj = (i: number) =>
    setProjects(projects.filter((_, j) => j !== i));

  // ── AI Generate ──
  const handleAiGenerate = async () => {
    if (!aiDescription.trim()) return;
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: aiDescription }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "AI generation failed");
      }

      const data = await res.json();

      if (data.summary) setSummary(data.summary);
      if (data.skills) setSkills(data.skills);
      if (data.experience) setExperience(data.experience);

      setAiModalOpen(false);
      setAiDescription("");
    } catch (err: unknown) {
      setAiError(err instanceof Error ? err.message : "AI generation failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // ── Save / Update ──
  const handleSave = async () => {
    if (!name.trim()) { alert("Please enter your name"); return; }
    if (!email.trim()) { alert("Please enter your email"); return; }

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        summary: summary.trim(),
        skills: skills.filter((s) => s.trim() !== ""),
        experience,
        education,
        projects,
        template,
      };

      const url = resumeId ? `/api/resume/${resumeId}` : "/api/resume";
      const method = resumeId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error saving resume");

      alert(resumeId ? "Resume updated successfully!" : "Resume saved successfully!");

      if (resumeId) {
        router.push(`/resume/${resumeId}`);
      } else {
        setName(""); setEmail(""); setSummary(""); setSkills([""]);
        setExperience([{ company: "", role: "", description: "" }]);
        setEducation([{ college: "", degree: "", year: "" }]);
        setProjects([{ title: "", description: "", tech: "" }]);
      }
    } catch (error: unknown) {
      alert(`Error saving resume: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  // ── Download PDF ──
  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) { alert("Nothing to download yet — fill in the form first."); return; }
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: 0.5,
        filename: `${name.trim() || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (error: unknown) {
      alert(`PDF download failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setDownloading(false);
    }
  };

  const filledSkills = skills.filter((s) => s.trim());
  const isEmpty = !name && !email && !summary && filledSkills.length === 0;

  const resumeData: ResumeData = {
    name, email, summary,
    skills: filledSkills,
    experience, education, projects,
  };

  if (loadingResume) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
        <p className="text-gray-500 dark:text-slate-500 text-sm font-medium">Loading resume...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">

      {/* ═══ Top Bar ═══ */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {resumeId ? "Edit " : ""}Resume <span className="gradient-text">Builder</span>
          </h1>
          {resumeId && (
            <p className="text-xs text-gray-400 dark:text-slate-600 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Editing existing resume
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadPDF}
            disabled={downloading || isEmpty}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-white/[0.04] hover:bg-gray-200 dark:hover:bg-white/[0.08] border border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-100 dark:disabled:hover:bg-white/[0.04] rounded-xl text-sm font-semibold transition-all duration-300 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
          >
            <span>⬇</span>
            {downloading ? "Generating..." : "Download PDF"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-900/30 hover:shadow-violet-800/50 hover:scale-[1.02] text-white"
          >
            {saving ? "Saving..." : resumeId ? "✓ Update Resume" : "✓ Save Resume"}
            <div className="absolute inset-0 rounded-xl shimmer-btn" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">

        {/* ═══ LEFT: FORM PANEL ═══ */}
        <div className="relative bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.06] overflow-y-auto shadow-sm dark:shadow-none transition-colors duration-300">
          {/* Subtle top accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

          <div className="p-6 space-y-1">

            {/* AI Generate Button */}
            <button
              onClick={() => { setAiError(""); setAiModalOpen(true); }}
              className="group relative w-full py-3.5 bg-gradient-to-r from-violet-600/90 via-indigo-600/90 to-purple-600/90 hover:from-violet-500 hover:via-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm transition-all duration-500 mb-4 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/20 hover:shadow-violet-800/40 overflow-hidden animate-pulse-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                🤖 Generate with AI
              </span>
              <div className="absolute inset-0 shimmer-btn" />
            </button>

            <SectionHeader>Personal Info</SectionHeader>
            <div className="space-y-3">
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
            <div className="space-y-2.5">
              {skills.map((skill, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <FormInput
                    placeholder="e.g. React, Node.js, TypeScript"
                    value={skill}
                    onChange={(v) => handleSkillChange(i, v)}
                  />
                  {skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(i)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-500/[0.06] hover:bg-rose-100 dark:hover:bg-rose-500/[0.15] border border-rose-200 dark:border-rose-500/10 hover:border-rose-300 dark:hover:border-rose-500/30 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-all duration-300 text-sm leading-none flex-shrink-0"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addSkill}
                className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-300 font-semibold px-1 py-1"
              >
                <span className="w-4 h-4 flex items-center justify-center rounded bg-violet-100 dark:bg-violet-500/10 text-[10px]">+</span>
                Add Skill
              </button>
            </div>

            <SectionHeader>Experience</SectionHeader>
            <div className="space-y-3">
              {experience.map((exp, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] rounded-xl p-4 space-y-2.5 transition-colors duration-300">
                  <div className="grid grid-cols-2 gap-2.5">
                    <FormInput placeholder="Role / Position" value={exp.role} onChange={(v) => handleExpChange(i, "role", v)} />
                    <FormInput placeholder="Company" value={exp.company} onChange={(v) => handleExpChange(i, "company", v)} />
                  </div>
                  <FormTextarea
                    placeholder="Responsibilities and achievements..."
                    value={exp.description}
                    onChange={(v) => handleExpChange(i, "description", v)}
                    rows={2}
                  />
                  {experience.length > 1 && (
                    <button
                      onClick={() => removeExp(i)}
                      className="text-xs text-rose-400/60 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-300 font-medium"
                    >
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addExp}
                className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-300 font-semibold px-1 py-1"
              >
                <span className="w-4 h-4 flex items-center justify-center rounded bg-violet-100 dark:bg-violet-500/10 text-[10px]">+</span>
                Add Experience
              </button>
            </div>

            <SectionHeader>Education</SectionHeader>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] rounded-xl p-4 space-y-2.5 transition-colors duration-300">
                  <FormInput
                    placeholder="College / University"
                    value={edu.college}
                    onChange={(v) => handleEduChange(i, "college", v)}
                  />
                  <div className="grid grid-cols-2 gap-2.5">
                    <FormInput placeholder="Degree" value={edu.degree} onChange={(v) => handleEduChange(i, "degree", v)} />
                    <FormInput placeholder="Year (e.g. 2020-2024)" value={edu.year} onChange={(v) => handleEduChange(i, "year", v)} />
                  </div>
                  {education.length > 1 && (
                    <button
                      onClick={() => removeEdu(i)}
                      className="text-xs text-rose-400/60 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-300 font-medium"
                    >
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addEdu}
                className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-300 font-semibold px-1 py-1"
              >
                <span className="w-4 h-4 flex items-center justify-center rounded bg-violet-100 dark:bg-violet-500/10 text-[10px]">+</span>
                Add Education
              </button>
            </div>

            <SectionHeader>Projects</SectionHeader>
            <div className="space-y-3 pb-4">
              {projects.map((proj, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] rounded-xl p-4 space-y-2.5 transition-colors duration-300">
                  <FormInput placeholder="Project Title" value={proj.title} onChange={(v) => handleProjChange(i, "title", v)} />
                  <FormInput
                    placeholder="Tech Stack (e.g. React, MongoDB)"
                    value={proj.tech}
                    onChange={(v) => handleProjChange(i, "tech", v)}
                  />
                  <FormTextarea
                    placeholder="What you built and your impact..."
                    value={proj.description}
                    onChange={(v) => handleProjChange(i, "description", v)}
                    rows={2}
                  />
                  {projects.length > 1 && (
                    <button
                      onClick={() => removeProj(i)}
                      className="text-xs text-rose-400/60 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-300 font-medium"
                    >
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addProj}
                className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-300 font-semibold px-1 py-1"
              >
                <span className="w-4 h-4 flex items-center justify-center rounded bg-violet-100 dark:bg-violet-500/10 text-[10px]">+</span>
                Add Project
              </button>
            </div>

          </div>
        </div>

        {/* ═══ RIGHT: LIVE PREVIEW ═══ */}
        <div className="relative rounded-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-white/[0.06] shadow-sm dark:shadow-none transition-colors duration-300" style={{ background: "linear-gradient(135deg, #e8ecf1, #dfe4ea, #e2e6ec)" }}>
          {/* Subtle top accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent z-10" />

          {/* Template Switcher */}
          <div className="flex gap-2 p-4 justify-center flex-shrink-0 bg-white/30 backdrop-blur-sm border-b border-white/20">
            {(Object.keys(TEMPLATE_META) as TemplateKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setTemplate(key)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  template === key
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-900/20"
                    : "bg-white/50 text-slate-500 hover:bg-white/80 hover:text-slate-700"
                }`}
              >
                {TEMPLATE_META[key].label}
              </button>
            ))}
          </div>

          {/* Live Preview */}
          <div className="flex-1 overflow-y-auto p-6">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full text-center pt-20">
                <div className="w-20 h-20 flex items-center justify-center bg-white/60 rounded-2xl text-4xl mb-4 shadow-sm">
                  📄
                </div>
                <p className="text-slate-500 text-sm font-semibold">
                  Your live preview will appear here
                </p>
                <p className="text-slate-400 text-xs mt-1.5">
                  Start typing on the left to get started
                </p>
              </div>
            ) : (
              <div id="resume-preview" className="shadow-2xl shadow-black/10 rounded-lg overflow-hidden">
                {template === "classic" && <ClassicTemplate {...resumeData} />}
                {template === "modern" && <ModernTemplate {...resumeData} />}
                {template === "minimal" && <MinimalTemplate {...resumeData} />}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ═══ AI MODAL ═══ */}
      {aiModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="relative bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-8 w-full max-w-lg shadow-2xl shadow-violet-900/20 overflow-hidden transition-colors duration-300">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-violet-600/[0.06] blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-xl font-extrabold mb-2 tracking-tight">
                🤖 Generate with <span className="gradient-text">AI</span>
              </h2>
              <p className="text-gray-500 dark:text-slate-500 text-sm mb-6 leading-relaxed">
                Describe yourself — your skills, experience, and background. AI will fill in your resume automatically.
              </p>

              <textarea
                className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-xl p-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 resize-none h-36 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300"
                placeholder="e.g. I'm a CS student skilled in React, Node.js and MongoDB. I built a resume builder SaaS as my portfolio project."
                value={aiDescription}
                onChange={(e) => setAiDescription(e.target.value)}
              />

              {aiError && (
                <p className="text-rose-500 dark:text-rose-400 text-xs mt-2 font-medium">{aiError}</p>
              )}

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleAiGenerate}
                  disabled={aiLoading || !aiDescription.trim()}
                  className="relative flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-violet-900 disabled:to-indigo-900 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-900/30 overflow-hidden"
                >
                  <span className="relative z-10">
                    {aiLoading ? "✨ Generating..." : "✨ Generate Resume"}
                  </span>
                  {!aiLoading && <div className="absolute inset-0 shimmer-btn" />}
                </button>
                <button
                  onClick={() => { setAiModalOpen(false); setAiDescription(""); setAiError(""); }}
                  className="px-6 py-3.5 bg-gray-100 dark:bg-white/[0.04] hover:bg-gray-200 dark:hover:bg-white/[0.08] border border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.15] rounded-xl text-sm font-medium transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ── Default export wraps inner component in Suspense ──
export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
        <p className="text-gray-500 dark:text-slate-500 text-sm font-medium">Loading builder...</p>
      </div>
    }>
      <BuilderPageInner />
    </Suspense>
  );
}