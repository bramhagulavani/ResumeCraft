"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Builder", href: "/builder", icon: "✍️" },
    { name: "Templates", href: "/templates", icon: "🎨" },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0f]/80 border-r border-white/[0.06] flex flex-col p-6 backdrop-blur-xl">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-white mb-10 tracking-tight">
        Resume<span className="gradient-text">Craft</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-white border border-violet-500/20 shadow-sm shadow-violet-900/10"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white border border-transparent"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.name}
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-white/[0.06]">
        <div className="text-[10px] text-slate-600 font-medium">
          © {new Date().getFullYear()} ResumeCraft
        </div>
      </div>
    </aside>
  );
}