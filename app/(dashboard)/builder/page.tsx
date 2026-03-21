"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ClassicTemplate from "@/components/resumeTemplates/ClassicTemplate";
import ModernTemplate from "@/components/resumeTemplates/ModernTemplate";
import MinimalTemplate from "@/components/resumeTemplates/MinimalTemplate";
import { ResumeData } from "@/components/resumeTemplates/types";
import { useToast } from "@/components/ui/Toast";

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
  placeholder, value, onChange, type = "text",
}: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <input
    type={type} placeholder={placeholder} value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300"
  />
);

const FormTextarea = ({
  placeholder, value, onChange, rows = 3,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; rows?: number;
}) => (
  <textarea
    placeholder={placeholder} value={value} rows={rows}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300 resize-none"
  />
);

function BuilderPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const resumeId = searchParams.get("id");

  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiDescription, setAiDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const [template, setTemplate] = useState<TemplateKey>("classic");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([""]);
  const [experience, setExperience] = useState<ResumeData["experience"]>([{ company: "", role: "", description: "" }]);
  const [education, setEducation] = useState<ResumeData["education"]>([{ college: "", degree: "", year: "" }]);
  const [projects, setProjects] = useState<ResumeData["projects"]>([{ title: "", description: "", tech: "" }]);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

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
        setPhone(data.phone || "");
        setLinkedin(data.linkedin || "");
        setJobTitle(data.jobTitle || "");
        setSummary(data.summary || "");
        setSkills(data.skills?.length ? data.skills : [""]);
        setExperience(data.experience?.length ? data.experience : [{ company: "", role: "", description: "" }]);
        setEducation(data.education?.length ? data.education : [{ college: "", degree: "", year: "" }]);
        setProjects(data.projects?.length ? data.projects : [{ title: "", description: "", tech: "" }]);
        setTemplate(data.template || "classic");
      } catch {
        toast.error("Could not load resume. Please try again.", "Load Failed");
      } finally {
        setLoadingResume(false);
      }
    };
    fetchResume();
  }, [resumeId]);

  const handleSkillChange = (i: number, v: string) => { const u = [...skills]; u[i] = v; setSkills(u); };
  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (i: number) => setSkills(skills.filter((_, j) => j !== i));

  const handleExpChange = (i: number, field: keyof ResumeData["experience"][0], v: string) => { const u = [...experience]; u[i][field] = v; setExperience(u); };
  const addExp = () => setExperience([...experience, { company: "", role: "", description: "" }]);
  const removeExp = (i: number) => setExperience(experience.filter((_, j) => j !== i));

  const handleEduChange = (i: number, field: keyof ResumeData["education"][0], v: string) => { const u = [...education]; u[i][field] = v; setEducation(u); };
  const addEdu = () => setEducation([...education, { college: "", degree: "", year: "" }]);
  const removeEdu = (i: number) => setEducation(education.filter((_, j) => j !== i));

  const handleProjChange = (i: number, field: keyof ResumeData["projects"][0], v: string) => { const u = [...projects]; u[i][field] = v; setProjects(u); };
  const addProj = () => setProjects([...projects, { title: "", description: "", tech: "" }]);
  const removeProj = (i: number) => setProjects(projects.filter((_, j) => j !== i));

  const handleAiGenerate = async () => {
    if (!aiDescription.trim()) return;
    setAiLoading(true); setAiError("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: aiDescription }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "AI generation failed"); }
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
      if (data.skills) setSkills(data.skills);
      if (data.experience) setExperience(data.experience);
      setAiModalOpen(false); setAiDescription("");
    } catch (err: unknown) {
      setAiError(err instanceof Error ? err.message : "AI generation failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) { toast.error("Please enter your name", "Missing Field"); return; }
    if (!email.trim()) { toast.error("Please enter your email", "Missing Field"); return; }
    if (!phone.trim()) { toast.error("Please enter your phone number", "Missing Field"); return; }
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        linkedin: linkedin.trim(),
        jobTitle: jobTitle.trim(),
        summary: summary.trim(),
        skills: skills.filter((s) => s.trim() !== ""),
        experience, education, projects, template,
      };
      const url = resumeId ? `/api/resume/${resumeId}` : "/api/resume";
      const method = resumeId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error saving resume");
      if (resumeId) {
        toast.success("Your resume has been updated.", "Updated!");
        router.push(`/resume/${resumeId}`);
      } else {
        toast.success("Your resume has been saved.", "Saved!");
        setName(""); setEmail(""); setPhone(""); setLinkedin(""); setJobTitle("");
        setSummary(""); setSkills([""]);
        setExperience([{ company: "", role: "", description: "" }]);
        setEducation([{ college: "", degree: "", year: "" }]);
        setProjects([{ title: "", description: "", tech: "" }]);
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unknown error", "Save Failed");
    } finally {
      setSaving(false);
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) { toast.warning("Fill in your details first.", "Nothing to Download"); return; }
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set({ margin: 0.5, filename: `${name.trim() || "resume"}.pdf`, image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: "in", format: "letter", orientation: "portrait" } }).from(element).save();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unknown error", "Download Failed");
    } finally {
      setDownloading(false);
    }
  };

  const filledSkills = skills.filter((s) => s.trim());
  const isEmpty = !name && !email && !summary && filledSkills.length === 0;
  const resumeData: ResumeData = { name, email, phone, linkedin, jobTitle, summary, skills: filledSkills, experience, education, projects };

  if (loadingResume) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400 dark:text-slate-400 text-sm">Loading resume...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4 md:mb-5 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {resumeId ? "Edit Resume" : "Resume Builder"}
          </h1>
          {resumeId && <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Editing existing resume</p>}
        </div>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={downloadPDF}
            disabled={downloading || isEmpty}
            className="hidden sm:flex px-3 md:px-5 py-2 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-white/[0.06] items-center gap-1"
          >
            {downloading ? "Generating..." : "⬇ PDF"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 md:px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 text-white shadow-lg shadow-violet-900/30"
          >
            {saving ? "Saving..." : resumeId ? "Update" : "Save Resume"}
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden gap-2 mb-4">
        <button
          onClick={() => setActiveTab("form")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "form" ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" : "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-slate-400"}`}
        >
          ✏️ Edit Form
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "preview" ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" : "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-slate-400"}`}
        >
          👁 Preview
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 md:grid md:grid-cols-2 md:gap-6">

        {/* LEFT: FORM */}
        <div className={`${activeTab === "form" ? "flex" : "hidden"} md:flex flex-col bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.06] overflow-y-auto`}>
          <div className="p-4 md:p-5 space-y-1">

            {/* AI Button */}
            <button
              onClick={() => { setAiError(""); setAiModalOpen(true); }}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 mb-2 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
            >
              🤖 Generate with AI
            </button>

            <SectionHeader>Personal Info</SectionHeader>
            <div className="space-y-2">
              <FormInput placeholder="Full Name" value={name} onChange={setName} />
              {/* ✅ Job Title — full width below name */}
              <FormInput placeholder="Job Title (e.g. Full Stack Developer)" value={jobTitle} onChange={setJobTitle} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <FormInput placeholder="Email Address" value={email} onChange={setEmail} type="email" />
                <FormInput placeholder="Phone (e.g. +91 98765 43210)" value={phone} onChange={setPhone} type="tel" />
              </div>
              <FormInput placeholder="LinkedIn URL (e.g. linkedin.com/in/yourname)" value={linkedin} onChange={setLinkedin} type="url" />
            </div>

            <SectionHeader>Professional Summary</SectionHeader>
            <FormTextarea placeholder="Write a short professional summary..." value={summary} onChange={setSummary} rows={4} />

            <SectionHeader>Skills</SectionHeader>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <FormInput placeholder="e.g. React, Node.js, TypeScript" value={skill} onChange={(v) => handleSkillChange(i, v)} />
                  {skills.length > 1 && (
                    <button onClick={() => removeSkill(i)} className="text-gray-400 hover:text-rose-400 transition-colors text-xl leading-none flex-shrink-0">×</button>
                  )}
                </div>
              ))}
              <button onClick={addSkill} className="text-xs text-violet-500 hover:text-violet-400 transition-colors font-medium">+ Add Skill</button>
            </div>

            <SectionHeader>Experience</SectionHeader>
            <div className="space-y-3">
              {experience.map((exp, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl p-3 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <FormInput placeholder="Role / Position" value={exp.role} onChange={(v) => handleExpChange(i, "role", v)} />
                    <FormInput placeholder="Company" value={exp.company} onChange={(v) => handleExpChange(i, "company", v)} />
                  </div>
                  <FormTextarea placeholder="Responsibilities and achievements..." value={exp.description} onChange={(v) => handleExpChange(i, "description", v)} rows={2} />
                  {experience.length > 1 && <button onClick={() => removeExp(i)} className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors">Remove entry</button>}
                </div>
              ))}
              <button onClick={addExp} className="text-xs text-violet-500 hover:text-violet-400 transition-colors font-medium">+ Add Experience</button>
            </div>

            <SectionHeader>Education</SectionHeader>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl p-3 space-y-2">
                  <FormInput placeholder="College / University" value={edu.college} onChange={(v) => handleEduChange(i, "college", v)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <FormInput placeholder="Degree" value={edu.degree} onChange={(v) => handleEduChange(i, "degree", v)} />
                    <FormInput placeholder="Year (e.g. 2020-2024)" value={edu.year} onChange={(v) => handleEduChange(i, "year", v)} />
                  </div>
                  {education.length > 1 && <button onClick={() => removeEdu(i)} className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors">Remove entry</button>}
                </div>
              ))}
              <button onClick={addEdu} className="text-xs text-violet-500 hover:text-violet-400 transition-colors font-medium">+ Add Education</button>
            </div>

            <SectionHeader>Projects</SectionHeader>
            <div className="space-y-3 pb-4">
              {projects.map((proj, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl p-3 space-y-2">
                  <FormInput placeholder="Project Title" value={proj.title} onChange={(v) => handleProjChange(i, "title", v)} />
                  <FormInput placeholder="Tech Stack (e.g. React, MongoDB)" value={proj.tech} onChange={(v) => handleProjChange(i, "tech", v)} />
                  <FormTextarea placeholder="What you built and your impact..." value={proj.description} onChange={(v) => handleProjChange(i, "description", v)} rows={2} />
                  {projects.length > 1 && <button onClick={() => removeProj(i)} className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors">Remove entry</button>}
                </div>
              ))}
              <button onClick={addProj} className="text-xs text-violet-500 hover:text-violet-400 transition-colors font-medium">+ Add Project</button>
            </div>

            {/* Mobile Download */}
            <div className="sm:hidden pt-2 pb-4">
              <button
                onClick={downloadPDF}
                disabled={downloading || isEmpty}
                className="w-full py-3 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-all duration-300 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-white/[0.06]"
              >
                {downloading ? "Generating PDF..." : "⬇ Download PDF"}
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className={`${activeTab === "preview" ? "flex" : "hidden"} md:flex flex-col rounded-2xl overflow-y-auto shadow-xl bg-slate-200 dark:bg-[#e2e8f0]`}>
          <div className="flex gap-2 p-3 justify-center flex-shrink-0">
            {(Object.keys(TEMPLATE_META) as TemplateKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setTemplate(key)}
                className={`px-3 md:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${template === key ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-900/20" : "bg-white/50 text-slate-600 hover:bg-white/80 hover:text-slate-800"}`}
              >
                {TEMPLATE_META[key].label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full text-center pt-20">
                <div className="w-20 h-20 flex items-center justify-center bg-white/50 rounded-2xl text-4xl mb-4 shadow-sm">📄</div>
                <p className="text-slate-500 text-sm font-semibold">Your live preview will appear here</p>
                <p className="text-slate-400 text-xs mt-1.5">Start typing on the left to get started</p>
              </div>
            ) : (
              <div id="resume-preview" className="shadow-2xl shadow-black/20 rounded-lg overflow-hidden">
                {template === "classic" && <ClassicTemplate {...resumeData} />}
                {template === "modern" && <ModernTemplate {...resumeData} />}
                {template === "minimal" && <MinimalTemplate {...resumeData} />}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* AI MODAL */}
      {aiModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="relative bg-white dark:bg-[#13131a] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl shadow-violet-900/20 transition-colors duration-300">
            <h2 className="text-xl font-extrabold mb-2 tracking-tight text-gray-900 dark:text-white">🤖 Generate with AI</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Describe yourself — your skills, experience, and background. AI will fill in your resume automatically.
            </p>
            <textarea
              className="w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl p-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 resize-none h-36 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300"
              placeholder="e.g. I'm a CS student skilled in React, Node.js and MongoDB. I built a resume builder SaaS as my portfolio project."
              value={aiDescription}
              onChange={(e) => setAiDescription(e.target.value)}
            />
            {aiError && <p className="text-rose-500 dark:text-rose-400 text-xs mt-2 font-medium">{aiError}</p>}
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleAiGenerate}
                disabled={aiLoading || !aiDescription.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-violet-800 disabled:to-indigo-800 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all duration-300"
              >
                {aiLoading ? "✨ Generating..." : "✨ Generate Resume"}
              </button>
              <button
                onClick={() => { setAiModalOpen(false); setAiDescription(""); setAiError(""); }}
                className="px-6 py-3 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.06] rounded-xl text-sm font-medium transition-all duration-300 text-gray-700 dark:text-slate-300"
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

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400 dark:text-slate-400 text-sm font-medium">Loading builder...</p>
      </div>
    }>
      <BuilderPageInner />
    </Suspense>
  );
}