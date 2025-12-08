// src/pages/Payment.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CCSS/Payment.css";
import arrowIcon from "../assets/images/arrow.png";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Logged-in user info
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [event, setEvent] = useState(null);
  const [consent, setConsent] = useState(false);
  const [firstName, setFirstName] = useState(user.fname || "");
  const [lastName, setLastName] = useState(user.lname || "");
  const [email, setEmail] = useState(user.email || "");
  const [mobile, setMobile] = useState(user.mobileNum ? String(user.mobileNum) : "");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Fetch event details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setTotalPrice(res.data.eventPrice || 0);
      })
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  // Update total price dynamically when quantity changes
  useEffect(() => {
    if (event) {
      const pricePerTicket = event.eventPrice || 0;
      setTotalPrice(pricePerTicket * quantity);
    }
  }, [quantity, event]);

  if (!event) return <p>Loading...</p>;

  // Generate unique reference number
  const generateReferenceNumber = () => {
    return "EVT" + Date.now() + Math.floor(Math.random() * 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !mobile || !quantity) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!consent) {
      alert("You must agree to the privacy policy before submitting.");
      return;
    }

    const referenceNumber = generateReferenceNumber();

    const paymentData = {
      eventName: event.eventName,
      firstName,
      lastName,
      email,
      mobile,
      quantity,
      totalPrice,
      paymentMethod,
      referenceNumber,
    };

    console.log("Payment data:", paymentData);

    // Navigate to success page and pass payment data
    navigate("/payment-success", { state: paymentData });
  };

  return (
    <div className="payment-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={arrowIcon} alt="Back" className="back-icon" />
      </button>

      <h2 className="payment-title">{event.eventName}</h2>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="name-row">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="contact-row">
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Quantity (max 3):</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = Math.min(Math.max(e.target.value, 1), 3);
                setQuantity(val);
              }}
              min={1}
              max={3}
            />
          </div>

          <div className="form-group">
            <label>Total Price:</label>
            <span className="price-field">
              {totalPrice === 0 ? "Free" : `₱${totalPrice}`}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">-- Select Payment Method --</option>
            <option value="Gcash">Gcash</option>
            <option value="DragonPay">DragonPay</option>
            <option value="Union Bank">Union Bank</option>
            <option value="Paypal">Paypal</option>
          </select>
        </div>

        <div className="privacy-policy">
          <p>
            I hereby authorize and give my full consent to the processing,
            release, retention, and sharing of my personal information necessary
            for payment.
          </p>
          <div className="consent-wrapper">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>I CONSENT AND AGREE TO THE PRIVACY POLICY</span>
          </div>
        </div>

        <div className="submit-buttons">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}
