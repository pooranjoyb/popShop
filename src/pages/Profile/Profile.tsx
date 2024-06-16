import { useEffect, useState } from "react";
import { supabase } from "../../utils/client";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import { useNavigate } from "react-router-dom";
import Head from "../../components/Head";
import Loader from "../../components/Loader/Loader";
import EditProfileModal from "./EditProfileModal";

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
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isAuthenticated) {
    navigate("/home");
  }

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = () => {
    fetchData();
  };

  if (!userData) {
    return <Loader />;
  }
  return (
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
      <div className="card flex w-full mb-28 rounded-xl shadow-2xl">
        <EditProfileModal userData={userData} onUpdate={handleUpdate} />

        <div className="flex p-5 sm:p-0 flex-col sm:flex-row w-full md:items-center">
          <div className="flex-1 md:p-8 text-justify">
            <div className="flex sm:flex-row flex-col items-start sm:items-center  text-sm md:text-xl justify-start">
              <div className="label">
                <span className="label-text md:text-xl text-sm">
                  First Name : <b>{userData.firstname}</b>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-start sm:items-center  text-sm md:text-xl justify-start">
              <div className="label">
                <span className="label-text md:text-xl text-sm">
                  Last Name : <b> {userData.lastname}</b>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-start sm:items-center  text-sm md:text-xl justify-start">
              <div className="label">
                <span className="label-text md:text-xl text-sm">
                  Gender :{" "}
                  <b>
                    {userData.gender.charAt(0).toUpperCase() +
                      userData.gender.slice(1)}
                  </b>
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 md:p-8 text-justify">
            <div className="flex sm:flex-row flex-col items-start sm:items-center  text-sm md:text-xl justify-start">
              <div className="label">
                <span className="label-text md:text-xl text-sm">
                  Email : <b>{userData.email}</b>{" "}
                </span>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-start sm:items-center text-sm md:text-xl justify-start">
              <div className="label">
                <span className="label-text md:text-xl text-sm">
                  Phone Number : <b>{userData.phone}</b>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-start sm:items-center  text-sm md:text-xl justify-start">
              <div className="label">
                <span className="label-text md:text-xl text-sm">
                  Account Creation Date :{" "}
                  <b> {new Date(userData.createdAt!).toLocaleDateString()}</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
