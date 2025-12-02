import React, { useState, useEffect } from "react";
import Sidebar from "../AdminComponents/Sidebar";
import DataTable from "../AdminComponents/DataTable";
import "../CCSS/AdminDashboard.css";

const API_BASE_URL = "http://localhost:8080/api/users";

const AdminUsers = () => {
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
      <Sidebar />
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
