import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewInstruments from "./pages/ViewInstruments";
import ViewLogs from "./pages/ViewLogs";
import ViewConnectorsList from "./pages/ViewConnectorsList";

function App() {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connectors" element={<ViewConnectorsList />} />
          <Route path="/instruments" element={<ViewInstruments />} />
          <Route path="/viewlogs" element={<ViewLogs />} />
        </Routes>
        <ToastContainer />
      </Sidebar>
    </div>
  );
}

export default App;
