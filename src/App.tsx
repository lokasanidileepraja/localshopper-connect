
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { CartProvider } from "@/contexts/CartContext";
import Index from "@/pages/Index";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Product from "@/pages/Product";
import Category from "@/pages/Category";
import Profile from "@/pages/Profile";
import Notifications from "@/pages/Notifications";
import QA from "@/pages/QA";
import PriceComparePage from "@/pages/PriceComparePage";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Orders from "@/pages/Orders";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Wishlist from "@/pages/Wishlist";
import Search from "@/pages/Search";
import Stores from "@/pages/Stores";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/price-compare" element={<PriceComparePage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stores" element={<Stores />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
