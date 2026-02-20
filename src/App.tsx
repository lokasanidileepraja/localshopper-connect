import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { MainLayout } from "@/components/layout/MainLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext";
import { trackPageView } from "@/lib/analytics";

// Core app pages
import HomePage from "@/pages/HomePage";
import CartPage from "@/pages/CartPage";
import OrdersPage from "@/pages/OrdersPage";
import ProfilePage from "@/pages/ProfilePage";

// Existing pages (kept for deep linking)
import Welcome from "@/pages/Welcome";
import Category from "@/pages/Category";
import ProductDetails from "@/pages/ProductDetails";
import SearchResults from "@/pages/SearchResults";
import Stores from "@/pages/Stores";
import StoreDetails from "@/pages/StoreDetails";
import Notifications from "@/pages/Notifications";
import Checkout from "@/pages/Checkout";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import AllCategories from "@/pages/AllCategories";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Lazy loaded
const Search = lazy(() => import("@/pages/Search"));

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <ErrorBoundary>
      <FeatureFlagProvider>
        <Routes>
          {/* Splash / Onboarding */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main App Shell - 4 tab layout */}
          <Route element={<AppShell />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Discovery & Detail pages inside app shell */}
            <Route path="/search" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SearchResults />
              </Suspense>
            } />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/store/:storeName" element={<StoreDetails />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FeatureFlagProvider>
    </ErrorBoundary>
  );
}

export default App;
