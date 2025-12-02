import React, { useState } from "react";
import "../CCSS/AdminDashboard.css";

const ModalForm = ({ title, fields, defaultValues = {}, onSubmit, onClose }) => {
  
  // Initialize form state dynamically from fields
  const [formData, setFormData] = useState(() => {
    return fields.reduce((acc, field) => {
      acc[field] = defaultValues[field] || "";
      return acc;
    }, {});
  });

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data directly
  const handleSave = () => {
    onSubmit(formData);
  };

  // Automatically determine input type
  const getInputType = (field) => {
    if (field.toLowerCase().includes("date")) return "date";
    if (field.toLowerCase().includes("time")) return "time";
    return "text";
  };

  // Beautify field label
  const getLabel = (field) => {
    return field
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/^./, str => str.toUpperCase()); // capitalize first letter
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
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
