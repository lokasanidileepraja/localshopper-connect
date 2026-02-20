import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Smartphone, Monitor, Laptop, Headphones, Plug, Tv,
  ArrowRight, Star, Clock, ShieldCheck, TrendingDown, MapPin, ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS, MOCK_STORES, CATEGORIES } from "@/data/marketplace";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

const catIcons: Record<string, React.ElementType> = {
  Smartphone, Monitor, Laptop, Headphones, Cable: Plug, Refrigerator: Tv,
};

const catColors: Record<string, string> = {
  mobiles: "bg-blue-500/10 text-blue-600",
  tv: "bg-purple-500/10 text-purple-600",
  laptops: "bg-orange-500/10 text-orange-600",
  audio: "bg-green-500/10 text-green-600",
  appliances: "bg-red-500/10 text-red-600",
  essentials: "bg-yellow-500/10 text-yellow-600",
};

const HomePage = () => {
  const navigate = useNavigate();

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
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.map((cat, i) => {
            const Icon = catIcons[cat.icon] || Smartphone;
            const color = catColors[cat.id] || "bg-primary/10 text-primary";
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-card border border-border active:scale-95 transition-transform"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-semibold text-foreground">{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Fastest Near You */}
      <Section title="Fastest Near You" subtitle="< 30 min delivery" onSeeAll={() => navigate("/stores")}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
          {fastestStores.map((store, i) => (
            <motion.button
              key={store.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/store/${store.id}`)}
              className="shrink-0 w-44 rounded-2xl bg-card border border-border overflow-hidden text-left"
            >
              <div className="h-24 bg-muted relative">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <Badge className="absolute top-2 left-2 text-[9px] bg-black/60 text-white border-0 px-2 py-0.5 backdrop-blur-sm flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {store.eta}
                </Badge>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-foreground line-clamp-1">{store.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{store.distance}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-[11px] font-semibold text-foreground">{store.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({store.reviewCount})</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Authorized Showrooms */}
      <Section title="Authorized Showrooms" subtitle="Brand-verified dealers" onSeeAll={() => navigate("/stores")}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
          {authorizedStores.map((store, i) => (
            <motion.button
              key={store.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/store/${store.id}`)}
              className="shrink-0 w-64 flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden shrink-0">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-foreground truncate">{store.name}</p>
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{store.distance} · {store.eta}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-semibold text-foreground">{store.rating}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Local Price Drops */}
      <Section title="Local Price Drops" subtitle="Better than online" onSeeAll={() => navigate("/categories")}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
          {localDeals.map((product, i) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="shrink-0 w-36 text-left"
            >
              <div className="aspect-square rounded-2xl bg-muted overflow-hidden mb-2 relative">
                <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={160} height={160} />
                <Badge className="absolute bottom-2 left-2 text-[9px] bg-green-600 text-white border-0 px-1.5 py-0.5 flex items-center gap-0.5">
                  <TrendingDown className="h-2.5 w-2.5" />
                  Local deal
                </Badge>
              </div>
              <p className="text-xs font-bold text-foreground line-clamp-1">{product.name}</p>
              <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{product.brand}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs font-bold text-foreground">₹{product.startingPrice.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                <MapPin className="h-2.5 w-2.5 inline mr-0.5" />
                {product.storeCount} stores
              </p>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <Section title="Recently Viewed">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
            {recentlyViewed.map((product, i) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-card border border-border w-64"
              >
                <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden shrink-0">
                  <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={80} height={80} />
                </div>
                <div className="min-w-0 text-left flex-1">
                  <p className="text-xs font-bold text-foreground line-clamp-1">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{product.storeCount} stores nearby</p>
                  <p className="text-xs font-bold text-foreground mt-1">From ₹{product.startingPrice.toLocaleString("en-IN")}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </motion.button>
            ))}
          </div>
        </Section>
      )}

      <div className="h-6" />
    </div>
  );
};

const Section = ({
  title, subtitle, onSeeAll, children,
}: {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
  children: React.ReactNode;
}) => (
  <section className="py-4">
    <div className="flex items-baseline justify-between px-4 mb-3">
      <div>
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="flex items-center gap-0.5 text-[11px] font-semibold text-primary">
          See all <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
    {children}
  </section>
);

export default HomePage;
