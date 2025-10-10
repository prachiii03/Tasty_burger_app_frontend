// src/pages/Dashboard/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaHeart, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";

const links = [
  { to: "/dashboard/accountoverview", label: "Overview", icon: <FaHome /> },
  { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
  { to: "/dashboard/wishlist", label: "Wishlist", icon: <FaHeart /> },
  { to: "/dashboard/addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
  { to: "/dashboard/orders", label: "Orders", icon: <FaShoppingBag /> },
];

const Sidebar = () => {
  return (
    <div className="bg-dark text-white" style={{ width: 280, minHeight: "100vh" }}>
      <div className="p-3">
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
    </div>
  );
};

export default Sidebar;