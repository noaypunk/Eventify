// src/AdminComponents/ModalForm.jsx
import React, { useState, useEffect } from "react";
import "../CCSS/AdminDashboard.css";

const ModalForm = ({ title, fields, defaultValues = {}, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialData = fields.reduce((acc, field) => {
      acc[field] = defaultValues[field] ?? "";
      return acc;
    }, {});
    setFormData(initialData);
  }, [defaultValues, fields]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "eventPrice") {
      // Allow only numbers
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSave = () => {
    // Convert empty price to 0
    if (!formData.eventPrice) formData.eventPrice = 0;
    else formData.eventPrice = Number(formData.eventPrice);

    // Validate image URL
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
    if (field.toLowerCase() === "eventprice") return "number";
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
              placeholder={field === "eventImage" ? "Enter image URL" : field === "eventPrice" ? "0 = Free" : ""}
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
