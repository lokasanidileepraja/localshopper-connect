
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  placeholderClassName,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    
    // For Unsplash images, we can add query parameters to get optimized versions
    let optimizedSrc = src;
    
    if (src.includes("images.unsplash.com")) {
      // Extract the base URL and add optimization parameters
      // Format: width, quality, and auto format
      const hasParams = src.includes("?");
      optimizedSrc = `${src}${hasParams ? "&" : "?"}w=600&q=80&auto=format&fit=crop`;
    }
    
    setImgSrc(optimizedSrc);
    
    // Preload the image
    const img = new Image();
    img.src = optimizedSrc;
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${optimizedSrc}`);
      setIsLoading(false);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse", 
            placeholderClassName
          )} 
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        loading="lazy"
        {...props}
      />
    </div>
  );
};
