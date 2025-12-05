import './App.css';
import ActiveTodoNumber from './components/ActiveTodoNumber/ActiveTodoNumber';
import CreateTodo from './components/CreateTodo/CreateTodo';
import SingleTodo from './components/SingleTodo/SingleTodo';

function App() {
  return (
    <div className="App">
      <ActiveTodoNumber/>
      <SingleTodo title={"title"} note={"note"} status={"NEW"}/>
      <CreateTodo/>
    </div>
  );
}

export default App;
