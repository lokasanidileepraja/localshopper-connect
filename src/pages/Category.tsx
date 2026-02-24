
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { MOCK_STORE_PRODUCTS, MOCK_STORES } from "@/data/marketplace";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { useCartStore } from "@/store/cartStore";
import {
  ArrowLeft, ChevronDown, Star, MapPin,
  Truck, ShieldCheck, Tag, Flame, Zap, Store, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WishlistButton } from "@/components/WishlistButton";

type SortKey = "relevance" | "price_low" | "price_high" | "rating" | "discount";

const FILTER_CHIPS = ["All", "5G", "Under ₹15K", "₹15K–₹30K", "₹30K–₹60K", "₹60K+", "Top Rated"];

const BRANDS = [
  { name: "Apple", emoji: "🍎" },
  { name: "Samsung", emoji: "📱" },
  { name: "OnePlus", emoji: "🔴" },
  { name: "Google", emoji: "🔍" },
  { name: "Nothing", emoji: "⚫" },
  { name: "Realme", emoji: "🟡" },
  { name: "iQOO", emoji: "⚡" },
  { name: "POCO", emoji: "🟠" },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price_low", label: "Price: Low to High" },
  { key: "price_high", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
  { key: "discount", label: "Discount" },
];

// Simulated hyperlocal store availability per product
const getLocalAvailability = (productName: string) => {
  const storeCount = Math.floor(Math.random() * 4) + 2;
  const distances = ["0.3 km", "0.5 km", "1.2 km", "1.8 km", "2.1 km"];
  const etas = ["10 mins", "15 mins", "25 mins", "30 mins"];
  const storeNames = ["Croma Indiranagar", "Samsung SmartPlaza", "Local Mobile Hub", "Reliance Digital", "Sony Center"];
  return {
    storeCount,
    nearestDistance: distances[Math.floor(Math.random() * 3)],
    nearestEta: etas[Math.floor(Math.random() * 3)],
    nearestStore: storeNames[Math.floor(Math.random() * storeNames.length)],
    hasVerified: Math.random() > 0.3,
  };
};

const Category = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const [activeFilter, setActiveFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("relevance");
  const [showSort, setShowSort] = useState(false);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);

  const rawProducts = categoryName ? (products[categoryName.toLowerCase()] || []) : [];

  const filtered = useMemo(() => {
    let list = [...rawProducts];
    if (brandFilter) list = list.filter((p) => p.brand === brandFilter);
    switch (activeFilter) {
      case "Under ₹15K": list = list.filter((p) => p.price < 15000); break;
      case "₹15K–₹30K": list = list.filter((p) => p.price >= 15000 && p.price <= 30000); break;
      case "₹30K–₹60K": list = list.filter((p) => p.price >= 30000 && p.price <= 60000); break;
      case "₹60K+": list = list.filter((p) => p.price >= 60000); break;
      case "Top Rated": list = list.filter((p) => (p.rating || 0) >= 4.5); break;
      case "5G": list = list.filter((p) => p.name.includes("5G") || p.description?.includes("5G")); break;
    }
    switch (sortKey) {
      case "price_low": list.sort((a, b) => a.price - b.price); break;
      case "price_high": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case "discount": list.sort((a, b) => {
        const dA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
        const dB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
        return dB - dA;
      }); break;
    }
    return list;
  }, [rawProducts, activeFilter, sortKey, brandFilter]);

  const handleAddToCart = useCallback((product: any) => {
    addToCart(product, "Default Store");
    toast({ title: "Added to Cart", description: `${product.name} added` });
  }, [addToCart, toast]);

  const discountPct = (p: any) => p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
  const savings = (p: any) => p.originalPrice ? p.originalPrice - p.price : 0;

  // Memoize local availability per product
  const localData = useMemo(() => {
    const map: Record<string, ReturnType<typeof getLocalAvailability>> = {};
    rawProducts.forEach((p) => { map[p.id] = getLocalAvailability(p.name); });
    return map;
  }, [rawProducts]);

  if (!categoryName) return null;

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center h-12 px-4 gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-sm font-bold text-foreground capitalize flex-1">{categoryName}</h1>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <MapPin className="h-3 w-3 text-primary" />
            <span className="tracking-[0.1em]">Indiranagar</span>
          </div>
        </div>

        {/* Sort + Filter bar */}
        <div className="flex items-center gap-2 px-4 pb-2.5">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-card border border-border text-[11px] font-semibold text-foreground"
          >
            Sort <ChevronDown className="h-3 w-3" />
          </button>
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex gap-1.5">
              {FILTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(activeFilter === chip ? "All" : chip)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap border transition-all",
                    activeFilter === chip
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground"
                  )}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort dropdown */}
        {showSort && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-40"
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setSortKey(opt.key); setShowSort(false); }}
                className={cn(
                  "w-full px-4 py-3 text-left text-xs font-medium border-b border-border/50 last:border-0",
                  sortKey === opt.key ? "text-primary bg-primary/5" : "text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Hyperlocal context banner */}
      <div className="mx-4 mt-3 mb-2 rounded-xl bg-primary/5 border border-primary/15 px-3.5 py-2.5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-foreground">Showing prices from stores near you</p>
          <p className="text-[9px] text-muted-foreground mt-0.5">Indiranagar, Bangalore · {filtered.length} products at {MOCK_STORES.length}+ local stores</p>
        </div>
      </div>

      {/* Brand Explorer */}
      <div className="px-4 mt-3 mb-1">
        <p className="text-[10px] font-bold text-muted-foreground tracking-[0.15em] uppercase mb-2">Shop by Brand</p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {BRANDS.map((b) => (
            <button
              key={b.name}
              onClick={() => setBrandFilter(brandFilter === b.name ? null : b.name)}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[52px] transition-all",
                brandFilter === b.name && "scale-110"
              )}
            >
              <div className={cn(
                "w-11 h-11 rounded-xl border flex items-center justify-center text-base transition-all",
                brandFilter === b.name
                  ? "bg-primary/10 border-primary shadow-sm"
                  : "bg-card border-border"
              )}>
                {b.emoji}
              </div>
              <span className={cn(
                "text-[9px] font-semibold",
                brandFilter === b.name ? "text-primary" : "text-muted-foreground"
              )}>{b.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="mt-2">
        {filtered.map((product, i) => {
          const disc = discountPct(product);
          const save = savings(product);
          const lowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 5;
          const local = localData[product.id];

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card border-b border-border"
            >
              <div className="flex gap-3.5 p-4">
                {/* Image */}
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="relative w-[120px] shrink-0 self-start"
                >
                  <div className="aspect-[3/4] rounded-xl bg-muted overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <WishlistButton productId={product.id} />
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 rounded-xl bg-background/60 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-muted-foreground">Out of Stock</span>
                    </div>
                  )}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Brand */}
                  <p className="text-[9px] text-muted-foreground font-semibold tracking-[0.15em] uppercase">{product.brand}</p>

                  {/* Title */}
                  <button onClick={() => navigate(`/product/${product.id}`)} className="text-left">
                    <p className="text-[13px] font-medium text-foreground leading-snug mt-0.5 line-clamp-2">
                      {product.name}
                    </p>
                  </button>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center gap-0.5">
                        <span className="text-[11px] font-semibold text-foreground">{product.rating}</span>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              "h-2.5 w-2.5",
                              s <= Math.floor(product.rating!)
                                ? "fill-amber-400 text-amber-400"
                                : "text-border fill-border"
                            )}
                          />
                        ))}
                      </div>
                      {product.reviewCount && (
                        <span className="text-[9px] text-muted-foreground">({product.reviewCount.toLocaleString("en-IN")})</span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-2">
                    {disc > 0 && (
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] text-destructive font-bold">↓{disc}%</span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                    )}
                    <p className="text-lg font-bold text-foreground leading-none">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    {save > 0 && (
                      <p className="text-[9px] font-bold text-emerald-600 mt-0.5">
                        Save ₹{save.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>

                  {/* === HYPERLOCAL SECTION === */}
                  {local && product.inStock && (
                    <div className="mt-2.5 rounded-lg bg-secondary/60 border border-border/50 p-2">
                      {/* Store availability */}
                      <div className="flex items-center gap-1.5">
                        <Store className="h-3 w-3 text-primary shrink-0" />
                        <span className="text-[10px] text-foreground font-medium">
                          At <span className="font-bold">{local.storeCount} stores</span> near you
                        </span>
                        {local.hasVerified && (
                          <ShieldCheck className="h-3 w-3 text-primary shrink-0" />
                        )}
                      </div>

                      {/* Nearest + ETA */}
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-2.5 w-2.5 text-muted-foreground" />
                          <span className="text-[9px] text-muted-foreground">{local.nearestDistance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5 text-muted-foreground" />
                          <span className="text-[9px] text-muted-foreground">Pickup in {local.nearestEta}</span>
                        </div>
                      </div>

                      {/* Nearest store name */}
                      <p className="text-[9px] text-muted-foreground mt-1">
                        Nearest: <span className="font-medium text-foreground">{local.nearestStore}</span>
                      </p>
                    </div>
                  )}

                  {/* Low stock */}
                  {lowStock && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Flame className="h-3 w-3 text-destructive" />
                      <p className="text-[10px] font-semibold text-destructive">
                        Only {product.stock} left nearby
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  {product.inStock && (
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="mt-2.5 w-full h-9 rounded-xl bg-primary text-primary-foreground text-[11px] font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5"
                    >
                      <MapPin className="h-3 w-3" />
                      Compare Local Prices
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">No products match your filters</p>
            <button
              onClick={() => { setActiveFilter("All"); setBrandFilter(null); }}
              className="mt-2 text-xs font-semibold text-primary"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
