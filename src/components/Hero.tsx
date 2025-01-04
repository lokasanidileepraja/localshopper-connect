import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
      <div className="container relative mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-900 mb-8"
          >
            Discover Local Tech
            <span className="block text-neutral-600 mt-2">Simplified</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Experience technology shopping reimagined. Find nearby electronics, compare prices, and connect with local retailers.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/local-tech")}
            >
              Explore Stores
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 rounded-full border-2 border-neutral-200 hover:border-neutral-900 transition-all duration-300"
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