
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'guest' | 'user' | 'retailer' | 'admin';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!hasRole(requiredRole)) {
    // If not authenticated at all, redirect to login
    if (!isAuthenticated) {
      // Save the current location they were trying to go to
      // This can be used to redirect them back after login
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    
    // If authenticated but wrong role
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">
          You don't have permission to access this page.
        </p>
        <a
          href="/"
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
        >
          Return to Homepage
        </a>
      </div>
    );
  }

  return <>{children}</>;
};
