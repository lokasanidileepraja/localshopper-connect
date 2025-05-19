
import React, { memo } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import { PageLoader } from '@/components/common/PageLoader';

// Dashboard Overview Component (creating a placeholder if it doesn't exist)
const RetailerOverview = React.lazy(() => import('./RetailerOverviewPlaceholder'));

// Sales Chart Component
const SalesChart = React.lazy(() => import('./SalesChartPlaceholder'));

// Inventory Summary Component
const InventorySummary = React.lazy(() => import('./InventorySummaryPlaceholder'));

// Order Management Component
const OrderManagement = React.lazy(() => import('./OrderManagementPlaceholder'));

// Quick Actions Component
const QuickActions = React.lazy(() => import('./QuickActionsPlaceholder'));

// Recent Reservations Component
const RecentReservations = React.lazy(() => import('./RecentReservationsPlaceholder'));

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
