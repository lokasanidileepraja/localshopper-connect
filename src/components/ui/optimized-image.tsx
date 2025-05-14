
import { useState, useEffect, useRef, memo, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = "", 
  width = 400,
  height = 300,
  priority = false 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Generate smaller image URL for better performance - memoized
  const getOptimizedSrcUrl = useMemo(() => 
    (imgSrc: string, imgWidth: number) => imgSrc ? `${imgSrc}?w=${imgWidth}&q=75&auto=format` : "/placeholder.svg", 
  []);
  
  // Initialize image source based on priority
  const [imageSrc, setImageSrc] = useState(priority ? getOptimizedSrcUrl(src, width) : "");

  useEffect(() => {
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Use intersection observer for lazy loading
    if (!priority && 'IntersectionObserver' in window && imgRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(getOptimizedSrcUrl(src, width));
            observerRef.current?.disconnect();
          }
        });
      }, { 
        rootMargin: '200px', // Load images when they're within 200px of viewport
        threshold: 0.01 // Trigger when even 1% of the image is visible
      });
      
      observerRef.current.observe(imgRef.current);
    } else if (!imageSrc) {
      // Fallback for priority images or browsers without IntersectionObserver
      setImageSrc(getOptimizedSrcUrl(src, width));
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, width, priority, imageSrc, getOptimizedSrcUrl]);

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
        decoding="async"
      />
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";
