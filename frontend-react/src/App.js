import './App.css';
import ActiveTodoNumber from './components/ActiveTodoNumber/ActiveTodoNumber';
import CreateTodo from './components/CreateTodo/CreateTodo';
import SingleTodo from './components/SingleTodo/SingleTodo';
import TodosContainer from './components/TodosContainer/TodosContainer';

function App() {
  return (
    <div className="App">
      <ActiveTodoNumber/>
      <TodosContainer/>
      <CreateTodo/>
    </div>
  );
}

export default App;
