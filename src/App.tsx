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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Index />} />
        <Route path="/brands/:brandName" element={<Brand />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/store/:storeName" element={<StoreDetails />} />
        <Route path="/price-compare" element={<PriceCompare />} />
        <Route path="/retailer" element={<RetailerProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/rewards" element={<Rewards />} />
      </Route>
    </Routes>
  );
}

export default App;
