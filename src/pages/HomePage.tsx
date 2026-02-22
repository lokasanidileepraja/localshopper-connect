import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Star, Clock, ShieldCheck, TrendingDown, MapPin, ChevronRight,
  Zap, TrendingUp, Package, Truck, Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS, MOCK_STORES, MOCK_ORDERS } from "@/data/marketplace";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

/* ── Categories ── */
const CATS = [
  { id: "mobiles", name: "Mobiles", emoji: "📱", gradient: "from-blue-500/15 to-blue-500/5" },
  { id: "tv", name: "TV & Display", emoji: "📺", gradient: "from-purple-500/15 to-purple-500/5" },
  { id: "laptops", name: "Laptops", emoji: "💻", gradient: "from-orange-500/15 to-orange-500/5" },
  { id: "audio", name: "Audio", emoji: "🎧", gradient: "from-green-500/15 to-green-500/5" },
  { id: "appliances", name: "Appliances", emoji: "🏠", gradient: "from-red-500/15 to-red-500/5" },
  { id: "essentials", name: "Essentials", emoji: "🔌", gradient: "from-amber-500/15 to-amber-500/5" },
];

/* ── Trending ── */
const TRENDING = [
  { name: "OnePlus Nord CE4", stat: "42 bought this week", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c", pid: "p1" },
  { name: "Boat Airdopes 141", stat: "110 bought recently", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", pid: "p4" },
  { name: "Samsung Charger", stat: "67 sold locally", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90", pid: "p5" },
];

/* ── Kits ── */
const KITS = [
  { emoji: "💻", title: "Work from Home", count: "12+ items", bg: "from-blue-500/10 to-indigo-500/5" },
  { emoji: "🎓", title: "Student Kit", count: "8+ items", bg: "from-green-500/10 to-emerald-500/5" },
  { emoji: "🎮", title: "Gaming Pro", count: "15+ items", bg: "from-purple-500/10 to-pink-500/5" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const activeOrder = MOCK_ORDERS.find((o) => o.status !== "delivered");
  const fastestStores = MOCK_STORES.filter((s) => s.distanceKm < 2.5).slice(0, 4);
  const localDeals = MOCK_PRODUCTS.slice(0, 4);
  const heroProduct = MOCK_PRODUCTS[1];

  const statusMap: Record<string, { label: string; color: string }> = {
    confirmed: { label: "Order Confirmed", color: "bg-blue-500" },
    preparing: { label: "Preparing", color: "bg-amber-500" },
    out_for_delivery: { label: "Out for Delivery", color: "bg-green-500" },
    ready_for_pickup: { label: "Ready for Pickup", color: "bg-green-500" },
  };

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>TechLocator — Hyperlocal Electronics</title>
        <meta name="description" content="Find the best electronics deals near you" />
      </Helmet>

      {/* ─── Active Order Pill ─── */}
      {activeOrder && (
        <motion.button
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/orders")}
          className="mx-4 mt-2 mb-2 flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border w-[calc(100%-2rem)] text-left active:scale-[0.99] transition-transform shadow-sm"
        >
          <div className="relative">
            <div className={cn("w-2 h-2 rounded-full animate-pulse", statusMap[activeOrder.status]?.color || "bg-primary")} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground font-medium">{statusMap[activeOrder.status]?.label}</p>
            <p className="text-xs font-bold text-foreground line-clamp-1">{activeOrder.items[0]?.name}</p>
          </div>
          <span className="text-[11px] font-bold text-primary">Track →</span>
        </motion.button>
      )}

      {/* ─── Category Grid ─── */}
      <section className="px-4 pt-2 pb-1">
        <div className="grid grid-cols-3 gap-2">
          {CATS.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 300 }}
              onClick={() => navigate(`/category/${cat.id}`)}
              className={cn(
                "flex flex-col items-center gap-1 py-3 rounded-2xl bg-gradient-to-b border border-border/60 active:scale-[0.94] transition-transform",
                cat.gradient
              )}
            >
              <span className="text-[26px] leading-none">{cat.emoji}</span>
              <span className="text-[10px] font-semibold text-foreground mt-0.5">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ─── Hero Card ─── */}
      <section className="px-4 py-3">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate(`/product/${heroProduct.id}`)}
          className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-foreground/[0.03] to-primary/[0.06] border border-border p-5 pb-4 text-left active:scale-[0.99] transition-transform"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <Badge className="bg-primary text-primary-foreground border-0 text-[9px] font-bold px-2 py-0.5 mb-2.5">
                🔥 New Arrival
              </Badge>
              <h3 className="text-xl font-bold text-foreground leading-tight tracking-tight">
                iPhone 16 Pro
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                Available at {heroProduct.storeCount} local stores.
                <br />
                <span className="text-foreground font-semibold">From ₹{heroProduct.startingPrice.toLocaleString("en-IN")}</span>
              </p>
              <div className="inline-flex items-center gap-1.5 mt-3 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-[11px] font-bold">
                Compare prices <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="w-28 h-28 rounded-2xl bg-muted/60 overflow-hidden shrink-0 shadow-lg">
              <OptimizedImage src={heroProduct.image} alt={heroProduct.name} className="w-full h-full object-cover" width={112} height={112} />
            </div>
          </div>
        </motion.button>
      </section>

      {/* ─── Trust Strip ─── */}
      <section className="px-4 pb-3">
        <div className="flex gap-1.5">
          {[
            { icon: Truck, label: "Free Local\nDelivery", color: "text-primary" },
            { icon: ShieldCheck, label: "48hr Return\nGuarantee", color: "text-green-600" },
            { icon: Star, label: "Authorized\nWarranty", color: "text-amber-500" },
          ].map((b) => (
            <div key={b.label} className="flex-1 flex items-center gap-2 py-2.5 px-2.5 rounded-xl bg-secondary/60">
              <b.icon className={cn("h-4 w-4 shrink-0", b.color)} />
              <span className="text-[9px] font-medium text-muted-foreground leading-tight whitespace-pre-line">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Trending ─── */}
      <Section title="Trending in Indiranagar" subtitle="What your neighbors are buying" onSeeAll={() => navigate("/categories")}>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 pb-1">
          {TRENDING.map((item, i) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/product/${item.pid}`)}
              className="shrink-0 w-[160px] rounded-2xl bg-card border border-border overflow-hidden text-left"
            >
              <div className="h-24 bg-muted overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-bold text-foreground line-clamp-1">{item.name}</p>
                <p className="text-[9px] text-green-600 font-semibold mt-0.5 flex items-center gap-0.5">
                  <TrendingUp className="h-2.5 w-2.5" /> {item.stat}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ─── Shop by Need ─── */}
      <Section title="Shop by Need" subtitle="Expert-curated kits for every use case" onSeeAll={() => navigate("/categories")}>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 pb-1">
          {KITS.map((kit, i) => (
            <motion.button
              key={kit.title}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "shrink-0 w-[130px] flex flex-col items-center gap-1.5 py-5 rounded-2xl bg-gradient-to-b border border-border/60",
                kit.bg
              )}
            >
              <span className="text-3xl">{kit.emoji}</span>
              <span className="text-[11px] font-bold text-foreground">{kit.title}</span>
              <span className="text-[9px] text-muted-foreground">{kit.count}</span>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ─── Fastest Near You ─── */}
      <Section title="Fastest Near You" subtitle="Under 45 min delivery" onSeeAll={() => navigate("/stores")}>
        <div className="px-4 space-y-2 pb-1">
          {fastestStores.map((store, i) => (
            <motion.button
              key={store.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/store/${store.id}`)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border w-full text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-muted overflow-hidden shrink-0">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-foreground truncate">{store.name}</p>
                  {store.isVerified && <ShieldCheck className="h-3 w-3 text-primary shrink-0" />}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{store.distance}</span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" /> {store.rating}
                  </span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground">{store.roleTag}</span>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-700 border-0 text-[9px] font-bold px-2 py-0.5 shrink-0">
                <Clock className="h-2.5 w-2.5 mr-0.5" />
                {store.eta}
              </Badge>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ─── Local Price Drops ─── */}
      <Section title="Local Price Drops" subtitle="Cheaper than Amazon / Flipkart" onSeeAll={() => navigate("/categories")}>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 pb-2">
          {localDeals.map((product, i) => {
            const savings = Math.round(product.startingPrice * 0.04);
            return (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="shrink-0 w-[150px] rounded-2xl bg-card border border-border overflow-hidden text-left"
              >
                <div className="aspect-square bg-muted overflow-hidden relative">
                  <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={150} height={150} />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2 pt-6">
                    <span className="text-[9px] font-bold text-white bg-green-600 px-1.5 py-0.5 rounded">
                      Save ₹{savings.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-bold text-foreground line-clamp-1">{product.name}</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">₹{product.startingPrice.toLocaleString("en-IN")}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5 flex items-center gap-0.5">
                    <MapPin className="h-2.5 w-2.5" /> {product.storeCount} stores
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Section>

      <div className="h-8" />
    </div>
  );
};

/* ─── Section wrapper ─── */
const Section = ({
  title, subtitle, onSeeAll, children,
}: {
  title: string; subtitle?: string; onSeeAll?: () => void; children: React.ReactNode;
}) => (
  <section className="py-3">
    <div className="flex items-baseline justify-between px-4 mb-2.5">
      <div>
        <h2 className="text-[13px] font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="text-[11px] font-semibold text-primary flex items-center gap-0.5">
          See all <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
    {children}
  </section>
);

export default HomePage;
