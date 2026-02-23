import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Star, Clock, ShieldCheck, TrendingUp, MapPin,
  Zap, Package, ChevronRight, Flame, Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS, MOCK_STORES, MOCK_ORDERS } from "@/data/marketplace";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

/* ── Categories ── */
const CATS = [
  { id: "mobiles", name: "Mobiles", emoji: "📱" },
  { id: "laptops", name: "Laptops", emoji: "💻" },
  { id: "audio", name: "Audio", emoji: "🎧" },
  { id: "tv", name: "TV", emoji: "📺" },
  { id: "appliances", name: "Home", emoji: "🏠" },
  { id: "essentials", name: "Essentials", emoji: "🔌" },
];

/* ── Brands ── */
const BRANDS = [
  { name: "Apple", emoji: "🍎" },
  { name: "Samsung", emoji: "📱" },
  { name: "Sony", emoji: "🎵" },
  { name: "LG", emoji: "📺" },
  { name: "Dell", emoji: "🖥️" },
  { name: "Bose", emoji: "🔊" },
];

/* ── Kits ── */
const KITS = [
  { emoji: "💻", title: "Work from Home", items: "12 items", color: "bg-blue-50 dark:bg-blue-950/30" },
  { emoji: "🎓", title: "Student Kit", items: "8 items", color: "bg-emerald-50 dark:bg-emerald-950/30" },
  { emoji: "🎮", title: "Gaming Setup", items: "15 items", color: "bg-purple-50 dark:bg-purple-950/30" },
  { emoji: "📸", title: "Creator Pack", items: "10 items", color: "bg-amber-50 dark:bg-amber-950/30" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.35 },
});

