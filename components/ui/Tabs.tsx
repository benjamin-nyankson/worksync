"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultValue, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue || tabs[0]?.value);

  const handleSelect = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className={cn("flex border-b border-foreground/10", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleSelect(tab.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all border-b-2",
            active === tab.value
              ? "text-primary border-primary"
              : "text-foreground/60 border-transparent hover:text-primary/80"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
