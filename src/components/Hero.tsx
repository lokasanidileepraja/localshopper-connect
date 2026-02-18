import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const quickActions = [
  { icon: MapPin, label: "Nearby Stores", path: "/stores", color: "bg-blue-500/10 text-blue-600" },
  { icon: Zap, label: "Best Deals", path: "/categories", color: "bg-amber-500/10 text-amber-600" },
  { icon: TrendingUp, label: "Compare", path: "/price-compare", color: "bg-emerald-500/10 text-emerald-600" },
  { icon: ShieldCheck, label: "Top Rated", path: "/categories", color: "bg-violet-500/10 text-violet-600" },
];

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 pt-4 pb-2">
      {/* Compact Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-5 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <p className="text-primary-foreground/70 text-xs font-medium mb-1">Welcome back 👋</p>
          <h1 className="text-xl font-bold text-primary-foreground mb-1.5 leading-tight">
            Find the best tech<br />near you
          </h1>
          <p className="text-primary-foreground/70 text-xs mb-4 leading-relaxed">
            Compare prices across 1000+ local stores
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full text-xs font-semibold h-8 px-4"
            onClick={() => navigate("/stores")}
          >
            Explore Stores
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </motion.div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {quickActions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-card border border-border active:scale-95 transition-transform"
          >
            <div className={`w-9 h-9 rounded-xl ${action.color} flex items-center justify-center`}>
              <action.icon className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
