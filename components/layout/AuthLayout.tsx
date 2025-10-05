"use client";

import { appName } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-primary/10 p-12">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Welcome to {appName}
          </h1>
          <p className="text-foreground/80 mb-8">
            Streamline your leave management with ease and confidence.
          </p>
          <Image
            src="/auth.svg"
            alt={`${appName} illustration`}
            width={400}
            height={300}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 sm:px-12 py-10">
        <div className="max-w-md mx-auto w-full">
          <Link
            href="/"
            className="block text-2xl font-bold text-primary mb-8 w-fit"
          >
            {appName}
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
