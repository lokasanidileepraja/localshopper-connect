import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BrandsShowcaseProps {
  onBrandClick: (brandName: string) => void;
}

export const BrandsShowcase = ({ onBrandClick }: BrandsShowcaseProps) => {
  const navigate = useNavigate();

  const brands = [
    { name: "Apple", logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9", tag: "Popular" },
    { name: "Samsung", logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c", tag: "Best Value" },
    { name: "Sony", logo: "https://images.unsplash.com/photo-1492107376256-4026437926cd", tag: "Top Rated" },
    { name: "Dell", logo: "https://images.unsplash.com/photo-1588200908342-23b585c03e26", tag: "Reliable" },
  ];

  return (
    <section className="px-4 py-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">Top Brands</h2>
        <button onClick={() => navigate("/brands")} className="text-xs font-medium text-primary flex items-center gap-0.5">
          See all <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
        {brands.map((brand, i) => (
          <motion.button
            key={brand.name}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onBrandClick(brand.name)}
            className="shrink-0 flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="w-16 h-16 rounded-2xl bg-card border border-border overflow-hidden p-2 flex items-center justify-center">
              <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold text-foreground">{brand.name}</p>
              <p className="text-[9px] text-muted-foreground">{brand.tag}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
