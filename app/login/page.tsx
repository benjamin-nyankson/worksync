"use client";

import { AuthForm, AuthValues } from "@/components/auth/AuthForm";
import AuthLayout from "@/components/layout/AuthLayout";
import type { User } from "@/interface/interface";
import { decodeToken } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const onSubmit = async (data: AuthValues) => {
    try {
      const res = await fetcher<{
        apiKey: string;
        token: string;
        role: string;
        user: User;
      }>("auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("api_key", res.apiKey);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user_data", JSON.stringify(decodeToken(res.token)));
      router.push(res?.role === "Admin" ? "/admin" : "/dashboard");
      toast.success("Login successful");
    } catch(error) {
      toast.error((error as {message:string}).message);
    }
  };

  return (
    <AuthLayout>
      <AuthForm route="login" onSubmit={onSubmit} />
      <p className="text-sm mt-4 text-foreground/80">
        Don’t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
