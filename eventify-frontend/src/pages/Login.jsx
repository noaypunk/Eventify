import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CCSS/Login.css";
import axios from "axios";

// Icons & BG
import homeIcon from "../assets/images/arrow.png";
import emailIcon from "../assets/images/email.png";
import lockIcon from "../assets/images/lock-icon.png";
import loginBG from "../assets/images/login-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // "success" or "error"

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", form);

      // Store user info
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("userId", response.data.userID);

      // Show success message
      setMsgType("success");
      setMessage("Login successful!");

      // Redirect after a short delay
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
      setMsgType("error");
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="split-container">
      <div className="image-panel" style={{ backgroundImage: `url(${loginBG})` }}></div>

      <div className="form-panel">
        <img
          src={homeIcon}
          alt="Home"
          className="home-icon"
          onClick={() => navigate("/")}
        />

        <h2>WELCOME</h2>
        <p className="subheading">Login with email</p>

        {/* Notification */}
        {message && (
          <div className={`login-message ${msgType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <img src={emailIcon} alt="email" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <img src={lockIcon} alt="password" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>

        <p className="small-text">
          Don’t have an account? <Link to="/register" className="blue-link">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
