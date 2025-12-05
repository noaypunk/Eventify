import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CCSS/LandingPage.css";
import logo from "../assets/images/red-carpet.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  /* ===================== LOAD USER ===================== */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  /* ===================== FETCH EVENTS ===================== */
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

  /* ===================== FILTER EVENTS ===================== */
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ===================== LOGOUT ===================== */
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      setUser(null);
      navigate("/login");
    }
  };

  /* ===================== VIEW EVENT ===================== */
  const handleViewEvent = (id) => {
    navigate(`/events/${id}`);
  };

  /* ===================== NAVBAR HOME ===================== */
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="landing-page">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="logo" className="navbar-logo" onClick={goHome} />
          <span className="navbar-site-name" onClick={goHome}>
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
            <>
              <button
                className="navbar-login-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </header>

      {/* ================= DISCOVER SECTION ================= */}
      <section className="discover-section">
        <h1>Discover Events That Excite You</h1>
        <p>Search and join events that match your vibe</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => {}}>Search</button>
        </div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section className="upcoming-section">
        <h2>Upcoming Events</h2>
        <p>{filteredEvents.length} events found</p>
      </section>

      {/* ================= EVENT GRID ================= */}
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

          {/* ONLY SHOW VIEW BUTTON IF LOGGED IN */}
          {user && (
            <button
              className="event-view-btn"
              onClick={() => handleViewEvent(event.id)}
            >
              View
            </button>
          )}
        </div>
      </div>
    ))
  ) : (
    <p style={{ textAlign: "center", width: "100%" }}>No events found.</p>
  )}
</section>

    </div>
  );
}
