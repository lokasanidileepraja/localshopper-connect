import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Star, Clock, ShieldCheck, TrendingUp, MapPin,
  Zap, Package, ChevronRight, Flame, Eye, Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS, MOCK_STORES, MOCK_ORDERS, MOCK_STORE_PRODUCTS } from "@/data/marketplace";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

/* ── Category Studio Icons ── */
const CATS = [
  { id: "mobiles", name: "Mobiles", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop" },
  { id: "laptops", name: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop" },
  { id: "audio", name: "Audio", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop" },
  { id: "tv", name: "TV", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=120&h=120&fit=crop" },
  { id: "appliances", name: "Appliances", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop" },
  { id: "essentials", name: "Essentials", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120&h=120&fit=crop" },
];

/* ── Brands ── */
const BRANDS = [
  { name: "Apple", logo: "🍎" },
  { name: "Samsung", logo: "🔵" },
  { name: "Sony", logo: "🎵" },
  { name: "LG", logo: "🔴" },
  { name: "Dell", logo: "💻" },
  { name: "Bose", logo: "🎧" },
];

/* ── Kits ── */
const KITS = [
  { emoji: "💻", title: "Work from Home", count: "12+ items", gradient: "from-blue-500/10 to-indigo-500/5" },
  { emoji: "🎓", title: "Student Kit", count: "8+ items", gradient: "from-emerald-500/10 to-green-500/5" },
  { emoji: "🎮", title: "Gaming Pro", count: "15+ items", gradient: "from-purple-500/10 to-pink-500/5" },
  { emoji: "📸", title: "Content Creator", count: "10+ items", gradient: "from-amber-500/10 to-orange-500/5" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const activeOrder = MOCK_ORDERS.find((o) => o.status !== "delivered");
  const nearbyStores = MOCK_STORES.filter((s) => s.distanceKm < 3).slice(0, 5);
  const heroProduct = MOCK_PRODUCTS[1]; // iPhone
  const trendingProducts = MOCK_PRODUCTS.slice(0, 4);
  const memberDeals = MOCK_PRODUCTS.slice(2, 6);

  const statusLabel: Record<string, string> = {
    confirmed: "Order Confirmed",
    preparing: "Being Prepared",
    out_for_delivery: "Coming to you now",
    ready_for_pickup: "Ready for Pickup",
  };

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>TechLocator — Hyperlocal Electronics</title>
        <meta name="description" content="Find the best electronics deals near you" />
      </Helmet>

      {/* ─── Live Order Tracker ─── */}
      {activeOrder && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/orders")}
          className="mx-4 mt-2 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-foreground text-background w-[calc(100%-2rem)] text-left active:scale-[0.98] transition-transform"
        >
          <div className="relative">
            <Package className="h-5 w-5 text-background/80" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-background/60 font-medium tracking-premium uppercase">
              {statusLabel[activeOrder.status] || "In Progress"}
            </p>
            <p className="text-[13px] font-semibold text-background line-clamp-1 mt-0.5">
              {activeOrder.items[0]?.name}
            </p>
          </div>
          <span className="text-[11px] font-bold text-background/90 flex items-center gap-1">
            Track <ArrowRight className="h-3 w-3" />
          </span>
        </motion.button>
      )}

      {/* ─── Bank Offer Ticker ─── */}
      <div className="mx-4 mt-3 mb-1 overflow-hidden rounded-xl bg-foreground/[0.03] border border-border/50">
        <motion.div
          animate={{ x: [0, -600] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-6 px-3 py-2 whitespace-nowrap"
        >
          {[
            "💳 HDFC: Flat ₹2,000 off on orders above ₹15,000",
            "🏦 ICICI: 10% cashback on electronics",
            "💰 Axis: No-cost EMI on all products",
            "💳 HDFC: Flat ₹2,000 off on orders above ₹15,000",
            "🏦 ICICI: 10% cashback on electronics",
          ].map((offer, i) => (
            <span key={i} className="text-[11px] font-medium text-foreground/80 flex items-center gap-2">
              {offer}
              <span className="text-muted-foreground/40">|</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── PNG Category Studio ─── */}
      <section className="px-4 pt-4 pb-1">
        <div className="flex justify-between overflow-x-auto scrollbar-hide gap-1">
          {CATS.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, type: "spring", stiffness: 300 }}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="flex flex-col items-center gap-1.5 min-w-[56px] active:scale-90 transition-transform"
            >
              <div className="w-[56px] h-[56px] rounded-2xl bg-secondary/80 border border-border/50 overflow-hidden p-1.5 shadow-sm">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <span className="text-[10px] font-semibold text-foreground tracking-tight-premium">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ─── Hero Banner ─── */}
      <section className="px-4 py-3">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate(`/product/${heroProduct.id}`)}
          className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-foreground text-left active:scale-[0.99] transition-transform group"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <OptimizedImage
              src={heroProduct.image}
              alt={heroProduct.name}
              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
              width={400}
              height={225}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
          </div>
          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-5">
            <Badge className="bg-background/20 text-background border-0 text-[9px] font-bold px-2 py-0.5 w-fit backdrop-blur-sm">
              <Flame className="h-2.5 w-2.5 mr-0.5" /> NEW LAUNCH
            </Badge>
            <h2 className="text-[22px] font-bold text-background leading-tight tracking-tight-premium mt-2">
              iPhone 16 Pro
            </h2>
            <p className="text-[12px] text-background/70 mt-1">
              Available at <span className="text-background font-semibold">{heroProduct.storeCount} Showrooms</span> near you
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-background/90 font-bold text-sm">From ₹{heroProduct.startingPrice.toLocaleString("en-IN")}</span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-background text-foreground text-[11px] font-bold">
                Compare Prices <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </motion.button>
      </section>

      {/* ─── Trust Strip ─── */}
      <section className="px-4 pb-2">
        <div className="flex gap-1">
          {[
            { icon: Zap, label: "Free Local\nInstallation", color: "text-primary" },
            { icon: ShieldCheck, label: "48hr Return\nSafety", color: "text-emerald-600" },
            { icon: Star, label: "Auth.\nWarranty", color: "text-amber-500" },
          ].map((b) => (
            <div key={b.label} className="flex-1 flex items-center gap-2 py-2 px-2 rounded-xl bg-secondary/50 border border-border/30">
              <b.icon className={cn("h-3.5 w-3.5 shrink-0", b.color)} />
              <span className="text-[9px] font-medium text-muted-foreground leading-tight whitespace-pre-line">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Recently Viewed ─── */}
      <Section title="Resume Research" action="History" onAction={() => navigate("/categories")}>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-1">
          {MOCK_PRODUCTS.slice(0, 3).map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(`/product/${p.id}`)}
              className="shrink-0 flex items-center gap-2.5 p-2 pr-4 rounded-2xl bg-card border border-border/60 min-w-[200px]"
            >
              <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                <OptimizedImage src={p.image} alt={p.name} className="w-full h-full object-cover" width={48} height={48} />
              </div>
              <div className="text-left min-w-0">
                <p className="text-[11px] font-semibold text-foreground line-clamp-1">{p.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">From ₹{p.startingPrice.toLocaleString("en-IN")}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ─── Trending Local ─── */}
      <Section title="Trending in Indiranagar" subtitle="What your neighbors are buying" action="See all" onAction={() => navigate("/categories")}>
        <div className="grid grid-cols-2 gap-2 px-4 pb-1">
          {trendingProducts.map((product, i) => {
            const buyers = [1200, 890, 2100, 540][i];
            const demand = ["High Demand", "Popular", "Trending", "Rising"][i];
            return (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="rounded-2xl bg-card border border-border/60 overflow-hidden text-left"
              >
                <div className="aspect-square bg-muted overflow-hidden relative">
                  <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={180} height={180} />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-foreground/80 text-background border-0 text-[8px] font-bold px-1.5 py-0.5 backdrop-blur-sm">
                      {demand}
                    </Badge>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-bold text-foreground line-clamp-1 tracking-tight-premium">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-0.5">
                    <TrendingUp className="h-2.5 w-2.5 text-emerald-500" /> {(buyers / 1000).toFixed(1)}k bought
                  </p>
                  <p className="text-xs font-bold text-foreground mt-1">₹{product.startingPrice.toLocaleString("en-IN")}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Section>

      {/* ─── Shop by Kit ─── */}
      <Section title="Shop by Need" subtitle="Expert-curated electronics kits" action="See all" onAction={() => navigate("/categories")}>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 pb-1">
          {KITS.map((kit, i) => (
            <motion.button
              key={kit.title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.04 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "shrink-0 w-[120px] flex flex-col items-center gap-2 py-5 rounded-2xl bg-gradient-to-b border border-border/50",
                kit.gradient
              )}
            >
              <span className="text-[28px]">{kit.emoji}</span>
              <span className="text-[11px] font-bold text-foreground tracking-tight-premium">{kit.title}</span>
              <span className="text-[9px] text-muted-foreground tracking-premium uppercase">{kit.count}</span>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ─── Shop by Brand ─── */}
      <Section title="Shop by Brand" subtitle="Authorized dealers only">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {BRANDS.map((brand, i) => (
            <motion.button
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 + i * 0.03 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate(`/brand/${brand.name.toLowerCase()}`)}
              className="shrink-0 flex flex-col items-center gap-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/60 border border-border/40 flex items-center justify-center text-xl">
                {brand.logo}
              </div>
              <span className="text-[9px] font-medium text-muted-foreground tracking-premium uppercase">{brand.name}</span>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ─── Showroom Hub ─── */}
      <Section title="Showroom Hub" subtitle="Verified stores near you" action="All stores" onAction={() => navigate("/stores")}>
        <div className="px-4 space-y-1.5 pb-1">
          {nearbyStores.map((store, i) => {
            const isOpen = i !== 1; // Simulate one closed store
            return (
              <motion.button
                key={store.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + i * 0.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/store/${store.id}`)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 w-full text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-muted overflow-hidden shrink-0">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[12px] font-bold text-foreground truncate tracking-tight-premium">{store.name}</p>
                    {store.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" /> {store.rating}
                    </span>
                    <span className="text-[10px] text-muted-foreground">·</span>
                    <span className="text-[10px] text-muted-foreground tracking-premium uppercase">{store.roleTag}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge className={cn(
                    "border-0 text-[9px] font-bold px-2 py-0.5",
                    isOpen
                      ? "bg-emerald-500/10 text-emerald-700"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {isOpen ? "🟢 Open" : "Closed"}
                  </Badge>
                  {isOpen && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Clock className="h-2.5 w-2.5" /> {store.eta}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </Section>

      {/* ─── Member Steals (Retail Catalog) ─── */}
      <Section title="Member Steals" subtitle="Exclusive local prices" action="View all" onAction={() => navigate("/categories")}>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 pb-2">
          {memberDeals.map((product, i) => {
            const onlinePrice = Math.round(product.startingPrice * 1.06);
            const savings = onlinePrice - product.startingPrice;
            const stockLeft = [3, 2, 8, 1][i];
            return (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="shrink-0 w-[155px] rounded-2xl bg-card border border-border/60 overflow-hidden text-left"
              >
                {/* 3:4 Portrait Product Image */}
                <div className="aspect-[3/4] bg-muted overflow-hidden relative">
                  <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={155} height={207} />
                  {/* Savings Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-emerald-600 text-background border-0 text-[9px] font-bold px-1.5 py-0.5">
                      SAVE ₹{savings.toLocaleString("en-IN")}
                    </Badge>
                  </div>
                  {/* Stock Alert */}
                  {stockLeft <= 3 && (
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-destructive/90 text-destructive-foreground border-0 text-[8px] font-bold px-1.5 py-0.5 backdrop-blur-sm">
                        Only {stockLeft} left
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-bold text-foreground line-clamp-1 tracking-tight-premium">{product.name}</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-[13px] font-bold text-foreground">₹{product.startingPrice.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-muted-foreground line-through">₹{onlinePrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1 flex items-center gap-0.5 tracking-premium">
                    <MapPin className="h-2.5 w-2.5" /> {product.storeCount} stores
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Section>

      <div className="h-6" />
    </div>
  );
};

/* ─── Section Wrapper ─── */
const Section = ({
  title, subtitle, action, onAction, children,
}: {
  title: string; subtitle?: string; action?: string; onAction?: () => void; children: React.ReactNode;
}) => (
  <section className="py-3">
    <div className="flex items-baseline justify-between px-4 mb-2.5">
      <div>
        <h2 className="text-[14px] font-bold text-foreground tracking-tight-premium">{title}</h2>
        {subtitle && <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action && onAction && (
        <button onClick={onAction} className="text-[11px] font-semibold text-primary flex items-center gap-0.5 tracking-premium">
          {action} <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
    {children}
  </section>
);

export default HomePage;
