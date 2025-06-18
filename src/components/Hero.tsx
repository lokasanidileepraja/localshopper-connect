
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useImagePreload } from "@/hooks/useImagePreload";
import { Skeleton } from "@/components/ui/skeleton";
import { OptimizedImage } from "@/components/ui/optimized-image";

export const Hero = () => {
  const navigate = useNavigate();
  const { isLoaded } = useImagePreload("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", { priority: true });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium background with depth */}
      <AnimatePresence>
        {!isLoaded ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40 z-10" />
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Premium technology showcase"
              className="w-full h-full object-cover scale-105"
              priority={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ultra-premium content layout */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Premium Typography & Actions */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-12"
            >
              {/* Premium badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full backdrop-blur-xl border border-white/20"
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white/90 tracking-wide">
                  Discover Premium Technology
                </span>
              </motion.div>
              
              {/* Hero headline - Apple-inspired typography */}
              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-5xl sm:text-7xl lg:text-8xl font-thin tracking-tight text-white leading-[0.9]"
                >
                  <span className="font-extralight">Think</span>
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                    Different
                  </span>
                </motion.h1>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-xl sm:text-2xl font-light text-white/80 tracking-wide max-w-lg"
                >
                  Experience technology that adapts to your life, not the other way around.
                </motion.h2>
              </div>
              
              {/* Premium CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 pt-8"
              >
                <Button 
                  size="lg"
                  className="group relative overflow-hidden bg-white text-black hover:bg-white/90 px-8 py-6 rounded-full text-lg font-medium tracking-wide transition-all duration-500 hover:scale-105 shadow-2xl"
                  onClick={() => navigate("/stores")}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Now
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="group glass-card border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-medium tracking-wide backdrop-blur-xl transition-all duration-500 hover:scale-105"
                  onClick={() => navigate("/price-compare")}
                >
                  <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Premium Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              {/* Floating product cards */}
              <div className="relative h-96 lg:h-[600px]">
                {/* Main product card */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-16 left-8 glass-card p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl"
                >
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-16 w-16 text-white/70" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-white font-semibold">iPhone 15 Pro</h3>
                    <p className="text-white/60 text-sm">From ₹1,34,900</p>
                  </div>
                </motion.div>

                {/* Secondary product card */}
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotateY: [0, -3, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute bottom-20 right-4 glass-card p-4 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="h-10 w-10 text-white/70" />
                  </div>
                  <div className="mt-3 space-y-1">
                    <h4 className="text-white text-sm font-medium">MacBook Pro</h4>
                    <p className="text-white/60 text-xs">From ₹1,99,900</p>
                  </div>
                </motion.div>

                {/* Ambient glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Premium scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};
