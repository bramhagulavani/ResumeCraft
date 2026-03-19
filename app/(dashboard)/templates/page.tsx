"use client";

import { useRouter } from "next/navigation";
import ClassicTemplate from "@/components/resumeTemplates/ClassicTemplate";
import ModernTemplate from "@/components/resumeTemplates/ModernTemplate";
import MinimalTemplate from "@/components/resumeTemplates/MinimalTemplate";

const DUMMY_RESUME = {
  name: "Bramha Vinayak Gulavani",
  email: "bramha@gmail.com",
  phone: "+91 98765 43210",
  linkedin: "linkedin.com/in/bramhagulavani",
  summary: "Motivated Full Stack Developer and AI/ML engineering student with a strong foundation in React, Next.js, Node.js, and MongoDB.",
  skills: ["JavaScript", "React", "Next.js", "Node.js", "MongoDB", "Python", "Tailwind CSS", "Git"],
  experience: [
    { role: "Full Stack Developer Intern", company: "TechNova Solutions", description: "Developed a full-stack analytics dashboard using React and Node.js." },
    { role: "Software Developer Intern", company: "CodeCraft Labs", description: "Built REST APIs and implemented MongoDB database integrations." },
  ],
  education: [
    { degree: "B.Tech in Computer Science (AI & ML)", college: "Vishwakarma Institute of Technology, Pune", year: "2025 - 2028" },
  ],
  projects: [
    { title: "ResumeCraft AI Resume Builder", tech: "Next.js, MongoDB, Clerk, Tailwind CSS", description: "Built a full-stack SaaS resume builder with AI-powered resume generation." },
    { title: "Number Plate Recognition System", tech: "Python, OpenCV, OCR", description: "Developed an AI-based system to detect vehicle license plates." },
  ],
};

const TEMPLATES = [
  {
    key: "classic", label: "Classic",
    description: "Traditional professional layout with serif fonts. Perfect for corporate and formal applications.",
    badge: "Most Popular",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    accentColor: "from-violet-600 to-indigo-600",
    glowColor: "hover:shadow-violet-900/20",
    borderHover: "hover:border-violet-500/50",
    component: <ClassicTemplate {...DUMMY_RESUME} />,
  },
  {
    key: "modern", label: "Modern",
    description: "Two-column dark sidebar with vibrant accents. Ideal for tech companies and startups.",
    badge: "Tech Friendly",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    accentColor: "from-indigo-600 to-purple-600",
    glowColor: "hover:shadow-indigo-900/20",
    borderHover: "hover:border-indigo-500/50",
    component: <ModernTemplate {...DUMMY_RESUME} />,
  },
  {
    key: "minimal", label: "Minimal",
    description: "Ultra clean with generous whitespace. Great for designers and creative professionals.",
    badge: "Clean & Elegant",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    accentColor: "from-emerald-600 to-teal-600",
    glowColor: "hover:shadow-emerald-900/20",
    borderHover: "hover:border-emerald-500/50",
    component: <MinimalTemplate {...DUMMY_RESUME} />,
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Resume Templates
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
          Choose from 3 professionally designed templates and start building instantly.
        </p>
      </div>

      {/* 1 col mobile → 2 col tablet → 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.key}
            className={`group flex flex-col bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] ${tmpl.borderHover} rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${tmpl.glowColor}`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/[0.06]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">{tmpl.label}</h2>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tmpl.badgeColor}`}>
                {tmpl.badge}
              </span>
            </div>

            {/* Preview */}
            <div className="relative bg-slate-200 overflow-hidden" style={{ height: "320px" }}>
              <div
                className="absolute top-0 left-0 pointer-events-none"
                style={{ transform: "scale(0.38)", transformOrigin: "top left", width: "263%" }}
              >
                {tmpl.component}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-200 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-semibold text-white bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Preview
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-gray-100 dark:border-white/[0.06] flex flex-col gap-3">
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{tmpl.description}</p>
              <button
                onClick={() => router.push(`/builder?template=${tmpl.key}`)}
                className={`w-full py-2.5 bg-gradient-to-r ${tmpl.accentColor} text-white rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg`}
              >
                Use {tmpl.label} Template →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip */}
      <div className="mt-6 md:mt-8 p-4 bg-violet-500/[0.06] border border-violet-500/20 rounded-xl flex items-start gap-3">
        <span className="text-lg flex-shrink-0">💡</span>
        <div>
          <p className="text-sm font-semibold text-violet-400 mb-0.5">Pro Tip</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
            You can switch between templates anytime inside the builder without losing your data!
          </p>
        </div>
      </div>
    </div>
  );
}