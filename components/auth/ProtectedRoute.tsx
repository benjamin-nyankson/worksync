"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import { Sidebar } from "../layout/Sidebar";
import { isTokenExpired, logoutUser, decodeToken } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "Admin" | "User";
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (isTokenExpired(token)) {
      logoutUser();
      return;
    }

    const decoded = decodeToken(token);
    if (decoded) {
      localStorage.setItem("role", decoded.role);
    }

    if (role === "Admin" && userRole !== "Admin") {
      router.replace("/dashboard");
      return;
    }

    setIsChecking(false);
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
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-background">{children}</main>
      </div>
      <Footer />
    </>
  );
}