const HomePage = () => {
  const navigate = useNavigate();

  const activeOrder = MOCK_ORDERS.find((o) => o.status !== "delivered");
  const nearbyStores = MOCK_STORES.filter((s) => s.distanceKm < 3).slice(0, 4);
  const heroProduct = MOCK_PRODUCTS[1];
  const trendingProducts = MOCK_PRODUCTS.slice(0, 4);
  const memberDeals = MOCK_PRODUCTS.slice(2, 6);

  const statusCopy: Record<string, string> = {
    confirmed: "Order Confirmed",
    preparing: "Being Prepared",
    out_for_delivery: "On its way",
    ready_for_pickup: "Ready for Pickup",
  };

  return (
    <div className="bg-background min-h-screen pb-4">
      <Helmet>
        <title>TechLocator — Hyperlocal Electronics</title>
        <meta name="description" content="Find the best electronics deals near you" />
      </Helmet>

      {/* ━━━ Active Order ━━━ */}
      {activeOrder && (
        <motion.button
          {...fade(0)}
          onClick={() => navigate("/orders")}
          className="mx-4 mt-3 mb-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-foreground w-[calc(100%-2rem)] text-left active:scale-[0.98] transition-transform"
        >
          <div className="relative shrink-0">
            <Package className="h-4.5 w-4.5 text-background/70" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-background/50 font-medium uppercase tracking-[0.12em]">
              {statusCopy[activeOrder.status] || "In Progress"}
            </p>
            <p className="text-[12px] font-semibold text-background line-clamp-1">{activeOrder.items[0]?.name}</p>
          </div>
          <span className="text-[11px] font-semibold text-background/80 shrink-0">Track →</span>
        </motion.button>
      )}

      {/* ━━━ Bank Offers ━━━ */}
      <motion.div {...fade(0.05)} className="mx-4 mt-2 mb-3 py-2 px-3 rounded-xl bg-muted/50 border border-border/40 overflow-hidden">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
          <div className="overflow-hidden flex-1">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              <span className="text-[11px] text-foreground/70">💳 HDFC: ₹2,000 off above ₹15K</span>
              <span className="text-[11px] text-foreground/70">🏦 ICICI: 10% cashback</span>
              <span className="text-[11px] text-foreground/70">💰 Axis: No-cost EMI</span>
              <span className="text-[11px] text-foreground/70">💳 HDFC: ₹2,000 off above ₹15K</span>
              <span className="text-[11px] text-foreground/70">🏦 ICICI: 10% cashback</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ━━━ Categories ━━━ */}
      <motion.section {...fade(0.08)} className="px-4">
        <div className="grid grid-cols-6 gap-0">
          {CATS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="flex flex-col items-center gap-1 py-2 active:scale-90 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-muted/70 flex items-center justify-center text-[22px]">
                {cat.emoji}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ━━━ Hero ━━━ */}
      <motion.section {...fade(0.12)} className="px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(`/product/${heroProduct.id}`)}
          className="relative w-full rounded-[20px] overflow-hidden bg-card border border-border/60 text-left active:scale-[0.99] transition-transform"
        >
          {/* Product image — bright, clean */}
          <div className="relative h-44 bg-gradient-to-br from-muted/40 to-muted overflow-hidden">
            <OptimizedImage
              src={heroProduct.image}
              alt={heroProduct.name}
              className="w-full h-full object-cover"
              width={400} height={176}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>
          {/* Content overlay */}
          <div className="relative -mt-12 px-4 pb-4">
            <Badge className="bg-primary text-primary-foreground border-0 text-[9px] font-bold px-2 py-0.5">
              <Flame className="h-2.5 w-2.5 mr-0.5" /> NEW LAUNCH
            </Badge>
            <h2 className="text-lg font-bold text-foreground mt-1.5 tracking-tight">iPhone 16 Pro</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Available at <span className="font-semibold text-foreground">{heroProduct.storeCount} showrooms</span> near you
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-base font-bold text-foreground">₹{heroProduct.startingPrice.toLocaleString("en-IN")}</span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[11px] font-bold">
                Compare <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </button>
      </motion.section>

      {/* ━━━ Trust ━━━ */}
      <motion.section {...fade(0.15)} className="px-4 py-2">
        <div className="flex gap-2">
          {[
            { icon: Zap, text: "Free Local Install" },
            { icon: ShieldCheck, text: "48hr Easy Returns" },
            { icon: Star, text: "Auth. Warranty" },
          ].map((t) => (
            <div key={t.text} className="flex-1 flex items-center gap-1.5 py-2.5 px-2 rounded-xl bg-muted/40">
              <t.icon className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-[9px] font-medium text-muted-foreground leading-tight">{t.text}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ━━━ Trending ━━━ */}
      <Section title="Trending Locally" sub="Popular in your area" action="See all" onAction={() => navigate("/categories")}>
        <div className="grid grid-cols-2 gap-2.5 px-4">
          {trendingProducts.map((p, i) => {
            const count = ["1.2k", "890", "2.1k", "540"][i];
            return (
              <motion.button
                key={p.id}
                {...fade(0.18 + i * 0.04)}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="rounded-2xl bg-card border border-border/50 overflow-hidden text-left"
              >
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <OptimizedImage src={p.image} alt={p.name} className="w-full h-full object-cover" width={180} height={135} />
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-semibold text-foreground line-clamp-1">{p.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[12px] font-bold text-foreground">₹{p.startingPrice.toLocaleString("en-IN")}</span>
                    <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-0.5">
                      <TrendingUp className="h-2.5 w-2.5" />{count}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Section>

      {/* ━━━ Shop by Need ━━━ */}
      <Section title="Shop by Need" sub="Curated kits">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-1">
          {KITS.map((k, i) => (
            <motion.button
              key={k.title}
              {...fade(0.1 + i * 0.04)}
              whileTap={{ scale: 0.95 }}
              className={cn("shrink-0 w-[110px] flex flex-col items-center gap-2 py-5 rounded-2xl border border-border/40", k.color)}
            >
              <span className="text-[26px]">{k.emoji}</span>
              <div className="text-center">
                <p className="text-[11px] font-bold text-foreground leading-tight">{k.title}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">{k.items}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ━━━ Brands ━━━ */}
      <Section title="Top Brands" sub="Authorized dealers">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-1">
          {BRANDS.map((b) => (
            <button
              key={b.name}
              onClick={() => navigate(`/brand/${b.name.toLowerCase()}`)}
              className="shrink-0 flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 rounded-full bg-muted/60 border border-border/30 flex items-center justify-center text-lg">
                {b.emoji}
              </div>
              <span className="text-[9px] font-medium text-muted-foreground">{b.name}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* ━━━ Nearby Stores ━━━ */}
      <Section title="Stores Near You" sub="Verified showrooms" action="All" onAction={() => navigate("/stores")}>
        <div className="px-4 space-y-2">
          {nearbyStores.map((s, i) => {
            const open = i !== 1;
            return (
              <motion.button
                key={s.id}
                {...fade(0.05 + i * 0.03)}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/store/${s.id}`)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 w-full text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-muted overflow-hidden shrink-0">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-[12px] font-semibold text-foreground truncate">{s.name}</p>
                    {s.isVerified && <ShieldCheck className="h-3 w-3 text-primary shrink-0" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" /> {s.rating}
                    <span className="mx-0.5">·</span>
                    <span className="uppercase tracking-[0.08em]">{s.roleTag}</span>
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  {open ? (
                    <>
                      <p className="text-[10px] font-semibold text-emerald-600">Open</p>
                      <p className="text-[9px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                        <Clock className="h-2.5 w-2.5" />{s.eta}
                      </p>
                    </>
                  ) : (
                    <p className="text-[10px] font-medium text-muted-foreground">Closed</p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </Section>

      {/* ━━━ Member Deals ━━━ */}
      <Section title="Member Steals" sub="Local prices, big savings" action="All" onAction={() => navigate("/categories")}>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 pb-1">
          {memberDeals.map((p, i) => {
            const onlinePrice = Math.round(p.startingPrice * 1.06);
            const savings = onlinePrice - p.startingPrice;
            const stock = [3, 2, 8, 1][i];
            return (
              <motion.button
                key={p.id}
                {...fade(0.08 + i * 0.04)}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="shrink-0 w-[148px] rounded-2xl bg-card border border-border/50 overflow-hidden text-left"
              >
                <div className="aspect-[3/4] bg-muted overflow-hidden relative">
                  <OptimizedImage src={p.image} alt={p.name} className="w-full h-full object-cover" width={148} height={197} />
                  <div className="absolute top-2 left-2">
                    <span className="inline-block px-1.5 py-0.5 rounded-md bg-emerald-600 text-[8px] font-bold text-primary-foreground">
                      SAVE ₹{savings.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {stock <= 3 && (
                    <div className="absolute bottom-2 left-2">
                      <span className="inline-block px-1.5 py-0.5 rounded-md bg-destructive text-[8px] font-bold text-destructive-foreground">
                        Only {stock} left
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-semibold text-foreground line-clamp-1">{p.name}</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-[13px] font-bold text-foreground">₹{p.startingPrice.toLocaleString("en-IN")}</span>
                    <span className="text-[9px] text-muted-foreground line-through">₹{onlinePrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-0.5 flex items-center gap-0.5">
                    <MapPin className="h-2.5 w-2.5" />{p.storeCount} stores
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

/* ── Section ── */
const Section = ({
  title, sub, action, onAction, children,
}: {
  title: string; sub?: string; action?: string; onAction?: () => void; children: React.ReactNode;
}) => (
  <section className="mt-5">
    <div className="flex items-baseline justify-between px-4 mb-2.5">
      <div>
        <h2 className="text-[14px] font-bold text-foreground">{title}</h2>
        {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {action && onAction && (
        <button onClick={onAction} className="text-[11px] font-semibold text-primary flex items-center gap-0.5">
          {action} <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
    {children}
  </section>
);

export default HomePage;
