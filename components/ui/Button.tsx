import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-background hover:opacity-90 ",
        secondary: "bg-secondary text-background hover:opacity-90 ",
        outline:
          "border border-foreground text-foreground hover:bg-foreground hover:text-background",
        ghost: " hover:bg-foreground/10 text-foreground",
        danger: "bg-red-600 text-background hover:bg-red-700 ",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {loading ? "Loading..." : children}
    </button>
  );
}
