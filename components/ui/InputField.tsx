"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium">{label}</label>
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
