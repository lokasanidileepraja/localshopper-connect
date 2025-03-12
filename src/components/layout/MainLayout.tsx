
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 mt-[120px] md:mt-[130px]">
        <Outlet />
      </main>
    </div>
  );
};
