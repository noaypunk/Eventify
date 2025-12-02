// src/pages/EventDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../EventCSS/EventDetails.css";
import arrowIcon from "../assets/images/arrow.png";
import logo from "../assets/images/red-carpet.png";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user

  // Fetch event details
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

  // Navbar logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  return (
    <div className="event-details">
      {/* === Navbar === */}
      <header className="navbar">
        <div className="navbar-left">
          <img
            src={logo}
            alt="logo"
            className="navbar-logo"
            onClick={() => navigate("/")}
          />
          <span className="navbar-site-name" onClick={() => navigate("/")}>
            Eventify
          </span>

          {user?.isStaff && (
            <button
              className="navbar-admin-button-left"
              onClick={() => navigate("/AdminDashboard")}
            >
              Admin Dashboard
            </button>
          )}
        </div>

        <div className="navbar-right">
          {user ? (
            <>
              <span
                className={`navbar-user-name ${user.isStaff ? "staff" : "regular"}`}
                onClick={() => navigate("/profile")}
              >
                {user.fname}
              </span>

              <button className="navbar-logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="navbar-login-button" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </header>

      {/* === Back Button === */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={arrowIcon} alt="Back" className="back-icon" />
      </button>

      {/* === Event Details === */}
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
