import { motion } from "framer-motion";

const brands = [
  { name: "Apple", logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9" },
  { name: "Samsung", logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c" },
  { name: "Sony", logo: "https://images.unsplash.com/photo-1492107376256-4026437926cd" },
  { name: "Dell", logo: "https://images.unsplash.com/photo-1588200908342-23b585c03e26" }
];

export const BrandsShowcase = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center p-4 rounded-lg hover:bg-gray-50"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};