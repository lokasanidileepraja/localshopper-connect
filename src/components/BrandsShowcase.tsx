
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface BrandsShowcaseProps {
  onBrandClick: (brandName: string) => void;
}

export const BrandsShowcase = ({ onBrandClick }: BrandsShowcaseProps) => {
  const isMobile = useIsMobile();

  const brands = [
    { 
      name: "Apple", 
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
      description: "Innovation at its finest",
      stats: "Most Popular Brand",
      shadow: "shadow-orange-100"
    },
    { 
      name: "Samsung", 
      logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
      description: "Technology for everyone",
      stats: "Best Value",
      shadow: "shadow-blue-100"
    },
    { 
      name: "Sony", 
      logo: "https://images.unsplash.com/photo-1492107376256-4026437926cd",
      description: "Creating new possibilities",
      stats: "Top Rated",
      shadow: "shadow-purple-100"
    },
    { 
      name: "Dell", 
      logo: "https://images.unsplash.com/photo-1588200908342-23b585c03e26",
      description: "Empowering professionals",
      stats: "Most Reliable",
      shadow: "shadow-indigo-100"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover products from the world's leading technology brands, all available at your local stores.
          </p>
        </motion.div>

        <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'sm:grid-cols-4 gap-8'}`}>
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ 
                scale: isMobile ? 1.02 : 1.05,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl 
                bg-white ${brand.shadow} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
                backdrop-blur-lg`}
              onClick={() => onBrandClick(brand.name)}
            >
              <motion.img
                src={brand.logo}
                alt={brand.name}
                className="h-12 sm:h-16 object-contain transition-all duration-300 group-hover:scale-110"
                whileHover={{ rotate: 5 }}
              />
              <p className="mt-4 font-semibold text-gray-900">{brand.name}</p>
              <p className="mt-1 text-sm text-gray-600">{brand.stats}</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-black/90 text-white p-3 rounded-b-2xl text-center text-sm"
              >
                {brand.description}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
