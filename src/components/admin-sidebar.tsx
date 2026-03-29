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

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-60 flex-col border-r border-white/8 bg-brand-dark shrink-0",
        // Mobile: fixed overlay, slide in/out
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 md:relative md:translate-x-0 md:z-auto",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/8 px-6">
        <Link href="/admin" className="text-xl font-black font-heading">
          COOK<span className="text-brand-red">/</span>Media
        </Link>
        {/* Close button on mobile */}
        <button
          onClick={onClose}
          className="text-brand-text-muted hover:text-brand-text md:hidden"
          aria-label="Close sidebar"
        >
          <span className="text-xl" aria-hidden="true">✕</span>
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-brand-red/10 text-brand-red"
                  : "text-brand-text-muted hover:bg-white/5 hover:text-brand-text"
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/8 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-brand-red flex items-center justify-center text-white text-sm font-semibold">
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
