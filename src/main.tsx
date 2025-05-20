
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { analytics } from './lib/analytics.ts'
import { ToastProvider } from './hooks/use-toast.tsx'
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx'
import RouterGuard from './guards/RouterGuard.tsx'
import SpaRouterGuard from './guards/SpaRouterGuard.tsx'

// Initialize analytics only once at the app root
if (typeof window !== 'undefined' && !window.analyticsInitialized) {
  analytics.init(`user_${Date.now()}`);
  window.analyticsInitialized = true;
}

// Create a query client with improved performance and error handling settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnMount: false, // Prevent automatic refetching when components mount
      retry: false, // Disable retries to prevent excessive requests
    },
  },
})

// Create a stable error handler
const handleError = (error: Error) => {
  console.error("Application error:", error);
  
  // Report to analytics if available
  if (analytics && typeof analytics.trackEvent === 'function') {
    analytics.trackEvent('app_error', { 
      error: error.message,
      stack: error.stack
    });
  }
};

// Add global window type for analytics initialization
declare global {
  interface Window {
    analyticsInitialized?: boolean;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary onError={handleError}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <HelmetProvider>
            <AuthProvider>
              <BrowserRouter>
                <RouterGuard>
                  <SpaRouterGuard>
                    <App />
                    <Toaster />
                  </SpaRouterGuard>
                </RouterGuard>
              </BrowserRouter>
            </AuthProvider>
          </HelmetProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
