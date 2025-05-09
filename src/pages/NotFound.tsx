
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [potentialMatches, setPotentialMatches] = useState<string[]>([]);
  
  // Track 404 page view with path information
  useEffect(() => {
    trackPageView(`404: ${location.pathname}`);
    
    // Generate potential matches based on the path
    const path = location.pathname.toLowerCase();
    const suggestions: string[] = [];
    
    if (path.includes("product")) {
      suggestions.push("/products", "/categories");
    } else if (path.includes("shop") || path.includes("store")) {
      suggestions.push("/stores", "/nearby-stores");
    } else if (path.includes("mobile") || path.includes("phone")) {
      suggestions.push("/category/mobiles");
    } else if (path.includes("laptop")) {
      suggestions.push("/category/laptops");
    }
    
    // Always include these general paths
    if (!suggestions.includes("/categories")) {
      suggestions.push("/categories");
    }
    if (!suggestions.includes("/home")) {
      suggestions.push("/home");
    }
    
    setPotentialMatches(suggestions);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Helmet>
        <title>Page Not Found - TechLocator</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          
          <p className="text-muted-foreground mb-8">
            The page <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">{location.pathname}</code> doesn't exist or has been moved.
          </p>
          
          {potentialMatches.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">You might be looking for:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {potentialMatches.map((path) => (
                  <Button 
                    key={path} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate(path)}
                  >
                    {path}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => navigate('/')}
              className="gap-2"
              size="lg"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="gap-2"
              size="lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => navigate('/search')}
              className="gap-2 mt-2"
              size="lg"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
