import React, { useContext, useEffect, useState } from "react";
import "./todosContainer.css";
import SingleTodo from "../SingleTodo/SingleTodo";
import { TodosContext } from "../../context/TodosContext";

const TodosContainer = () => {
  const {
    todos,
    fetchTodoLoading,
    deleteTodoById,
    updateStatusById,
    updateTodoById,
  } = useContext(TodosContext);

  const [filter, setFilter] = useState("ALL");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    let list = todos;

    if (filter !== "ALL") {
      list = todos.filter((t) => t.status === filter);
    }

    setFilteredTodos(list);
    setIsEmpty(list.length === 0);
  }, [todos, filter]);

  return (
    <div className="todos-wrapper">
      <div className="todos-filter-bar">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="todos-filter-select"
        >
          <option value="ALL">All</option>
          <option value="NEW">New</option>
          <option value="IN-PROGRESS">In-Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <div className={`todos-container ${isEmpty || fetchTodoLoading ? "empty" : ""}`}>
        {fetchTodoLoading ? (
          <div className="todos-loading-wrapper">
            <div className="todos-loading-spinner"></div>
          </div>
        ) : isEmpty ? (
          <p className="no-todos">No Todo Available</p>
        ) : (
          filteredTodos.map((todo) => (
            <SingleTodo
              key={todo.id}
              title={todo.title}
              note={todo.note}
              status={todo.status}
              onDelete={() => deleteTodoById(todo.id)}
              onStatusChange={(newStatus) =>
                updateStatusById(todo.id, newStatus)
              }
              onUpdateTodo={(newData) => updateTodoById(todo.id, newData)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodosContainer;
