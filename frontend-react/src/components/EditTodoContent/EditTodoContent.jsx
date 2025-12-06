import { useState } from "react";
import "./editTodoContent.css";
import { TODO_STATUS_OPTIONS } from "../../config/todoStatusOptions";

const EditTodoContent = ({ title, note, status, onCancel, onUpdate }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editNote, setEditNote] = useState(note || "");
  const [editStatus, setEditStatus] = useState(status);
  const [error, setError] = useState(false);

  const handleUpdate = () => {
    if (!editTitle.trim()) {
      setError(true);
      return;
    }

    setError(false);

    onUpdate({
      title: editTitle,
      note: editNote,
      status: editStatus
    });
  };

  return (
    <div className="edit-todo-container">

      <label className="edit-label">
        Title <span className="required">*</span>
      </label>
      <input
        type="text"
        className={`edit-input ${error ? "input-error" : ""}`}
        value={editTitle}
        onChange={(e) => {
          setEditTitle(e.target.value);
          if (error && e.target.value.trim() !== "") setError(false);
        }}
        placeholder="Enter title"
      />

      {error && <p className="error-text">Title is required.</p>}

      <label className="edit-label">Note</label>
      <textarea
        className="edit-textarea"
        rows={4}
        value={editNote}
        onChange={(e) => setEditNote(e.target.value)}
        placeholder="Enter note"
      />

      <label className="edit-label">Status</label>
      <select
        className="edit-select"
        value={editStatus}
        onChange={(e) => setEditStatus(e.target.value)}
      >
        {TODO_STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <div className="edit-actions">
        <button className="edit-btn update-btn" onClick={handleUpdate}>
          Update
        </button>

        <button className="edit-btn cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>

    </div>
  );
};

export default EditTodoContent;
