import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>React POC</h1>
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
