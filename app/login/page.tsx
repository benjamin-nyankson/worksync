"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { z } from "zod";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { User } from "@/interface/interface";

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("worksync_jwt");
    if (token) {
      // optionally also check role
      const role = localStorage.getItem("worksync_role");
      router.replace(role === "admin" ? "/admin" : "/dashboard");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginValues) => {
    try {
      const res = await fetcher<{
        apiKey: string;
        token: string;
        role: string;
        user: User;
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("worksync_api_key", res.apiKey);
      localStorage.setItem("worksync_jwt", res.token);
      localStorage.setItem("worksync_role", res.role);
      localStorage.setItem("user_data", JSON.stringify(res.user));
      router.push(res.role === "admin" ? "/admin" : "/dashboard");
      toast.success("Login successful");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6">Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
          placeholder="Email"
        />
        <InputField
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
          placeholder="******"
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="text-sm mt-4 text-foreground/80">
        Don’t have an account?{" "}
        <a href="/register" className="text-primary hover:underline">
          Register
        </a>
      </p>
    </AuthLayout>
  );
}
