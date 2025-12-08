// src/pages/PaymentSuccess.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CCSS/PaymentSuccess.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get payment data from Payment.jsx
  const ticketDetails = location.state || {};

  return (
    <>
      <div className="success-page">
        <h2 className="success-title">🎉 Payment Successful</h2>

        <div className="ticket-details">
          <h3>{ticketDetails.eventName}</h3>
          <p><strong>Name:</strong> {ticketDetails.firstName} {ticketDetails.lastName}</p>
          <p><strong>Payment Method:</strong> {ticketDetails.paymentMethod}</p>
          <p><strong>Mobile:</strong> {ticketDetails.mobile}</p>
          <p><strong>Email:</strong> {ticketDetails.email}</p>
          <p><strong>Amount Paid:</strong> {ticketDetails.totalPrice === 0 ? "Free" : `₱${ticketDetails.totalPrice}`}</p>
          <p><strong>Reference Number:</strong> {ticketDetails.referenceNumber}</p>
        </div>

        <p className="entry-instruction">
          Present a screenshot or a printed copy of this ticket when you arrive at the venue entrance.<br />
          Thank you and enjoy!
        </p>

        <div className="success-buttons">
          <button onClick={() => navigate("/")}>Close</button>
        </div>
      </div>
    </>
  );
}
