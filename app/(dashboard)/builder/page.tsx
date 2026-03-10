"use client";

import { useEffect, useState } from "react";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeId = searchParams.get("id");

  // ── AI States ──
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiDescription, setAiDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

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
      } catch (error) {
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
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: aiDescription }),
      });
      console.log(res)
      const data = await res.json();

      if (data.summary) setSummary(data.summary);
      // ✅ Fixed: keep skills as array, not joined string
      if (data.skills) setSkills(data.skills);
      if (data.experience) setExperience(data.experience);

      setAiModalOpen(false);
      setAiDescription("");
    } catch (err) {
      alert("AI generation failed. Please try again.");
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
      if (!res.ok) throw new Error(data.error || data.message || "Error saving resume");

      alert(resumeId ? "Resume updated successfully!" : "Resume saved successfully!");

      if (resumeId) {
        router.push(`/resume/${resumeId}`);
      } else {
        setName(""); setEmail(""); setSummary(""); setSkills([""]);
        setExperience([{ company: "", role: "", description: "" }]);
        setEducation([{ college: "", degree: "", year: "" }]);
        setProjects([{ title: "", description: "", tech: "" }]);
      }
    } catch (error: any) {
      alert(`Error saving resume: ${error.message || "Unknown error"}`);
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
    } catch (error: any) {
      alert(`PDF download failed: ${error.message || "Unknown error"}`);
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
      <div className="h-full flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading resume...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {resumeId ? "Edit Resume" : "Resume Builder"}
          </h1>
          {resumeId && (
            <p className="text-xs text-slate-500 mt-0.5">Editing existing resume</p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadPDF}
            disabled={downloading || isEmpty}
            className="px-5 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-all"
          >
            {downloading ? "Generating..." : "⬇ Download PDF"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-all shadow-lg shadow-violet-900/30"
          >
            {saving ? "Saving..." : resumeId ? "Update Resume" : "Save Resume"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">

        {/* ── LEFT: FORM ── */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-y-auto">
          <div className="p-5 space-y-1">

            {/* ✅ AI Button is here — top of the FORM panel (left side) */}
            <button
              onClick={() => setAiModalOpen(true)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm transition mb-2 flex items-center justify-center gap-2"
            >
              🤖 Generate with AI
            </button>

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
                      className="text-slate-500 hover:text-rose-400 transition-colors text-xl leading-none flex-shrink-0"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addSkill}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                + Add Skill
              </button>
            </div>

            <SectionHeader>Experience</SectionHeader>
            <div className="space-y-3">
              {experience.map((exp, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
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
                      className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors"
                    >
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addExp}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                + Add Experience
              </button>
            </div>

            <SectionHeader>Education</SectionHeader>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 space-y-2">
                  <FormInput
                    placeholder="College / University"
                    value={edu.college}
                    onChange={(v) => handleEduChange(i, "college", v)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <FormInput placeholder="Degree" value={edu.degree} onChange={(v) => handleEduChange(i, "degree", v)} />
                    <FormInput placeholder="Year (e.g. 2020–2024)" value={edu.year} onChange={(v) => handleEduChange(i, "year", v)} />
                  </div>
                  {education.length > 1 && (
                    <button
                      onClick={() => removeEdu(i)}
                      className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors"
                    >
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addEdu}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                + Add Education
              </button>
            </div>

            <SectionHeader>Projects</SectionHeader>
            <div className="space-y-3 pb-4">
              {projects.map((proj, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 space-y-2">
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
                      className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors"
                    >
                      Remove entry
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addProj}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                + Add Project
              </button>
            </div>

          </div>
        </div>

        {/* ── RIGHT: LIVE PREVIEW ── */}
        <div className="rounded-2xl overflow-y-auto shadow-xl flex flex-col" style={{ background: "#e2e8f0" }}>

          {/* Template Switcher — outside PDF capture area */}
          <div className="flex gap-2 p-3 justify-center flex-shrink-0">
            {(Object.keys(TEMPLATE_META) as TemplateKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setTemplate(key)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  template === key
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {TEMPLATE_META[key].label}
              </button>
            ))}
          </div>

          {/* Live Preview */}
          <div className="flex-1 overflow-y-auto p-4">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full text-center pt-20">
                <div className="text-5xl mb-4">📄</div>
                <p className="text-slate-400 text-sm font-medium">
                  Your live preview will appear here
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Start typing on the left to get started
                </p>
              </div>
            ) : (
              <div id="resume-preview">
                {template === "classic" && <ClassicTemplate {...resumeData} />}
                {template === "modern" && <ModernTemplate {...resumeData} />}
                {template === "minimal" && <MinimalTemplate {...resumeData} />}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── AI MODAL ── */}
      {aiModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-2">🤖 Generate Resume with AI</h2>
            <p className="text-slate-400 text-sm mb-6">
              Describe yourself — your skills, experience, and background. AI will fill in your resume automatically.
            </p>

            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 resize-none h-36 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. I'm a computer science student skilled in React, Node.js and MongoDB. I interned at a startup where I built REST APIs and a dashboard. I also built a resume builder as a personal project."
              value={aiDescription}
              onChange={(e) => setAiDescription(e.target.value)}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAiGenerate}
                disabled={aiLoading || !aiDescription.trim()}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition"
              >
                {aiLoading ? "✨ Generating..." : "✨ Generate Resume"}
              </button>
              <button
                onClick={() => { setAiModalOpen(false); setAiDescription(""); }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}