// src/EventComponents/EventList.jsx
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "../EventCSS/EventCard.css"; // for grid styling

export default function EventList() {
  const [events, setEvents] = useState([]);
  const apiUrl = "http://localhost:8080/api/events";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((ev) => ({
          id: ev.eventID,          // used in EventCard for navigation
          eventName: ev.eventName,
          eventDesc: ev.eventDesc,
          eventLoc: ev.eventLoc,
          eventDate: ev.eventDate,
          eventTime: ev.eventTime,
          eventOrganizer: ev.eventOrganizer,
          imageUrl: ev.eventImage || "", // can be relative path or full URL
        }));
        setEvents(formatted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="event-grid">
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}
