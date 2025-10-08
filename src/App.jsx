import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Plans from "./pages/Plans";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/plans" element={<Plans />} />
        {/* <Route path="/resumen" element={<Resumen />} /> */}
      </Routes>
    </Router>
  );
}

export default App;