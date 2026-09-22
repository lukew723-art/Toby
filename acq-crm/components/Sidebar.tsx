"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard", icon: "⌂" },
  { href: "/companies", label: "Company Profiles and Ranks", icon: "▤" },
  { href: "/pipeline", label: "Sales Pipeline", icon: "↗" },
  { href: "/contacts", label: "Contacts", icon: "☺" },
  { href: "/outreach", label: "Email / Phone", icon: "✉" },
  { href: "/map", label: "Map", icon: "◎" },
  { href: "/notes", label: "Notes", icon: "✎" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="group fixed left-0 top-0 h-screen w-14 hover:w-56 bg-navyDeep transition-all duration-200 ease-out z-20 overflow-hidden flex flex-col">
      <div className="h-16 flex items-center px-4 shrink-0">
        <span className="text-gold font-display font-bold text-lg tracking-wide whitespace-nowrap">
          <span className="inline group-hover:hidden">AQ</span>
          <span className="hidden group-hover:inline">Acquisitions</span>
        </span>
      </div>

      <div className="flex-1 py-2">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 whitespace-nowrap transition-colors ${
                active
                  ? "bg-navyLight text-gold border-l-2 border-gold"
                  : "text-white/70 hover:text-white hover:bg-navyLight/50 border-l-2 border-transparent"
              }`}
            >
              <span className="text-lg w-5 text-center shrink-0">{link.icon}</span>
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
