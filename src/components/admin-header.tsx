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

export function AdminHeader() {
  const pathname = usePathname();

  const title = Object.entries(pageTitles)
    .sort(([a], [b]) => b.length - a.length)
    .find(([path]) => pathname.startsWith(path))?.[1] || "Dashboard";

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/8 bg-brand-dark/95 backdrop-blur-xl px-6">
      <h1 className="text-lg font-semibold text-brand-text">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-brand-text-muted">
          COOK<span className="text-brand-red">/</span>Media Admin
        </span>
      </div>
    </header>
  );
}
