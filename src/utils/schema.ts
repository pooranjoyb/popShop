import { z } from "zod";

// SignUpSchema
const SignUpSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]*$/, { message: "Username must contain only letters, numbers, and underscores" }),
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(5)
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
});

// LogInSchema
const LogInSchema = z.object({
  username: z
    .string()
    .min(1),
  password: z
    .string()
    .min(1),
});

// ForgotPasswordSchema
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email(),
});

export { SignUpSchema, LogInSchema, ForgotPasswordSchema };
