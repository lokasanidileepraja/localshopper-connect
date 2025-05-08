
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { LucideShieldAlert, LucideLogIn, LucideUser, LucideHome, LucideArrowLeft } from 'lucide-react';

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
  const { isAuthenticated, isLoading, hasRole, user, switchRole } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (isLoading) {
    return <div className="container mx-auto p-8 flex justify-center items-center min-h-[60vh]">
      <LoadingSpinner />
    </div>;
  }

  if (!hasRole(requiredRole)) {
    // If not authenticated at all, redirect to login
    if (!isAuthenticated) {
      // Save the current location they were trying to go to
      // This can be used to redirect them back after login
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    
    // If authenticated but wrong role, show access denied page
    return (
      <div className="container mx-auto p-4 sm:p-8">
        <Card className="max-w-3xl mx-auto p-6 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
              <LucideShieldAlert className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              You don't have permission to access this page. Your current role is <strong>{user?.role}</strong> but this page requires the <strong>{requiredRole}</strong> role.
            </p>
          </div>
          
          {/* Demo purpose only - role switching */}
          <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 justify-center">
              <LucideUser className="h-4 w-4" />
              <span>Demo Mode: Switch Roles</span>
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              For demonstration purposes, you can temporarily switch your role:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant="outline" 
                onClick={() => switchRole('user')}
                disabled={user?.role === 'user'}
                className="min-w-[100px]"
              >
                Switch to User
              </Button>
              <Button 
                variant="outline" 
                onClick={() => switchRole('retailer')}
                disabled={user?.role === 'retailer'}
                className="min-w-[100px]"
              >
                Switch to Retailer
              </Button>
              <Button 
                variant="outline" 
                onClick={() => switchRole('admin')}
                disabled={user?.role === 'admin'}
                className="min-w-[100px]"
              >
                Switch to Admin
              </Button>
            </div>
          </div>
          
          <div className="space-x-4">
            <Button
              onClick={() => window.history.back()}
              className="gap-2"
              variant="outline"
            >
              <LucideArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            
            <Button
              onClick={() => window.location.href = "/"}
              className="gap-2"
            >
              <LucideHome className="h-4 w-4" />
              Return to Homepage
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
