
import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Welcome from "@/pages/Welcome";
import Index from "@/pages/Index";
import Brand from "@/pages/Brand";
import Category from "@/pages/Category";
import ProductDetails from "@/pages/ProductDetails";
import SearchResults from "@/pages/SearchResults";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Stores from "@/pages/Stores";
import PriceCompare from "@/pages/PriceCompare";
import RetailerProfile from "@/pages/RetailerProfile";
import Notifications from "@/pages/Notifications";
import StoreDetails from "@/pages/StoreDetails";
import Rewards from "@/pages/Rewards";
import Wishlist from "@/pages/Wishlist";
import Compare from "@/pages/Compare";
import Orders from "@/pages/Orders";
import OrderDetails from "@/pages/OrderDetails";
import ProductReviews from "@/pages/ProductReviews";
import StoreReviews from "@/pages/StoreReviews";
import Onboarding from "@/pages/Onboarding";
import Referral from "@/pages/Referral";
import LocationSettings from "@/pages/LocationSettings";
import Profile from "@/pages/Profile";
import Alerts from "@/pages/Alerts";
import FAQ from "@/pages/FAQ";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import AllCategories from "@/pages/AllCategories";
import AllBrands from "@/pages/AllBrands";
import NearbyStores from "@/pages/NearbyStores";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import SupportTicket from "@/pages/SupportTicket";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Reports from "@/pages/admin/Reports";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Leaderboard from "@/pages/community/Leaderboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";

// Retailer pages
import RetailerDashboard from "@/pages/retailer/RetailerDashboard";
import RetailerProducts from "@/pages/retailer/RetailerProducts";
import RetailerInventory from "@/pages/retailer/RetailerInventory";
import RetailerOrders from "@/pages/retailer/RetailerOrders";
import RetailerCustomers from "@/pages/retailer/RetailerCustomers";
import RetailerPromotions from "@/pages/retailer/RetailerPromotions";
import RetailerAnalytics from "@/pages/retailer/RetailerAnalytics";
import RetailerSettings from "@/pages/retailer/RetailerSettings";
import RetailerRegister from "@/pages/retailer/RetailerRegister";

// Admin routes
import AdminUserFeedback from "@/pages/admin/AdminUserFeedback";
import AdminCatalogHealth from "@/pages/admin/AdminCatalogHealth";
import AdminStorePerformance from "@/pages/admin/AdminStorePerformance";

// Providers
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext";
import { analytics, trackPageView } from "@/lib/analytics";

// Lazy load non-critical pages for performance optimization
const PriceComparePage = lazy(() => import("@/pages/PriceComparePage"));
const Search = lazy(() => import("@/pages/Search"));
const EnhancedPriceCompare = lazy(() => import("@/pages/EnhancedPriceCompare"));

function App() {
  const location = useLocation();
  
  // Initialize analytics when the app first loads
  useEffect(() => {
    // Generate a unique session ID
    const sessionId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    analytics.init(sessionId);
  }, []);
  
  // Track page views
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <ErrorBoundary>
      <FeatureFlagProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Retailer registration - outside main layout */}
          <Route path="/retailer/register" element={<RetailerRegister />} />
          <Route path="/retailer/login" element={<Login />} />
          <Route path="/retailer/start" element={<RetailerRegister />} />

          {/* Main layout routes */}
          <Route element={<MainLayout />}>
            {/* General Discovery & Navigation - Public Routes */}
            <Route path="/search" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SearchResults />
              </Suspense>
            } />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/brands" element={<AllBrands />} />
            <Route path="/brands/:brandName" element={<Brand />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/product/:productId/reviews" element={<ProductReviews />} />
            <Route path="/price-compare" element={<PriceCompare />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/store/:storeName" element={<StoreDetails />} />
            <Route path="/store/:storeName/reviews" element={<StoreReviews />} />
            <Route path="/nearby-stores" element={<NearbyStores />} />
            
            {/* Support, Legal & Help - Public Routes */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Protected Routes for Authenticated Users */}
            <Route path="/compare" element={
              <ProtectedRoute requiredRole="user">
                <Compare />
              </ProtectedRoute>
            } />
            <Route path="/wishlist" element={
              <ProtectedRoute requiredRole="user">
                <Wishlist />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute requiredRole="user">
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute requiredRole="user">
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute requiredRole="user">
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/orders/:orderId" element={
              <ProtectedRoute requiredRole="user">
                <OrderDetails />
              </ProtectedRoute>
            } />
            
            {/* Community Features */}
            <Route path="/community/leaderboard" element={<Leaderboard />} />
            
            {/* User Tools & Account - Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute requiredRole="user">
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute requiredRole="user">
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/rewards" element={
              <ProtectedRoute requiredRole="user">
                <Rewards />
              </ProtectedRoute>
            } />
            <Route path="/alerts" element={
              <ProtectedRoute requiredRole="user">
                <Alerts />
              </ProtectedRoute>
            } />
            <Route path="/referral" element={
              <ProtectedRoute requiredRole="user">
                <Referral />
              </ProtectedRoute>
            } />
            <Route path="/location-settings" element={
              <ProtectedRoute requiredRole="user">
                <LocationSettings />
              </ProtectedRoute>
            } />
            <Route path="/support/ticket/:id" element={
              <ProtectedRoute requiredRole="user">
                <SupportTicket />
              </ProtectedRoute>
            } />
            
            {/* Retailer Routes - Protected with Retailer Role */}
            <Route path="/retailer" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/retailer/home" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/retailer/products" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerProducts />
              </ProtectedRoute>
            } />
            <Route path="/retailer/inventory" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerInventory />
              </ProtectedRoute>
            } />
            <Route path="/retailer/orders" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerOrders />
              </ProtectedRoute>
            } />
            <Route path="/retailer/customers" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerCustomers />
              </ProtectedRoute>
            } />
            <Route path="/retailer/promotions" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerPromotions />
              </ProtectedRoute>
            } />
            <Route path="/retailer/reports" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/retailer/settings" element={
              <ProtectedRoute requiredRole="retailer">
                <RetailerSettings />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes - Protected with Admin Role */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/user-feedback" element={
              <ProtectedRoute requiredRole="admin">
                <AdminUserFeedback />
              </ProtectedRoute>
            } />
            <Route path="/admin/catalog-health" element={
              <ProtectedRoute requiredRole="admin">
                <AdminCatalogHealth />
              </ProtectedRoute>
            } />
            <Route path="/admin/store-performance" element={
              <ProtectedRoute requiredRole="admin">
                <AdminStorePerformance />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute requiredRole="admin">
                <Reports />
              </ProtectedRoute>
            } />
            
            {/* Advanced features with lazy loading */}
            <Route path="/search-advanced" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Search />
              </Suspense>
            } />
            <Route path="/price-comparison" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PriceComparePage />
              </Suspense>
            } />
            <Route path="/enhanced-price-compare" element={
              <Suspense fallback={<LoadingSpinner />}>
                <EnhancedPriceCompare />
              </Suspense>
            } />
          </Route>
          
          {/* 404 page - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FeatureFlagProvider>
    </ErrorBoundary>
  );
}

export default App;
