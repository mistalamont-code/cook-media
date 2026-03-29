import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-5xl font-bold tracking-tight">
          COOK<span className="text-brand-gold">/</span>Media
        </h1>
        <p className="text-lg text-brand-text-muted">
          Photography, Videography, Live Sound & Publishing
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center rounded-lg bg-brand-purple px-6 py-3 text-sm font-medium text-white hover:bg-brand-purple-light transition-colors"
          >
            Book a Service
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-lg border border-brand-border px-6 py-3 text-sm font-medium text-brand-text hover:bg-gray-50 transition-colors"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
