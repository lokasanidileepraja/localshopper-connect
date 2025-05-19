
import React, { memo } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import { PageLoader } from '@/components/common/PageLoader';

// Header section - properly typed lazy import
const HeaderSection = React.lazy(() => 
  import('@/components/admin/dashboard/HeaderSection')
);

// Summary Metrics Section - properly typed lazy import
const SummaryMetrics = React.lazy(() => 
  import('@/components/admin/dashboard/SummaryMetrics')
);

// Performance Metrics Section - properly typed lazy import
const PerformanceMetrics = React.lazy(() => 
  import('@/components/admin/dashboard/PerformanceMetrics')
);

// Tabs Section - properly typed lazy import
const TabsSection = React.lazy(() => 
  import('@/components/admin/dashboard/TabsSection')
);

const AdminDashboardContainer = () => {
  return (
    <div className="py-6 space-y-8">
      {/* Header Section */}
      <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load header section")} resetErrorBoundary={() => window.location.reload()} />}>
        <PageLoader>
          <HeaderSection />
        </PageLoader>
      </ErrorBoundary>

      {/* Summary Metrics */}
      <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load summary metrics")} resetErrorBoundary={() => window.location.reload()} />}>
        <PageLoader>
          <SummaryMetrics />
        </PageLoader>
      </ErrorBoundary>

      {/* Performance Metrics */}
      <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load performance metrics")} resetErrorBoundary={() => window.location.reload()} />}>
        <PageLoader>
          <PerformanceMetrics />
        </PageLoader>
      </ErrorBoundary>

      {/* Tabs Section */}
      <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load tabs section")} resetErrorBoundary={() => window.location.reload()} />}>
        <PageLoader>
          <TabsSection />
        </PageLoader>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboardContainer);
