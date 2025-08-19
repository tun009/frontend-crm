import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  roles?: string[];
}

const AuthGuard = ({ children, requireAuth = true, roles }: AuthGuardProps) => {
  const location = useLocation();
  
  // Mock authentication check - replace with real auth logic
  const isAuthenticated = true; // localStorage.getItem('token') !== null;
  const userRole = 'admin'; // Get from auth context/store
  
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/403" replace />;
  }
  
  return <>{children}</>;
};

export default AuthGuard;
