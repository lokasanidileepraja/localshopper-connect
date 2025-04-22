
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
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Lazy load non-critical pages for performance optimization
const PriceComparePage = lazy(() => import("@/pages/PriceComparePage"));
const Search = lazy(() => import("@/pages/Search"));
const EnhancedPriceCompare = lazy(() => import("@/pages/EnhancedPriceCompare"));

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Index />} />
          <Route path="/brands/:brandName" element={<Brand />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/product/:productId/reviews" element={<ProductReviews />} />
          <Route path="/search" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SearchResults />
            </Suspense>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/store/:storeName" element={<StoreDetails />} />
          <Route path="/store/:storeName/reviews" element={<StoreReviews />} />
          <Route path="/price-compare" element={<PriceCompare />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/retailer" element={<RetailerProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/wishlist" element={<Wishlist />} />
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
    </ErrorBoundary>
  );
}

export default App;
