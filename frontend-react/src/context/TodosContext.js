import { createContext } from "react";

export const TodosContext = createContext({
  todos: [],        
  activeTodosCount: 0,  
});
