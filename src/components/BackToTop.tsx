import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary rounded-full shadow-lg hover:bg-primary-600 transition-colors z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};