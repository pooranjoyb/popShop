import React from "react";
import { Outlet } from "react-router-dom";
import '../admin.css'
import AdminNavbar from "./AdminNavbar";

const AdminLayout: React.FC = () => {
  return (
    <>
      <div className="relative z-10">
        <AdminNavbar />
      </div>
      <div className="flex">
        <div className="dashboard p-8 flex flex-col w-full lg::absolute">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
