"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import { Sidebar } from "../layout/Sidebar";

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

    // 🧩 1️⃣ No token → redirect to login
    if (!token) {
      router.replace("/login");
      return;
    }

    // 🧩 2️⃣ Role-based access
    if (role === "admin") {
      // only admins should see admin routes
      if (userRole !== "admin") {
        router.replace("/dashboard");
        return;
      }
    } else if (role === "user") {
      // users can see user routes only
      if (userRole !== "user" && userRole !== "admin") {
        // e.g. if role is unknown
        router.replace("/login");
        return;
      }
    }

    // 🧩 3️⃣ If all checks pass
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
        <div className="w-full">
          <main className="">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
