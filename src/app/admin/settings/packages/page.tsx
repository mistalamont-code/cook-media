"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

const serviceTypeOptions = [
  { value: "WEDDING", label: "Wedding" },
  { value: "LIVE_SOUND", label: "Live Sound" },
  { value: "SPEAKING_BOOK", label: "Speaking / Book" },
];

export default function PackagesSettingsPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState<string | null>(null);
  const [editingAddon, setEditingAddon] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // New package form state
  const [showNewPkg, setShowNewPkg] = useState(false);
  const [newPkgName, setNewPkgName] = useState("");
  const [newPkgPrice, setNewPkgPrice] = useState("");
  const [newPkgServiceType, setNewPkgServiceType] = useState("WEDDING");
  const [newPkgDeliverables, setNewPkgDeliverables] = useState("");
  const [savingPkg, setSavingPkg] = useState(false);

  // New add-on form state
  const [showNewAddon, setShowNewAddon] = useState(false);
  const [newAddonName, setNewAddonName] = useState("");
  const [newAddonPrice, setNewAddonPrice] = useState("");
  const [newAddonServiceType, setNewAddonServiceType] = useState("WEDDING");
  const [savingAddon, setSavingAddon] = useState(false);

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

  async function createPackage() {
    if (!newPkgName || !newPkgPrice) return;
    setSavingPkg(true);
    const price = Math.round(parseFloat(newPkgPrice) * 100);
    const deliverables = newPkgDeliverables
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);
    const res = await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newPkgName,
        price,
        serviceType: newPkgServiceType,
        deliverables,
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setPackages((prev) => [created, ...prev]);
      setShowNewPkg(false);
      setNewPkgName("");
      setNewPkgPrice("");
      setNewPkgServiceType("WEDDING");
      setNewPkgDeliverables("");
    }
    setSavingPkg(false);
  }

  async function createAddOn() {
    if (!newAddonName || !newAddonPrice) return;
    setSavingAddon(true);
    const price = Math.round(parseFloat(newAddonPrice) * 100);
    const res = await fetch("/api/addons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newAddonName,
        price,
        serviceType: newAddonServiceType,
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setAddOns((prev) => [created, ...prev]);
      setShowNewAddon(false);
      setNewAddonName("");
      setNewAddonPrice("");
      setNewAddonServiceType("WEDDING");
    }
    setSavingAddon(false);
  }

  async function toggleAddOnActive(id: string, active: boolean) {
    await fetch(`/api/addons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    setAddOns((prev) => prev.map((a) => (a.id === id ? { ...a, active: !active } : a)));
  }

  if (loading) return <p className="text-brand-text-muted">Loading settings...</p>;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Packages */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Packages</CardTitle>
            {!showNewPkg && (
              <Button size="sm" onClick={() => setShowNewPkg(true)}>
                Add Package
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {showNewPkg && (
              <div className="rounded-lg border border-brand-red/30 bg-brand-card p-4 space-y-4">
                <p className="text-sm font-semibold text-brand-red">New Package</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Name"
                    id="new-pkg-name"
                    placeholder="e.g., Premium Wedding"
                    value={newPkgName}
                    onChange={(e) => setNewPkgName(e.target.value)}
                  />
                  <Input
                    label="Price ($)"
                    id="new-pkg-price"
                    type="number"
                    placeholder="e.g., 3500"
                    value={newPkgPrice}
                    onChange={(e) => setNewPkgPrice(e.target.value)}
                  />
                </div>
                <Select
                  label="Service Type"
                  id="new-pkg-service"
                  options={serviceTypeOptions}
                  value={newPkgServiceType}
                  onChange={(e) => setNewPkgServiceType(e.target.value)}
                />
                <Textarea
                  label="Deliverables (one per line)"
                  id="new-pkg-deliverables"
                  placeholder={"8 hours of coverage\nEdited highlight reel\n500+ edited photos"}
                  value={newPkgDeliverables}
                  onChange={(e) => setNewPkgDeliverables(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-3">
                  <Button size="sm" onClick={createPackage} disabled={savingPkg || !newPkgName || !newPkgPrice}>
                    {savingPkg ? "Saving..." : "Save Package"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowNewPkg(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
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
          <div className="flex items-center justify-between">
            <CardTitle>Add-ons</CardTitle>
            {!showNewAddon && (
              <Button size="sm" onClick={() => setShowNewAddon(true)}>
                Add Add-on
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {showNewAddon && (
              <div className="rounded-lg border border-brand-red/30 bg-brand-card p-4 space-y-4">
                <p className="text-sm font-semibold text-brand-red">New Add-on</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Name"
                    id="new-addon-name"
                    placeholder="e.g., Drone Footage"
                    value={newAddonName}
                    onChange={(e) => setNewAddonName(e.target.value)}
                  />
                  <Input
                    label="Price ($)"
                    id="new-addon-price"
                    type="number"
                    placeholder="e.g., 500"
                    value={newAddonPrice}
                    onChange={(e) => setNewAddonPrice(e.target.value)}
                  />
                </div>
                <Select
                  label="Service Type"
                  id="new-addon-service"
                  options={serviceTypeOptions}
                  value={newAddonServiceType}
                  onChange={(e) => setNewAddonServiceType(e.target.value)}
                />
                <div className="flex gap-3">
                  <Button size="sm" onClick={createAddOn} disabled={savingAddon || !newAddonName || !newAddonPrice}>
                    {savingAddon ? "Saving..." : "Save Add-on"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowNewAddon(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
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
