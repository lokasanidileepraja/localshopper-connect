
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  // Debounce scroll handler to improve performance
  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 300) {
      if (!isVisible) setIsVisible(true);
    } else {
      if (isVisible) setIsVisible(false);
    }
  }, [isVisible]);

  useEffect(() => {
    // Add passive flag to improve scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toast({
      title: "Back to top",
      description: "Scrolling to the top of the page",
      duration: 2000,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary rounded-full shadow-lg hover:bg-primary-600 transition-colors z-50 group"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6 text-white group-hover:animate-bounce" />
          <motion.div
            className="absolute -top-8 right-0 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            Back to top
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
