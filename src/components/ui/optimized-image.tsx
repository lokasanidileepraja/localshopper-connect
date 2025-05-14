
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  preload?: boolean;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

export const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  aspectRatio,
  preload = false,
  priority = false,
  className,
  onLoad: onLoadProp,
  onError: onErrorProp,
  fallbackSrc = "",
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  
  // Reset states when src changes
  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setError(false);
  }, [src]);

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoadProp?.();
  };

  // Handle image error
  const handleError = () => {
    setIsLoading(false);
    setError(true);
    if (fallbackSrc && fallbackSrc !== src) {
      setImageSrc(fallbackSrc);
    }
    onErrorProp?.();
  };

  // Preload image if specified
  useEffect(() => {
    if (preload || priority) {
      const img = new Image();
      img.src = src;
    }
  }, [src, preload, priority]);
  
  // Determine if we should use an AspectRatio wrapper
  const shouldUseAspectRatio = aspectRatio !== undefined || (width && height);
  const calculatedAspectRatio = aspectRatio || (width && height ? width / height : undefined);
  
  // Render image with or without AspectRatio
  const renderImage = () => (
    <>
      {isLoading && (
        <Skeleton 
          className="absolute inset-0 z-10 bg-muted/60" 
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "max-w-full h-auto object-cover transition-opacity",
          isLoading ? "opacity-0" : "opacity-100",
          error && !fallbackSrc ? "opacity-50" : "",
          className
        )}
        loading={priority ? "eager" : "lazy"}
        width={width}
        height={height}
        {...props}
      />
    </>
  );

  if (shouldUseAspectRatio && calculatedAspectRatio) {
    return (
      <div className="relative">
        <AspectRatio ratio={calculatedAspectRatio}>
          {renderImage()}
        </AspectRatio>
      </div>
    );
  }

  return <div className="relative">{renderImage()}</div>;
});

OptimizedImage.displayName = "OptimizedImage";
