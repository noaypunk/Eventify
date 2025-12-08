import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CCSS/EventDetails.css";
import arrowIcon from "../assets/images/arrow.png";
import logo from "../assets/images/red-carpet.png";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch event details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event details:", err));
  }, [id]);

  if (!event) return <p className="loading-text">Loading...</p>;

  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  const eventImage = event.eventImage?.startsWith("http")
    ? event.eventImage
    : `${baseURL}${event.eventImage}`;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  const isFree = !event.eventPrice || event.eventPrice === 0;
  const buttonText = isFree ? "Register Now" : "Proceed to Payment";

  const handleButtonClick = () => {
    if (isFree) {
      alert("Registered successfully!");
      // TODO: Call API to register user
    } else {
      navigate(`/payment/${event.eventID}`);
    }
  };

  return (
    <div className="event-details">
      {/* Navbar */}
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
              onClick={() => navigate("/admindashboard")}
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

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={arrowIcon} alt="Back" className="back-icon" />
        <span className="back-text">Back</span>
      </button>

      {/* Event Content */}
      <div className="event-content-wrapper">
        <img
          src={eventImage || "/placeholder.png"}
          alt={event.eventName}
          className="event-main-image"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />

        <div className="event-info-section">
          <h2>{event.eventName}</h2>
          <p className="event-desc">{event.eventDesc}</p>
          <p><strong>📅 Date:</strong> {event.eventDate}</p>
          <p><strong>🕕 Time:</strong> {event.eventTime}</p>
          <p><strong>📍 Location:</strong> {event.eventLoc}</p>
          <p><strong>👤 Organizer:</strong> {event.eventOrganizer}</p>
          <p><strong>💰 Price:</strong> {isFree ? "Free" : `₱${event.eventPrice}`}</p>

          <div className="event-register-button-wrapper">
            <button className="register-button" onClick={handleButtonClick}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
