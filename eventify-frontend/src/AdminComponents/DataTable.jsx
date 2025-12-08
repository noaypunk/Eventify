// src/AdminComponents/DataTable.jsx
import React from "react";
import "../CCSS/AdminDashboard.css";

const DataTable = ({ data, columns, onEdit, onDelete }) => {
  return (
    <div className="datatable-wrapper">
      <div className="datatable-scroll">
        <table className="datatable">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>
                  {col.replace(/([A-Z])/g, " $1").toUpperCase()}
                </th>
              ))}
              {(onEdit || onDelete) && <th>ACTIONS</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="no-data">
                  No events available
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col, i) => {
                    if (col === "imageUrl") {
                      return (
                        <td key={i}>
                          {row[col] ? (
                            <img
                              src={row[col]}
                              alt={row.eventName || "Event Image"}
                              className="datatable-image"
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>
                      );
                    }
                    if (col === "eventDesc") {
                      return <td key={i} className="eventdesc">{row[col]}</td>;
                    }
                    if (col === "eventPrice") {
                      return (
                        <td key={i}>
                          {row[col] === 0 ? "Free" : `₱${row[col]}`}
                        </td>
                      );
                    }
                    return <td key={i}>{row[col]}</td>;
                  })}
                  {(onEdit || onDelete) && (
                    <td className="action-buttons">
                      {onEdit && (
                        <button className="edit-btn" onClick={() => onEdit(row)}>Edit</button>
                      )}
                      {onDelete && (
                        <button className="delete-btn" onClick={() => onDelete(row.id)}>Delete</button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
