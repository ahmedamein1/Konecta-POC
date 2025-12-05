import React from "react";
import ActiveTodoNumber from "../ActiveTodoNumber/ActiveTodoNumber";
import CreateTodo from "../CreateTodo/CreateTodo";
import TodosContainer from "../TodosContainer/TodosContainer";
import "./appLayout.css";

const AppLayout = () => {
  return (
    <div className="app-layout">

      <div className="left-side">
        <ActiveTodoNumber />
        <CreateTodo />
      </div>

      <div className="right-side">
        <TodosContainer />
      </div>

    </div>
  );
};

export default AppLayout;
