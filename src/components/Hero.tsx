
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useImagePreload } from "@/hooks/useImagePreload";
import { Skeleton } from "@/components/ui/skeleton";
import { OptimizedImage } from "@/components/ui/optimized-image";

export const Hero = () => {
  const navigate = useNavigate();
  const { isLoaded } = useImagePreload("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", { priority: true });

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <AnimatePresence>
        {!isLoaded ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/80"
          >
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Hero background"
              className="w-full h-full object-cover"
              priority={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container relative mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Discover nearby tech at best prices</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6"
          >
            Shop Local,
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mt-2">
              Compare Instantly
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Find electronics nearby, compare prices in real-time, and get the best deals from local stores in your neighborhood.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-primary text-white px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/20"
              onClick={() => navigate("/stores")}
            >
              Explore Nearby Stores
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 rounded-full border-2 border-primary/20 hover:bg-primary/5 hover:border-primary transition-all duration-300"
              onClick={() => navigate("/price-compare")}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Compare Prices
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
