import React, { useContext, useEffect, useState } from "react";
import "./todosContainer.css";
import SingleTodo from "../SingleTodo/SingleTodo";
import { TodosContext } from "../../context/TodosContext";

const TodosContainer = () => {
  const { todos, fetchTodoLoading, deleteTodoById } = useContext(TodosContext);

  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(todos.length === 0);
  }, [todos]);

  return (
    <div className="todos-container">
      {fetchTodoLoading ? (
        <p className="no-todos">Loading...</p>
      ) : isEmpty ? (
        <p className="no-todos">No Todo Available</p>
      ) : (
        todos.map((todo) => (
          <SingleTodo
            key={todo.id}
            title={todo.title}
            note={todo.note}
            status={todo.status}

            onDelete={()=>deleteTodoById(todo.id)}
          />
        ))
      )}
    </div>
  );
};

export default TodosContainer;
