import { MapPin, ChevronDown, Search, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocationStore } from "@/data/marketplace";
import { motion } from "framer-motion";

const TRENDING_CHIPS = ["iPhone 16", "M3 MacBook", "AirPods Pro", "Galaxy S24"];

export const TopBar = () => {
  const { address } = useLocationStore();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      {/* Greeting + Location Row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">U</span>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-foreground tracking-tight-premium">{greeting}</p>
            <button className="flex items-center gap-1 min-w-0">
              <MapPin className="h-3 w-3 text-primary shrink-0" />
              <span className="text-[11px] text-muted-foreground truncate">{address}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-1.5 pb-1.5">
        <Link
          to="/search"
          className="flex items-center gap-2.5 h-10 px-3.5 rounded-2xl bg-secondary/80 border border-border/60"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground flex-1">Search products, brands, stores...</span>
          <div className="w-px h-5 bg-border" />
          <Camera className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>

      {/* Trending Chips */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-4 pb-2.5">
        {TRENDING_CHIPS.map((chip) => (
          <Link
            key={chip}
            to={`/search?q=${encodeURIComponent(chip)}`}
            className="shrink-0 px-3 py-1 rounded-full bg-secondary/60 border border-border/40 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {chip}
          </Link>
        ))}
      </div>
    </header>
  );
};
