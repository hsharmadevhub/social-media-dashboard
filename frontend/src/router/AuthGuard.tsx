import { Navigate } from "react-router-dom";
import useAuthStore from "../shared/stores/AuthStore";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((s) => !!(s.token && s.username));
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
