import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(5,"User name must not be less than 5 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
  username: z.string().min(2, "username is required"),
});
