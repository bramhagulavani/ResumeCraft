import { UserButton } from "@clerk/nextjs";

export default function Topbar() {
  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950">
      <div className="text-slate-400 text-sm">
        Craft your professional resume
      </div>
      <div className="flex items-center gap-4">
        
          <a href="/builder"
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition text-sm font-semibold"
        >
          + New Resume
        </a>
        {/* Clerk User Button — shows profile pic + logout */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}