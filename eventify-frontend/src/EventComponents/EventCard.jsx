import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`);
  };

  // Determine image source
  const imageSrc = event.imageUrl
    ? event.imageUrl.startsWith("http")
      ? event.imageUrl
      : `${process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"}${event.imageUrl}`
    : "/placeholder.png";

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img
          src={imageSrc}
          alt={event.eventName || "Event"}
          onError={(e) => (e.target.src = "/placeholder.png")}
        />
        {event.category && <span className="event-category">{event.category}</span>}
      </div>

      <div className="event-info">
        <h3>{event.eventName}</h3>
        <p className="event-desc">{event.eventDesc}</p>
        
        <div className="event-meta">
          <span>📅 {event.eventDate}</span>
          <span>🕐 {event.eventTime}</span>
          <span>📍 {event.eventLoc}</span>
          <span>👤 {event.eventOrganizer}</span>
        </div>

        <div className="event-price">{event.price || "Free"}</div>
        
        <button className="event-view-btn" onClick={handleViewDetails}>
          View
        </button>
      </div>
    </div>
  );
}