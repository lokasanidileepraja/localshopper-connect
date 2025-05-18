
import { memo, Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";
import { useRenderOptimizer } from "@/hooks/useRenderOptimizer";

// Lazy load the dashboard container component
const AdminDashboardContainer = lazy(() => 
  import("@/components/admin/dashboard/AdminDashboardContainer")
);

/**
 * Admin Dashboard page with error boundaries and loading states
 */
const AdminDashboard = () => {
  // Apply the prevent refresh hook
  usePreventRefresh();
  
  // Track renders to detect performance issues
  useRenderOptimizer('AdminDashboardPage');

  return (
    <ErrorBoundary fallback={
      <div className="p-8 text-center">
        <p className="text-red-500">Something went wrong loading the dashboard</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reload Page
        </button>
      </div>
    }>
      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <AdminDashboardContainer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default memo(AdminDashboard);
