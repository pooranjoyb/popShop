import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Slide, toast } from "react-toastify";
import { adminLoggedOut } from "../../utils/features/Auth/authSlice";
import { RootState } from "../../utils/features/store";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";


function AdminNavbar() {
    const userName = useSelector((state: RootState) => state.auth.user?.username);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

    const toastNotification = (message: string) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
            transition: Slide,
        });
    };

    const handleToggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setShowMenu(false);
    };

    const handleToggleHamburgerMenu = () => {
        setShowHamburgerMenu((prev) => !prev);
    };


    function logoutAdmin() {
        dispatch(adminLoggedOut());
    }

    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (previous && latest > previous && latest > 80) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <>
            <div className="navbar flex justify-between bg-base-100 p-4">
                <div className="flex md:ml-16 ml-2">
                    <Link to="/admin">
                        <img
                            src="/logo.png"
                            alt="Admin Logo"
                            className="md:w-36 w-20 duration-100"
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex justify-center z-[100]">
                    <motion.div
                        variants={{
                            visible: { y: 0 },
                            Hidden: { y: "-200%" },
                        }}
                        animate={hidden ? "Hidden" : "visible"}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="navbar rounded-3xl fixed top-4 w-auto flex justify-center backdrop-filter backdrop-blur-md shadow-2xl max-w-screen-xl"
                    >
                        <ul className="flex justify-between px-12">
                            <a href="/admin">
                                <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 rounded-full">
                                    Dashboard
                                </li>
                            </a>
                            <a href="/admin/order">
                                <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 rounded-full">
                                    Orders
                                </li>
                            </a>
                            <a href="/admin/transaction">
                                <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 rounded-full">
                                    Transactions
                                </li>
                            </a>
                            <a href="/admin/add-product">
                                <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 rounded-full">
                                    Add Prdocut
                                </li>
                            </a>
                        </ul>
                    </motion.div>
                </div>

                <div className="flex-none gap-6 md:mr-16 mr-2">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                            onClick={handleToggleMenu}
                        >
                            <div className="w-10 rounded-full">
                                <img src={"/images/winter2.jpg"} />
                            </div>
                        </div>
                        {showMenu && (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52 shadow-2xl"
                            >
                                <li onClick={handleCloseMenu}>
                                    <Link to={"/admin/profile"} className="justify-between">
                                        {`${userName}` || <p>Profile</p>}
                                    </Link>
                                </li>
                                <li onClick={handleCloseMenu}>
                                    <Link to={"/admin/dashboard"}>{<p>Dashboard</p>}</Link>
                                </li>
                                <li onClick={handleCloseMenu}>
                                    <Link to={"/admin/settings"}>{<p>Settings</p>}</Link>
                                </li>
                                <li onClick={() => {
                                    logoutAdmin();
                                    handleCloseMenu();
                                    toastNotification("Logged out successfully!");
                                }}>
                                    <Link to={"/admin/login"}>{<p>Logout</p>}</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="lg:hidden">
                        <button
                            className="btn btn-ghost btn-circle"
                            onClick={handleToggleHamburgerMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {showHamburgerMenu && (
                <div className="lg:hidden bg-base-100 p-4 shadow-2xl absolute top-16 right-0 w-full">
                    <ul className="menu menu-compact">
                        <a href="/admin">
                            <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 my-2 rounded-full">
                                Dashboard
                            </li>
                        </a>
                        <a href="/admin/order">
                            <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 my-2 rounded-full">
                                Orders
                            </li>
                        </a>
                        <a href="/admin/transaction">
                            <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 my-2 rounded-full">
                                Transactions
                            </li>
                        </a>
                        <a href="/admin/add-product">
                            <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 my-2 rounded-full">
                                Add Prdocut
                            </li>
                        </a>
                        <li>
                            <button
                                onClick={() => {
                                    logoutAdmin();
                                    setShowHamburgerMenu(false);
                                    toastNotification("Logged out successfully!");
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default AdminNavbar;
