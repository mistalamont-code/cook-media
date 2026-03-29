import { formatCurrencyShort } from "@/lib/utils";

interface ProposalData {
  clientName: string;
  packageName: string;
  packagePrice: number;
  totalPrice: number;
  deliverables: string[];
  addOns: Array<{ name: string; price: number }>;
  customNotes: string | null;
  serviceType: string;
  validUntil: string | null;
}

export function ProposalPreview({ data }: { data: ProposalData }) {
  const retainer = Math.round(data.totalPrice / 2);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-brand-purple rounded-t-2xl px-8 py-10 text-center text-white">
        <h1 className="text-3xl font-bold font-heading">
          COOK<span className="text-brand-gold">/</span>Media
        </h1>
        <p className="text-purple-200 mt-2 text-sm">
          Photography &bull; Videography &bull; Live Sound &bull; Publishing
        </p>
      </div>

      <div className="bg-white border border-t-0 border-brand-border rounded-b-2xl shadow-sm">
        {/* Client greeting */}
        <div className="px-8 py-8 border-b border-brand-border">
          <h2 className="text-2xl font-bold font-heading text-brand-text">
            Proposal for {data.clientName}
          </h2>
          <p className="text-brand-text-muted mt-2">
            Thank you for considering Cook/Media for your {data.serviceType.toLowerCase().replace("_", " ")} needs.
            We&apos;ve put together the following package based on your requirements.
          </p>
        </div>

        {/* Package */}
        <div className="px-8 py-6 border-b border-brand-border">
          <h3 className="text-lg font-semibold font-heading text-brand-text mb-4">
            {data.packageName}
          </h3>
          <ul className="space-y-2">
            {data.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-brand-gold font-bold mt-0.5">✓</span>
                <span className="text-brand-text">{d}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-brand-text-muted">Package Price</span>
            <span className="font-semibold">{formatCurrencyShort(data.packagePrice)}</span>
          </div>
        </div>

        {/* Add-ons */}
        {data.addOns.length > 0 && (
          <div className="px-8 py-6 border-b border-brand-border">
            <h3 className="text-sm font-semibold text-brand-text-muted mb-3">Add-ons</h3>
            {data.addOns.map((a, i) => (
              <div key={i} className="flex justify-between text-sm py-1.5">
                <span>{a.name}</span>
                <span>{formatCurrencyShort(a.price)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Total */}
        <div className="px-8 py-6 border-b border-brand-border bg-gray-50/50">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-heading">Total</span>
            <span className="text-2xl font-bold text-brand-purple">{formatCurrencyShort(data.totalPrice)}</span>
          </div>
          <div className="mt-3 space-y-1 text-sm text-brand-text-muted">
            <p>50% non-refundable retainer to reserve your date: <strong className="text-brand-text">{formatCurrencyShort(retainer)}</strong></p>
            <p>Balance of <strong className="text-brand-text">{formatCurrencyShort(data.totalPrice - retainer)}</strong> due before event date</p>
          </div>
        </div>

        {/* Custom notes */}
        {data.customNotes && (
          <div className="px-8 py-6 border-b border-brand-border">
            <h3 className="text-sm font-semibold text-brand-text-muted mb-2">Additional Notes</h3>
            <p className="text-sm text-brand-text whitespace-pre-wrap">{data.customNotes}</p>
          </div>
        )}

        {/* Validity */}
        {data.validUntil && (
          <div className="px-8 py-4 text-center text-xs text-brand-text-muted">
            This proposal is valid until {new Date(data.validUntil).toLocaleDateString()}
          </div>
        )}

        {/* Footer */}
        <div className="px-8 py-6 text-center bg-gray-50/50 rounded-b-2xl">
          <p className="text-xs text-brand-text-muted">
            Cook Media LLC &bull; Erie, PA &bull; cook-media.com
          </p>
          <p className="text-xs text-brand-text-muted mt-1">
            Copyright ownership retained by Cook Media LLC. Client receives personal use license.
          </p>
        </div>
      </div>
    </div>
  );
}
