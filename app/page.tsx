import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-slate-800">
        <div className="text-2xl font-bold text-white">
          Resume<span className="text-indigo-500">Craft</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-slate-400 hover:text-white text-sm transition"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="inline-block px-4 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-semibold mb-6 tracking-widest uppercase">
          AI-Powered Resume Builder
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl">
          Build Resumes That
          <span className="text-indigo-500"> Get You Hired</span>
        </h1>

        <p className="mt-6 text-slate-400 text-lg max-w-xl leading-relaxed">
          Create stunning, ATS-friendly resumes in minutes.
          Choose from premium templates, edit with live preview,
          and download as PDF instantly.
        </p>

        <div className="flex items-center gap-4 mt-10">
          <Link
            href="/sign-up"
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition"
          >
            Build Your Resume Free →
          </Link>
          <Link
            href="/sign-in"
            className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-sm transition"
          >
            Sign In
          </Link>
        </div>

        <p className="mt-4 text-slate-600 text-xs">
          No credit card required · Free forever
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-10 py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything You Need
        </h2>
        <p className="text-slate-400 text-center mb-14 text-sm">
          Built for students, developers, and professionals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: "✍️",
              title: "Live Resume Builder",
              desc: "Fill your details and watch your resume update in real-time on the right side.",
            },
            {
              icon: "🎨",
              title: "Premium Templates",
              desc: "Choose from Classic, Modern, and Minimal templates to match your style.",
            },
            {
              icon: "📄",
              title: "One-Click PDF Export",
              desc: "Download your resume as a professional PDF instantly — no watermarks.",
            },
            {
              icon: "🤖",
              title: "AI Resume Generator",
              desc: "Describe yourself and let AI write your summary, skills, and bullet points.",
            },
            {
              icon: "🔐",
              title: "Secure & Private",
              desc: "Your resumes are tied to your account. Nobody else can see them.",
            },
            {
              icon: "⚡",
              title: "Fast & Modern",
              desc: "Built with Next.js, MongoDB, and Tailwind for a blazing fast experience.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-10 py-24 border-t border-slate-800 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Build Your Resume?
        </h2>
        <p className="text-slate-400 mb-8 text-sm">
          Join thousands of professionals who use ResumeCraft.
        </p>
        <Link
          href="/sign-up"
          className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition"
        >
          Get Started for Free →
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 px-10 py-6 flex items-center justify-between text-slate-500 text-xs">
        <div>
          © {new Date().getFullYear()} ResumeCraft. All rights reserved.
        </div>
        <div>Built with Next.js + MongoDB + AI</div>
      </footer>

    </div>
  );
}