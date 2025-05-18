
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState, useCallback } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useToast } from "@/hooks/use-toast";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { ShopCard } from "./ShopCard";
import { useQuery } from "@tanstack/react-query";
import { PriceComparison } from "./PriceComparison";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export const ShopList = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: shops, isLoading, error, refetch } = useQuery({
    queryKey: ["shops"],
    queryFn: () => Promise.resolve(ELECTRONICS_SHOPS),
    // Added error handling
    onError: (err) => {
      console.error("Error fetching shops:", err);
      toast({
        title: "Failed to load shops",
        description: "Please try again later",
        variant: "destructive",
      });
    },
  });

  const handleCompare = useCallback((model: string) => {
    setSelectedModel(prev => prev === model ? null : model);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent, model: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCompare(model);
    }
  }, [handleCompare]);

  // Handle error state with retry option
  if (error) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-red-500 text-xl mb-4">Error loading shops</h2>
        <p className="text-gray-600 mb-6">We couldn't load the shop data. Please try again.</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  // Better loading state
  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="text-gray-500 mt-4">Loading shops...</p>
      </div>
    );
  }

  // Safety check for data
  if (!shops || shops.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl mb-4">No shops found</h2>
        <p className="text-gray-600 mb-6">We couldn't find any electronics shops nearby.</p>
      </div>
    );
  }

  // Extract available models
  const availableModels = Array.from(
    new Set(
      shops.flatMap((shop) =>
        shop.products
          .filter((product) => product.category === "mobile")
          .map((product) => product.model)
      )
    )
  );

  return (
    <ErrorBoundary>
      <section className="py-12">
        <div className="container">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">Compare Mobile Prices</h2>
            <ErrorBoundary fallback={<div className="p-4 bg-red-50 rounded">Failed to load price comparison</div>}>
              <PriceComparison
                shops={shops}
                models={availableModels}
                selectedModel={selectedModel}
                onModelSelect={handleCompare}
              />
            </ErrorBoundary>
          </div>
          <h2 className="mb-8 text-3xl font-bold">Nearby Electronics Shops</h2>
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {shops.map((shop) => (
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShopCard key={shop.id} {...shop} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </ErrorBoundary>
  );
};
