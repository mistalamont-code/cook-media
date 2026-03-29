"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-xs font-medium uppercase tracking-wider text-brand-text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "block w-full rounded border border-white/10 bg-brand-surface px-4 py-3 text-sm text-brand-text placeholder:text-brand-text-muted/50 focus-visible:border-brand-red focus-visible:ring-2 focus-visible:ring-brand-red/20 focus:outline-none transition-[color,border-color,box-shadow] duration-300",
            error && "border-brand-error focus-visible:border-brand-error focus-visible:ring-brand-error/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-brand-error" role="alert">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
