import React from "react";
import Navbar from "./Navbar";
import "../CCSS/LandingPage.css";

export default function LandingPage() {
  return (
    <div>
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
    </div>
  );
}