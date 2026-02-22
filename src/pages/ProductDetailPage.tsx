import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, Heart, Share2, Star, MapPin, Clock, Truck, Package,
  ShieldCheck, ChevronRight, Store, Check, AlertTriangle, Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS, MOCK_STORE_PRODUCTS, MOCK_STORES } from "@/data/marketplace";
import { useCartStore } from "@/store/marketplaceCartStore";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, forceAddToCart, storeId: cartStoreId } = useCartStore();
  const { toast } = useToast();

  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  const storeListings = MOCK_STORE_PRODUCTS.filter((sp) => sp.productId === productId);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]?.id || "");
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [showConflict, setShowConflict] = useState(false);
  const [pendingItem, setPendingItem] = useState<any>(null);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
        <p className="text-sm font-bold text-foreground mb-1">Product Not Found</p>
        <p className="text-xs text-muted-foreground mb-4">This product doesn't exist.</p>
        <button onClick={() => navigate("/home")} className="text-xs font-semibold text-primary">Go Home</button>
      </div>
    );
  }

  const variant = product.variants.find((v) => v.id === selectedVariant) || product.variants[0];
  const cheapest = storeListings.reduce((a, b) => (a.price < b.price ? a : b), storeListings[0]);
  const fastest = storeListings.reduce((a, b) => (a.distanceKm < b.distanceKm ? a : b), storeListings[0]);

  const handleAddToCart = (storeListing: typeof storeListings[0]) => {
    // Safety stock: if stock <= 1, treat as out of stock
    if (storeListing.stock <= 1) {
      toast({ title: "Out of Stock", description: "This item is unavailable at this store.", variant: "destructive" });
      return;
    }

    const item = {
      productId: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      variant: variant.label,
      price: storeListing.price,
      quantity: 1,
      storeId: storeListing.storeId,
      storeName: storeListing.storeName,
    };

    const result = addToCart(item);
    if (result === "conflict") {
      setPendingItem(item);
      setShowConflict(true);
    } else {
      toast({ title: "Added to Cart", description: `${product.name} from ${storeListing.storeName}` });
    }
  };

  const handleForceAdd = () => {
    if (pendingItem) {
      forceAddToCart(pendingItem);
      toast({ title: "Cart Updated", description: `Switched to ${pendingItem.storeName}` });
    }
    setShowConflict(false);
    setPendingItem(null);
  };

  return (
    <div className="bg-background min-h-screen pb-28">
      <Helmet>
        <title>{product.name} | TechLocator</title>
        <meta name="description" content={`Buy ${product.name} from local stores near you`} />
      </Helmet>

      {/* Sticky header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 h-12 bg-background/95 backdrop-blur-md border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setLiked(!liked)} className="p-1.5">
            <Heart className={cn("h-5 w-5", liked ? "fill-destructive text-destructive" : "text-foreground")} />
          </button>
          <button className="p-1.5">
            <Share2 className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="aspect-square bg-muted overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="px-4 pt-4 pb-3">
        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{product.brand}</p>
        <h1 className="text-lg font-bold text-foreground leading-tight mt-0.5">{product.name}</h1>

        {/* Store count */}
        <div className="flex items-center gap-1.5 mt-2">
          <MapPin className="h-3 w-3 text-primary" />
          <span className="text-[11px] text-muted-foreground">
            Available at <span className="font-semibold text-foreground">{storeListings.length} nearby stores</span> from ₹{cheapest?.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Variants */}
        {product.variants.length > 1 && (
          <div className="mt-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Variant</p>
            <div className="flex gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={cn(
                    "px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all",
                    selectedVariant === v.id
                      ? "bg-primary/8 border-primary text-primary"
                      : "bg-card border-border text-foreground"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          {[
            { icon: ShieldCheck, label: "Auth. Warranty", color: "text-green-600" },
            { icon: Clock, label: "48hr Return", color: "text-amber-600" },
            { icon: Truck, label: "Free Delivery", color: "text-primary" },
          ].map((badge) => (
            <div key={badge.label} className="flex-1 flex items-center gap-1.5 py-2.5 px-2 rounded-xl bg-card border border-border">
              <badge.icon className={cn("h-3.5 w-3.5 shrink-0", badge.color)} />
              <span className="text-[9px] font-semibold text-muted-foreground leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Local Buy Box — Store Comparison */}
      <div className="px-4 mb-4">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-foreground">Compare Local Prices</h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">Tap a store to add to cart</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {storeListings.map((listing, i) => {
            const store = MOCK_STORES.find((s) => s.id === listing.storeId);
            const isOutOfStock = listing.stock <= 1;
            const isCheapest = listing.price === cheapest?.price;
            const isFastest = listing.distanceKm === fastest?.distanceKm && !isCheapest;
            const isSelected = selectedStore === listing.storeId;

            return (
              <motion.div
                key={listing.storeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={cn(
                  "rounded-2xl border overflow-hidden transition-all",
                  isOutOfStock ? "opacity-50 bg-muted border-border" : "bg-card border-border",
                  isSelected && !isOutOfStock && "border-primary ring-1 ring-primary/20"
                )}
              >
                <button
                  onClick={() => !isOutOfStock && setSelectedStore(isSelected ? null : listing.storeId)}
                  disabled={isOutOfStock}
                  className="flex items-center gap-3 p-3.5 w-full text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted overflow-hidden shrink-0">
                    {store && <img src={store.image} alt={store.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-foreground truncate">{listing.storeName}</p>
                      {store?.isVerified && <ShieldCheck className="h-3 w-3 text-primary shrink-0" />}
                      {isCheapest && <Badge className="bg-green-500/10 text-green-700 border-0 text-[8px] px-1.5 py-0">Cheapest</Badge>}
                      {isFastest && <Badge className="bg-primary/10 text-primary border-0 text-[8px] px-1.5 py-0">Fastest</Badge>}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{listing.distance} · {listing.deliveryEta}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {isOutOfStock ? (
                      <span className="text-[10px] font-semibold text-destructive">Out of Stock</span>
                    ) : (
                      <>
                        <p className="text-sm font-bold text-foreground">₹{listing.price.toLocaleString("en-IN")}</p>
                        {listing.originalPrice > listing.price && (
                          <p className="text-[10px] text-muted-foreground line-through">₹{listing.originalPrice.toLocaleString("en-IN")}</p>
                        )}
                      </>
                    )}
                  </div>
                </button>

                {/* Expanded details */}
                <AnimatePresence>
                  {isSelected && !isOutOfStock && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-border">
                        <div className="flex gap-2 mb-3">
                          <div className="flex-1 flex items-center gap-1.5 py-2 px-2.5 rounded-lg bg-secondary">
                            <Truck className="h-3 w-3 text-muted-foreground" />
                            <div>
                              <p className="text-[9px] text-muted-foreground">Delivery</p>
                              <p className="text-[10px] font-semibold text-foreground">{listing.deliveryEta}</p>
                            </div>
                          </div>
                          <div className="flex-1 flex items-center gap-1.5 py-2 px-2.5 rounded-lg bg-secondary">
                            <Package className="h-3 w-3 text-muted-foreground" />
                            <div>
                              <p className="text-[9px] text-muted-foreground">Pickup</p>
                              <p className="text-[10px] font-semibold text-foreground">{listing.pickupReady}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(listing)}
                            className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-xs font-bold active:scale-[0.98] transition-transform"
                          >
                            Add to Cart
                          </button>
                          {store && (
                            <a
                              href={`tel:${store.phone}`}
                              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center"
                            >
                              <Phone className="h-4 w-4 text-foreground" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      {cheapest && cheapest.stock > 1 && (
        <div className="fixed bottom-14 left-0 right-0 z-40 px-4 pb-3 pt-2.5 bg-background/95 backdrop-blur-xl border-t border-border">
          <button
            onClick={() => {
              const target = selectedStore ? storeListings.find(l => l.storeId === selectedStore) : cheapest;
              if (target) handleAddToCart(target);
            }}
            className="w-full h-13 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-between px-5 active:scale-[0.99] transition-transform"
          >
            <span>Add to Cart</span>
            <span className="font-bold">₹{(selectedStore ? storeListings.find(l => l.storeId === selectedStore)?.price : cheapest.price)?.toLocaleString("en-IN")}</span>
          </button>
        </div>
      )}

      {/* Store Conflict Modal */}
      <AnimatePresence>
        {showConflict && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowConflict(false)}
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-5 pb-8 bg-background rounded-t-3xl"
            >
              <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Different Store</h3>
                  <p className="text-xs text-muted-foreground">Your cart has items from another store</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                Adding this item will clear your current cart. We support one store per order to ensure reliable local delivery.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConflict(false)}
                  className="flex-1 h-11 rounded-xl border border-border text-xs font-semibold text-foreground"
                >
                  Keep Cart
                </button>
                <button
                  onClick={handleForceAdd}
                  className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
                >
                  Switch Store
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
