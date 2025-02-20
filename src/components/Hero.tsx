
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)"
        }}
      />

      <div className="relative z-10 px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Find the Best Tech Deals
              <span className="block text-primary-foreground/80">Near You</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mx-auto mt-6 max-w-lg text-xl text-gray-300"
            >
              Compare prices, find local stores, and get the best deals on electronics in your area.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => navigate("/stores")}
                className="bg-primary hover:bg-primary/90 text-white px-8 group"
              >
                <MapPin className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Find Nearby Stores
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/search")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 group"
              >
                <Search className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Search Products
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-16"
            >
              {[
                { title: "Local Stores", description: "Find tech retailers near you" },
                { title: "Price Compare", description: "Get the best deals instantly" },
                { title: "Expert Support", description: "Get help choosing the right tech" },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl bg-white/5 p-6 backdrop-blur-lg"
                >
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-gray-300">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
