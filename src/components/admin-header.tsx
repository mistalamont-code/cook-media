"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/pipeline": "Pipeline",
  "/admin/inquiries": "Inquiries",
  "/admin/clients": "Clients",
  "/admin/proposals": "Proposals",
  "/admin/settings/packages": "Settings",
};

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const pathname = usePathname();

  const title = Object.entries(pageTitles)
    .sort(([a], [b]) => b.length - a.length)
    .find(([path]) => pathname.startsWith(path))?.[1] || "Dashboard";

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--accent-border)] bg-[var(--glass-bg)] backdrop-blur-[20px] px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-[var(--text-muted)] hover:text-[var(--text)] text-xl md:hidden"
          aria-label="Toggle sidebar"
        >
          <span aria-hidden="true">{"\u2630"}</span>
        </button>
        <h1 className="text-lg font-semibold text-[var(--text)]">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--text-muted)]">
          COOK<span className="text-[var(--accent)]">/</span>Media Admin
        </span>
      </div>
    </header>
  );
}
