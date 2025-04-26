
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { isAuthenticated, isLoading, hasRole, user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

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
    
    // For demo purposes, allow temporary role switching
    const switchToRole = (role: 'user' | 'retailer' | 'admin') => {
      // This is just for demo purposes - in a real app you would check permissions on the server
      localStorage.setItem('tempUserRole', role);
      window.location.reload();
      toast({
        title: "Role Switched",
        description: `Temporarily switched to ${role} role for demo purposes.`,
      });
    };
    
    // If authenticated but wrong role
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">
          You don't have permission to access this page. Your current role is <strong>{user?.role}</strong> but this page requires the <strong>{requiredRole}</strong> role.
        </p>
        
        {/* Demo purpose only - role switching */}
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Demo Mode: Switch Roles</h2>
          <p className="mb-4 text-sm text-gray-600">For demonstration purposes, you can temporarily switch your role:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline" 
              onClick={() => switchToRole('user')}
              disabled={user?.role === 'user'}
            >
              Switch to User
            </Button>
            <Button 
              variant="outline" 
              onClick={() => switchToRole('retailer')}
              disabled={user?.role === 'retailer'}
            >
              Switch to Retailer
            </Button>
            <Button 
              variant="outline" 
              onClick={() => switchToRole('admin')}
              disabled={user?.role === 'admin'}
            >
              Switch to Admin
            </Button>
          </div>
        </div>
        
        <Button
          onClick={() => window.history.back()}
          className="mr-4"
        >
          Go Back
        </Button>
        
        <Button
          variant="outline"
          onClick={() => window.location.href = "/"}
        >
          Return to Homepage
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};
