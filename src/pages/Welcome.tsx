import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, Zap, ShieldCheck, Clock } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  const perks = [
    { icon: Clock, text: "30-min local delivery" },
    { icon: ShieldCheck, text: "Authorized showrooms only" },
    { icon: Zap, text: "Live price comparison" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Hero Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 relative">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-6 shadow-lg"
        >
          <MapPin className="h-10 w-10 text-primary-foreground" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl font-bold text-foreground tracking-tight text-center mb-2"
        >
          TechLocator
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed mb-10"
        >
          Hyperlocal electronics marketplace. Find the best deals at stores near you.
        </motion.p>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="w-full space-y-2.5 mb-10"
        >
          {perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <perk.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{perk.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="px-6 pb-12 space-y-3"
      >
        <button
          onClick={() => navigate("/home")}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          Get Started
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => navigate("/home")}
          className="w-full h-12 rounded-2xl text-sm font-medium text-muted-foreground active:bg-secondary transition-colors"
        >
          Already have an account? Sign in
        </button>
      </motion.div>
    </div>
  );
};

export default Welcome;
