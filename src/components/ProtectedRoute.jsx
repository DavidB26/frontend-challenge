// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '@/utils/auth';

export default function ProtectedRoute() {
  const ok = isAuthenticated();
  const location = useLocation();
  return ok ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}