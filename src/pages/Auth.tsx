// import { Link } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../utils/client";
import { useNavigate } from "react-router-dom";

//components
import Footer from "../components/Footer"
import Button from "../components/Button"

interface USER {
    username: string;
    email: string;
    pass: string;
}

function Auth() {

    const navigate = useNavigate();

    const [login, setLogin] = useState(true);
    const [userData, setUserData] = useState<USER>({
        username: '',
        email: '',
        pass: ''
    })

    const handleAuthRequest = () => {
        setLogin(!login);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    }

    const handleSignup = async () => {
        const { error } = await supabase
            .from('users')
            .insert([
                { username: userData.username, email: userData.email, password: userData.pass },
            ])
            .select()

        if (error) {
            alert("User Already Exists!")
        }else{
            alert("Signup Success!")
        }
    }

    const handleLogin = async () => {
        const { data, error } = await supabase
            .from('users')
            .select("*")
            .eq('username', userData.username)
            .eq('password', userData.pass)


        if (error) {
            console.error("Error logging in:", error.message);
            return;
        }

        if (data.length === 0) {
            alert("User not found or credentials are incorrect.");
            return;
        }
        navigate("/");
    }

    return (
        <>

            <div className="text-mynavy flex flex-row-reverse h-screen">
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="max-w-md text-center">
                        <img src="./images/winter1.jpg" className="rounded-xl" alt="image" />

                    </div>
                </div>
                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                            {
                                login ? (
                                    <>
                                        Login
                                    </>
                                ) : (
                                    <>
                                        Sign Up
                                    </>
                                )
                            }

                        </h1>
                        {
                            !(login) ? (

                                <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community </h1>
                            ) : (<></>)
                        }
                        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between ">
                            <div className="w-full lg:w-ful mb-2 lg:mb-0">
                                <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4" id="google">
                                        <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                                        <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                                        <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                                        <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                                    </svg>
                                    {
                                        login ? (
                                            <span>Login with Google </span>
                                        ) : <span>Signup with Google</span>
                                    }
                                </button>
                            </div>

                        </div>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>or with email</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input required type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={userData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {
                                login ? (<></>) : (
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input required type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                            value={userData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )
                            }
                            <div>
                                <label htmlFor="pass" className="block text-sm font-medium text-gray-700">Password</label>
                                <input required type="password" id="pass" name="pass" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={userData.pass}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {
                                login ? (
                                    <>
                                        <div onClick={handleLogin}>
                                            <Button color="mygreen" hover='myyellow' text="Login" />
                                        </div>
                                    </>
                                ) :
                                    <>
                                        <div onClick={handleSignup}>
                                            <Button color="mygreen" hover='myyellow' text="Signup" />
                                        </div>
                                    </>
                            }
                        </div>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            {
                                login ? (
                                    <p>Don't have an account?
                                        <span onClick={handleAuthRequest} className="text-black hover:underline cursor-pointer"> Signup here</span>
                                    </p>
                                ) : (
                                    <>
                                        <p>Already have an account?
                                            <span onClick={handleAuthRequest} className="text-black cursor-pointer hover:underline"> Login</span>
                                        </p>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>



            {/* Footer  */}
            <Footer />
        </>
    )
}

export default Auth