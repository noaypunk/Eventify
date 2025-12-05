// src/AdminComponents/AdminReports.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DataTable from "../AdminComponents/DataTable";
import "../CCSS/AdminDashboard.css";

const AdminReports = () => {
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

  // ===== AdminReports State =====
  const [feedbackData] = useState([
    { id: 101, event: "Music Festival 2025", user: "Juan Dela Cruz", rating: 5, comment: "Amazing venue and great lineup! Everything was well-organized.", date: "2025-02-15" },
    { id: 102, event: "Tech Conference 2025", user: "Anna Santos", rating: 4, comment: "The speakers were knowledgeable, but registration took too long.", date: "2025-03-11" },
    { id: 103, event: "Startup Pitch Day", user: "Mark G.", rating: 2, comment: "Poor internet connection throughout the event. Needs improvement.", date: "2025-04-20" },
    { id: 104, event: "Music Festival 2025", user: "Maria C.", rating: 5, comment: "Best concert ever!", date: "2025-02-16" },
    { id: 105, event: "Tech Conference 2025", user: "Rene D.", rating: 3, comment: "Good content, but the lunch was cold.", date: "2025-03-10" },
  ]);

  const [selectedEvent, setSelectedEvent] = useState("All Events");

  const columns = ["event", "user", "rating", "comment", "date"];

  const handleViewFeedback = (feedback) => {
    alert(`Viewing Feedback from ${feedback.user} for ${feedback.event}:\nRating: ${feedback.rating}/5\nComment: "${feedback.comment}"`);
  };

  // --- Filtering Logic ---
  const uniqueEvents = useMemo(() => {
    const events = feedbackData.map(feedback => feedback.event);
    return ["All Events", ...new Set(events)];
  }, [feedbackData]);

  const filteredData = useMemo(() => {
    if (selectedEvent === "All Events") return feedbackData;
    return feedbackData.filter(feedback => feedback.event === selectedEvent);
  }, [feedbackData, selectedEvent]);

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
        <div className="admin-reports-content">
          <h2>📊 Event Feedback Reports</h2>

          {/* Filter Controls */}
          <div className="filter-controls">
            <label htmlFor="event-filter">Filter by Event:</label>
            <select
              id="event-filter"
              className="event-filter-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              {uniqueEvents.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
          </div>

          <div className="data-table-container">
            <DataTable
              data={filteredData}
              columns={columns}
              onEdit={handleViewFeedback}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
