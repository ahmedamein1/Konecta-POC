import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
        <AppLayout />
        <ToastContainer 
        position="top-right"
        autoClose={2500}
        pauseOnHover
        hideProgressBar={true}
        theme="light"
      />
      
    </div>
  );
}

export default App;
