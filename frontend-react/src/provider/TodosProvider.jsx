import { useState, useEffect } from "react";
import { TodosContext, todosState } from "../context/TodosContext";
import { getTodos } from "../service/todosService";

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState(todosState.todos);
  const [activeTodosCount, setActiveTodosCount] = useState(
    todosState.activeTodosCount
  );
  const [fetchTodoLoading, setFetchTodoLoading] = useState(
    todosState.fetchTodoLoading
  );

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await getTodos();

        const fetchedTodos = res.data.todos || [];
        const activeCount = res.data.activeTodosNumber ?? 0;

        setTodos(fetchedTodos);
        setActiveTodosCount(activeCount);

      } catch (err) {
        console.error("Failed to fetch todos:", err);

      } finally {
        setFetchTodoLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        activeTodosCount,
        fetchTodoLoading
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
