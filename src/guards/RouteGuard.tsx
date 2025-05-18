
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

interface RouteGuardProps {
  children: React.ReactNode;
  roles?: string[];
  redirectPath?: string;
}

/**
 * Route Guard component to protect routes based on authentication and roles
 * More sophisticated than ProtectedRoute, with performance monitoring
 */
export const RouteGuard = ({ 
  children, 
  roles = [], 
  redirectPath = '/login'
}: RouteGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Monitor route guard performance
  usePerformanceMonitor('RouteGuard');

  // Mock authentication check - in a real app, this would use auth context
  const isAuthenticated = true; // Simulate authenticated user
  const userRole = 'admin'; // Simulate user role
  
  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page",
        variant: "destructive"
      });
      
      // Redirect to login with return URL
      navigate(redirectPath, { 
        state: { from: location.pathname },
        replace: true 
      });
      return;
    }
    
    // Check role authorization if roles are specified
    if (roles.length > 0 && !roles.includes(userRole)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive"
      });
      
      // Redirect to home or another safe page
      navigate('/', { replace: true });
      return;
    }
    
    // Log successful navigation for analytics
    console.log(`Successfully navigated to: ${location.pathname}`);
    
  }, [isAuthenticated, location.pathname, navigate, redirectPath, roles, toast, userRole]);
  
  return <>{children}</>;
};
