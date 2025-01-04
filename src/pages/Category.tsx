import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Category = () => {
  const { categoryName } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: `Browsing ${categoryName}`,
      description: "Loading products in this category...",
    });
  }, [categoryName, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">{categoryName}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Products will be added here */}
        <div className="text-center text-gray-500">
          Coming soon: Products in {categoryName} category
        </div>
      </div>
    </div>
  );
};

export default Category;