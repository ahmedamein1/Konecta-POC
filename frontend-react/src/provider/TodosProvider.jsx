import { useState, useContext } from "react";
import { TodosContext } from "./TodosContext";

export const TodosProvider = ({ children }) => {
  const todoContext = useContext(TodosContext);
  const [todos, setTodos] = useState(todoContext.todos);
  const [activeTodosCount, setActiveTodosCount] = useState(
    todoContext.activeTodosCount
  );

  return (
    <TodosContext.Provider
      value={{
        todos,
        activeTodosCount,
        setTodos,
        setActiveTodosCount
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
