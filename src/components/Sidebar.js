// src/components/Sidebar.js
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaHeart, FaMapMarkerAlt, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // ✅ CORRECT: Only one level up
import { toast } from "react-toastify";

const links = [
  { to: "/dashboard/accountoverview", label: "Overview", icon: <FaHome /> },
  { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
  { to: "/dashboard/wishlist", label: "Wishlist", icon: <FaHeart /> },
  { to: "/dashboard/addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
  { to: "/dashboard/orders", label: "Orders", icon: <FaShoppingBag /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="bg-dark text-white" style={{ width: 280, minHeight: "100vh" }}>
      <div className="p-3 d-flex flex-column" style={{ height: "100vh" }}>
        <div>
          <h4 className="mb-4 text-center border-bottom pb-3">USER DASHBOARD</h4>
          <nav>
            <ul className="list-unstyled">
              {links.map((link) => (
                <li key={link.to} className="mb-2">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `d-flex align-items-center p-3 text-decoration-none text-white rounded transition-all ${
                        isActive 
                          ? "bg-primary fw-bold shadow-sm" 
                          : "hover-bg-secondary"
                      }`
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "#0d6efd" : "transparent",
                      transition: "all 0.3s ease"
                    })}
                  >
                    <span className="me-3" style={{ fontSize: "1.1rem" }}>
                      {link.icon}
                    </span>
                    <span style={{ fontSize: "0.95rem" }}>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Buttons - Home & Logout */}
        <div className="mt-auto pt-3 border-top">
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline-light w-100 mb-2 text-start d-flex align-items-center"
            style={{ transition: "all 0.3s ease" }}
          >
            <FaHome className="me-2" style={{ fontSize: "1.1rem" }} />
            <span>Home</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 text-start d-flex align-items-center"
            style={{ transition: "all 0.3s ease" }}
          >
            <FaSignOutAlt className="me-2" style={{ fontSize: "1.1rem" }} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;