import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "../../utils/client";
import { LogInSchema, ForgotPasswordSchema } from "../../utils/schema";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../utils/features/Auth/authSlice";
import { Slide, toast, TypeOptions } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface USER {
    username: string;
    email: string;
    pass: string;
    createdAt: string | null;
}

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isForgotPassword, setForgotPassword] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState<USER>({
        username: "admin",
        email: "",
        pass: "Admin@123",
        createdAt: new Date().toISOString(),
    });
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const formRef = useRef<HTMLFormElement>(null);

    const handleForgotPasswordRequest = () => setForgotPassword(!isForgotPassword);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: [] }));
    };

    type ToastType = TypeOptions;

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

    const handleGoogleSignIn = async () => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.href}oauth`,
                },
            });
        } catch (err) {
            console.log(err);
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

    const handleResetPassword = async () => {
        try {
            const validateData = ForgotPasswordSchema.parse({ email });

            const { error } = await supabase.auth.resetPasswordForEmail(
                validateData.email
            );

            if (error) {
                setErrors({ email: ["Error sending password reset email"] });
                toastNotification("Error sending password reset email", "error");
                return;
            } else {
                setForgotPassword(false);
                toastNotification("Password reset email sent!", "success");
            }
        } catch (err) {
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

    const handleLogin = async () => {
        try {
            const validateData = LogInSchema.parse({
                username: userData.username,
                password: userData.pass,
            });

            if (
                validateData.username === "admin" &&
                validateData.password === "Admin@123"
            ) {
                dispatch(adminLogin({ username: "admin" }));
                toastNotification("Admin Logged In !!", "success");
                navigate("/admin");
                return;
            }

        } catch (err) {
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


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isForgotPassword) {
            handleResetPassword();
        } else {
            handleLogin();
        }
    };

    return (
        <>
            <div className="text-mynavy flex md:flex-row-reverse flex-col my-12">
                <div className="flex items-center justify-center flex-1 bg-white text-black">
                    <div className="text-center flex justify-center">
                        <img
                            src="/images/winter1.jpg"
                            className="rounded-[4rem] md:block md:h-[38rem] hidden"
                            alt="image"
                        />
                        <img
                            src="/logo.png"
                            className="md:hidden block w-1/2 "
                            alt="image"
                        />
                    </div>
                </div>
                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center px-6">
                    <div className="max-w-md w-full">
                        <h1 className="text-3xl font-bold mb-1 text-black text-center tracking-wider">
                            {isForgotPassword ? "Reset Password" : "Admin Login"}
                        </h1>
                        <div className="text-md text-[#636364] mb-4 text-center tracking-wider">
                            <p>Please enter your details</p>
                        </div>
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-4 w-full"
                        >
                            {isForgotPassword ? (
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                    >
                                        Email
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-2 p-2 w-full placeholder:text-sm shadow border border-[#C4C4C4] rounded-xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 mb-6"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setErrors((prev) => ({ ...prev, email: [] }));
                                        }}
                                    />
                                    {errors.email && (
                                        <ul className="px-2 text-xs mt-1" style={{ color: "red" }}>
                                            {errors.email.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <button
                                        className="bg-mygreen hover:bg-myyellow text-mywhite w-full text-[1rem] shadow-lg rounded-xl py-2.5"
                                        onClick={handleResetPassword}
                                    >
                                        Reset
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Enter your username"
                                            className="mt-2 p-2 w-full placeholder:text-sm  border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                            value={userData.username}
                                            onChange={handleInputChange}
                                        />
                                        {errors.username && (
                                            <ul
                                                className="px-2 text-xs mt-1"
                                                style={{ color: "red" }}
                                            >
                                                {errors.username.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <label
                                            htmlFor="pass"
                                            className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                        >
                                            Password
                                        </label>
                                        <input
                                            required
                                            type={isPasswordVisible ? "text" : "password"}
                                            id="pass"
                                            name="pass"
                                            placeholder="Enter your password"
                                            className="mt-2 p-2 w-full placeholder:text-sm border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                            value={userData.pass}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-400"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <FontAwesomeIcon
                                                icon={isPasswordVisible ? faEyeSlash : faEye}
                                            />
                                        </button>
                                        {errors.pass && (
                                            <ul
                                                className="px-2 text-xs mt-1"
                                                style={{ color: "red" }}
                                            >
                                                {errors.pass.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="flex justify-end text-sm text-gray-600 tracking-wider">
                                        <button
                                            type="button"
                                            onClick={handleForgotPasswordRequest}
                                            className="hover:text-mygreen transition-colors duration-300"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="bg-mygreen text-mywhite text-[1rem] shadow-lg rounded-xl py-2.5 px-10 hover:bg-myyellow transition-colors duration-300"
                                        >
                                            Log In
                                        </button>
                                    </div>
                                    <div className="relative flex justify-center items-center mt-4">
                                        <div className="border-t border-gray-300 flex-grow mr-2"></div>
                                        <div className="text-sm text-gray-600 tracking-wider">
                                            Or continue with
                                        </div>
                                        <div className="border-t border-gray-300 flex-grow ml-2"></div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <button
                                            type="button"
                                            onClick={handleGoogleSignIn}
                                            className="bg-red-500 text-white text-[1rem] shadow-lg rounded-xl py-2.5 px-10 hover:bg-red-600 transition-colors duration-300"
                                        >
                                            Google
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="text-center mt-4 text-sm text-gray-600 tracking-wider">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="hover:text-mygreen transition-colors duration-300"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
