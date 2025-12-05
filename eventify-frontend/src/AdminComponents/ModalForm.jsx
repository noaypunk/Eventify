// src/AdminComponents/ModalForm.jsx
import React, { useState, useEffect } from "react";
import "../CCSS/AdminDashboard.css";

const ModalForm = ({ title, fields, defaultValues = {}, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  // Initialize formData when defaultValues change (important for editing)
  useEffect(() => {
    const initialData = fields.reduce((acc, field) => {
      acc[field] = defaultValues[field] || ""; // preserve current image URL
      return acc;
    }, {});
    setFormData(initialData);
  }, [defaultValues, fields]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Validate image URL if provided
    if (formData.eventImage && !formData.eventImage.startsWith("http")) {
      alert("Please enter a valid image URL starting with http/https.");
      return;
    }
    onSubmit(formData);
  };

  const getInputType = (field) => {
    if (field.toLowerCase().includes("date")) return "date";
    if (field.toLowerCase().includes("time")) return "time";
    if (field.toLowerCase().includes("image")) return "url";
    return "text";
  };

  const getLabel = (field) => {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>{title}</h2>

        {fields.map((field, i) => (
          <div key={i} className="form-group">
            <label>{getLabel(field)}</label>
            <input
              type={getInputType(field)}
              name={field}
              value={formData[field]}
              placeholder={field.toLowerCase().includes("image") ? "Enter image URL" : ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );
};

export default ModalForm;
