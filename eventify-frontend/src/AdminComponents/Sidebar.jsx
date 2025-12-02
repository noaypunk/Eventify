import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.fname) {
      setAdminName(user.fname);
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      navigate("/login", { replace: true });
    }
  };

  const menuItems = [
    { name: "Home", path: "/LandingPage" },
    { name: "Dashboard", path: "/AdminDashboard" },
    { name: "Events", path: "/AdminEvents" },
    { name: "Users", path: "/AdminUsers" },
    { name: "Reports", path: "/AdminReports" },
  ];


  return (
    <div className="sidebar">

      <h2>Welcome, {adminName}</h2>

      <ul>
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={isActive(item.path) ? "active" : ""}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </li>
        ))}

        <li
          onClick={handleLogout}
          style={{ cursor: "pointer", color: "red" }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
