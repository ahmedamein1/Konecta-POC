import { useState } from "react";
import "./singleTodo.css";
import { TODO_STATUS_OPTIONS } from "../../config/todoStatusOptions";

const SingleTodo = ({ title, note, status, onDelete, onStatusChange  }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
  };

  const handleStatusUpdate = async (e) => {
    const newStatus = e.target.value;
    setLoading(true);
    await onStatusChange(newStatus);
    setLoading(false);
  };

  return (
    <div className={`todo-card-wrapper ${loading ? "loading" : ""}`}>
      {loading && <div className="todo-spinner"></div>}

      <div className={`todo-card status-${status}`}>
        <div className="todo-left-strip"></div>

        <div className="todo-content">
          <h3 className="todo-title">{title}</h3>
          {note && note.trim() !== "" && <p className="todo-note">{note}</p>}
        </div>

        <div className="todo-actions">
          <select
            value={status}
            onChange={handleStatusUpdate}
            className="todo-select"
            disabled={loading}
          >
            {TODO_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="todo-icon-actions">
            <button className="todo-icon-btn" disabled={loading}>✏️</button>
            <button
              className="todo-icon-btn"
              onClick={handleDelete}
              disabled={loading}
            >
             🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
