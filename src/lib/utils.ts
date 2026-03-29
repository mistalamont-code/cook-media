/** Merge Tailwind classes with conflict resolution */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Format cents to USD display string (e.g., 300000 → "$3,000.00") */
export function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

/** Format cents to short USD (e.g., 300000 → "$3,000") — no decimals */
export function formatCurrencyShort(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
