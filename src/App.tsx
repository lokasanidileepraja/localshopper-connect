
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Brand from "@/pages/Brand";
import Category from "@/pages/Category";
import ProductDetails from "@/pages/ProductDetails";
import SearchResults from "@/pages/SearchResults";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Stores from "@/pages/Stores";
import PriceCompare from "@/pages/PriceCompare";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/brands/:brandName" element={<Brand />} />
      <Route path="/category/:categoryName" element={<Category />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/price-compare" element={<PriceCompare />} />
    </Routes>
  );
}

export default App;
