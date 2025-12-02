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

    // ⭐ Fetch events from backend
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(ev => ({
                    id: ev.eventID,
                    name: ev.eventName,
                    description: ev.eventDesc,
                    location: ev.eventLoc,
                    date: ev.eventDate,
                    time: ev.eventTime,
                    organizer: ev.eventOrganizer
                }));
                setEvents(formatted);
            })
            .catch(err => console.error("Error fetching events:", err));
    };

    // ⭐ Add or Update event
    const handleSave = (data) => {
        const payload = {
            eventName: data.name,
            eventDesc: data.description,
            eventLoc: data.location,
            eventDate: data.date,
            eventTime: data.time,
            eventOrganizer: data.organizer
        };

        if (editEvent) {
            // Update existing event
            fetch(`${apiUrl}/${editEvent.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(() => fetchEvents())
                .catch(err => console.error("Error updating event:", err));
        } else {
            // Create new event
            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(() => fetchEvents())
                .catch(err => console.error("Error creating event:", err));
        }

        setModalOpen(false);
        setEditEvent(null);
    };

    // ⭐ Delete event
    const handleDelete = (id) => {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
            .then(() => fetchEvents())
            .catch(err => console.error("Error deleting event:", err));
    };

    return (
        <div className="admin-container">
            <Sidebar />
            <div className="admin-content">
                <div className="admin-events-content"> 
                    <h2>Manage Events</h2>

                    <button 
                        className="add-btn" 
                        onClick={() => { setModalOpen(true); setEditEvent(null); }}
                    >
                        + Add Event
                    </button>

                    <div className="data-table-container">
                        <DataTable
                            data={events}
                            columns={["name", "description", "date", "time", "location", "organizer"]}
                            onEdit={(row) => { setEditEvent(row); setModalOpen(true); }}
                            onDelete={handleDelete}
                        />
                    </div>

                    {modalOpen && (
                        <ModalForm
    title={editEvent ? "Edit Event" : "Add Event"}
    defaultValues={editEvent || {}}
    fields={[
        "eventName",
        "eventDesc",
        "eventDate",
        "eventTime",
        "eventLoc",
        "eventOrganizer"
    ]}
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
