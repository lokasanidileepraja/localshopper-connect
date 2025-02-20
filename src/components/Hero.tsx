
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, MapPin, Search, Star, Zap, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-900"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, 
              rgba(0,0,0,0.9), 
              rgba(17,24,39,0.9), 
              rgba(29,78,216,0.8)
            ),
            url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl"
        >
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-gray-200 backdrop-blur-xl"
            >
              <span className="flex items-center">
                <Zap className="mr-1 h-3 w-3 text-yellow-400" />
                New Feature
              </span>
              <span className="ml-2 text-gray-400">|</span>
              <span className="ml-2">Live Price Tracking</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300"
            >
              Find the Best Tech Deals
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Near You
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mx-auto mt-6 max-w-lg text-lg sm:text-xl text-gray-300 leading-relaxed"
            >
              Compare prices, find local stores, and get the best deals on electronics. Save time and money with real-time price tracking.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => navigate("/stores")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 group-hover:animate-shine" />
                <MapPin className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Find Nearby Stores
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/search")}
                className="border-white/20 text-white hover:bg-white/20 px-8 group backdrop-blur-sm"
              >
                <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Search Products
              </Button>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
            >
              {[
                { 
                  icon: MapPin, 
                  title: "Local Stores", 
                  description: "Find tech retailers near you",
                  color: "from-green-500/20 to-green-600/20" 
                },
                { 
                  icon: Star, 
                  title: "Price Compare", 
                  description: "Get the best deals instantly",
                  color: "from-blue-500/20 to-blue-600/20"
                },
                { 
                  icon: ShieldCheck, 
                  title: "Expert Support", 
                  description: "Get help choosing the right tech",
                  color: "from-purple-500/20 to-purple-600/20"
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className={`rounded-2xl bg-gradient-to-br ${feature.color} p-8 backdrop-blur-xl
                    border border-white/10 hover:border-white/20 transition-colors`}
                >
                  <feature.icon className="h-8 w-8 text-white/80 mb-4" />
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400 text-sm"
            >
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-400" />
                Secure Transactions
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                4.9/5 User Rating
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-blue-400" />
                Real-time Updates
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};
