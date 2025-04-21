
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const MainLayout = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className={`flex-1 ${isMobile ? 'mt-[100px]' : 'mt-[120px] md:mt-[130px]'}`}>
        <Outlet />
      </main>
    </div>
  );
};
