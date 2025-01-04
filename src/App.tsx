import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Product from "@/pages/Product";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { CartProvider } from "./contexts/CartContext";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import QA from "./pages/QA";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Breadcrumbs />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/category/:categoryName" element={<Category />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/qa" element={<QA />} />
              </Routes>
            </div>
          </Router>
          <Toaster />
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;