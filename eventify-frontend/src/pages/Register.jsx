import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CCSS/Register.css";
import axios from "axios"; // <- use axios instead of authService

// Icons
import userIcon from "../assets/images/user-icon.png";
import emailIcon from "../assets/images/email.png";
import phoneIcon from "../assets/images/phone.png";
import lockIcon from "../assets/images/lock-icon.png";
import registerBG from "../assets/images/register-bg.jpg";
import homeIcon from "../assets/images/home.png";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fname: "", lname: "", email: "", mobileNum: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "password") checkPasswordStrength(value);
    if (name === "confirmPassword") checkConfirmPassword(value);
  };

  const validatePasswordRules = (password) => ({
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  });

  const checkPasswordStrength = (password) => {
    const rules = validatePasswordRules(password);
    const passed = Object.values(rules).filter(Boolean).length;
    if (passed <= 2) setPasswordStrength("Weak");
    else if (passed <= 4) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  const checkConfirmPassword = (value) => {
    if (value !== form.password) setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match!" }));
    else setErrors(prev => { const newErrors = {...prev}; delete newErrors.confirmPassword; return newErrors; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password rules
    const rules = validatePasswordRules(form.password);
    const failed = Object.entries(rules).filter(([_, v]) => !v).map(([k]) => k);
    let newErrors = {};
    if (failed.length) newErrors.password = "Password does not meet all requirements.";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match!";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      // CALL SPRING BOOT BACKEND
      await axios.post("http://localhost:8080/api/users", {
  fname: form.fname,
  lname: form.lname,
  email: form.email,
  mobileNum: form.mobileNum ? Number(form.mobileNum) : null,
  password: form.password
});
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed. Maybe email or mobile number already exists.");
    }
  };

  return (
    <div className="split-container">
      <div className="image-panel" style={{ backgroundImage: `url(${registerBG})` }}></div>

      <div className="form-panel">
        <img
          src={homeIcon}
          alt="Home"
          className="home-icon"
          onClick={() => navigate("/")}
        />

        <h2>SIGN UP</h2>
        <p className="subheading">Create your account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group half">
              <img src={userIcon} alt="fname" />
              <input type="text" name="fname" placeholder="First Name" value={form.fname} onChange={handleChange} required />
            </div>
            <div className="input-group half">
              <img src={userIcon} alt="lname" />
              <input type="text" name="lname" placeholder="Last Name" value={form.lname} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-group">
            <img src={emailIcon} alt="email" />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <img src={phoneIcon} alt="mobile" />
            <input type="text" name="mobileNum" placeholder="Mobile Number" value={form.mobileNum} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <img src={lockIcon} alt="password" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>

          {form.password && (
            <div className="password-rules">
              <p className={validatePasswordRules(form.password).length ? "ok" : "bad"}>• At least 8 characters</p>
              <p className={validatePasswordRules(form.password).upper ? "ok" : "bad"}>• One uppercase letter</p>
              <p className={validatePasswordRules(form.password).lower ? "ok" : "bad"}>• One lowercase letter</p>
              <p className={validatePasswordRules(form.password).number ? "ok" : "bad"}>• One number</p>
              <p className={validatePasswordRules(form.password).special ? "ok" : "bad"}>• One special character</p>
              <p className={`strength ${passwordStrength.toLowerCase()}`}>Strength: {passwordStrength}</p>
            </div>
          )}

          <div className="input-group">
            <img src={lockIcon} alt="confirmPassword" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
          </div>

          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type="submit" className="button">Sign Up</button>
        </form>

        <p className="small-text">
          Already have an account? <Link to="/login" className="blue-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
