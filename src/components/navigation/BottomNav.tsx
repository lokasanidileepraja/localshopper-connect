import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, Package, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/marketplaceCartStore";

const tabs = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/cart", icon: ShoppingCart, label: "Cart" },
  { path: "/orders", icon: Package, label: "Orders" },
  { path: "/profile", icon: User, label: "Profile" },
];

export const BottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCartStore();

  const isActive = (path: string) => {
    if (path === "/home") return location.pathname === "/" || location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-safe">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center gap-0.5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className="relative">
                  <tab.icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                  {tab.path === "/cart" && totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-medium",
                  active ? "text-primary" : "text-muted-foreground"
                )}>
                  {tab.label}
                </span>
              </motion.div>
              {active && (
                <motion.div
                  layoutId="bottomNavActive"
                  className="absolute top-0 w-8 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
