import { motion } from "framer-motion";
import { Smartphone, Laptop, Headphones, Camera, Watch, Tv, Speaker, Gamepad } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { name: "Phones", icon: Smartphone, color: "bg-blue-100", description: "Latest smartphones and accessories" },
  { name: "Laptops", icon: Laptop, color: "bg-green-100", description: "Powerful laptops for work and play" },
  { name: "Audio", icon: Headphones, color: "bg-yellow-100", description: "High-quality audio equipment" },
  { name: "Cameras", icon: Camera, color: "bg-red-100", description: "Professional cameras and gear" },
  { name: "Wearables", icon: Watch, color: "bg-purple-100", description: "Smart watches and fitness trackers" },
  { name: "TVs", icon: Tv, color: "bg-pink-100", description: "4K and 8K Smart TVs" },
  { name: "Speakers", icon: Speaker, color: "bg-indigo-100", description: "Premium sound systems" },
  { name: "Gaming", icon: Gamepad, color: "bg-orange-100", description: "Gaming consoles and accessories" }
];

export const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(categoryName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: `Browsing ${categoryName}`,
        description: "Loading products in this category...",
      });
    }
    navigate(`/shop/TechHub Electronics`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50" id="categories">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Browse Categories
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${category.color} rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all group`}
              onClick={() => scrollToCategory(category.name)}
              id={category.name}
            >
              <div className="flex flex-col items-center text-center">
                <category.icon className="h-8 w-8 mb-4 group-hover:text-primary transition-colors" />
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};