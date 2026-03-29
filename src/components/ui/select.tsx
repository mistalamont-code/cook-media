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
          <label htmlFor={id} className="block text-xs font-medium uppercase tracking-wider text-brand-text-muted">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            "block w-full rounded border border-white/10 bg-brand-surface px-4 py-3 text-sm text-brand-text focus-visible:border-brand-red focus-visible:ring-2 focus-visible:ring-brand-red/20 focus:outline-none transition-[color,border-color,box-shadow] duration-300",
            error && "border-brand-error focus-visible:border-brand-error focus-visible:ring-brand-error/20",
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
        {error && <p className="text-sm text-brand-error" role="alert">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
export type { SelectProps };
