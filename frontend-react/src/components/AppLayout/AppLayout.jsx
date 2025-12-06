import React from "react";
import ActiveTodoNumber from "../ActiveTodoNumber/ActiveTodoNumber";
import CreateTodo from "../CreateTodo/CreateTodo";
import TodosContainer from "../TodosContainer/TodosContainer";
import { TodosProvider } from "../../provider/TodosProvider";
import "./appLayout.css";

const AppLayout = () => {
  return (
    <TodosProvider>
    <div className="app-layout">
      <div className="left-side">
        <TodosContainer />
      </div>

      <div className="right-side">
        <CreateTodo />
        <ActiveTodoNumber />
      </div>
    </div>
    </TodosProvider>
  );
};

export default AppLayout;
