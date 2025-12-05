import './App.css';
import Todo from './components/SingleTodo/todo';

function App() {
  return (
    <div className="App">
      <Todo title="study" note="small note" status="NEW" />
    </div>
  );
}

export default App;
