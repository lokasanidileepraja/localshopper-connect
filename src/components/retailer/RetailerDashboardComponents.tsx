
import React, { memo } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import { PageLoader } from '@/components/common/PageLoader';

// Utility type for component imports
interface ComponentProps {
  [key: string]: any;
}

// Dashboard Overview Component
const RetailerOverview = React.lazy(() => 
  import('./RetailerOverview').then(module => ({
    default: module.RetailerOverview || module.default || module
  }))
);

// Sales Chart Component
const SalesChart = React.lazy(() => 
  import('./SalesChart').then(module => ({
    default: module.SalesChart || module.default || module
  }))
);

// Inventory Summary Component
const InventorySummary = React.lazy(() => 
  import('./InventorySummary').then(module => ({
    default: module.InventorySummary || module.default || module
  }))
);

// Recent Orders Component
const OrderManagement = React.lazy(() => 
  import('./OrderManagement').then(module => ({
    default: module.OrderManagement || module.default || module
  }))
);

// Quick Actions Component
const QuickActions = React.lazy(() => 
  import('./QuickActions').then(module => ({
    default: module.QuickActions || module.default || module
  }))
);

// Recent Reservations Component
const RecentReservations = React.lazy(() => 
  import('./RecentReservations').then(module => ({
    default: module.RecentReservations || module.default || module
  }))
);

// Export the components wrapped in error boundaries and suspense
export const RetailerDashboard = memo(() => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <PageLoader>
      <RetailerOverview />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerSalesChart = memo(() => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <PageLoader>
      <SalesChart />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerInventorySummary = memo(() => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <PageLoader>
      <InventorySummary />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerOrderManagement = memo(() => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <PageLoader>
      <OrderManagement />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerQuickActions = memo(() => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <PageLoader>
      <QuickActions />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerRecentReservations = memo(() => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <PageLoader>
      <RecentReservations />
    </PageLoader>
  </ErrorBoundary>
));
