"use client";

import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullscreen?: boolean;
  text?: string;
}

export function Loader({ size = "md", fullscreen = false, text }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  }[size];

  const loader = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={cn(
          "rounded-full border-t-transparent animate-spin",
          "border-primary",
          sizeClasses
        )}
        style={{
          borderColor: "var(--color-primary)",
          borderTopColor: "transparent",
        }}
      />
      {text && <p className="text-sm text-foreground/70">{text}</p>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  return loader;
}
