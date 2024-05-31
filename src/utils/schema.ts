import { z } from "zod";

// SignUpSchema
const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]*$/, { message: "Username must contain only letters, numbers, and underscores" }),
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
});

// LogInSchema
const LogInSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
});

// ForgotPasswordSchema
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
});

export { SignUpSchema, LogInSchema, ForgotPasswordSchema };