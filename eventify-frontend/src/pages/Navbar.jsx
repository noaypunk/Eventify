import React from "react";
import { useNavigate } from "react-router-dom";
import "../CCSS/Navbar.css";
import logo from "../assets/images/red-carpet.png";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="logo"
          className="navbar-logo"
          onClick={() => navigate("/")}
        />
        <span className="navbar-site-name" onClick={() => navigate("/")}>
          Eventify
        </span>
        
        {/* Admin Dashboard button visible only for staff */}
            {user.isStaff && (
  <button
    className="navbar-admin-button-left"
    onClick={() => navigate("/AdminDashboard")}
  >
    Admin Dashboard
  </button>
)}
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span
              className={`navbar-user-name ${user.isStaff ? "staff" : "regular"}`}
              onClick={() => navigate("/profile")}
            >
              {user.fname}
            </span>

            <button className="navbar-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="navbar-login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
