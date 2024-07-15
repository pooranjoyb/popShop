import { useEffect, useState } from "react";
import { supabase } from "../../utils/client";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import { useNavigate } from "react-router-dom";
import Head from "../../components/Head";
import Loader from "../../components/Loader/Loader";
import EditProfileModal from "./EditProfileModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faEye, faCog, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './profile.css'

interface USER {
  username: string;
  email: string;
  pass: string;
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  createdAt: string | null;
}

function Profile() {
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [userData, setUserData] = useState<USER>();
  const sidebarOpen = false;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/home");
    } else {
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (error) {
      console.error(error);
    } else {
      setUserData(data[0]);
    }
  };

  const handleUpdate = () => {
    fetchData();
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <>
      <div className="md:flex sm:block flex-row gap-5 p-8 relative">

        {/* Sidebar */}
        <div className={`md:block ${sidebarOpen ? 'block w-full min-h-[500px] h-[600px] bg-gray-700 text-white' : 'hidden w-1/4 min-h-[800px]'} bg-gray-100 p-5 rounded-lg shadow-md`}>
          <ul className="space-y-4">
            <li className="text-lg font-semibold text-gray-700 active hover:cursor-pointer hover:bg-mygreen p-4 rounded-md">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> User info
            </li>
            <li className="text-lg font-semibold text-gray-700 active hover:cursor-pointer hover:bg-mygreen p-4 rounded-md">
              <FontAwesomeIcon icon={faHeart} className="mr-2" /> Favorites
            </li>
            <li className="text-lg font-semibold text-gray-700 active hover:cursor-pointer hover:bg-mygreen p-4 rounded-md">
              <FontAwesomeIcon icon={faEye} className="mr-2" /> Watchlist
            </li>
            <li className="text-lg font-semibold text-gray-700 active hover:cursor-pointer hover:bg-mygreen p-4 rounded-md">
              <FontAwesomeIcon icon={faCog} className="mr-2" /> Setting
            </li>
            <li className="text-lg font-semibold text-gray-700 active hover:cursor-pointer hover:bg-mygreen p-4 rounded-md">
              <FontAwesomeIcon icon={faBell} className="mr-2" /> Notifications
            </li>
          </ul>
          <button className={` ${sidebarOpen ? "mt-[20%]" : 'mt-[90%]'} p-4 rounded-md ml-auto text-end text-myred font-semibold hover:bg-myred hover:text-mywhite w-full`}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Log out
          </button>
        </div>

        {/* Profile Information */}
        <div className="w-full responsive-user sm:mt-44 sm:p-1 md:w-3/4 bg-white p-5 rounded-lg shadow-md">
          {/* user info */}
          <div className="flex relative flex-col gap-5 items-center justify-center md:px-48 px-8">
            <div className="absolute profile-background -z-20 w-full h-[250px] sm:h-[350px] md:top-[-150px] top-[-200px]"></div>
            <div className="avatar">
              <div className="w-24 sm:w-80 rounded-full">
                <img src="/images/winter2.jpg" alt="" />
              </div>
            </div>
            <div className="w-full text-center">
              <Head h2={username!} />
            </div>
            <div className="flex gap-5">
              <div className="card">
                <label
                  htmlFor="my_modal_1"
                  className="btn bg-myyellow hover:bg-mygreen"
                >
                  Edit Profile
                </label>
              </div>
            </div>
          </div>

          <div className="card flex w-full mb-10 rounded-xl shadow-2xl">
            <EditProfileModal userData={userData} onUpdate={handleUpdate} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 px-20">
            <div className="form-group">
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 shadow-md"
                value={userData.firstname}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 shadow-md"
                value={userData.lastname}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-600">Email Address</label>
              <input
                type="email"
                className="w-full border rounded-lg p-2 shadow-md"
                value={userData.email}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="tel"
                className="w-full border rounded-lg p-2 shadow-md"
                value={userData.phone}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-600">Gender</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 shadow-md"
                value={userData.gender}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-600">Postal Code</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mb-7 shadow-md"
                value="23728167"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
