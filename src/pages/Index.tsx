import React, { memo, Suspense, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Define component imports properly
const Hero = React.lazy(() => import("@/components/Hero"));
const SearchBar = React.lazy(() => import("@/components/SearchBar"));
const SearchErrorBoundary = React.lazy(() => import("@/components/search/SearchErrorBoundary"));
const FeaturedProducts = React.lazy(() => import("@/components/FeaturedProducts"));
const Newsletter = React.lazy(() => import("@/components/Newsletter"));
const Testimonials = React.lazy(() => import("@/components/Testimonials"));
const BrandsShowcase = React.lazy(() => import("@/components/BrandsShowcase"));
const Categories = React.lazy(() => import("@/components/Categories"));
const BackToTop = React.lazy(() => import("@/components/BackToTop"));
const UserPoints = React.lazy(() => import("@/components/gamification/UserPoints"));

const ComponentLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton className="h-32 w-full" />}>
    {children}
  </Suspense>
);

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      toast({
        title: "Searching",
        description: `Looking for "${query}"...`,
      });
    }
  }, [navigate, toast]);

  const handleCategorySelect = useCallback((category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
    toast({
      title: "Category Selected",
      description: `Browsing ${category}`,
    });
  }, [navigate, toast]);

  const handleProductClick = useCallback((productId: string) => {
    navigate(`/product/${productId}`);
    toast({
      title: "Loading Product",
      description: "Getting product details...",
    });
  }, [navigate, toast]);

  const handleNewsletterSubmit = useCallback((email: string) => {
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
  }, [toast]);

  const handleBrandClick = useCallback((brandName: string) => {
    navigate(`/brands/${brandName.toLowerCase()}`);
    toast({
      title: "Brand Selected",
      description: `Browsing ${brandName} products`,
    });
  }, [navigate, toast]);

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Helmet>
        <meta name="description" content="Explore the best deals, categories, and products." />
      </Helmet>
      
      <main>
        <ComponentLoader>
          <Hero />
        </ComponentLoader>
        
        <ComponentLoader>
          <SearchErrorBoundary>
            <SearchBar onSearch={handleSearch} />
          </SearchErrorBoundary>
        </ComponentLoader>
        
        {isAuthenticated && (
          <div className="container mx-auto px-4 mt-6">
            <ComponentLoader>
              <UserPoints />
            </ComponentLoader>
          </div>
        )}
        
        <ComponentLoader>
          <Categories onCategorySelect={handleCategorySelect} />
        </ComponentLoader>
        
        <ComponentLoader>
          <FeaturedProducts onProductClick={handleProductClick} />
        </ComponentLoader>
        
        <ComponentLoader>
          <BrandsShowcase onBrandClick={handleBrandClick} />
        </ComponentLoader>
        
        <ComponentLoader>
          <Testimonials />
        </ComponentLoader>
        
        <ComponentLoader>
          <Newsletter onSubmit={handleNewsletterSubmit} />
        </ComponentLoader>
        
        <ComponentLoader>
          <BackToTop />
        </ComponentLoader>
      </main>
    </div>
  );
};

export default memo(Index);
