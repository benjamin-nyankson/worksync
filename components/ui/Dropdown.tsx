// components/ui/Dropdown.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

export type DropdownItem = {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  separator?: boolean; // allows a divider before item
};

interface DropdownProps {
  trigger: ReactNode;
  label?: string;
  items: DropdownItem[];
  align?: "start" | "center" | "end";
}

export function Dropdown({
  trigger,
  label,
  items,
  align = "end",
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="bg-background text-foreground border border-foreground/10 shadow-lg"
      >
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {items.map((item, idx) =>
          item.separator ? (
            <DropdownMenuSeparator key={`sep-${idx}`} />
          ) : (
            <DropdownMenuItem
              key={idx}
              onClick={item.onClick}
              disabled={item.disabled}
              className="flex items-center gap-2 cursor-pointer focus:bg-primary/10"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
