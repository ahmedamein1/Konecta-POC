import { createContext } from "react";

export const todosState = {
  todos: [],
  activeTodosCount: 0,
  fetchTodoLoading: true
};

export const TodosContext = createContext(todosState);
