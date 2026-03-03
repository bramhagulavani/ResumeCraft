"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Builder", href: "/builder" },
    { name: "Templates", href: "/templates" },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-6">
      <div className="text-2xl font-bold text-white mb-10">
        ResumeCraft
      </div>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`px-4 py-2 rounded-xl transition ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-slate-500">
        © {new Date().getFullYear()} ResumeCraft
      </div>
    </aside>
  );
}