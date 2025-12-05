import React, { useState } from "react";
 import "./activeTodoNumber.css";

const ActiveTodoNumber = () => {
  const [activeTodos, setActiveTodos] = useState(0);

  return (
    <div className="active-todo-card">
      <h3 className="active-todo-title">Active Todos:</h3>
      <p className="active-todo-count">{activeTodos}</p>
    </div>
  );
};

export default ActiveTodoNumber;
