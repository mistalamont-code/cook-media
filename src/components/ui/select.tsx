"use client";

import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, placeholder, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-[0.8rem] font-medium uppercase tracking-[0.5px] text-[var(--text-muted)]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            "block w-full rounded border border-[var(--accent-border)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text)] focus-visible:border-[var(--accent)] focus-visible:ring-0 focus:outline-none transition-[border-color] duration-300",
            error && "border-[var(--warning)] focus-visible:border-[var(--warning)]",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-[var(--warning)]" role="alert">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
export type { SelectProps };
