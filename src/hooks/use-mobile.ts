
import { useState, useEffect } from "react";

// Standardized breakpoints aligned with Tailwind
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Custom hook to detect if the viewport is at or below a specified breakpoint
 * @param breakpoint - The breakpoint to check against (default: "md")
 * @returns Boolean indicating if the viewport is at or below the specified breakpoint
 */
export function useIsMobile(breakpoint: BreakpointKey = "md"): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS[breakpoint]);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [breakpoint]);

  return isMobile;
}
