import { Button } from "@/components/ui/button";
import { ArrowRight, Computer, Smartphone, CircuitBoard, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-100 to-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4" role="heading">
              Find Local Electronics Stores Near You
            </h1>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5 text-primary" />
                <span>24/7 Customer Support</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5 text-primary" />
                <span>Instant Price Alerts</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-primary" />
                <span>Real-time Store Hours</span>
              </div>
            </div>
            <p className="text-base sm:text-lg leading-7 text-gray-600 mb-6">
              Discover nearby electronics shops, compare prices on gadgets, and connect directly with local tech retailers. Get the latest devices with the convenience of local shopping and expert support.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 sm:h-64 sm:w-64 animate-float rounded-full bg-primary/10 opacity-20 blur-3xl"></div>
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl cursor-pointer"
                  onClick={() => {
                    navigate("/local-tech");
                  }}
                >
                  <Computer className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Latest Gadgets</h3>
                  <p className="mt-2 text-sm text-gray-600">Find new tech locally</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl cursor-pointer"
                  onClick={() => {
                    navigate("/price-compare");
                  }}
                >
                  <Smartphone className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Smart Devices</h3>
                  <p className="mt-2 text-sm text-gray-600">Compare prices nearby</p>
                </motion.div>
              </div>
              <div className="flex flex-col gap-4 sm:pt-12">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl cursor-pointer"
                  onClick={() => {
                    navigate("/expert-services");
                  }}
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