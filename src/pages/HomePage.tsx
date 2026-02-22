import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Star, Clock, ShieldCheck, TrendingDown, MapPin, ChevronRight,
  Zap, TrendingUp, Package, Laptop, GraduationCap, Gamepad2, Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS, MOCK_STORES, MOCK_ORDERS, CATEGORIES } from "@/data/marketplace";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

const catEmojis: Record<string, string> = {
  mobiles: "📱", appliances: "📺", tv: "🖥️", laptops: "💻", audio: "🎧", essentials: "🔌",
};

const trendingItems = [
  { name: "OnePlus Nord CE4", stat: "42 bought this week", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c" },
  { name: "Boat Airdopes 141", stat: "110 bought recently", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { name: "Samsung 25W Charger", stat: "67 sold locally", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90" },
];

const shopByNeed = [
  { emoji: "💻", title: "Work from Home", count: "12+ items" },
  { emoji: "🎓", title: "Student Kit", count: "8+ items" },
  { emoji: "🎮", title: "Gaming Pro", count: "15+ items" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const activeOrder = MOCK_ORDERS.find((o) => o.status !== "delivered");
  const fastestStores = MOCK_STORES.filter((s) => s.distanceKm < 2.5).slice(0, 5);
  const localDeals = MOCK_PRODUCTS.slice(0, 6);
  const heroProduct = MOCK_PRODUCTS[1]; // iPhone

  const statusLabel: Record<string, string> = {
    confirmed: "Order Confirmed",
    preparing: "Preparing",
    out_for_delivery: "Out for Delivery",
    ready_for_pickup: "Ready for Pickup",
  };

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>TechLocator - Hyperlocal Electronics</title>
        <meta name="description" content="Find the best electronics deals near you" />
      </Helmet>

      {/* Delivery Speed Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mt-2 mb-3 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-primary/8 border border-primary/15"
      >
        <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Zap className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-muted-foreground">Delivery in</p>
          <p className="text-sm font-bold text-foreground">8 mins</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-0 text-[10px] font-semibold">
          Indiranagar
        </Badge>
      </motion.div>

      {/* Active Order Inline Tracker */}
      {activeOrder && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/orders")}
          className="mx-4 mb-3 flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-card border border-border w-[calc(100%-2rem)] text-left active:scale-[0.99] transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground">{statusLabel[activeOrder.status] || activeOrder.status}</p>
            <p className="text-xs font-bold text-foreground line-clamp-1">{activeOrder.items[0]?.name}</p>
          </div>
          <span className="text-[11px] font-semibold text-primary shrink-0">Track</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </motion.button>
      )}

      {/* Category Grid */}
      <section className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="flex flex-col items-center gap-1.5 py-3.5 rounded-2xl bg-card border border-border active:scale-95 transition-transform"
            >
              <span className="text-2xl">{catEmojis[cat.id] || "📦"}</span>
              <span className="text-[11px] font-semibold text-foreground">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Hero Product — New Arrival */}
      <section className="px-4 mb-4">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate(`/product/${heroProduct.id}`)}
          className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-card to-secondary border border-border p-4 text-left active:scale-[0.99] transition-transform"
        >
          <Badge className="bg-primary text-primary-foreground border-0 text-[10px] font-bold mb-2">
            New Arrival
          </Badge>
          <h3 className="text-lg font-bold text-foreground leading-tight">iPhone 16 Pro</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-3 max-w-[70%]">
            Available at {heroProduct.storeCount} local stores now.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">
            Get local price <ArrowRight className="h-3.5 w-3.5" />
          </div>
          {/* Product image placeholder */}
          <div className="absolute right-3 top-3 w-24 h-24 rounded-2xl bg-muted/50 overflow-hidden">
            <OptimizedImage src={heroProduct.image} alt={heroProduct.name} className="w-full h-full object-cover" width={96} height={96} />
          </div>
        </motion.button>
      </section>

      {/* Trust Badges */}
      <section className="px-4 mb-4">
        <div className="flex gap-2">
          {[
            { icon: ShieldCheck, label: "Free Local Installation", color: "text-green-600" },
            { icon: Clock, label: "48hr Return Safety", color: "text-amber-600" },
            { icon: Star, label: "Auth. Warranty", color: "text-primary" },
          ].map((badge) => (
            <div key={badge.label} className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-card border border-border">
              <badge.icon className={cn("h-4 w-4", badge.color)} />
              <span className="text-[9px] font-semibold text-muted-foreground text-center leading-tight px-1">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending in Indiranagar */}
      <Section title="Trending in Indiranagar" subtitle="What your neighbors are buying" onSeeAll={() => navigate("/categories")}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
          {trendingItems.map((item, i) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/product/p${i + 1}`)}
              className="shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-card border border-border w-56"
            >
              <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-foreground line-clamp-1">{item.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                  <TrendingUp className="h-2.5 w-2.5 text-green-600" />
                  {item.stat}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Shop by Need */}
      <Section title="Shop by Need" subtitle="Expert curated electronics kits" onSeeAll={() => navigate("/categories")}>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 pb-2">
          {shopByNeed.map((kit, i) => (
            <motion.button
              key={kit.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 flex flex-col items-center gap-2 py-4 px-5 rounded-2xl bg-card border border-border min-w-[120px]"
            >
              <span className="text-2xl">{kit.emoji}</span>
              <span className="text-[11px] font-bold text-foreground">{kit.title}</span>
              <span className="text-[10px] text-muted-foreground">{kit.count}</span>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Fastest Near You */}
      <Section title="Fastest Near You" subtitle="Fulfillment under 45 minutes" onSeeAll={() => navigate("/stores")}>
        <div className="px-4 space-y-2.5 pb-1">
          {fastestStores.map((store, i) => {
            const isClosed = store.hours.includes("10") && new Date().getHours() < 10;
            return (
              <motion.button
                key={store.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/store/${store.id}`)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border w-full text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{store.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{store.distance} · {store.rating} ★</p>
                </div>
                <Badge className={cn(
                  "border-0 text-[9px] font-semibold px-2 py-0.5",
                  isClosed ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-700"
                )}>
                  {isClosed ? "Closed" : store.eta}
                </Badge>
              </motion.button>
            );
          })}
        </div>
      </Section>

      {/* Local Price Drops */}
      <Section title="Local Price Drops" subtitle="Verified Cheaper than National Portals" onSeeAll={() => navigate("/categories")}>
        <div className="px-4 space-y-2.5 pb-2">
          {localDeals.slice(0, 4).map((product, i) => {
            const savings = Math.round(product.startingPrice * 0.04);
            const store = MOCK_STORES[i % MOCK_STORES.length];
            return (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border w-full text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden shrink-0 relative">
                  <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={56} height={56} />
                  {i === 0 && (
                    <span className="absolute top-0.5 left-0.5 bg-amber-500 text-white text-[7px] font-bold px-1 py-0.5 rounded">
                      Limited Stock
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground line-clamp-1">{product.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-foreground">₹{product.startingPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[10px] text-green-600 font-semibold mt-0.5">Save ₹{savings.toLocaleString("en-IN")} vs Online</p>
                  <p className="text-[10px] text-muted-foreground">{store.name}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </Section>

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
  <section className="py-3">
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
