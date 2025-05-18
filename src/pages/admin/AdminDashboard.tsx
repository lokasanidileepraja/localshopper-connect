
import { memo, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import AdminDashboardContainer from "@/components/admin/dashboard/AdminDashboardContainer";

/**
 * Admin Dashboard page with error boundaries and loading states
 */
const AdminDashboard = () => {
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
      <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
        <AdminDashboardContainer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default memo(AdminDashboard);
