import { useState } from "react";
import { MapPin, ChevronDown, Search, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLocationStore } from "@/data/marketplace";
import { useAddressStore } from "@/store/addressStore";
import { QuickLocationModal } from "@/components/address/QuickLocationModal";

const CHIPS = ["iPhone 16", "MacBook M3", "AirPods", "Galaxy S24"];

export const TopBar = () => {
  const navigate = useNavigate();
  const { address } = useLocationStore();
  const defaultAddr = useAddressStore((s) => s.getDefault());
  const [locationOpen, setLocationOpen] = useState(false);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const displayLabel = defaultAddr?.type
    ? defaultAddr.type.charAt(0).toUpperCase() + defaultAddr.type.slice(1)
    : "Home";
  const displayAddress = defaultAddr
    ? `${defaultAddr.area}, ${defaultAddr.city}`
    : address;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl">
        {/* Row 1: Greeting + Location */}
        <div className="flex items-center gap-2.5 px-4 pt-3 pb-1.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">R</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground leading-none">{greeting}</p>
            <button
              onClick={() => setLocationOpen(true)}
              className="flex items-center gap-1 mt-0.5"
            >
              <MapPin className="h-3 w-3 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground font-medium">{displayLabel}</span>
              <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                — {displayAddress}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
            </button>
          </div>
        </div>

        {/* Row 2: Search */}
        <div className="px-4 pb-1.5">
          <Link
            to="/search"
            className="flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-muted/60 border border-border/40"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground flex-1">Search products, stores...</span>
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
              className="shrink-0 px-3 py-1 rounded-full bg-muted/50 border border-border/30 text-xs font-medium text-muted-foreground"
            >
              {c}
            </Link>
          ))}
        </div>

        {/* Subtle bottom edge */}
        <div className="h-px bg-border/40" />
      </header>

      <QuickLocationModal
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        onManage={() => {
          setLocationOpen(false);
          navigate("/addresses");
        }}
      />
    </>
  );
};
