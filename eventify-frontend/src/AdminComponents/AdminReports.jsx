import React, { useState, useMemo } from "react";
import Sidebar from "../AdminComponents/Sidebar";
import DataTable from "../AdminComponents/DataTable";
import "../CCSS/AdminDashboard.css";

const AdminReports = () => {
  // Sample state data for event feedback
  const [feedbackData] = useState([
    { id: 101, event: "Music Festival 2025", user: "Juan Dela Cruz", rating: 5, comment: "Amazing venue and great lineup! Everything was well-organized.", date: "2025-02-15" },
    { id: 102, event: "Tech Conference 2025", user: "Anna Santos", rating: 4, comment: "The speakers were knowledgeable, but registration took too long.", date: "2025-03-11" },
    { id: 103, event: "Startup Pitch Day", user: "Mark G.", rating: 2, comment: "Poor internet connection throughout the event. Needs improvement.", date: "2025-04-20" },
    { id: 104, event: "Music Festival 2025", user: "Maria C.", rating: 5, comment: "Best concert ever!", date: "2025-02-16" },
    { id: 105, event: "Tech Conference 2025", user: "Rene D.", rating: 3, comment: "Good content, but the lunch was cold.", date: "2025-03-10" },
  ]);

  // State to hold the currently selected filter (event name)
  const [selectedEvent, setSelectedEvent] = useState("All Events"); 

  const columns = ["event", "user", "rating", "comment", "date"];

  const handleViewFeedback = (feedback) => {
    alert(`Viewing Feedback from ${feedback.user} for ${feedback.event}:\nRating: ${feedback.rating}/5\nComment: "${feedback.comment}"`);
  };

  // --- Filtering Logic ---

  // 1. Get a list of unique event names for the filter dropdown
  const uniqueEvents = useMemo(() => {
    const events = feedbackData.map(feedback => feedback.event);
    return ["All Events", ...new Set(events)]; // Add "All Events" option
  }, [feedbackData]);

  // 2. Filter the feedback data based on the selected event
  const filteredData = useMemo(() => {
    if (selectedEvent === "All Events") {
      return feedbackData;
    }
    return feedbackData.filter(feedback => feedback.event === selectedEvent);
  }, [feedbackData, selectedEvent]);
  
  // --- End Filtering Logic ---

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        {/* <Topbar /> */}

        <div className="admin-reports-content"> 
          <h2>📊 Event Feedback Reports</h2>

          {/* New Filter Controls Section */}
          <div className="filter-controls">
            <label htmlFor="event-filter">Filter by Event:</label>
            <select
              id="event-filter"
              className="event-filter-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              {uniqueEvents.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
          </div>
          {/* End Filter Controls Section */}
          
          <div className="data-table-container">
            <DataTable
              // Pass the filtered data to the DataTable
              data={filteredData} 
              columns={columns}
              onEdit={handleViewFeedback}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;