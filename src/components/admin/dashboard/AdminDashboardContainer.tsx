
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PageLoader>
          <HeaderSection />
        </PageLoader>
      </ErrorBoundary>

      {/* Summary Metrics */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PageLoader>
          <SummaryMetrics />
        </PageLoader>
      </ErrorBoundary>

      {/* Performance Metrics */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PageLoader>
          <PerformanceMetrics />
        </PageLoader>
      </ErrorBoundary>

      {/* Tabs Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PageLoader>
          <TabsSection />
        </PageLoader>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboardContainer);
