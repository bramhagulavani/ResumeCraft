"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0f] text-[#0f172a] dark:text-white overflow-x-hidden transition-colors duration-300">

      {/* ═══ AMBIENT BACKGROUND GLOWS (dark only) ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden dark:opacity-100 opacity-0 transition-opacity duration-500">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.05] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-600/[0.06] blur-[100px]" />
      </div>

      {/* ═══ NAVBAR ═══ */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 border-b border-gray-200 dark:border-white/[0.06] transition-colors duration-300">
        <div className="text-2xl font-bold tracking-tight">
          Resume<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Craft</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.12] border border-gray-200 dark:border-white/[0.08] transition-all duration-300 text-lg"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <Link
            href="/sign-in"
            className="px-5 py-2.5 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors duration-300"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-900/25 hover:shadow-violet-800/40 hover:scale-[1.02]"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40 max-w-[1400px] mx-auto gap-16">

        {/* Left — Text Content */}
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/[0.08] border border-violet-500/20 rounded-full text-violet-600 dark:text-violet-400 text-xs font-semibold mb-8 tracking-widest uppercase backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400 animate-pulse" />
            AI-Powered Resume Builder
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Build Resumes That
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Get You Hired
            </span>
          </h1>

          <p className="mt-8 text-gray-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg">
            Create stunning, ATS-friendly resumes in minutes.
            Choose from premium templates, edit with live preview,
            and download as PDF instantly.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-semibold text-sm transition-all duration-300 shadow-xl shadow-violet-900/30 hover:shadow-violet-800/50 hover:scale-[1.03] hover:-translate-y-0.5"
            >
              Build Your Resume Free →
            </Link>
            <Link
              href="/sign-in"
              className="px-8 py-4 bg-gray-100 dark:bg-white/[0.04] hover:bg-gray-200 dark:hover:bg-white/[0.08] border border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.15] rounded-2xl font-semibold text-sm transition-all duration-300 backdrop-blur-sm"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-5 text-gray-400 dark:text-slate-600 text-xs tracking-wide">
            No credit card required · Free forever
          </p>
        </div>

        {/* Right — Floating Resume Mockup */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow behind mockup */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 blur-[60px] rounded-3xl scale-110" />

            {/* Resume mockup card */}
            <div className="relative w-[320px] md:w-[360px] bg-white rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50 p-8 rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
              <div className="w-24 h-3 bg-slate-800 rounded-full mb-2" />
              <div className="w-16 h-2 bg-violet-400/60 rounded-full mb-6" />

              <div className="w-full h-2 bg-slate-200 rounded-full mb-2" />
              <div className="w-4/5 h-2 bg-slate-200 rounded-full mb-2" />
              <div className="w-3/4 h-2 bg-slate-100 rounded-full mb-6" />

              <div className="w-20 h-2.5 bg-indigo-500/40 rounded-full mb-3" />
              <div className="flex gap-2 mb-6">
                <div className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-[8px] font-bold">React</div>
                <div className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[8px] font-bold">Node.js</div>
                <div className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-[8px] font-bold">Python</div>
              </div>

              <div className="w-20 h-2.5 bg-indigo-500/40 rounded-full mb-3" />
              <div className="w-full h-2 bg-slate-200 rounded-full mb-1.5" />
              <div className="w-5/6 h-2 bg-slate-200 rounded-full mb-1.5" />
              <div className="w-4/6 h-2 bg-slate-100 rounded-full mb-5" />

              <div className="w-20 h-2.5 bg-indigo-500/40 rounded-full mb-3" />
              <div className="w-full h-2 bg-slate-200 rounded-full mb-1.5" />
              <div className="w-3/4 h-2 bg-slate-100 rounded-full" />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-white text-xs font-bold shadow-lg shadow-violet-900/40 animate-pulse">
              ✨ AI-Powered
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="relative z-10 border-y border-gray-200 dark:border-white/[0.06] py-12 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {[
            { number: "10,000+", label: "Resumes Created" },
            { number: "2,500+", label: "Happy Users" },
            { number: "98%", label: "ATS Pass Rate" },
            { number: "4.9★", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{stat.number}</div>
              <div className="text-gray-400 dark:text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══ */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Everything You{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Need</span>
            </h2>
            <p className="text-gray-500 dark:text-slate-500 text-base max-w-md mx-auto">
              Built for students, developers, and professionals who want to stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "✍️",
                title: "Live Resume Builder",
                desc: "Fill your details and watch your resume update in real-time on the right side.",
                border: "hover:border-violet-500/30",
                glow: "group-hover:bg-violet-500/10",
              },
              {
                icon: "🎨",
                title: "Premium Templates",
                desc: "Choose from Classic, Modern, and Minimal templates to match your style.",
                border: "hover:border-indigo-500/30",
                glow: "group-hover:bg-indigo-500/10",
              },
              {
                icon: "📄",
                title: "One-Click PDF Export",
                desc: "Download your resume as a professional PDF instantly — no watermarks.",
                border: "hover:border-purple-500/30",
                glow: "group-hover:bg-purple-500/10",
              },
              {
                icon: "🤖",
                title: "AI Resume Generator",
                desc: "Describe yourself and let AI write your summary, skills, and bullet points.",
                border: "hover:border-fuchsia-500/30",
                glow: "group-hover:bg-fuchsia-500/10",
              },
              {
                icon: "🔐",
                title: "Secure & Private",
                desc: "Your resumes are tied to your account. Nobody else can see them.",
                border: "hover:border-emerald-500/30",
                glow: "group-hover:bg-emerald-500/10",
              },
              {
                icon: "⚡",
                title: "Fast & Modern",
                desc: "Built with Next.js, MongoDB, and Tailwind for a blazing fast experience.",
                border: "hover:border-amber-500/30",
                glow: "group-hover:bg-amber-500/10",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] ${feature.border} rounded-2xl p-7 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden shadow-sm dark:shadow-none`}
              >
                <div className={`absolute inset-0 ${feature.glow} transition-colors duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/[0.04] text-2xl mb-5 border border-gray-100 dark:border-white/[0.05]">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-24 border-t border-gray-200 dark:border-white/[0.06] transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight mb-16">
            Three Steps to Your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Dream Resume
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Describe Yourself", desc: "Enter your details or let AI auto-generate from a brief description." },
              { step: "02", title: "Choose a Template", desc: "Pick from Premium templates — Classic, Modern, or Minimal." },
              { step: "03", title: "Download & Apply", desc: "Export as PDF in one-click and start applying to your dream jobs." },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-purple-600/10 blur-[80px] rounded-full" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Ready to Build Your
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Perfect Resume?
              </span>
            </h2>
            <p className="text-gray-500 dark:text-slate-400 text-lg mb-10 max-w-md mx-auto">
              Join thousands of professionals who use ResumeCraft to land their dream jobs.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-semibold transition-all duration-300 shadow-2xl shadow-violet-900/30 hover:shadow-violet-800/50 hover:scale-[1.03] hover:-translate-y-0.5"
            >
              <span>Get Started for Free</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <p className="mt-5 text-gray-400 dark:text-slate-600 text-xs">
              Free forever · No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 border-t border-gray-200 dark:border-white/[0.06] px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 dark:text-slate-600 text-xs transition-colors duration-300">
        <div className="font-medium">
          © {new Date().getFullYear()} ResumeCraft. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5">
          <span>Built with</span>
          <span className="text-violet-400">♥</span>
          <span>using Next.js + MongoDB + AI</span>
        </div>
      </footer>

    </div>
  );
}