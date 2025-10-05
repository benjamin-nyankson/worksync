"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface UnprotectedLayoutProps {
  children: ReactNode;
}

export function UnprotectedLayout({ children }: UnprotectedLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
