import React from "react";
import { useNavigate } from "react-router-dom";
import "../CCSS/LandingPage.css";
import logo from "../assets/images/red-carpet.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {/* Header */}
      <header className="landing-header">
        <div className="left-header">
          <img src={logo} alt="logo" className="header-logo" />
          <span className="site-name">Eventify</span>
        </div>

        <div className="right-header">
          {user ? (
            <>
              <span className="user-name">{user.fname}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-button" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="landing-main">
        <h1 className="landing-title">Discover Amazing Events</h1>
        <p className="landing-subtitle">
          Find and register for events that match your interests.
        </p>

        <div className="search-bar">
          <input type="text" placeholder="Search events..." />
          <button>Search</button>
        </div>
      </main>
    </div>
  );
}
