
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin, Smartphone, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Helmet } from "react-helmet-async";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Helmet>
        <meta name="description" content="Your local electronics shopping companion. Find what you need nearby and get the best deals." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Find the best tech near you</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6">
            Local<span className="text-blue-500">Shopper</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-6">
            Your local electronics shopping companion. Find what you need nearby and get the best deals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg group">
              <div className="relative h-48">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1573920111312-9f491578335f"
                  alt="Browse Gadgets"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  width={600}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <Smartphone className="h-10 w-10 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Browse Gadgets</h2>
                  <p className="text-white/80 text-center mb-4">Find electronics by category, brand, or features</p>
                  <Button 
                    onClick={() => navigate("/categories")}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Explore Gadgets
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg group">
              <div className="relative h-48">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1604754742629-3e0498165271"
                  alt="Discover Shops"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  width={600}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <ShoppingBag className="h-10 w-10 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Discover Shops</h2>
                  <p className="text-white/80 text-center mb-4">Find nearby electronics stores and compare prices</p>
                  <Button 
                    onClick={() => navigate("/stores")}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Find Nearby Stores
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <Button 
            size="lg"
            className="rounded-full"
            onClick={() => navigate("/home")}
          >
            Continue to Main Page
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full"
            onClick={() => navigate("/price-compare")}
          >
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Compare Prices Nearby
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
