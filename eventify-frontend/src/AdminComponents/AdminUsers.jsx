// src/AdminComponents/AdminUsers.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DataTable from "./DataTable";
import "../CCSS/AdminDashboard.css";

const API_BASE_URL = "http://localhost:8080/api/users";

const AdminUsers = () => {
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

  // ===== AdminUsers State =====
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const usersData = await response.json();

      const formattedUsers = usersData.map((user) => ({
        id: user.userid,
        name: `${user.fname} ${user.lname}`,
        email: user.email,
        role: user.isStaff ? "Staff" : "Regular User",
      }));

      setUsers(formattedUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load user data. Check server connection and CORS settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchUsers();

    // Polling every 5 seconds
    const interval = setInterval(() => {
      fetchUsers();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete user ID ${id}?`)) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Delete failed with status: ${response.status}`);

      // After delete, fetch users again to reflect live updates
      fetchUsers();
      alert(`User ID ${id} deleted successfully.`);
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user. Please check server logs.");
    }
  };

  if (loading) return <div className="admin-content">Loading users...</div>;
  if (error) return <div className="admin-content" style={{ color: "red" }}>{error}</div>;

  return (
    <div className="admin-container">
      {/* ===== Sidebar ===== */}
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

      {/* ===== Main Content ===== */}
      <div className="admin-content">
        <div className="admin-users-content">
          <h2>Users Management</h2>
          <div className="data-table-container">
            <DataTable
              data={users}
              columns={["name", "email", "role"]}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
