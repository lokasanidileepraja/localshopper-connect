
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface SpaRouterGuardProps {
  children: React.ReactNode;
}

/**
 * Enhanced SPA router guard that ensures proper SPA routing behavior:
 * - Scroll restoration
 * - Error handling for route transitions
 * - Support for deep linking
 * - Handle 404 navigation
 */
const SpaRouterGuard: React.FC<SpaRouterGuardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handle scroll restoration on route changes
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    
    // Close any open mobile menus on navigation
    document.body.classList.remove('mobile-menu-open');
    
    // Track page views if analytics is available
    if (typeof window !== 'undefined' && window.analytics && window.analytics.trackEvent) {
      window.analytics.trackEvent('page_view', { 
        path: location.pathname,
        search: location.search 
      });
    }
  }, [location.pathname, location.search]);
  
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

  // Add global types for analytics
  useEffect(() => {
    // Add a global reference to window for analytics
    if (typeof window !== 'undefined' && !window.analytics) {
      window.analytics = {
        trackEvent: (event: string, data?: any) => {
          console.log(`[Analytics] ${event}`, data);
        }
      };
    }
  }, []);
  
  return <>{children}</>;
};

// Add global type for analytics
declare global {
  interface Window {
    analytics?: {
      trackEvent: (event: string, data?: any) => void;
    };
  }
}

export default SpaRouterGuard;
