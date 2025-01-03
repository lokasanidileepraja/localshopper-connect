import { motion } from "framer-motion";
import { Smartphone, Laptop, Headphones, Camera, Watch, Tv, Speaker, Gamepad } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Phones", icon: Smartphone, color: "bg-blue-100" },
  { name: "Laptops", icon: Laptop, color: "bg-green-100" },
  { name: "Audio", icon: Headphones, color: "bg-yellow-100" },
  { name: "Cameras", icon: Camera, color: "bg-red-100" },
  { name: "Wearables", icon: Watch, color: "bg-purple-100" },
  { name: "TVs", icon: Tv, color: "bg-pink-100" },
  { name: "Speakers", icon: Speaker, color: "bg-indigo-100" },
  { name: "Gaming", icon: Gamepad, color: "bg-orange-100" }
];

export const Categories = () => {
  const navigate = useNavigate();

  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(categoryName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    navigate(`/shop/TechHub Electronics`);
  };

  return (
    <section className="py-16" id="categories">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${category.color} rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all`}
              onClick={() => scrollToCategory(category.name)}
              id={category.name}
            >
              <category.icon className="h-8 w-8 mb-4" />
              <h3 className="font-semibold">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};