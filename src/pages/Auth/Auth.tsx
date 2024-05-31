// Import necessary dependencies and components
import React, { useState, useRef, useEffect } from "react";
import { z } from "zod"; // Import Zod for schema validation
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { supabase } from "../../utils/client"; // Import Supabase client
import Footer from "../../components/Footer"; // Import Footer component
import Button from "../../components/Button"; // Import Button component
import {
  SignUpSchema,
  LogInSchema,
  ForgotPasswordSchema,
} from "../../utils/schema"; // Import schemas for validation
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { login } from "../../utils/features/Auth/authSlice"; // Import login action
import { Slide, toast, TypeOptions } from "react-toastify"; // Import toast notifications
import { useNavigate } from "react-router-dom";

// Define the structure of a user
interface USER {
  username: string;
  email: string;
  pass: string;
}

/**
 * Component for user authentication.
 */
function Auth() {
  // Hooks
  const navigate = useNavigate(); // Use navigate for navigation
  const dispatch = useDispatch(); // Use dispatch for state management
  const [isLogin, setLogin] = useState(true); // State to toggle between login and signup
  const [isForgotPassword, setForgotPassword] = useState(false); // State to handle forgot password flow
  const [email, setEmail] = useState(""); // State to store email input
  const [userData, setUserData] = useState<USER>({ // State to manage user data (username, email, password)
    username: "",
    email: "",
    pass: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({}); // State to store form validation errors
  const [autoFillData, setAutoFillData] = useState<USER | null>(null); // State to store auto-filled user data

  const formRef = useRef<HTMLFormElement>(null); // Reference to the form element

  // Function to toggle between login and signup forms
  const handleAuthRequest = () => setLogin(!isLogin);

  // Function to toggle forgot password flow
  const handleForgotPasswordRequest = () => setForgotPassword(!isForgotPassword);

  // Function to handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  // Define type for toast notifications
  type ToastType = TypeOptions;

  // Function to display toast notifications
  const toastNotification = (message: string, type: ToastType) => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
      transition: Slide,
    });
  };

  // Function to handle signup process
  const handleSignup = async () => {
    try {
      // Validate user input using SignUpSchema
      const validateData = SignUpSchema.parse({
        username: userData.username,
        email: userData.email,
        password: userData.pass,
      });

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(validateData.password, 10);

      // Insert user data into the database
      const { error } = await supabase.from("users").insert([{
        username: validateData.username,
        email: validateData.email,
        password: hashedPassword,
      }]);

      // Handle error if user already exists
      if (error) {
        setErrors({ general: ["User Already Exists"] });
        toastNotification("User Already Exists !", "error");
        return;
      } else {
        // Auto-fill user data and show success message
        setAutoFillData({
          username: validateData.username,
          email: validateData.email,
          pass: validateData.password,
        });
        setLogin(true);
        toastNotification("New User Created !!", "success");
      }
    } catch (err) {
      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        const newErrors = err.flatten().fieldErrors;
        setErrors(
          Object.keys(newErrors).reduce((acc, key) => {
            acc[key] = newErrors[key] ?? [];
            return acc;
          }, {} as Record<string, string[]>)
        );
      }
    }
  };

  // Function to handle password reset process
  const handleResetPassword = async () => {
    try {
      // Validate email for password reset
      const validateData = ForgotPasswordSchema.parse({ email });

      // Send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(
        validateData.email
      );

      // Handle error if email is not sent
      if (error) {
        setErrors({ email: ["Error sending password reset email"] });
        toastNotification("Error sending password reset email", "error");
        return;
      } else {
        // Show success message if email is sent
        setForgotPassword(false);
        toastNotification("Password reset email sent!", "success");
      }
    } catch (err) {
      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        const newErrors = err.flatten().fieldErrors;
        setErrors(
          Object.keys(newErrors).reduce((acc, key) => {
            acc[key] = newErrors[key] ?? [];
            return acc;
          }, {} as Record<string, string[]>)
        );
      }
    }
  };

  // Function to handle login process
  const handleLogin = async () => {
    try {
      // Validate user input using LogInSchema
      const validateData = LogInSchema.parse({
        username: userData.username,
        password: userData.pass,
      });

      // Fetch user data from the database
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", validateData.username);

      // Handle error if user not found or credentials are incorrect
      if (error || data.length === 0) {
        setErrors({ username: ["User not found or credentials are incorrect"] });
        toastNotification("Credentials are incorrect !!", "error");
        return;
      }

      // Compare hashed password with the provided password
      const user = data[0];
      const isPasswordValid = await bcrypt.compare(validateData.password, user.password);

      // Handle error if password is incorrect
      if (!isPasswordValid) {
        setErrors({ password: ["Incorrect password"] });
        toastNotification("Credentials are incorrect !!", "error");
        return;
      }

      // Show success message, dispatch login action, and navigate to home page
      toastNotification("User LoggedIn !!", "success");
      dispatch(login({ username: validateData.username }));
      navigate("/home");

    } catch (err) {
      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        const newErrors = err.flatten().fieldErrors;
        setErrors(
          Object.keys(newErrors).reduce((acc, key) => {
            acc[key] = newErrors[key] ?? [];
            return acc;
          }, {} as Record<string, string[]>)
        );
      } else {
        // Handle other types of errors (optional)
        console.error(err);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isForgotPassword) {
      handleResetPassword();
    } else if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  // Effect to autofill data
  useEffect(() => {
    if (autoFillData) {
      setUserData(autoFillData);
    }
  }, [autoFillData]);

  // JSX
  return (
    <>
      <div className="text-m">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          {/* Conditional rendering based on isLogin state */}
          {isLogin ? (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="password"
                name="pass"
                placeholder="Password"
                value={userData.pass}
                onChange={handleInputChange}
                className="input"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="password"
                name="pass"
                placeholder="Password"
                value={userData.pass}
                onChange={handleInputChange}
                className="input"
              />
            </>
          )}
          {/* Conditional rendering for forgot password */}
          {isForgotPassword && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          )}
          {/* Conditional rendering for error messages */}
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500">
              {Object.values(errors).map((errs, idx) => (
                <div key={idx}>
                  {errs.map((err, index) => (
                    <p key={index}>{err}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
          {/* Submit button */}
          <Button type="submit">{isForgotPassword ? "Reset Password" : isLogin ? "Login" : "Signup"}</Button>
        </form>
        {/* Toggle buttons */}
        <div className="flex flex-col">
          <Button onClick={handleAuthRequest} className="mt-4">
            {isLogin ? "New User? Create an account" : "Already have an account? Login"}
          </Button>
          <Button onClick={handleForgotPasswordRequest} className="mt-2">
            {isLogin ? "Forgot Password?" : "Back to Login"}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Auth;