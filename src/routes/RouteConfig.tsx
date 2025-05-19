
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// Lazy load all page components for code splitting
const Index = lazy(() => import('@/pages/Index'));
const Login = lazy(() => import('@/pages/auth/Login'));
const PasswordReset = lazy(() => import('@/pages/auth/PasswordReset'));
const Profile = lazy(() => import('@/pages/Profile'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const AllCategories = lazy(() => import('@/pages/AllCategories'));
const AllBrands = lazy(() => import('@/pages/AllBrands'));
const Brand = lazy(() => import('@/pages/Brand'));
const Product = lazy(() => import('@/pages/Product'));
const Compare = lazy(() => import('@/pages/Compare'));
const Shop = lazy(() => import('@/pages/Shop'));
const Stores = lazy(() => import('@/pages/Stores'));
const StoreDetails = lazy(() => import('@/pages/StoreDetails'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const PriceCompare = lazy(() => import('@/pages/PriceCompare'));
const SearchResultsPage = lazy(() => import('@/pages/SearchResults'));
const Search = lazy(() => import('@/pages/Search'));
const SupportTicket = lazy(() => import('@/pages/SupportTicket'));
const Alerts = lazy(() => import('@/pages/Alerts'));
const Bulk = lazy(() => import('@/pages/Bulk'));
const ExpertServices = lazy(() => import('@/pages/ExpertServices'));
const LocalTech = lazy(() => import('@/pages/LocalTech'));
const Onboarding = lazy(() => import('@/pages/Onboarding'));
const PriceComparePage = lazy(() => import('@/pages/PriceComparePage'));
const QA = lazy(() => import('@/pages/QA'));
const Recommendations = lazy(() => import('@/pages/Recommendations'));
const Rewards = lazy(() => import('@/pages/Rewards'));
const Welcome = lazy(() => import('@/pages/Welcome'));

// Admin pages
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminUserFeedback = lazy(() => import('@/pages/admin/AdminUserFeedback'));

// Retailer pages
const RetailerDashboard = lazy(() => import('@/pages/retailer/RetailerDashboard'));
const RetailerOrders = lazy(() => import('@/pages/retailer/RetailerOrders'));
const RetailerProducts = lazy(() => import('@/pages/retailer/RetailerProducts'));
const RetailerPromotions = lazy(() => import('@/pages/retailer/RetailerPromotions'));
const RetailerSettings = lazy(() => import('@/pages/retailer/RetailerSettings'));
const RetailerInventory = lazy(() => import('@/pages/retailer/RetailerInventory'));
const RetailerCustomers = lazy(() => import('@/pages/retailer/RetailerCustomers'));
const RetailerAnalytics = lazy(() => import('@/pages/retailer/RetailerAnalytics'));

// Fallback loading component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[70vh]">
    <LoadingSpinner size="xl" />
  </div>
);

export const RouteConfig = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<PasswordReset />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/brands" element={<AllBrands />} />
          <Route path="/brands/:brandName" element={<Brand />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/shop/:shopId" element={<Shop />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/store/:storeName" element={<StoreDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/price-compare" element={<PriceCompare />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/support/:id" element={<SupportTicket />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/bulk" element={<Bulk />} />
          <Route path="/expert-services" element={<ExpertServices />} />
          <Route path="/local-tech" element={<LocalTech />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/price-compare-page" element={<PriceComparePage />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/welcome" element={<Welcome />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/feedback" element={<AdminUserFeedback />} />
          
          {/* Retailer Routes */}
          <Route path="/retailer" element={<RetailerDashboard />} />
          <Route path="/retailer/orders" element={<RetailerOrders />} />
          <Route path="/retailer/products" element={<RetailerProducts />} />
          <Route path="/retailer/promotions" element={<RetailerPromotions />} />
          <Route path="/retailer/settings" element={<RetailerSettings />} />
          <Route path="/retailer/inventory" element={<RetailerInventory />} />
          <Route path="/retailer/customers" element={<RetailerCustomers />} />
          <Route path="/retailer/analytics" element={<RetailerAnalytics />} />
          
          {/* 404 and Fallback */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
