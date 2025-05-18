
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Categories } from "@/components/Categories";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { memo, useCallback } from "react";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";
import { useRenderOptimizer } from "@/hooks/useRenderOptimizer";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

const AllCategories = () => {
  // Apply the prevent refresh hook
  usePreventRefresh();
  
  // Track renders to detect performance issues
  useRenderOptimizer('AllCategoriesPage');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create a stable callback reference
  const handleCategorySelect = useCallback((category: string) => {
    const categoryPath = `/category/${category.toLowerCase()}`;
    navigate(categoryPath);
    toast({
      title: "Category Selected",
      description: `Browsing ${category} products`,
    });
  }, [navigate, toast]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-6">
        <Helmet>
          <title>All Categories</title>
          <meta name="description" content="Browse through a wide range of categories." />
        </Helmet>
        
        <Breadcrumbs />
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-3">All Categories</h1>
          <p className="text-muted-foreground mb-4">Browse all product categories to find what you're looking for</p>
        </div>
        
        <Categories onCategorySelect={handleCategorySelect} />
      </div>
    </ErrorBoundary>
  );
};

export default memo(AllCategories);
