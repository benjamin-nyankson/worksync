"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  error?: string;
  disabled?: boolean;
}

export function SelectField({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  error,
  disabled,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      {label && <Label className="text-foreground">{label}</Label>}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full bg-background border border-foreground/20 text-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
