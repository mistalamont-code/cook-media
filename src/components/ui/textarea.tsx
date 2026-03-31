"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-[0.8rem] font-medium uppercase tracking-[0.5px] text-[var(--text-muted)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "block w-full rounded border border-[var(--accent-border)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]/50 focus-visible:border-[var(--accent)] focus-visible:ring-0 focus:outline-none transition-[border-color] duration-300 resize-y min-h-[80px] max-h-[300px]",
            error && "border-[var(--warning)] focus-visible:border-[var(--warning)]",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-[var(--warning)]" role="alert">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
