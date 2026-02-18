import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Smartphone, Monitor, Laptop, Headphones, Plug, Tv,
  ArrowRight, Star, Clock, ShieldCheck, TrendingDown, MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS, MOCK_STORES, MOCK_STORE_PRODUCTS, CATEGORIES } from "@/data/marketplace";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

const catIcons: Record<string, React.ElementType> = {
  Smartphone, Monitor, Laptop, Headphones, Cable: Plug, Refrigerator: Tv,
};

const HomePage = () => {
  const navigate = useNavigate();

  // Smart carousels data
  const fastestStores = MOCK_STORES.filter((s) => s.distanceKm < 2).slice(0, 5);
  const authorizedStores = MOCK_STORES.filter((s) => s.roleTag === "Authorized Showroom");
  const localDeals = MOCK_PRODUCTS.slice(0, 6);
  const recentlyViewed = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>TechLocator - Hyperlocal Electronics</title>
        <meta name="description" content="Find the best electronics deals near you" />
      </Helmet>

      {/* Category Grid */}
      <section className="px-4 pt-3 pb-2">
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((cat, i) => {
            const Icon = catIcons[cat.icon] || Smartphone;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-card border border-border active:scale-95 transition-transform"
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-medium text-foreground">{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Fastest Near You */}
      <Section title="Fastest Near You" subtitle="< 30 min delivery" onSeeAll={() => navigate("/stores")}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {fastestStores.map((store) => (
            <motion.button
              key={store.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/store/${store.id}`)}
              className="shrink-0 w-44 rounded-xl bg-card border border-border overflow-hidden text-left"
            >
              <div className="h-20 bg-muted relative">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 left-2 text-[9px] bg-primary/90 text-primary-foreground border-0 px-1.5 py-0.5">
                  <Clock className="h-2.5 w-2.5 mr-0.5" />
                  {store.eta}
                </Badge>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-foreground line-clamp-1">{store.name}</p>
                <p className="text-[10px] text-muted-foreground">{store.distance} · {store.roleTag}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-medium text-foreground">{store.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({store.reviewCount})</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Authorized Showrooms */}
      <Section title="Authorized Showrooms" subtitle="Brand-verified dealers" onSeeAll={() => navigate("/stores")}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {authorizedStores.map((store) => (
            <motion.button
              key={store.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/store/${store.id}`)}
              className="shrink-0 flex items-center gap-3 p-3 rounded-xl bg-card border border-border w-60"
            >
              <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-foreground truncate">{store.name}</p>
                  <ShieldCheck className="h-3 w-3 text-primary shrink-0" />
                </div>
                <p className="text-[10px] text-muted-foreground">{store.distance} · {store.eta}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] text-foreground">{store.rating}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Local Price Drops */}
      <Section title="Local Price Drops" subtitle="Better than online" onSeeAll={() => navigate("/categories")}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {localDeals.map((product) => (
            <motion.button
              key={product.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="shrink-0 w-36 text-left"
            >
              <div className="aspect-square rounded-xl bg-muted overflow-hidden mb-2 relative">
                <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={160} height={160} />
                <Badge className="absolute bottom-2 left-2 text-[9px] bg-green-600 text-white border-0 px-1.5 py-0.5">
                  <TrendingDown className="h-2.5 w-2.5 mr-0.5" />
                  Local deal
                </Badge>
              </div>
              <p className="text-xs font-semibold text-foreground line-clamp-1">{product.name}</p>
              <p className="text-[10px] text-muted-foreground line-clamp-1">{product.brand}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-bold text-foreground">₹{product.startingPrice.toLocaleString("en-IN")}</span>
                <span className="text-[10px] text-muted-foreground">· {product.storeCount} stores</span>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <Section title="Recently Viewed" onSeeAll={() => {}}>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
            {recentlyViewed.map((product) => (
              <motion.button
                key={product.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="shrink-0 flex items-center gap-3 p-3 rounded-xl bg-card border border-border w-64"
              >
                <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0">
                  <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={80} height={80} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground line-clamp-1">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground">{product.storeCount} stores nearby</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">From ₹{product.startingPrice.toLocaleString("en-IN")}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </Section>
      )}

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
};

// Section wrapper component
const Section = ({ title, subtitle, onSeeAll, children }: {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
  children: React.ReactNode;
}) => (
  <section className="py-3">
    <div className="flex items-center justify-between px-4 mb-2.5">
      <div>
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="text-[11px] font-medium text-primary flex items-center gap-0.5">
          See all <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
    {children}
  </section>
);

export default HomePage;
