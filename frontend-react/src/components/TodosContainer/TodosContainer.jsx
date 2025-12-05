import React from "react";
import "./todosContainer.css";
import SingleTodo from "../SingleTodo/SingleTodo";

const TodosContainer = () => {
  const staticTodos = [
    {
      id: 1,
      title: "Study React",
      note: "Finish hooks chapter",
      status: "NEW",
    },
    {
      id: 2,
      title: "Gym",
      note: "Leg day today",
      status: "IN-PROGRESS",
    },
    {
      id: 3,
      title: "Groceries",
      note: "Buy milk and bread",
      status: "DONE",
    },
  ];

  return (
    <div className="todos-container">
      {staticTodos.map((todo) => (
        <SingleTodo
          key={todo.id}
          title={todo.title}
          note={todo.note}
          status={todo.status}
        />
      ))}
    </div>
  );
};

export default TodosContainer;
