import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect home after logout
  };

  // 🔑 Helper: define NavLink style
  const linkClass = ({ isActive }) =>
    `d-block py-2 px-2 rounded mb-1 ${
      isActive ? "bg-secondary fw-bold text-white" : "text-white"
    }`;

  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: 260 }}>
      <h5 className="mb-4">Admin</h5>
      <nav>
        <NavLink to="/admin" className={linkClass}>
          <FaTachometerAlt className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          <FaUsers className="me-2" /> Users
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          <FaBoxOpen className="me-2" /> Products
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          <FaClipboardList className="me-2" /> Orders
        </NavLink>
        <hr className="text-secondary" />
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline-light w-100 my-2 text-start"
        >
          <FaHome className="me-2" /> Home
        </button>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger w-100 text-start"
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
