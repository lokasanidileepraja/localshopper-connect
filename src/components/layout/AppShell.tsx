import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { TopBar } from "@/components/navigation/TopBar";
import { BottomNav } from "@/components/navigation/BottomNav";

export const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <main className="flex-1 mt-[88px] pb-16 overflow-x-hidden" role="main" id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <BottomNav />
    </div>
  );
};
