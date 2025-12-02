import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../CCSS/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Redirect if not logged in
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      setLoading(false); // show page for everyone
    }
  }, [navigate]);

  if (loading) return null; // or a spinner

  return (
    <div>
      <Navbar />

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
