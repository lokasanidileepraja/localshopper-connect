
import React, { memo, Suspense, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Lazy loaded components
const Hero = React.lazy(() => import("@/components/Hero").then(mod => ({ default: mod.Hero || mod.default || mod })));
const SearchBar = React.lazy(() => import("@/components/SearchBar").then(mod => ({ default: mod.SearchBar || mod.default || mod })));
const SearchErrorBoundary = React.lazy(() => import("@/components/search/SearchErrorBoundary").then(mod => ({ default: mod.SearchErrorBoundary || mod.default || mod })));
const FeaturedProducts = React.lazy(() => import("@/components/FeaturedProducts").then(mod => ({ default: mod.FeaturedProducts || mod.default || mod })));
const Newsletter = React.lazy(() => import("@/components/Newsletter").then(mod => ({ default: mod.Newsletter || mod.default || mod })));
const Testimonials = React.lazy(() => import("@/components/Testimonials").then(mod => ({ default: mod.Testimonials || mod.default || mod })));
const BrandsShowcase = React.lazy(() => import("@/components/BrandsShowcase").then(mod => ({ default: mod.BrandsShowcase || mod.default || mod })));
const Categories = React.lazy(() => import("@/components/Categories").then(mod => ({ default: mod.Categories || mod.default || mod })));
const BackToTop = React.lazy(() => import("@/components/BackToTop").then(mod => ({ default: mod.BackToTop || mod.default || mod })));
const UserPoints = React.lazy(() => import("@/components/gamification/UserPoints").then(mod => ({ default: mod.UserPoints || mod.default || mod })));

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
