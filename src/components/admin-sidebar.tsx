"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/pipeline", label: "Pipeline", icon: "◫" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "✉" },
  { href: "/admin/clients", label: "Clients", icon: "◉" },
  { href: "/admin/proposals", label: "Proposals", icon: "◳" },
  { href: "/admin/settings/packages", label: "Settings", icon: "⚙" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-brand-border bg-white">
      <div className="flex h-16 items-center border-b border-brand-border px-6">
        <Link href="/admin" className="text-xl font-bold font-heading">
          COOK<span className="text-brand-gold">/</span>Media
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-purple/10 text-brand-purple"
                  : "text-brand-text-muted hover:bg-gray-50 hover:text-brand-text"
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-brand-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-brand-purple flex items-center justify-center text-white text-sm font-medium">
            CC
          </div>
          <div className="text-sm">
            <p className="font-medium text-brand-text">Corey Cook</p>
            <p className="text-xs text-brand-text-muted">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
