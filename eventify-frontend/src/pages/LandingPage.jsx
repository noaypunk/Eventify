import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import EventCard from "../EventComponents/EventCard";
import "../CCSS/LandingPage.css";



export default function LandingPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((res) => {
        // Transform backend data to match EventCard props
        const formatted = res.data.map((ev) => ({
          id: ev.eventID,               // used for key & navigation
          eventName: ev.eventName,
          eventDesc: ev.eventDesc,
          eventLoc: ev.eventLoc,
          eventDate: ev.eventDate,
          eventTime: ev.eventTime,
          eventOrganizer: ev.eventOrganizer,
          imageUrl: ev.eventImage || "", // will handle relative or full URL in EventCard
        }));
        setEvents(formatted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Hero Container */}
      <main className="landing-main">
        <h1 className="landing-title">Discover Amazing Events</h1>
        <p className="landing-subtitle">
          Find and register for events that match your interests.
        </p>

        <div className="search-bar">
          <input type="text" placeholder="Search events..." />
          <button>Search</button>
        </div>
      </main>

      {/* Event Counter Container */}
      <section className="event-counter-container">
        <h4>Upcoming Events</h4>
        <p>{events.length} events</p>
      </section>

      {/* Event Grid */}
      <section className="event-grid">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p>No events found.</p>
        )}
      </section>
    </div>
  );
}
