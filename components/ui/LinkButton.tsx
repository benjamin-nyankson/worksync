import Link, { LinkProps } from "next/link";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/Button"; // reuse your Button variants
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
}

export function LinkButton({
  href,
  children,
  variant,
  size,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  );
}
