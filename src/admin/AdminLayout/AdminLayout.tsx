import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout: React.FC = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-8 flex flex-col">
          <span className="text-2xl font-bold">
            Welcome to SuperAdmin Portal!
          </span>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
