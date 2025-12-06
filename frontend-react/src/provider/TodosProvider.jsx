import { useState, useEffect } from "react";
import { TodosContext, todosState } from "../context/TodosContext";
import { getTodos, deleteTodo } from "../service/todosService";
import { toast } from "react-toastify";

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
        setFetchTodoLoading(true);
        const res = await getTodos();

        const fetchedTodos = res.data.todos || [];
        const activeCount = res.data.activeTodosNumber ?? 0;

        setTodos(fetchedTodos);
        setActiveTodosCount(activeCount);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
        toast.error(
          err.response?.data?.message || "Failed to fetch todos from server."
        );
      } finally {
        setFetchTodoLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteTodoById = async (id) => {
    try {
      await deleteTodo(id);

      const updated = todos.filter((todo) => todo.id !== id);
      setTodos(updated);

      const updatedActive = updated.filter((t) => t.status !== "DONE").length;
      setActiveTodosCount(updatedActive);
      toast.success("Todo deleted successfully!");
    } catch (err) {
      console.error("Failed to delete todo:", err);
      toast.error(err.response?.data?.message || "Failed to delete todo.");
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        activeTodosCount,
        fetchTodoLoading,
        deleteTodoById,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
