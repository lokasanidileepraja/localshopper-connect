
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin, Smartphone, Store, ArrowRight, Zap, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { analytics } from "@/lib/analytics";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.analyticsInitialized) {
      analytics.init("anonymous-user");
      analytics.trackPageView('/welcome');
      window.analyticsInitialized = true;
    } else {
      analytics.trackPageView('/welcome');
    }
  }, []);
  
  const features = [
    {
      icon: <Store className="h-8 w-8 text-blue-500" />,
      title: "Find Local Stores",
      description: "Discover electronics retailers near you with real-time availability.",
      action: () => navigate('/nearby-stores'),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-500" />,
      title: "Browse Products",
      description: "Explore the latest electronics from phones to laptops and more.",
      action: () => navigate('/categories'),
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: "Smart Insights",
      description: "Get AI-powered recommendations and price predictions.",
      action: () => navigate('/price-compare'),
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { value: "50K+", label: "Products", icon: <Smartphone className="h-5 w-5" /> },
    { value: "1000+", label: "Stores", icon: <Store className="h-5 w-5" /> },
    { value: "4.9", label: "Rating", icon: <Star className="h-5 w-5 fill-current" /> },
    { value: "24/7", label: "Support", icon: <Zap className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Helmet>
        <title>TechLocator - Find Electronics Near You</title>
        <meta name="description" content="Your local electronics shopping companion. Find what you need nearby and get the best deals." />
      </Helmet>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl"></div>
        <div className="floating-delayed absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-pink-400/20 to-red-600/20 rounded-full blur-xl"></div>
        <div className="floating absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-8 hover-glow"
          >
            <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
            <span className="text-sm font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Find the best tech near you
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-8"
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">Tech</span>
            <span className="bg-gradient-secondary bg-clip-text text-transparent">Locator</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Your AI-powered electronics shopping companion. Discover, compare, and save with intelligent recommendations.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="btn-modern text-lg px-8 py-4 rounded-2xl shadow-lg hover-lift group" 
              onClick={() => navigate('/home')}
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-card px-8 py-4 rounded-2xl text-lg border-2 hover-lift"
              onClick={() => navigate('/nearby-stores')}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Find Stores Near Me
            </Button>
          </motion.div>

          {/* Stats section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center hover-lift"
              >
                <div className="flex justify-center mb-3 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features section with Bento grid */}
        <div className="bento-grid max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className={`${index === 1 ? 'bento-span-2' : ''}`}
            >
              <Card className="card-modern h-full group cursor-pointer overflow-hidden border-0 hover-glow" onClick={feature.action}>
                <CardContent className="p-8 flex flex-col h-full relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`mb-6 p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl w-fit text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4 group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h2>
                    
                    <p className="text-muted-foreground flex-grow mb-6 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <Button 
                      variant="ghost" 
                      className="justify-start p-0 gap-3 text-lg font-semibold hover:bg-transparent group-hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        feature.action();
                      }}
                    >
                      Explore
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
