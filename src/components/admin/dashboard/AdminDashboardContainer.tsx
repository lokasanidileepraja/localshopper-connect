
import React, { memo } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import { PageLoader } from '@/components/common/PageLoader';

// Header section
const HeaderSection = React.lazy(() => 
  import('@/components/admin/dashboard/HeaderSection').then(module => ({
    default: module.default || module
  }))
);

// Summary Metrics Section
const SummaryMetrics = React.lazy(() => 
  import('@/components/admin/dashboard/SummaryMetrics').then(module => ({
    default: module.default || module
  }))
);

// Performance Metrics Section
const PerformanceMetrics = React.lazy(() => 
  import('@/components/admin/dashboard/PerformanceMetrics').then(module => ({
    default: module.default || module
  }))
);

// Tabs Section
const TabsSection = React.lazy(() => 
  import('@/components/admin/dashboard/TabsSection').then(module => ({
    default: module.default || module
  }))
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
