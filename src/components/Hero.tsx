import { Button } from "@/components/ui/button";
import { ArrowRight, Computer, Smartphone, CircuitBoard, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-100 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Your Local Tech Hub</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" role="heading">
              Find Local Electronics Stores Near You
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover nearby electronics shops, compare prices on gadgets, and connect directly with local tech retailers. Get the latest devices with the convenience of local shopping and expert support.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group relative overflow-hidden"
                onClick={() => navigate("/shop/TechHub Electronics")}
              >
                <span className="relative z-10">Browse Electronics</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                <div className="absolute inset-0 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="group"
                onClick={() => {
                  window.alert("Store registration coming soon!");
                }}
              >
                Register Your Store
                <div className="absolute inset-0 bg-primary-100 opacity-0 group-hover:opacity-10 transition-opacity" />
              </Button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 animate-float rounded-full bg-primary/10 opacity-20 blur-3xl"></div>
            </div>
            <div className="relative grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
                >
                  <Computer className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Latest Gadgets</h3>
                  <p className="mt-2 text-sm text-gray-600">Find new tech locally</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
                >
                  <Smartphone className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Smart Devices</h3>
                  <p className="mt-2 text-sm text-gray-600">Compare prices nearby</p>
                </motion.div>
              </div>
              <div className="flex flex-col gap-6 pt-12">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
                >
                  <CircuitBoard className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Tech Support</h3>
                  <p className="mt-2 text-sm text-gray-600">Expert local service</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};