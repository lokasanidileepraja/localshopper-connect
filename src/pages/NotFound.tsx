
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Helmet>
        <title>Page Not Found - TechLocator</title>
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
            The page you are looking for doesn't exist or has been moved.
          </p>
          
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
