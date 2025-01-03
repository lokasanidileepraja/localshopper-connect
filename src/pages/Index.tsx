import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Scale, 
  Package, 
  Bell, 
  ThumbsUp,
} from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Compare Products & Shops",
      description: "Compare prices and find the best deals across local stores",
      icon: Scale,
      path: "/compare"
    },
    {
      title: "Bulk Purchase",
      description: "Get special discounts for bulk orders",
      icon: Package,
      path: "/bulk"
    },
    {
      title: "Price Alerts",
      description: "Set alerts for price drops and stock availability",
      icon: Bell,
      path: "/alerts"
    },
    {
      title: "Recommendations",
      description: "Discover products you might like",
      icon: ThumbsUp,
      path: "/recommendations"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      <SearchBar />
      <FeaturedProducts />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 border rounded-lg hover:border-primary transition-all hover:shadow-lg cursor-pointer bg-white"
              onClick={() => navigate(feature.path)}
            >
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(feature.path)}
              >
                Learn More
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;