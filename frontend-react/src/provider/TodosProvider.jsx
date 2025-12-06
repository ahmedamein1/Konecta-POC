import { useState, useEffect } from "react";
import { TodosContext, todosState } from "../context/TodosContext";
import { getTodos, deleteTodo } from "../service/todosService";

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
        setFetchTodoLoading(true)
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

  const deleteTodoById  = async (id) => {
    try {
      await deleteTodo(id);

      const updated = todos.filter((todo) => todo.id !== id);
      setTodos(updated);

      const updatedActive = updated.filter((t) => t.status !== "DONE").length;
      setActiveTodosCount(updatedActive);
    } catch (err) {
       console.error("Failed to delete todo:", err.response?.data || err);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        activeTodosCount,
        fetchTodoLoading,
        deleteTodoById
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
