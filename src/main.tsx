
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

// Initialize analytics only once at the app root
if (!window.analyticsInitialized) {
  analytics.init(`user_${Date.now()}`);
  window.analyticsInitialized = true;
}

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
              <Toaster />
            </BrowserRouter>
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ToastProvider>
  </React.StrictMode>,
)
