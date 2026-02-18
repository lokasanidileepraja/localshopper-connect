import { MapPin, ChevronDown, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/marketplaceCartStore";
import { useLocationStore } from "@/data/marketplace";
import { motion } from "framer-motion";

export const TopBar = () => {
  const { totalItems } = useCartStore();
  const { label, address } = useLocationStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Location Row */}
      <div className="flex items-center justify-between px-4 h-11">
        <button className="flex items-center gap-1.5 min-w-0">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-semibold text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground truncate">- {address}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          </div>
        </button>

        <Link to="/cart" className="relative p-2 -mr-2">
          <ShoppingCart className="h-5 w-5 text-foreground" />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0.5 right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center"
            >
              {totalItems > 9 ? "9+" : totalItems}
            </motion.span>
          )}
        </Link>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-2.5">
        <Link
          to="/search"
          className="flex items-center gap-2.5 h-9 px-3.5 rounded-xl bg-secondary border border-border"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Search electronics near you</span>
        </Link>
      </div>
    </header>
  );
};
