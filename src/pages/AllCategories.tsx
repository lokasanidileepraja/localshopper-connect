
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Categories } from "@/components/Categories";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AllCategories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCategorySelect = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
    toast({
      title: "Category Selected",
      description: `Browsing ${category} products`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Categories</h1>
        <p className="text-muted-foreground mb-6">Browse all product categories to find what you're looking for</p>
      </div>
      
      <Categories onCategorySelect={handleCategorySelect} />
    </div>
  );
};

export default AllCategories;
