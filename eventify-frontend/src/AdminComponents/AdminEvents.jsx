// src/AdminComponents/AdminEvents.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../AdminComponents/Sidebar";
import DataTable from "../AdminComponents/DataTable";
import ModalForm from "../AdminComponents/ModalForm";
import "../CCSS/AdminEvents.css";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  const apiUrl = "http://localhost:8080/api/events";

  // Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((ev) => ({
          id: ev.eventID,
          eventName: ev.eventName,
          eventDesc: ev.eventDesc,
          eventLoc: ev.eventLoc,
          eventDate: ev.eventDate,
          eventTime: ev.eventTime,
          eventOrganizer: ev.eventOrganizer,
          imageUrl: ev.eventImage || ""
        }));
        setEvents(formatted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  };

  // Save event (create or update)
  const handleSave = (data) => {
    const payload = {
      eventName: data.eventName,
      eventDesc: data.eventDesc,
      eventLoc: data.eventLoc,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      eventOrganizer: data.eventOrganizer,
      eventImage: data.eventImage || ""
    };

    const url = editEvent ? `${apiUrl}/${editEvent.id}` : apiUrl;
    const method = editEvent ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then(() => {
        fetchEvents();
        alert(editEvent ? "Event updated successfully!" : "Event created successfully!");
      })
      .catch((err) => console.error("Error saving event:", err));

    setModalOpen(false);
    setEditEvent(null);
  };

  // Delete event
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then(() => {
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
        alert("Event deleted successfully!");
      })
      .catch((err) => console.error("Error deleting event:", err));
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-events-content">
          <h2>Manage Events</h2>

          <button className="add-btn" onClick={() => { setModalOpen(true); setEditEvent(null); }}>
            + Add Event
          </button>

          <div className="data-table-container">
            <DataTable
              data={events}
              columns={["eventName", "eventDesc", "eventDate", "eventTime", "eventLoc", "eventOrganizer", "imageUrl"]}
              onEdit={(row) => { setEditEvent(row); setModalOpen(true); }}
              onDelete={handleDelete}
            />
          </div>

          {modalOpen && (
            <ModalForm
              title={editEvent ? "Edit Event" : "Add Event"}
              defaultValues={editEvent || {}}
              fields={["eventName", "eventDesc", "eventDate", "eventTime", "eventLoc", "eventOrganizer", "eventImage"]}
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
