import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Category = () => {
  const { categoryName } = useParams();
  const { toast } = useToast();
  
  // Move toast notification to useEffect to prevent render loop
  useEffect(() => {
    if (categoryName) {
      const categoryProducts = products[categoryName.toLowerCase()] || [];
      if (categoryProducts.length === 0) {
        toast({
          title: "Category Empty",
          description: "No products found in this category",
          variant: "destructive",
        });
      }
    }
  }, [categoryName, toast]);

  if (!categoryName) {
    return <LoadingSpinner />;
  }

  const categoryProducts = products[categoryName.toLowerCase()] || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{categoryName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {categoryProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Category;