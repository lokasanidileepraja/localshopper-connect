import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Product } from "@/types/shop";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Category = () => {
  const { categoryName } = useParams();
  const { toast } = useToast();

  const { data: categoryProducts, isLoading } = useQuery({
    queryKey: ["products", categoryName],
    queryFn: async (): Promise<Product[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!categoryName || !products[categoryName]) {
        throw new Error("Category not found");
      }
      
      return products[categoryName];
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load products. Please try again later.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!categoryName || !categoryProducts) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {product.stock} in stock
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Category;