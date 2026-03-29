import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 min-h-screen">
      <div className="text-center space-y-8 max-w-lg">
        <h1 className="text-6xl font-black tracking-tight font-heading">
          COOK<span className="text-brand-red">/</span>Media
        </h1>
        <div className="w-16 h-0.5 bg-brand-red mx-auto" />
        <p className="text-lg text-brand-text-muted">
          Photography, Videography, Live Sound & Publishing
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center rounded bg-brand-red px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-brand-red-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_20px_rgba(196,30,42,0.3)]"
          >
            Book a Service
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded border border-white/15 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-text hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
