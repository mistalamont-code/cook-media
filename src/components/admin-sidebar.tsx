"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "\u25C8", exact: true },
  { href: "/admin/pipeline", label: "Pipeline", icon: "\u25EB" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "\u2709" },
  { href: "/admin/clients", label: "Clients", icon: "\u25C9" },
  { href: "/admin/proposals", label: "Proposals", icon: "\u25F3" },
  { href: "/admin/settings/packages", label: "Settings", icon: "\u2699" },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-60 flex-col border-r border-[var(--accent-border)] bg-[var(--bg-dark)] shrink-0",
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 md:relative md:translate-x-0 md:z-auto",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-[var(--accent-border)] px-6">
        <Link href="/admin" className="text-xl font-black font-heading text-[var(--accent)]">
          COOK<span className="text-[var(--text)]">/</span>Media
        </Link>
        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text)] md:hidden"
          aria-label="Close sidebar"
        >
          <span className="text-xl" aria-hidden="true">{"\u2715"}</span>
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-[var(--accent-glow)] text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--accent-border)] p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-deep)] text-sm font-semibold">
            CC
          </div>
          <div className="text-sm">
            <p className="font-medium text-[var(--text)]">Corey Cook</p>
            <p className="text-xs text-[var(--text-muted)]">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
