import { MapPin, ChevronDown, Search, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocationStore } from "@/data/marketplace";

const CHIPS = ["iPhone 16", "MacBook M3", "AirPods", "Galaxy S24"];

export const TopBar = () => {
  const { address } = useLocationStore();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl">
      {/* Row 1: Greeting + Location */}
      <div className="flex items-center gap-2.5 px-4 pt-3 pb-1.5">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-[11px] font-bold text-primary">U</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-foreground leading-none">{greeting}</p>
          <button className="flex items-center gap-0.5 mt-0.5">
            <MapPin className="h-3 w-3 text-primary shrink-0" />
            <span className="text-[11px] text-muted-foreground truncate">{address}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
          </button>
        </div>
      </div>

      {/* Row 2: Search */}
      <div className="px-4 pb-1.5">
        <Link
          to="/search"
          className="flex items-center gap-2.5 h-[38px] px-3 rounded-xl bg-muted/60 border border-border/40"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-[12px] text-muted-foreground flex-1">Search products, stores...</span>
          <div className="w-px h-4 bg-border/60" />
          <Camera className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>

      {/* Row 3: Chips */}
      <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto scrollbar-hide">
        {CHIPS.map((c) => (
          <Link
            key={c}
            to={`/search?q=${encodeURIComponent(c)}`}
            className="shrink-0 px-2.5 py-1 rounded-full bg-muted/50 border border-border/30 text-[10px] font-medium text-muted-foreground"
          >
            {c}
          </Link>
        ))}
      </div>

      {/* Subtle bottom edge */}
      <div className="h-px bg-border/40" />
    </header>
  );
};
