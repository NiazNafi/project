import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const isAdmin = AuthService.isAdmin();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}