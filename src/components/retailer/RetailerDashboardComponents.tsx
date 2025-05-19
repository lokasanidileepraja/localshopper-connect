
import React, { memo } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import { PageLoader } from '@/components/common/PageLoader';

// Dashboard Overview Component (creating a placeholder if it doesn't exist)
const RetailerOverview = React.lazy(() => import('./RetailerOverviewPlaceholder').then(module => ({ default: module.default || module })));

// Sales Chart Component
const SalesChart = React.lazy(() => import('./SalesChartPlaceholder').then(module => ({ default: module.default || module })));

// Inventory Summary Component
const InventorySummary = React.lazy(() => import('./InventorySummaryPlaceholder').then(module => ({ default: module.default || module })));

// Order Management Component
const OrderManagement = React.lazy(() => import('./OrderManagementPlaceholder').then(module => ({ default: module.default || module })));

// Quick Actions Component
const QuickActions = React.lazy(() => import('./QuickActionsPlaceholder').then(module => ({ default: module.default || module })));

// Recent Reservations Component
const RecentReservations = React.lazy(() => import('./RecentReservationsPlaceholder').then(module => ({ default: module.default || module })));

// Export the components wrapped in error boundaries and suspense
export const RetailerDashboard = memo(() => (
  <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load overview")} resetErrorBoundary={() => window.location.reload()} />}>
    <PageLoader>
      <RetailerOverview />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerSalesChart = memo(() => (
  <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load sales chart")} resetErrorBoundary={() => window.location.reload()} />}>
    <PageLoader>
      <SalesChart />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerInventorySummary = memo(() => (
  <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load inventory summary")} resetErrorBoundary={() => window.location.reload()} />}>
    <PageLoader>
      <InventorySummary />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerOrderManagement = memo(() => (
  <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load order management")} resetErrorBoundary={() => window.location.reload()} />}>
    <PageLoader>
      <OrderManagement />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerQuickActions = memo(() => (
  <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load quick actions")} resetErrorBoundary={() => window.location.reload()} />}>
    <PageLoader>
      <QuickActions />
    </PageLoader>
  </ErrorBoundary>
));

export const RetailerRecentReservations = memo(() => (
  <ErrorBoundary fallback={<ErrorFallback error={new Error("Failed to load recent reservations")} resetErrorBoundary={() => window.location.reload()} />}>
    <PageLoader>
      <RecentReservations />
    </PageLoader>
  </ErrorBoundary>
));

// Export everything as default as well
const RetailerDashboardComponents = {
  RetailerDashboard,
  RetailerSalesChart,
  RetailerInventorySummary,
  RetailerOrderManagement,
  RetailerQuickActions,
  RetailerRecentReservations
};

export default RetailerDashboardComponents;
