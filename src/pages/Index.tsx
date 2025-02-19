
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { SearchErrorBoundary } from "@/components/search/SearchErrorBoundary";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";
import { Testimonials } from "@/components/Testimonials";
import { BrandsShowcase } from "@/components/BrandsShowcase";
import { Categories } from "@/components/Categories";
import { BackToTop } from "@/components/BackToTop";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      toast({
        title: "Searching",
        description: `Looking for "${query}"...`,
      });
    }
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
    toast({
      title: "Category Selected",
      description: `Browsing ${category}`,
    });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    toast({
      title: "Loading Product",
      description: "Getting product details...",
    });
  };

  const handleNewsletterSubmit = (email: string) => {
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };

  const handleBrandClick = (brandName: string) => {
    navigate(`/brands/${brandName.toLowerCase()}`);
    toast({
      title: "Brand Selected",
      description: `Browsing ${brandName} products`,
    });
  };

  return (
    <CartProvider>
      <div className="min-h-screen pb-16 md:pb-0">
        <Navigation />
        <main>
          <Hero />
          <SearchErrorBoundary>
            <SearchBar onSearch={handleSearch} />
          </SearchErrorBoundary>
          <Categories onCategorySelect={handleCategorySelect} />
          <FeaturedProducts onProductClick={handleProductClick} />
          <BrandsShowcase onBrandClick={handleBrandClick} />
          <Testimonials />
          <Newsletter onSubmit={handleNewsletterSubmit} />
          <BackToTop />
        </main>
      </div>
    </CartProvider>
  );
};

export default Index;
