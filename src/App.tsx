
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "@/pages/Index";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/brands/:brandName" element={<Brand />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/price-compare" element={<PriceCompare />} />
        <Route path="/retailer" element={<RetailerProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
