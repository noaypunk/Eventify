import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CCSS/LandingPage.css";
import logo from "../assets/images/red-carpet.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({ fname: "Guest", isStaff: false });

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Fetch events
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((res) => {
        const formatted = res.data.map((ev) => ({
          id: ev.eventID,
          eventName: ev.eventName,
          eventDesc: ev.eventDesc,
          eventLoc: ev.eventLoc,
          eventDate: ev.eventDate,
          eventTime: ev.eventTime,
          eventOrganizer: ev.eventOrganizer,
          imageUrl: ev.eventImage || "",
          price: ev.price || "Free",
          category: ev.category || "",
        }));
        setEvents(formatted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logout with confirmation
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem("user");
      setUser({ fname: "Guest", isStaff: false });
      navigate("/");
    }
  };

  const handleViewEvent = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <div className="landing-page">
      {/* ===== Navbar ===== */}
      <header className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="logo" className="navbar-logo" />
          <span
            className="navbar-site-name"
            onClick={() => navigate("/")}
          >
            Eventify
          </span>
          {user.isStaff && (
            <button
              className="navbar-admin-button-left"
              onClick={() => navigate("/AdminDashboard")}
            >
              Admin Dashboard
            </button>
          )}
        </div>

        <div className="navbar-right">
          {user.fname !== "Guest" ? (
            <>
              <span
                className={`navbar-user-name ${
                  user.isStaff ? "staff" : "regular"
                }`}
                onClick={() => navigate("/profile")}
              >
                {user.fname}
              </span>
              <button
                className="navbar-logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="navbar-login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* ===== Discover Section ===== */}
      <section className="discover-section">
        <h1>Discover Amazing Events</h1>
        <p>Find and register for events that match your interests.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => {
              // Optional: could scroll to events or highlight matches
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* ===== Upcoming Events ===== */}
      <section className="upcoming-section">
        <h2>Upcoming Events</h2>
        <p>{filteredEvents.length} events</p>
      </section>

      {/* ===== Event Grid ===== */}
      <section className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              {event.imageUrl && (
                <div className="event-image-container">
                  <img
                    src={event.imageUrl}
                    alt={event.eventName}
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                  {event.category && (
                    <span className="event-category">{event.category}</span>
                  )}
                </div>
              )}
              <div className="event-info">
                <h3>{event.eventName}</h3>
                <p className="event-desc">{event.eventDesc}</p>
                <div className="event-meta">
                  <span>📅 {event.eventDate}</span>
                  <span>🕕 {event.eventTime}</span>
                  <span>📍 {event.eventLoc}</span>
                </div>
                <div className="event-price">{event.price}</div>
                <button
                  className="event-view-btn"
                  onClick={() => handleViewEvent(event.id)}
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No events found.
          </p>
        )}
      </section>
    </div>
  );
}
