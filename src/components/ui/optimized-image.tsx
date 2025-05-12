
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width = 400,
  height = 300,
  priority = false 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Generate smaller image URL for better performance
  const optimizedSrc = src ? `${src}?w=${width}&q=75&auto=format` : "/placeholder.svg";

  useEffect(() => {
    // Use intersection observer for lazy loading
    if (!priority && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(optimizedSrc);
            observer.disconnect();
          }
        });
      }, { rootMargin: '200px' }); // Load images when they're within 200px of viewport
      
      if (imgRef.current) {
        observer.observe(imgRef.current);
      }
      
      return () => observer.disconnect();
    } else {
      // Preload priority images or fallback for browsers without IntersectionObserver
      setImageSrc(optimizedSrc);
    }
  }, [optimizedSrc, priority]);

  // Handle image load/error events
  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className={`absolute inset-0 ${className}`} />
      )}
      <img
        ref={imgRef}
        src={error ? "/placeholder.svg" : imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={priority ? "eager" : "lazy"}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};
