import { z } from "zod";

const SignUpSchema = z.object({
  username: z
  .string()
  .min(1, { message: "Username is required" }),
  email: z.string()
  .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must at least 5 characters long" }),
});

const LogInSchema = z.object({
  username: z
  .string()
  .min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
});

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export { SignUpSchema, LogInSchema, ForgotPasswordSchema};