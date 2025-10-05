// components/ui/Textarea.tsx
"use client";

import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-foreground/80">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full border border-foreground/20 rounded-md p-3 bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition",
          className
        )}
        rows={5}
        {...props}
      />
    </div>
  );
}
