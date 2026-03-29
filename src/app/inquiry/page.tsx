import { InquiryForm } from "@/components/inquiry-form";
import Link from "next/link";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string; service?: string }>;
}) {
  const { embed, service } = await searchParams;
  const isEmbed = embed === "true";

  return (
    <div className={isEmbed ? "p-4" : "min-h-screen bg-brand-bg"}>
      {!isEmbed && (
        <header className="border-b border-white/8 bg-brand-card">
          <div className="mx-auto max-w-3xl flex items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold font-heading">
              COOK<span className="text-brand-red">/</span>Media
            </Link>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-3xl px-4 py-8">
        {!isEmbed && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Let&apos;s Work Together</h1>
            <p className="text-brand-text-muted mt-2">
              Tell us about your project and we&apos;ll put together a custom proposal.
            </p>
          </div>
        )}
        <InquiryForm defaultService={service} />
      </div>
    </div>
  );
}
