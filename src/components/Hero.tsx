import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-background py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 mb-8"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Your Local Tech Hub</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-dark mb-6"
          >
            Find Local Electronics
            <span className="block text-primary">Near You</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-neutral leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            Discover nearby electronics shops, compare prices, and connect with local tech retailers. Experience technology shopping reimagined.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary-600 text-white px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/local-tech")}
            >
              Find Stores
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 rounded-lg border-2 border-neutral-light hover:border-primary transition-all duration-300"
              onClick={() => navigate("/price-compare")}
            >
              Compare Prices
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};