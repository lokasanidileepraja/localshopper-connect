import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";
import { Testimonials } from "@/components/Testimonials";
import { BrandsShowcase } from "@/components/BrandsShowcase";
import { Categories } from "@/components/Categories";
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
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleNewsletterSubmit = (email: string) => {
    toast({ title: "Subscribed!", description: "Thank you for subscribing." });
  };

  const handleBrandClick = (brandName: string) => {
    navigate(`/brands/${brandName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>TechLocator - Find the Best Tech Near You</title>
        <meta name="description" content="Your AI-powered electronics shopping companion. Discover, compare, and save." />
      </Helmet>

      <main className="pb-4">
        <Hero />
        
        {isAuthenticated && (
          <div className="px-4 py-3">
            <UserPoints />
          </div>
        )}

        <Categories onCategorySelect={handleCategorySelect} />
        <FeaturedProducts onProductClick={handleProductClick} />
        <BrandsShowcase onBrandClick={handleBrandClick} />
        <Testimonials />
        <Newsletter onSubmit={handleNewsletterSubmit} />
      </main>
    </div>
  );
};

export default Index;
