import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Settings from "./pages/Settings";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
