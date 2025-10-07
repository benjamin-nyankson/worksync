"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/Button";
import { InputField } from "../ui/InputField";

export function AuthForm({
  route,
  onSubmit,
}: {
  route: "login" | "register";
  onSubmit: (data: AuthValues) => Promise<void>;
}) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role");
      router.replace(role === "admin" ? "/admin" : "/dashboard");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({ resolver: zodResolver(schema) });

  
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">
        {route === "register" ? "Create an account" : "Login to your account"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="User Name"
          error={errors.username?.message}
          {...register("username")}
          placeholder="john.doe"
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
          loading={isSubmitting}
        >
          {route === "register" ? "Register" : "Login"}
        </Button>
      </form>
    </>
  );
}

export const schema = z.object({
  username: z.string().min(5, "User name must not be less than 5 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthValues = z.infer<typeof schema>;
