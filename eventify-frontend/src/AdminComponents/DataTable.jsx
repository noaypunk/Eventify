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
            {columns.map((col, i) => (
              <td key={i}>{row[col]}</td>
            ))}

            {(onEdit || onDelete) && (
              <td>
                {onEdit && (
                <button className="edit-btn" onClick={() => onEdit(row)}>Edit</button>
              )}
              {onDelete && (
                <button className="delete-btn" onClick={() => onDelete(row.id)}>Delete</button>
              )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
