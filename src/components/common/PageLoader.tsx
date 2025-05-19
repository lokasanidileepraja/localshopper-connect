
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface PageLoaderProps {
  children: React.ReactNode;
}

export const PageLoader = ({ children }: PageLoaderProps) => {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
