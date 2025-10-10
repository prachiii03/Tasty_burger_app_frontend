// src/pages/Dashboard/Dashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 bg-light">
        {/* This Outlet is crucial - it renders the nested dashboard routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;