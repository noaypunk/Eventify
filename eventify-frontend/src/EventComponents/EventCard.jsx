// src/EventComponents/EventCard.jsx
import React from "react";
import "../EventCSS/EventCard.css";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`); // make sure id matches EventList mapping
  };

  // Determine image source
  const imageSrc = event.imageUrl
    ? event.imageUrl.startsWith("http")
      ? event.imageUrl
      : `${process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"}${event.imageUrl}`
    : "/placeholder.png"; // default placeholder image

  return (
    <div className="event-card">
      <img
        src={imageSrc}
        alt={event.eventName || "Event"}
        className="event-image"
        onError={(e) => (e.target.src = "/placeholder.png")}
      />

      <div className="event-content">
        <h3>{event.eventName}</h3>
        <p className="event-desc">{event.eventDesc}</p>
        <p><strong>Date:</strong> {event.eventDate}</p>
        <p><strong>Time:</strong> {event.eventTime}</p>
        <p><strong>Location:</strong> {event.eventLoc}</p>
        <p><strong>Organizer:</strong> {event.eventOrganizer}</p>

        <button className="event-view-button" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
}
