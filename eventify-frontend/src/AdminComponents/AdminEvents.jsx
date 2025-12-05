// src/AdminComponents/AdminEvents.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DataTable from "./DataTable";
import ModalForm from "./ModalForm";
import "../CCSS/AdminEvents.css";

const AdminEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminName, setAdminName] = useState("Admin");
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  const apiUrl = "http://localhost:8080/api/events";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.fname) setAdminName(user.fname);
    fetchEvents();
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
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

  // FETCH EVENTS
  const fetchEvents = async () => {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      const formatted = data.map((ev) => ({
        id: ev.eventID,
        eventName: ev.eventName,
        eventDesc: ev.eventDesc,
        eventLoc: ev.eventLoc,
        eventDate: ev.eventDate,
        eventTime: ev.eventTime,
        eventOrganizer: ev.eventOrganizer,
        imageUrl: ev.eventImage || "",
      }));
      setEvents(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // SAVE EVENT
  const handleSave = async (data) => {
    const payload = {
      eventName: data.eventName,
      eventDesc: data.eventDesc,
      eventLoc: data.eventLoc,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      eventOrganizer: data.eventOrganizer,
      eventImage: data.eventImage || "",
    };

    const url = editEvent ? `${apiUrl}/${editEvent.id}` : apiUrl;
    const method = editEvent ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save event");
      fetchEvents();
      alert(editEvent ? "Event updated!" : "Event created!");
    } catch (err) {
      console.error(err);
    }

    setModalOpen(false);
    setEditEvent(null);
  };

  // DELETE EVENT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      alert("Event deleted!");
    } catch (err) {
      console.error(err);
    }
  };

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
          <li onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}
          className="logout-btn">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="admin-events-content">
          <h2>Manage Events</h2>

          <button className="add-btn" onClick={() => { setModalOpen(true); setEditEvent(null); }}>
            + Add Event
          </button>

          <div className="data-table-container">
            <DataTable
              data={events}
              columns={[
                "eventName", "eventDesc", "eventDate",
                "eventTime", "eventLoc", "eventOrganizer", "imageUrl"
              ]}
              onEdit={(row) => { setEditEvent(row); setModalOpen(true); }}
              onDelete={handleDelete}
            />
          </div>

          {modalOpen && (
            <ModalForm
              title={editEvent ? "Edit Event" : "Add Event"}
              defaultValues={editEvent || {}}
              fields={["eventName","eventDesc","eventDate","eventTime","eventLoc","eventOrganizer","eventImage"]}
              onSubmit={handleSave}
              onClose={() => setModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
