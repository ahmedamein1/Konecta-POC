import { useState } from "react";
import "./singleTodo.css";
import { TODO_STATUS_OPTIONS } from "../../config/todoStatusOptions";
import EditTodoContent from "../EditTodoContent/EditTodoContent";

const SingleTodo = ({ title, note, status, onDelete, onStatusChange, onUpdateTodo }) => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

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

   const handleUpdateTodo = async (newData) => {
    setLoading(true);
    await onUpdateTodo(newData);
    setLoading(false);
    setEditMode(false);
  };

  return (
    <div className={`todo-card-wrapper ${loading ? "loading" : ""}`}>
      {loading && <div className="todo-spinner"></div>}

      <div className={`todo-card status-${status}`}>
        <div className="todo-left-strip"></div>
        {!editMode && (
          <>
            <div className="todo-content">
              <h3 className="todo-title">{title}</h3>
              {note && note.trim() !== "" && (
                <p className="todo-note">{note}</p>
              )}
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
                <button
                  className="todo-icon-btn"
                  disabled={loading}
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="todo-icon-btn"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  🗑️
                </button>
              </div>
            </div>
          </>
        )}
        {editMode &&(
          <EditTodoContent
          title={title}
          note={note}
          status={status}
          onCancel={()=>setEditMode(false)}
          onUpdate={handleUpdateTodo}/>
          
        )}
      </div>
    </div>
  );
};

export default SingleTodo;
