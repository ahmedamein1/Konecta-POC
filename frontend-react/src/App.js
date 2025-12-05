import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import { TodosProvider } from './provider/TodosProvider';

function App() {
  return (
    <div className="App">
      <TodosProvider>
        <AppLayout />
      </TodosProvider>
    </div>
  );
}

export default App;
