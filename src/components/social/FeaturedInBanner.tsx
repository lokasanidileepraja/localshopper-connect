
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeaturedQuote {
  source: string;
  quote: string;
  logo?: string;
}

interface FeaturedInBannerProps {
  quotes: FeaturedQuote[];
  className?: string;
}

export const FeaturedInBanner = ({
  quotes,
  className
}: FeaturedInBannerProps) => {
  return (
    <div className={cn("w-full overflow-hidden py-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900", className)}>
      <motion.div 
        className="flex items-center gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 20, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {/* Double the quotes for seamless looping */}
        {[...quotes, ...quotes].map((quote, index) => (
          <div 
            key={`${quote.source}-${index}`} 
            className="flex items-center gap-2 min-w-max"
          >
            {quote.logo ? (
              <img 
                src={quote.logo}
                alt={quote.source}
                className="h-5 object-contain"
              />
            ) : (
              <span className="text-sm font-semibold">{quote.source}</span>
            )}
            <span className="text-xs text-muted-foreground">
              "{quote.quote}"
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
