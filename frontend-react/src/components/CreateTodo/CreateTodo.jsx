import React, { useState, useContext } from "react";
import "./createTodo.css";
import { TodosContext } from "../../context/TodosContext";

const CreateTodo = () => {
  const { createTodoItem } = useContext(TodosContext);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    await createTodoItem({ title, note });

    setLoading(false);
    setTitle("");
    setNote("");
  };

  return (
    <div className="create-wrapper">
      {loading && <div className="create-overlay"><div className="big-spinner"></div></div>}

      <div className={`create-todo-card ${loading ? "blurred" : ""}`}>
        <h3 className="create-title">Create New Todo</h3>

        <label className="create-label">
          Title: <span className="required-astric">*</span>
        </label>

        <input
          type="text"
          className={`create-input ${error ? "input-error" : ""}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error && e.target.value.trim()) setError(false);
          }}
          placeholder="Title"
        />

        {error && <p className="error-text">Title is required.</p>}

        <label className="create-label">Note:</label>

        <textarea
          className="create-textarea"
          placeholder="Note"
          rows={6}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button className="create-btn" onClick={handleCreate} disabled={loading}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
