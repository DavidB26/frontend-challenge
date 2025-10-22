// src/components/GuestRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '@/utils/auth';

export default function GuestRoute() {
  const ok = isAuthenticated();
  return ok ? <Outlet /> : <Navigate to="/login" replace />;
}