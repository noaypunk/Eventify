// src/pages/EventDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../EventCSS/EventDetails.css";
import arrowIcon from "../assets/images/arrow.png";
import Navbar from "./Navbar";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event details:", err));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

  const eventImage = event.eventImage?.startsWith("http")
    ? event.eventImage
    : `${baseURL}${event.eventImage}`;

  return (
    <div className="event-details">
      <Navbar />

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={arrowIcon} alt="Back" className="back-icon" />
      </button>

      {/* Event Banner Image */}
      <img
        src={eventImage}
        alt={event.eventName}
        className="event-main-image"
        onError={(e) => (e.target.src = "/placeholder.png")}
      />

      <h2>{event.eventName}</h2>
      <p className="event-desc">{event.eventDesc}</p>

      <p><strong>📅 Date:</strong> {event.eventDate}</p>
      <p><strong>🕕 Time:</strong> {event.eventTime}</p>
      <p><strong>📍 Location:</strong> {event.eventLoc}</p>
      <p><strong>👤 Organizer:</strong> {event.eventOrganizer}</p>
    </div>
  );
}
