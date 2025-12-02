// src/AdminComponents/DataTable.jsx
import React from "react";
import "../CCSS/AdminDashboard.css";

const DataTable = ({ data, columns, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.toUpperCase()}</th>
          ))}
          {(onEdit || onDelete) && <th>ACTIONS</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col, i) => {
              if (col === "imageUrl") {
                return (
                  <td key={i}>
                    {row[col] ? (
                      <img
                        src={row[col]}
                        alt={row.eventName}
                        style={{
                          width: "80px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                );
              }
              return <td key={i}>{row[col]}</td>;
            })}

            {(onEdit || onDelete) && (
              <td>
                {onEdit && <button className="edit-btn" onClick={() => onEdit(row)}>Edit</button>}
                {onDelete && <button className="delete-btn" onClick={() => onDelete(row.id)}>Delete</button>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
