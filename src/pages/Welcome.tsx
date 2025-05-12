
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin, Smartphone, Store, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { analytics } from "@/lib/analytics";

const Welcome = () => {
  const navigate = useNavigate();

  // Initialize analytics just once on component mount
  useEffect(() => {
    // Only initialize once per session
    if (!window.analyticsInitialized) {
      analytics.init();
      analytics.trackPageView('/welcome');
      window.analyticsInitialized = true;
    } else {
      // Just track the page view if already initialized
      analytics.trackPageView('/welcome');
    }
  }, []);
  
  const features = [
    {
      icon: <Store className="h-8 w-8 text-blue-500" />,
      title: "Find Local Stores",
      description: "Discover electronics retailers near you with real-time availability.",
      action: () => navigate('/nearby-stores')
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-500" />,
      title: "Browse Products",
      description: "Explore the latest electronics from phones to laptops and more.",
      action: () => navigate('/categories')
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      title: "Compare Prices",
      description: "Find the best deals by comparing prices across multiple stores.",
      action: () => navigate('/price-compare')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Helmet>
        <title>TechLocator - Find Electronics Near You</title>
        <meta name="description" content="Your local electronics shopping companion. Find what you need nearby and get the best deals." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Find the best tech near you</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary">Tech</span>Locator
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Your local electronics shopping companion. Find what you need nearby and get the best deals.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2" 
              onClick={() => navigate('/home')}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/nearby-stores')}
            >
              Find Stores Near Me
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card className="h-full transition-all hover:shadow-lg group cursor-pointer" onClick={feature.action}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h2>
                  
                  <p className="text-muted-foreground flex-grow mb-4">
                    {feature.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="justify-start p-0 gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      feature.action();
                    }}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
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
