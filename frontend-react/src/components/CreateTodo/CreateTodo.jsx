import React, { useState } from "react";
import "./createTodo.css";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="create-todo-card">
      <h3 className="create-title">Create New Todo</h3>

      <label className="create-label">
        Title: <span className="required-astric">*</span>
      </label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="create-input"
        required
      />

      <label className="create-label">Note:</label>
      <textarea
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="create-textarea"
        rows={6}
        
      />

      <button className="create-btn">
        Create
      </button>
    </div>
  );
};

export default CreateTodo;
