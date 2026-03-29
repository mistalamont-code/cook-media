"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn, formatCurrencyShort } from "@/lib/utils";

interface Client { id: string; name: string; email: string }
interface Package { id: string; name: string; price: number; deliverables: string[]; serviceType: string }
interface AddOn { id: string; name: string; price: number; serviceType: string }

export default function NewProposalPageWrapper() {
  return (
    <Suspense fallback={<p className="text-brand-text-muted">Loading...</p>}>
      <NewProposalPage />
    </Suspense>
  );
}

function NewProposalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClientId = searchParams.get("clientId") || "";

  const [clients, setClients] = useState<Client[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);

  const [clientId, setClientId] = useState(preselectedClientId);
  const [packageId, setPackageId] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/clients").then((r) => r.json()),
      fetch("/api/packages").then((r) => r.json()),
      fetch("/api/addons").then((r) => r.json()),
    ]).then(([c, p, a]) => {
      setClients(c);
      setPackages(p);
      setAddOns(a);
    });
  }, []);

  const selectedPkg = packages.find((p) => p.id === packageId);
  const filteredAddOns = selectedPkg
    ? addOns.filter((a) => a.serviceType === selectedPkg.serviceType)
    : [];

  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);

  const total = (selectedPkg?.price || 0) + addOnsTotal;

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    const res = await fetch("/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        packageId,
        addOnIds: selectedAddOns,
        customNotes: customNotes || null,
      }),
    });
    const proposal = await res.json();
    router.push(`/admin/proposals/${proposal.id}`);
  }

  return (
    <div className="max-w-3xl space-y-8">
      <h2 className="text-2xl font-bold">Create Proposal</h2>

      {/* Client Select */}
      <Select
        label="Client"
        options={clients.map((c) => ({ value: c.id, label: `${c.name} (${c.email})` }))}
        placeholder="Select a client"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      />

      {/* Package Selection */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-brand-text">Package</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              hover
              onClick={() => {
                setPackageId(pkg.id);
                setSelectedAddOns([]);
              }}
              className={cn(
                "cursor-pointer",
                packageId === pkg.id && "ring-2 ring-brand-purple"
              )}
            >
              <CardTitle className="text-base">{pkg.name}</CardTitle>
              <p className="text-2xl font-bold text-brand-purple mt-2">
                {formatCurrencyShort(pkg.price)}
              </p>
              <ul className="mt-3 space-y-1">
                {pkg.deliverables.map((d, i) => (
                  <li key={i} className="text-xs text-brand-text-muted flex items-start gap-1.5">
                    <span className="text-brand-gold mt-0.5">✓</span> {d}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      {filteredAddOns.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-brand-text">Add-ons</p>
          <div className="space-y-2">
            {filteredAddOns.map((addon) => (
              <label
                key={addon.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border border-brand-border p-3 cursor-pointer transition-colors",
                  selectedAddOns.includes(addon.id) && "border-brand-purple bg-brand-purple/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addon.id)}
                    onChange={() => toggleAddOn(addon.id)}
                    className="rounded border-brand-border text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-sm">{addon.name}</span>
                </div>
                <span className="text-sm font-medium">{formatCurrencyShort(addon.price)}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Custom Notes */}
      <Textarea
        label="Custom Notes (optional)"
        placeholder="Add any personalized notes for the client..."
        value={customNotes}
        onChange={(e) => setCustomNotes(e.target.value)}
        rows={3}
      />

      {/* Total + Submit */}
      <Card className="bg-gray-50">
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="text-sm text-brand-text-muted">Total</p>
            <p className="text-3xl font-bold text-brand-purple">{formatCurrencyShort(total)}</p>
            {total > 0 && (
              <p className="text-xs text-brand-text-muted mt-1">
                50% retainer: {formatCurrencyShort(Math.round(total / 2))}
              </p>
            )}
          </div>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!clientId || !packageId || submitting}
          >
            {submitting ? "Creating..." : "Create Proposal"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
