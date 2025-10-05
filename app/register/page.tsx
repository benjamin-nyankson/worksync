"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import { z } from "zod";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
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
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterValues) => {
    try {
      const res = await fetcher<{
        apiKey: string;
        token: string;
        role: string;
      }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("worksync_api_key", res.apiKey);
      localStorage.setItem("worksync_jwt", res.token);
      router.push(res.role === "admin" ? "/admin" : "/dashboard");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6">Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />
        <InputField
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <InputField
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
      <p className="text-sm mt-4 text-foreground/80">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Login
        </a>
      </p>
    </AuthLayout>
  );
}
