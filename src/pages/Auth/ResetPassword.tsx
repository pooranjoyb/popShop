import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { supabase } from "../../utils/client";
import { ForgotPasswordSchema } from "../../utils/schema";
import { Slide, toast, TypeOptions } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface USER {
    pass: string;
    confirmPassword: string;
}

function ResetPassword() {
    const [userData, setUserData] = useState<USER>({
        pass: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const email = localStorage.getItem("email");

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

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

    const handleResetPassword = async () => {
        try {
            const validateData = ForgotPasswordSchema.parse({
                email: email,
                password: userData.pass,
                confirmPassword: userData.confirmPassword,
            });

            console.log("Data Submitted", validateData);

            if (userData.pass !== userData.confirmPassword) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: ["Passwords do not match"],
                }));
                return;
            }

            const { data: user, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();

            console.log("user found", user)

            if (error) {
                toastNotification("User not found", "error");
                return;
            }

            const hashedPassword = await bcrypt.hash(userData.pass, 10);

            const { error: updateError } = await supabase
                .from("users")
                .update({ password: hashedPassword })
                .eq("email", email);

            if (updateError) {
                toastNotification("Failed to update password", "error");
                return;
            }

            toastNotification("Password reset successfully", "success");
        } catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors: Record<string, string[]> = {};
                e.errors.forEach((err) => {
                    if (!fieldErrors[err.path[0]]) {
                        fieldErrors[err.path[0]] = [];
                    }
                    fieldErrors[err.path[0]].push(err.message);
                });
                setErrors(fieldErrors);
            } else {
                toastNotification("An unexpected error occurred", "error");
            }
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
                    <form
                        className="w-full max-w-md bg-white p-6 rounded-lg"
                        onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}
                    >
                        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

                        <div className="mb-4">
                            <label htmlFor="pass" className="block text-sm font-medium text-gray-700">New Password</label>
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    id="pass"
                                    name="pass"
                                    value={userData.pass}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-2"
                                >
                                    <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.pass && errors.pass.map((error, index) => (
                                <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
                            ))}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={userData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-2"
                                >
                                    <FontAwesomeIcon icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.confirmPassword && errors.confirmPassword.map((error, index) => (
                                <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-myyellow bg-mygreen focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
