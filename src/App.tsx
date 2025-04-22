
import { Routes, Route } from "react-router-dom";
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
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { CartProvider } from "@/contexts/CartContext";
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

// Lazy load non-critical pages for performance optimization
const PriceComparePage = lazy(() => import("@/pages/PriceComparePage"));
const Search = lazy(() => import("@/pages/Search"));
const EnhancedPriceCompare = lazy(() => import("@/pages/EnhancedPriceCompare"));

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Retailer registration - outside main layout */}
          <Route path="/retailer/register" element={<RetailerRegister />} />

          {/* Main layout routes */}
          <Route element={<MainLayout />}>
            {/* General Discovery & Navigation */}
            <Route path="/home" element={<Index />} />
            <Route path="/search" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SearchResults />
              </Suspense>
            } />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/brands" element={<AllBrands />} />
            <Route path="/brands/:brandName" element={<Brand />} />
            
            {/* Product & Shopping Flow */}
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/product/:productId/reviews" element={<ProductReviews />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/price-compare" element={<PriceCompare />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            
            {/* Store Discovery & Local Search */}
            <Route path="/stores" element={<Stores />} />
            <Route path="/store/:storeName" element={<StoreDetails />} />
            <Route path="/store/:storeName/reviews" element={<StoreReviews />} />
            <Route path="/nearby-stores" element={<NearbyStores />} />
            
            {/* Retailer Dashboard & Management */}
            <Route path="/retailer" element={<RetailerDashboard />} />
            <Route path="/retailer/products" element={<RetailerProducts />} />
            <Route path="/retailer/inventory" element={<RetailerInventory />} />
            <Route path="/retailer/orders" element={<RetailerOrders />} />
            <Route path="/retailer/customers" element={<RetailerCustomers />} />
            <Route path="/retailer/promotions" element={<RetailerPromotions />} />
            <Route path="/retailer/analytics" element={<RetailerAnalytics />} />
            <Route path="/retailer/settings" element={<RetailerSettings />} />
            
            {/* User Tools & Account */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/location-settings" element={<LocationSettings />} />
            
            {/* Support, Legal & Help */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/support/ticket/:id" element={<SupportTicket />} />
            
            {/* Admin (Optional for later) */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/reports" element={<Reports />} />
            
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
        </Routes>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
