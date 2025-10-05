// components/auth/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "admin" | "user";
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("worksync_jwt");
    const userRole = localStorage.getItem("worksync_role");

    if (!token) {
      router.replace("/login");
    } else if (role && userRole !== role) {
      router.replace("/dashboard");
    } else {
      setIsChecking(false);
    }
  }, [router, role]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar /> {children}
      <Footer />
    </>
  );
}
