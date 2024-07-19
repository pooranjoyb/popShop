import { z } from "zod";

const getCurrentTime = () => new Date().toISOString();

const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 5 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "Username must contain only letters, numbers, and underscores"
    ),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  firstname: z
    .string()
    .min(3, "First Name must be at least 5 character long")
    .max(20, "First Name must be less than 20 characters"),
  lastname: z
    .string()
    .min(3, "Last Name must be at least 5 character long")
    .max(20, "Last Name must be less than 20 characters"),
  gender: z
    .boolean()
    .refine((val) => val === true || val === false, "Gender must be selected"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only digits"),
  createdAt: z.string().default(getCurrentTime),
  profilePic: z.string().url().optional(),
});

const LogInSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export { SignUpSchema, LogInSchema, ForgotPasswordSchema };
