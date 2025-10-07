"use client";

import { AuthForm, AuthValues } from "@/components/auth/AuthForm";
import AuthLayout from "@/components/layout/AuthLayout";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const onSubmit = async (data: AuthValues) => {
    try {
      await fetcher<{
        apiKey: string;
        token: string;
        role: string;
      }>("register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Registration successful. Please login.");
      router.push("/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <AuthLayout>
      <AuthForm route="register" onSubmit={onSubmit} />
      <p className="text-sm mt-4 text-foreground/80">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
