import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Breadcrumbs } from "./components/Breadcrumbs";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Compare from "./pages/Compare";
import Bulk from "./pages/Bulk";
import Alerts from "./pages/Alerts";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <TooltipProvider>
        <CartProvider>
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Breadcrumbs />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop/:shopName" element={<Shop />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/bulk" element={<Bulk />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </CartProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;