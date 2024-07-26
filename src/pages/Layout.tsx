import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../utils/features/store";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === undefined) {
    return null; // or a loading indicator
  }

  // Check if the current path is "/profile"
  const shouldDisplayFooter = location.pathname !== "/home/profile";

  return (
    <>
      <Navbar />
      <Outlet />
      {shouldDisplayFooter && <Footer />}
    </>
  );
};

export default Layout;
