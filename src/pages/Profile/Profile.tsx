import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import { Link, useNavigate } from "react-router-dom";
import Head from "../../components/Head";

function Profile() {
    const username = useSelector((state: RootState) => state.auth.user?.username);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/home');
    }

    return (
        <div className="flex relative flex-col gap-5 items-center justify-center px-10 lg:px-[300px]">
            <div className="absolute profile-background -z-20 w-full h-[250px] sm:h-[350px] top-[-98px]"></div>
            <div className="sm:flex py-6 sm:py-0 sm:text-start w-full">
                <Head h1="Profile" h2="" />
            </div>
            <div className="avatar">
                <div className="w-24 sm:w-80 rounded-full">
                    <img src="/images/winter2.jpg" alt="" />
                </div>
            </div>
            <div className="w-full text-center">
                <Head h1={username!} h2="" />
            </div>
            <Link
                to="/home/shop"
                className="btn px-5 bg-mygreen hover:bg-myyellow text-white"
            >
                Explore Products
            </Link>

            <div className="card flex w-full my-5 rounded-xl shadow-xl">
                <div className="flex p-5 sm:p-0 flex-col sm:flex-row w-full">
                    <div className="flex-1 lg:p-12 text-justify">
                        <div className="flex sm:flex-row flex-col items-start sm:items-center  text-lg sm:text-xl justify-start">
                            <div className="label">
                                <span className="label-text text-xl">First Name : </span>
                            </div>
                            <h1 className=" font-bold text-mynavy">Fname</h1>
                        </div>
                        <div className="flex sm:flex-row flex-col items-start sm:items-center  text-lg sm:text-xl justify-start">
                            <div className="label">
                                <span className="label-text text-xl">Last Name : </span>
                            </div>
                            <h1 className=" font-bold text-mynavy">Lname</h1>
                        </div>
                        <div className="flex sm:flex-row flex-col items-start sm:items-center  text-lg sm:text-xl justify-start">
                            <div className="label">
                                <span className="label-text text-xl">Gender</span>
                            </div>
                            <h1 className=" font-bold text-mynavy">Male</h1>
                        </div>
                    </div>

                    <div className="hidden sm:block border-gray-400 border-l-[2px]" />

                    <div className="flex-1 lg:p-12 text-justify">
                        <div className="flex sm:flex-row flex-col items-start sm:items-center  text-lg sm:text-xl justify-start">
                            <div className="label">
                                <span className="label-text text-xl">Address : </span>
                            </div>
                            <h1 className=" font-bold text-mynavy">Address</h1>
                        </div>   
                        <div className="flex sm:flex-row flex-col items-start sm:items-center text-lg sm:text-xl justify-start">
                            <div className="label">
                                <span className="label-text text-xl">Phone Number : </span>
                            </div>
                            <h1 className=" font-bold text-mynavy">1234567890</h1>
                        </div>
                        <div className="flex sm:flex-row flex-col items-start sm:items-center  text-lg sm:text-xl justify-start">
                            <div className="label">
                                <span className="label-text text-xl">Account Creation Date : </span>
                            </div>
                            <h1 className=" font-bold text-mynavy">1/1/24</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;