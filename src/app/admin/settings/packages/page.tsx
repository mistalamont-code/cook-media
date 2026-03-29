"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyShort } from "@/lib/utils";

interface Package {
  id: string;
  serviceType: string;
  name: string;
  price: number;
  deliverables: string[];
  sortOrder: number;
  active: boolean;
}

interface AddOn {
  id: string;
  serviceType: string;
  name: string;
  price: number;
  active: boolean;
}

const serviceTypeLabel: Record<string, string> = {
  WEDDING: "Wedding",
  LIVE_SOUND: "Live Sound",
  SPEAKING_BOOK: "Speaking / Book",
};

export default function PackagesSettingsPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState<string | null>(null);
  const [editingAddon, setEditingAddon] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/packages?activeOnly=false").then((r) => r.json()),
      fetch("/api/addons?activeOnly=false").then((r) => r.json()),
    ]).then(([p, a]) => {
      setPackages(p);
      setAddOns(a);
      setLoading(false);
    });
  }, []);

  async function savePackage(id: string) {
    const price = Math.round(parseFloat(editPrice) * 100);
    const res = await fetch(`/api/packages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, price }),
    });
    const updated = await res.json();
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    setEditingPkg(null);
  }

  async function togglePackageActive(id: string, active: boolean) {
    await fetch(`/api/packages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, active: !active } : p)));
  }

  async function saveAddOn(id: string) {
    const price = Math.round(parseFloat(editPrice) * 100);
    const res = await fetch(`/api/addons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, price }),
    });
    const updated = await res.json();
    setAddOns((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
    setEditingAddon(null);
  }

  async function toggleAddOnActive(id: string, active: boolean) {
    await fetch(`/api/addons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    setAddOns((prev) => prev.map((a) => (a.id === id ? { ...a, active: !active } : a)));
  }

  if (loading) return <p className="text-brand-text-muted">Loading...</p>;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Packages */}
      <Card>
        <CardHeader>
          <CardTitle>Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-center justify-between rounded-lg border border-white/8 p-4"
              >
                {editingPkg === pkg.id ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        type="number"
                        className="w-28"
                      />
                    </div>
                    <Button size="sm" onClick={() => savePackage(pkg.id)}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingPkg(null)}>Cancel</Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{pkg.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{serviceTypeLabel[pkg.serviceType]}</Badge>
                          {!pkg.active && <Badge variant="error" className="text-xs">Inactive</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-brand-red">
                        {formatCurrencyShort(pkg.price)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingPkg(pkg.id);
                          setEditName(pkg.name);
                          setEditPrice((pkg.price / 100).toString());
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => togglePackageActive(pkg.id, pkg.active)}
                      >
                        {pkg.active ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add-ons */}
      <Card>
        <CardHeader>
          <CardTitle>Add-ons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {addOns.map((addon) => (
              <div
                key={addon.id}
                className="flex items-center justify-between rounded-lg border border-white/8 p-4"
              >
                {editingAddon === addon.id ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        type="number"
                        className="w-28"
                      />
                    </div>
                    <Button size="sm" onClick={() => saveAddOn(addon.id)}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingAddon(null)}>Cancel</Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{addon.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{serviceTypeLabel[addon.serviceType]}</Badge>
                          {!addon.active && <Badge variant="error" className="text-xs">Inactive</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{formatCurrencyShort(addon.price)}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingAddon(addon.id);
                          setEditName(addon.name);
                          setEditPrice((addon.price / 100).toString());
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleAddOnActive(addon.id, addon.active)}
                      >
                        {addon.active ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
