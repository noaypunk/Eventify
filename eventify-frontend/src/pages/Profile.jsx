// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CCSS/Profile.css";

import emailIcon from "../assets/images/email.png";
import lockIcon from "../assets/images/lock-icon.png";
import telephoneIcon from "../assets/images/telephone.png";
import logo from "../assets/images/red-carpet.png";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobileNum: "",
    currentPassword: "",
    newPassword: ""
  });

  const [passwordErrors, setPasswordErrors] = useState({
    upperLower: false,
    numberSpecial: false,
    current: false
  });

  // Protect profile: redirect to login if not logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }

    // Fetch user data
    axios.get(`http://localhost:8080/api/users/${storedUser.userID}`)
      .then(res => {
        setUser(res.data);
        setFormData(prev => ({
          ...prev,
          fname: res.data.fname,
          lname: res.data.lname,
          email: res.data.email,
          mobileNum: res.data.mobileNum
        }));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "currentPassword" && user) {
      const isCurrentCorrect = value === user.password;
      setPasswordErrors(prev => ({ ...prev, current: isCurrentCorrect }));
      if (!isCurrentCorrect) {
        setFormData(prev => ({ ...prev, newPassword: "" }));
        setPasswordErrors(prev => ({ ...prev, upperLower: false, numberSpecial: false }));
      }
    }

    if (name === "newPassword" && passwordErrors.current) {
      setPasswordErrors(prev => ({
        ...prev,
        upperLower: /[a-z]/.test(value) && /[A-Z]/.test(value),
        numberSpecial: /\d/.test(value) && /[!@#$%^&*]/.test(value)
      }));
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        mobileNum: formData.mobileNum,
        password: passwordErrors.current && formData.newPassword ? formData.newPassword : user.password
      };

      const res = await axios.put(`http://localhost:8080/api/users/${user.userID}`, updatedUser);
      setUser(res.data);

      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
      setPasswordErrors({ current: false, upperLower: false, numberSpecial: false });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>User data not available.</p>;

  return (
    <div className="profile-container">
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

      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <img
            src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
            alt="Avatar"
            className="profile-avatar"
          />
          <h2 className="profile-name">{user.fname} {user.lname}</h2>
          <p className="profile-phone">📞 {user.mobileNum}</p>
        </div>

        {/* Main Content */}
        <main className="profile-main">
          {/* Tabs */}
          <div className="profile-tabs">
            <button className={`tab ${activeTab === "events" ? "active" : ""}`} onClick={() => setActiveTab("events")}>Events Attended</button>
            <button className={`tab ${activeTab === "transactions" ? "active" : ""}`} onClick={() => setActiveTab("transactions")}>Transaction History</button>
            <button className={`tab ${activeTab === "security" ? "active" : ""}`} onClick={() => setActiveTab("security")}>Security & Account Details</button>
          </div>

          {activeTab === "events" && (
            <div className="events-container">
              {/* Events Summary Cards */}
              <div className="events-summary">
                <h3 className="section-title">Events History</h3>
                <div className="events-cards">
                  <div className="event-card">
                    <p className="event-label">Free Events Attended</p>
                    <p className="event-count">{user.freeEvents || 0}</p>
                  </div>
                  <div className="event-card">
                    <p className="event-label">Total Events Attended</p>
                    <p className="event-count">{user.totalEvents || 0}</p>
                  </div>
                  <div className="event-card">
                    <p className="event-label">Paid Events Attended</p>
                    <p className="event-count">{user.paidEvents || 0}</p>
                  </div>
                </div>
              </div>

              {/* Event History Table */}
              <div className="events-history-table">
                <table>
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Date & Time</th>
                      <th>Venue</th>
                      <th>Attendees</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.events && user.events.length > 0 ? (
                      user.events.map((event, index) => (
                        <tr key={index}>
                          <td>{event.name}</td>
                          <td>{event.dateTime}</td>
                          <td>{event.venue}</td>
                          <td>{event.attendees}</td>
                          <td>{event.price}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>No events attended yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "transactions" && <p>Transactions content here...</p>}

          {activeTab === "security" && (
            <div className="security-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    <img src={emailIcon} className="icon-img" alt="email"/>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="input-with-icon">
                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
                    <img src={lockIcon} className="icon-img" alt="lock"/>
                  </div>
                  {passwordErrors.current && (
                    <div className="password-requirements">
                      <p className="valid">Current password</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <input type="text" name="mobileNum" value={formData.mobileNum} onChange={handleChange} />
                    <img src={telephoneIcon} className="icon-img" alt="phone"/>
                  </div>
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <div className="input-with-icon">
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      disabled={!passwordErrors.current}
                    />
                    <img src={lockIcon} className="icon-img" alt="lock"/>
                  </div>

                  <div className="password-requirements">
                    <p className={passwordErrors.upperLower ? "valid" : "invalid"}>Password must contain Uppercase and Lowercase Letters</p>
                    <p className={passwordErrors.numberSpecial ? "valid" : "invalid"}>
                      Password must contain Numbers and Special characters
                      <br/>(e.g.  “ @ ”, “ ! ”, “#”, “$” etc.)
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="save-changes-btn" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
