import { UserButton } from "@clerk/nextjs";

export default function Topbar() {
  return (
    <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#0a0a0f]/60 backdrop-blur-xl">
      <div className="text-slate-500 text-sm font-medium">
        Craft your professional resume
      </div>
      <div className="flex items-center gap-3">
        <a
          href="/builder"
          className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-violet-900/20 hover:shadow-violet-800/40 hover:scale-[1.02]"
        >
          <span className="text-base leading-none">+</span>
          New Resume
        </a>
        {/* Clerk User Button — shows profile pic + logout */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}