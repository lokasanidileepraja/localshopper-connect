
import { useState, useEffect } from "react";
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
  const [imageSrc, setImageSrc] = useState(src);

  // Generate smaller image URL for better performance
  const optimizedSrc = `${src}?w=${width}&q=75&auto=format`;

  useEffect(() => {
    // Preload the image if priority is true
    if (priority && optimizedSrc) {
      const img = new Image();
      img.src = optimizedSrc;
      setImageSrc(optimizedSrc);
      
      img.onload = () => setIsLoading(false);
      img.onerror = () => {
        setError(true);
        setIsLoading(false);
      };
    } else {
      setImageSrc(optimizedSrc);
    }
  }, [optimizedSrc, priority]);

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className={`absolute inset-0 ${className}`} />
      )}
      <img
        src={error ? "/placeholder.svg" : imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={priority ? "eager" : "lazy"}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};
