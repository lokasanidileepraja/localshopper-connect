import { motion } from "framer-motion";

const brands = [
  { 
    name: "Apple", 
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
    description: "Innovation at its finest"
  },
  { 
    name: "Samsung", 
    logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
    description: "Technology for everyone"
  },
  { 
    name: "Sony", 
    logo: "https://images.unsplash.com/photo-1492107376256-4026437926cd",
    description: "Creating new possibilities"
  },
  { 
    name: "Dell", 
    logo: "https://images.unsplash.com/photo-1588200908342-23b585c03e26",
    description: "Empowering professionals"
  }
];

export const BrandsShowcase = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-center mb-8"
        >
          Featured Brands
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <motion.img
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain transition-all duration-300 group-hover:scale-110"
                whileHover={{ rotate: 5 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white p-2 rounded-b-xl text-center text-sm"
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