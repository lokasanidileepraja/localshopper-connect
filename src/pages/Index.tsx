
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { SearchErrorBoundary } from "@/components/search/SearchErrorBoundary";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";
import { Testimonials } from "@/components/Testimonials";
import { BrandsShowcase } from "@/components/BrandsShowcase";
import { Categories } from "@/components/Categories";
import { BackToTop } from "@/components/BackToTop";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { UserPoints } from "@/components/gamification/UserPoints";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Helmet>
        <meta name="description" content="Discover premium electronics with intelligent simplicity." />
      </Helmet>
      
      <main className="space-y-32">
        {/* Hero takes 60% of viewport - premium spacing */}
        <div className="min-h-[60vh]">
          <Hero />
        </div>
        
        {/* Premium search experience */}
        <section className="container mx-auto px-8">
          <SearchErrorBoundary>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </SearchErrorBoundary>
        </section>
        
        {/* Gamification for authenticated users - subtle placement */}
        {isAuthenticated && (
          <section className="container mx-auto px-8">
            <UserPoints />
          </section>
        )}
        
        {/* Ultra-wide spacing between sections */}
        <section className="py-24">
          <Categories onCategorySelect={handleCategorySelect} />
        </section>
        
        <section className="py-24">
          <FeaturedProducts onProductClick={handleProductClick} />
        </section>
        
        <section className="py-24">
          <BrandsShowcase onBrandClick={handleBrandClick} />
        </section>
        
        <section className="py-24">
          <Testimonials />
        </section>
        
        <section className="py-24">
          <Newsletter onSubmit={handleNewsletterSubmit} />
        </section>
        
        <BackToTop />
      </main>
    </div>
  );
};

export default Index;
