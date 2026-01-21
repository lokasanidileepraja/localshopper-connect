import { Hero } from "@/components/Hero";
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
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>TechLocator - Find the Best Tech Near You</title>
        <meta name="description" content="Your AI-powered electronics shopping companion. Discover, compare, and save with intelligent recommendations." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Gamification for authenticated users */}
        {isAuthenticated && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="container mx-auto px-6 lg:px-8 py-8"
          >
            <UserPoints />
          </motion.section>
        )}
        
        {/* Categories Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-muted/30"
        >
          <Categories onCategorySelect={handleCategorySelect} />
        </motion.section>
        
        {/* Featured Products Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FeaturedProducts onProductClick={handleProductClick} />
        </motion.section>
        
        {/* Brands Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-muted/30"
        >
          <BrandsShowcase onBrandClick={handleBrandClick} />
        </motion.section>
        
        {/* Testimonials Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Testimonials />
        </motion.section>
        
        {/* Newsletter Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-muted/30"
        >
          <Newsletter onSubmit={handleNewsletterSubmit} />
        </motion.section>
        
        <BackToTop />
      </main>
    </div>
  );
};

export default Index;
