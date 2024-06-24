import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { supabase } from "../../utils/client";
import {
  SignUpSchema,
  LogInSchema,
  ForgotPasswordSchema,
} from "../../utils/schema";
import { useDispatch } from "react-redux";
import { login } from "../../utils/features/Auth/authSlice";
import { Slide, toast, TypeOptions } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


interface USER {
  username: string;
  email: string;
  pass: string;
  firstname: string;
  lastname: string;
  gender: boolean;
  phone: string;
  createdAt: string | null;
}

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(true);
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
    firstname: "",
    lastname: "",
    phone: "",
    gender: false,
    createdAt: new Date().toISOString(),
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [autoFillData, setAutoFillData] = useState<USER | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleAuthRequest = () => setLogin(!isLogin);
  const handleForgotPasswordRequest = () =>
    setForgotPassword(!isForgotPassword);

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

  const handleSignup = async () => {
    try {
      const validateData = SignUpSchema.parse({
        username: userData.username,
        email: userData.email,
        password: userData.pass,
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
        gender: userData.gender,
        createdAt: userData.createdAt,
      });

      const hashedPassword = await bcrypt.hash(validateData.password, 10);

      const { error } = await supabase.from("users").insert([
        {
          username: validateData.username,
          email: validateData.email,
          password: hashedPassword,
          firstname: validateData.firstname,
          lastname: validateData.lastname,
          gender: validateData.gender ? "female" : "male",
          phone: validateData.phone,
          createdAt: validateData.createdAt,
        },
      ]);

      if (error) {
        setErrors({ general: ["User Already Exists"] });
        toastNotification("User Already Exists !", "error");
        return;
      } else {
        setAutoFillData({
          username: validateData.username,
          email: validateData.email,
          pass: validateData.password,
          firstname: userData.firstname,
          lastname: userData.lastname,
          phone: userData.phone,
          gender: userData.gender,
          createdAt: userData.createdAt,
        });
        setLogin(true);
        toastNotification("New User Created !!", "success");
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

  const handleGoogleSignIn = async () => {
    try {
      console.log(window.location.href)
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.href}oauth`,
        },
      })
    } catch (err) {
      console.log(err)
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

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", validateData.username);

      if (error || data.length === 0) {
        setErrors({
          username: ["User not found or credentials are incorrect"],
        });
        toastNotification("Credentials are incorrect !!", "error");
        return;
      }

      const user = data[0];
      const isPasswordValid = await bcrypt.compare(
        validateData.password,
        user.password
      );

      if (!isPasswordValid) {
        setErrors({ password: ["Incorrect password"] });
        toastNotification("Credentials are incorrect !!", "error");
        return;
      }

      toastNotification("User LoggedIn !!", "success");
      dispatch(login({ username: validateData.username }));
      navigate("/home");
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
    } else if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  useEffect(() => {
    if (autoFillData) {
      setUserData(autoFillData);
    }
  }, [autoFillData]);

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
              {isForgotPassword
                ? "Reset Password"
                : isLogin
                ? "Login"
                : "Sign Up"}
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
                  {!isLogin && (
                    <>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Enter you email"
                          className="mt-2 p-2 w-full placeholder:text-sm  border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                          onChange={handleInputChange}
                        />
                        {errors.email && (
                          <ul
                            className="px-2 text-xs mt-1"
                            style={{ color: "red" }}
                          >
                            {errors.email.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="w-full flex gap-2">
                        <div className="w-1/2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="first name"
                            className="mt-2 p-2 w-full placeholder:text-sm  border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            value={userData.firstname}
                            onChange={handleInputChange}
                          />
                          {errors.firstname && (
                            <ul
                              className="px-2 text-xs mt-1"
                              style={{ color: "red" }}
                            >
                              {errors.firstname.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="w-1/2">
                          <label
                            htmlFor="lastname"
                            className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="last name"
                            className="mt-2 p-2 w-full border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none placeholder:text-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            value={userData.lastname}
                            onChange={handleInputChange}
                          />
                          {errors.lastname && (
                            <ul
                              className="px-2 text-xs mt-1"
                              style={{ color: "red" }}
                            >
                              {errors.lastname.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                      <div className="w-full flex gap-2">
                        <div className="w-1/2 mt-5">
                          <select
                            className="select w-full select-primary select-md max-w-xs"
                            value={userData.gender ? 1 : 0}
                            onChange={(e) => {
                              const genderBoolean = e.target.value === "1";
                              setUserData({
                                ...userData,
                                gender: genderBoolean,
                              });
                            }}
                          >
                            <option disabled value={-1}>
                              Gender
                            </option>
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                          </select>
                          {errors.gender && (
                            <ul
                              className="px-2 text-xs mt-1"
                              style={{ color: "red" }}
                            >
                              {errors.gender.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="w-1/2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="9546897889"
                            className="mt-2 p-2 w-full placeholder:text-sm  border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            value={userData.phone}
                            onChange={handleInputChange}
                          />
                          {errors.phone && (
                            <ul
                              className="px-2 text-xs mt-1"
                              style={{ color: "red" }}
                            >
                              {errors.phone.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="relative">
                  <label
                    htmlFor="pass"
                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                  >
                    Password
                  </label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="pass"
                    name="pass"
                    placeholder="Enter password"
                    className="mt-2 p-2 w-full placeholder:text-sm border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    value={userData.pass}
                    onChange={handleInputChange}
                  />
                  <FontAwesomeIcon
                    icon={isPasswordVisible ? faEyeSlash : faEye}
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 cursor-pointer"
                  />
                  {errors.password && (
                    <ul className="px-2 text-xs mt-1" style={{ color: "red" }}>
                      {errors.password.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}


                    {errors.password && (
                      <ul
                        className="px-2 text-xs mt-1"
                        style={{ color: "red" }}
                      >
                        {errors.password.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-4 text-sm text-gray-600 text-right font-bold tracking-wider">
                    <Link to="#" onClick={handleForgotPasswordRequest}>
                      <span className="text-black hover:underline cursor-pointer">
                        {isForgotPassword
                          ? "Back to Login"
                          : "Forgot Password?"}
                      </span>
                    </Link>
                  </div>
                  <div className="mt-8 flex flex-col">
                    {isLogin ? (
                      <button className="bg-mygreen hover:bg-myyellow text-mywhite w-full text-[1rem] shadow-lg rounded-xl py-2.5">
                        Login
                      </button>
                    ) : (
                      <button className="bg-mygreen hover:bg-myyellow text-mywhite w-full text-[1rem] shadow-lg rounded-xl py-2.5">
                        Signup
                      </button>
                    )}
                    <div className="mt-4 flex flex-col lg:flex-row items-center justify-between ">
                      <div className="w-full lg:w-full mb-2 lg:mb-0">
                        <button
                          type="button"
                          onClick={()=>{handleGoogleSignIn()}}
                          className="w-full flex justify-center items-center gap-2 bg-white text-md text-gray-600 py-3 rounded-[1rem] hover:bg-gray-50 border border-[#b8b8b8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300 shadow tracking-wide"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-4"
                            id="google"
                          >
                            <path
                              fill="#fbbb00"
                              d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                            ></path>
                            <path
                              fill="#518ef8"
                              d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                            ></path>
                            <path
                              fill="#28b446"
                              d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                            ></path>
                            <path
                              fill="#f14336"
                              d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                            ></path>
                          </svg>
                          <span className="font-bold">
                            {isLogin
                              ? "Sign in with Google"
                              : "Signup with Google"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!isForgotPassword && (
                <div className="mt-4 text-sm text-gray-600 text-center">
                  {isLogin ? (
                    <p className="font-semibold">
                      Don't have an account?
                      <span
                        onClick={handleAuthRequest}
                        className="text-mygreen hover:underline cursor-pointer"
                      >
                        {" "}
                        Signup here
                      </span>
                    </p>
                  ) : (
                    <p className="font-semibold">
                      Already have an account?
                      <span
                        onClick={handleAuthRequest}
                        className="text-mygreen hover:underline cursor-pointer"
                      >
                        {" "}
                        Login here
                      </span>
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
