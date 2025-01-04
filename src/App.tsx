import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PriceComparePage from "./pages/PriceComparePage";
import StoreDetails from "./pages/StoreDetails";
import { ComparisonTable } from "./components/price/ComparisonTable";
import { PriceHistory } from "./components/price/PriceHistory";
import { PriceAlerts } from "./components/price/PriceAlerts";
import { StoreMap } from "./components/store/StoreMap";
import Index from "./pages/Index";
import LocalTech from "./pages/LocalTech";
import ExpertServices from "./pages/ExpertServices";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PasswordReset from "./pages/auth/PasswordReset";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { CartProvider } from "./contexts/CartContext";
import Category from "./pages/Category";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Breadcrumbs />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<PasswordReset />} />
              <Route path="/price-compare" element={<PriceComparePage />} />
              <Route path="/shop/:storeName" element={<StoreDetails />} />
              <Route path="/comparison-table" element={<ComparisonTable />} />
              <Route path="/price-history" element={<PriceHistory />} />
              <Route path="/price-alerts" element={<PriceAlerts />} />
              <Route path="/store-map" element={<StoreMap />} />
              <Route path="/local-tech" element={<LocalTech />} />
              <Route path="/expert-services" element={<ExpertServices />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/category/:categoryName" element={<Category />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;