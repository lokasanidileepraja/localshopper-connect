import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah J.", content: "Found the perfect laptop at a great price. The comparison feature saved me ₹8,000!", rating: 5, avatar: "SJ" },
  { name: "Mike C.", content: "Best app for tech shopping. Price alerts helped me grab a deal instantly.", rating: 5, avatar: "MC" },
  { name: "Emily D.", content: "Student-friendly deals and the UI is so smooth. Love it!", rating: 4, avatar: "ED" },
];

export const Testimonials = () => {
  return (
    <section className="px-4 py-5">
      <h2 className="text-base font-bold text-foreground mb-3">What Users Say</h2>
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="shrink-0 w-64 p-4 rounded-2xl bg-card border border-border"
          >
            <Quote className="h-4 w-4 text-primary/40 mb-2" />
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">{t.content}</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">
                {t.avatar}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-foreground">{t.name}</p>
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
