import {z} from "zod";

/**
 *  @Note sign-up and login schema for user auth
 */
const SignUpSchema = z.object({
  username: z.string().refine(value => value.trim() !== "", {
    message: "Username is required",
    path: ['username']
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must at least 5 characters long" })
});

const LogInSchema = z.object({
  username: z.string().refine(value => value.trim() !== "", {
    message: "Username is required",
    path: ['username']
  }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" })
})

export { SignUpSchema, LogInSchema};