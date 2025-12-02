import React from "react";

const DashboardCard = ({ title, value }) => {
  return (
    // Add the class 'dashboard-card' here
    <div className="dashboard-card"> 
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default DashboardCard;
