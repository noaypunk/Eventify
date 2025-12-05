import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardCard from "../AdminComponents/DashboardCard";
import axios from "axios";
import "../CCSS/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ===== Sidebar State =====
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

  // ===== Dashboard State =====
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/count");
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchEventCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/events");
        setEventCount(response.data.length);
      } catch (error) {
        console.error("Error fetching event count:", error);
      }
    };

    fetchUserCount();
    fetchEventCount();
  }, []);

  // ===== Combined JSX =====
  return (
    <div className="admin-container">
      {/* Sidebar */}
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
          <li onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
            Logout
          </li>
        </ul>
      </div>

      {/* Dashboard Content */}
      <div className="admin-content">
        <div className="dashboard-cards">
          <DashboardCard title="Total Events" value={eventCount} />
          <DashboardCard title="Registered Users" value={userCount} />
          <DashboardCard title="Upcoming Events" value={eventCount} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
