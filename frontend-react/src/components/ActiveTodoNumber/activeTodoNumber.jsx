import React, { useContext } from "react";
import "./activeTodoNumber.css";
import { TodosContext } from "../../context/TodosContext";

const ActiveTodoNumber = () => {
  const { activeTodosCount, fetchTodoLoading } = useContext(TodosContext);

  return (
    <div className="active-todo-card">
      <h3 className="active-todo-title">Active Todos:</h3>

      {fetchTodoLoading ? (
         <div className="todos-loading-wrapper">
          <div className="todos-loading-spinner"></div>
        </div>
      ) : (
        <p className="active-todo-count">{activeTodosCount}</p>
      )}
    </div>
  );
};

export default ActiveTodoNumber;
