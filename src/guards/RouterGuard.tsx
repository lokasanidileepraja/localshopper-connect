
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface RouterGuardProps {
  children: React.ReactNode;
}

/**
 * Global router guard that handles common navigation concerns:
 * - Scroll restoration
 * - Error handling for route transitions
 * - Analytics tracking
 */
const RouterGuard: React.FC<RouterGuardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handle scroll restoration on route changes
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    
    // Close any open mobile menus on navigation
    document.body.classList.remove('mobile-menu-open');
    
  }, [location.pathname]);
  
  // Handle navigation errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if this is a routing-related error
      if (event.error && event.error.toString().includes('Failed to load')) {
        toast({
          title: "Navigation Error",
          description: "Failed to load the requested page. Redirecting to home page.",
          variant: "destructive",
        });
        
        // Attempt to navigate to a safe page
        navigate('/', { replace: true });
      }
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [navigate, toast]);
  
  return <>{children}</>;
};

export default RouterGuard;
