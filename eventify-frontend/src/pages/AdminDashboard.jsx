import React, { useEffect, useState } from "react";
import Sidebar from "../AdminComponents/Sidebar";
import DashboardCard from "../AdminComponents/DashboardCard";
import axios from "axios"; // for API calls
import "../CCSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0); // new state for events

  useEffect(() => {
    // Fetch total users
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/count");
        setUserCount(response.data.count); // assuming API returns { count: number }
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    // Fetch total events
    const fetchEventCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/events"); // get all events
        setEventCount(response.data.length); // count total events
      } catch (error) {
        console.error("Error fetching event count:", error);
      }
    };

    fetchUserCount();
    fetchEventCount();
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
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
