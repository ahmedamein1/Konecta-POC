import { useState, useEffect } from "react";
import { TodosContext, todosState } from "../context/TodosContext";
import { getTodos, deleteTodo, updateTodoStatus, updateTodo, createTodo } from "../service/todosService";
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

  const updateStatusById = async (id, newStatus) => {
    try {
      await updateTodoStatus(id, newStatus);

      const updatedList = todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      );

      setTodos(updatedList);

      const updatedActive = updatedList.filter((t) => t.status !== "DONE").length;
      setActiveTodosCount(updatedActive);

      toast.success("Status updated!");

    } catch (err) {
      console.error("Failed to update status:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  const updateTodoById = async (id, updatedData) => {
  try {
    await updateTodo(id, updatedData);

    const updatedList = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedData } : todo
    );

    setTodos(updatedList);

    const updatedActive = updatedList.filter((t) => t.status !== "DONE").length;
    setActiveTodosCount(updatedActive);

    toast.success("Todo updated successfully!");

  } catch (err) {
    console.error("Failed to update todo:", err.response?.data || err);
    toast.error(err.response?.data?.message || "Failed to update todo.");
  }
};

const createTodoItem = async (newTodoData) => {
  try {
    const res = await createTodo(newTodoData);
    const createdTodo = res.data.todo;

    const updated = [...todos, createdTodo];
    setTodos(updated);

    const updatedActive = updated.filter((t) => t.status !== "DONE").length;
    setActiveTodosCount(updatedActive);

    toast.success("Todo created successfully!");
  } catch (err) {
    console.error("Failed to create todo:", err);
    toast.error(err.response?.data?.message || "Failed to create todo.");
  }
};


  return (
    <TodosContext.Provider
      value={{
        todos,
        activeTodosCount,
        fetchTodoLoading,
        deleteTodoById,
        updateStatusById,
        updateTodoById,
        createTodoItem
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
