import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Login from "./pages/Login";
import Plans from "./pages/Plans";
import Summary from "./pages/Summary";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas accesibles sin sesión */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas protegidas (requieren sesión) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/plans" element={<Plans />} />
          <Route path="/summary" element={<Summary />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<div style={{ padding: 24 }}>404 • Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;