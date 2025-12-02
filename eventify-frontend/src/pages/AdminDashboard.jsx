import React, { useEffect, useState } from "react";
import Sidebar from "../AdminComponents/Sidebar";
import DashboardCard from "../AdminComponents/DashboardCard";
import axios from "axios"; // for API calls
import "../CCSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Replace with your actual API endpoint that returns total users
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/count");
        setUserCount(response.data.count); // assuming API returns { count: number }
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <div className="dashboard-cards">
          <DashboardCard title="Total Events" value="Dont touch this for now" />
          <DashboardCard title="Registered Users" value={userCount} />
          <DashboardCard title="Upcoming Events" value="Dont touch this for now" />
          <DashboardCard title="Revenue" value="Dont touch this for now" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
