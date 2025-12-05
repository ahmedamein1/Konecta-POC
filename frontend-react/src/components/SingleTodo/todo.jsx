import { useState } from "react";
import "./todo.css";
import { TODO_STATUS_OPTIONS } from "../../config/todoStatusOptions";

const Todo = ({ title, note, status }) => {
  const [selectedStatus, setSelectedStatus] = useState(status);

  return (
    <div className={`todo-card status-${status}`}>
      <div className="todo-left-strip"></div>

      <div className="todo-content">
        <h3 className="todo-title">{title}</h3>

        {note && note.trim() !== "" && <p className="todo-note">{note}</p>}
      </div>

      <div className="todo-actions">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="todo-select"
        >
          {TODO_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="todo-icon-actions">
          <button className="todo-icon-btn">✏️</button>
          <button className="todo-icon-btn">🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
