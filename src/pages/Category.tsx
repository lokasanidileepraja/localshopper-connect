
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { useCartStore } from "@/store/cartStore";
import {
  ArrowLeft, SlidersHorizontal, ChevronDown, Star, Heart,
  Truck, ShieldCheck, Tag, Flame, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WishlistButton } from "@/components/WishlistButton";
import { Badge } from "@/components/ui/badge";

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

  // Filter logic
  const filtered = useMemo(() => {
    let list = [...rawProducts];

    if (brandFilter) {
      list = list.filter((p) => p.brand === brandFilter);
    }

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
          <span className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
            {filtered.length} products
          </span>
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

      {/* Promotional Banner */}
      <div className="mx-4 mt-3 mb-2 flex gap-2">
        <div className="flex-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2.5 flex items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-emerald-600" />
          <div>
            <p className="text-[10px] font-bold text-emerald-700">Up to 40% Off</p>
            <p className="text-[9px] text-emerald-600/80">On top brands</p>
          </div>
        </div>
        <div className="flex-1 rounded-xl bg-primary/5 border border-primary/20 px-3 py-2.5 flex items-center gap-2">
          <Truck className="h-3.5 w-3.5 text-primary" />
          <div>
            <p className="text-[10px] font-bold text-primary">Express Delivery</p>
            <p className="text-[9px] text-muted-foreground">Get it today</p>
          </div>
        </div>
      </div>

      {/* Brand Explorer */}
      <div className="px-4 mt-3 mb-3">
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
                "w-12 h-12 rounded-xl border flex items-center justify-center text-lg transition-all",
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

      {/* Product List — single column, Amazon-style */}
      <div className="divide-y divide-border">
        {filtered.map((product, i) => {
          const disc = discountPct(product);
          const save = savings(product);
          const lowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 5;
          const bought = product.reviewCount ? `${(product.reviewCount / 10).toFixed(0)}K+ bought in past month` : null;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="bg-background px-4 py-4"
            >
              <div className="flex gap-4">
                {/* Product Image — left column */}
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="relative w-[130px] shrink-0 self-start"
                >
                  <div className="aspect-[3/4] rounded-xl bg-muted overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Wishlist icon bottom-left */}
                  <div className="absolute bottom-2 left-2">
                    <WishlistButton productId={product.id} />
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 rounded-xl bg-background/60 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-muted-foreground">Out of Stock</span>
                    </div>
                  )}
                </button>

                {/* Product Info — right column */}
                <div className="flex-1 min-w-0 pt-0.5">
                  {/* Brand */}
                  <p className="text-[10px] text-muted-foreground font-medium">{product.brand}</p>

                  {/* Name + Description */}
                  <button onClick={() => navigate(`/product/${product.id}`)} className="text-left">
                    <p className="text-[13px] font-medium text-foreground leading-snug mt-0.5 line-clamp-3">
                      {product.name} {product.description ? `– ${product.description}` : ""}
                    </p>
                  </button>

                  {/* Rating row */}
                  {product.rating && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex items-center gap-0.5">
                        <span className="text-[12px] font-semibold text-foreground">{product.rating}</span>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              "h-3 w-3",
                              s <= Math.floor(product.rating!)
                                ? "fill-amber-400 text-amber-400"
                                : s - 0.5 <= product.rating!
                                  ? "fill-amber-400/50 text-amber-400"
                                  : "text-border fill-border"
                            )}
                          />
                        ))}
                      </div>
                      {product.reviewCount && (
                        <span className="text-[10px] text-muted-foreground">({product.reviewCount.toLocaleString("en-IN")})</span>
                      )}
                    </div>
                  )}

                  {/* Social proof */}
                  {bought && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">{bought}</p>
                  )}

                  {/* Limited deal badge */}
                  {disc >= 10 && (
                    <div className="mt-2">
                      <span className="inline-block bg-destructive text-destructive-foreground text-[9px] font-bold px-2 py-0.5 rounded-sm">
                        Limited time deal
                      </span>
                    </div>
                  )}

                  {/* Price block */}
                  <div className="mt-1.5">
                    <div className="flex items-baseline gap-1.5">
                      {disc > 0 && (
                        <span className="text-[11px] text-destructive font-semibold">↓{disc}%</span>
                      )}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-[11px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                      )}
                    </div>
                    <p className="text-xl font-bold text-foreground leading-tight">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Bank offer */}
                  {save > 2000 && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="bg-emerald-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                        Buy for ₹{(product.price - 1000).toLocaleString("en-IN")}
                      </span>
                      <span className="text-[9px] text-muted-foreground">with Bank offer</span>
                    </div>
                  )}

                  {/* Delivery */}
                  <div className="mt-2 flex items-center gap-1">
                    <Truck className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-medium text-foreground">FREE delivery</span>
                    <span className="text-[10px] text-muted-foreground">· Get it today</span>
                  </div>

                  {/* Low stock */}
                  {lowStock && (
                    <p className="text-[10px] font-semibold text-destructive mt-1">
                      Only {product.stock} left in stock
                    </p>
                  )}

                  {/* Add to cart */}
                  {product.inStock && (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-3 w-full h-9 rounded-full bg-primary text-primary-foreground text-xs font-bold active:scale-[0.98] transition-transform"
                    >
                      Add to Cart
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
