import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <ToastContainer />
      </Sidebar>
    </div>
  );
}

export default App;
