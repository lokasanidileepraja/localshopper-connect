import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Package, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/marketplaceCartStore";

const tabs = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/cart", icon: ShoppingBag, label: "Bag" },
  { path: "/orders", icon: Package, label: "Orders" },
  { path: "/profile", icon: User, label: "Account" },
];

export const BottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCartStore();

  const isActive = (path: string) => {
    if (path === "/home") return location.pathname === "/" || location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-t border-border/40 pb-safe">
      <div className="flex items-center justify-around h-[52px] max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={cn(
                  "flex flex-col items-center gap-0.5 transition-colors",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <div className="relative">
                  <tab.icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.2 : 1.5} />
                  {tab.path === "/cart" && totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] tracking-premium",
                  active ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                )}>
                  {tab.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
