import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function GuestRoute() {
  const ok = isAuthenticated();
  // If already authenticated, redirect to /plans; otherwise render nested routes (e.g., / or /login)
  return ok ? <Navigate to="/plans" replace /> : <Outlet />;
}