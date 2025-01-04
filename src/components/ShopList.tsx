import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useToast } from "@/hooks/use-toast";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { ShopCard } from "./ShopCard";
import { useQuery } from "@tanstack/react-query";
import { PriceComparison } from "./PriceComparison";

export const ShopList = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const { data: shops, isLoading } = useQuery({
    queryKey: ["shops"],
    queryFn: () => Promise.resolve(ELECTRONICS_SHOPS),
  });

  const handleCompare = (model: string) => {
    setSelectedModel(model === selectedModel ? null : model);
  };

  const handleKeyPress = (e: React.KeyboardEvent, model: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCompare(model);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const availableModels = Array.from(
    new Set(
      shops?.flatMap((shop) =>
        shop.products
          .filter((product) => product.category === "mobile")
          .map((product) => product.model)
      ) || []
    )
  );

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Compare Mobile Prices</h2>
          <PriceComparison
            shops={shops || []}
            models={availableModels}
            selectedModel={selectedModel}
            onModelSelect={handleCompare}
          />
        </div>
        <h2 className="mb-8 text-3xl font-bold">Nearby Electronics Shops</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shops?.map((shop) => (
            <ShopCard key={shop.id} {...shop} />
          ))}
        </div>
      </div>
    </section>
  );
};