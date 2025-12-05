import React from "react";
import "./todosContainer.css";
import SingleTodo from "../SingleTodo/SingleTodo";

const TodosContainer = () => {
  const staticTodos = [];

  const isEmpty = staticTodos.length === 0;

  return (
    <div className="todos-container">
      {isEmpty ? (
        <p className="no-todos">No Todo Available</p>
      ) : (
        staticTodos.map((todo) => (
          <SingleTodo
            key={todo.id}
            title={todo.title}
            note={todo.note}
            status={todo.status}
          />
        ))
      )}
    </div>
  );
};

export default TodosContainer;
