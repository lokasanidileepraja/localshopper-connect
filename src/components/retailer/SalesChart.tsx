
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { memo, useEffect, useState, useCallback, useMemo } from "react";
import { throttle } from "@/lib/performance";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

const mockSalesData = [
  { name: "Mon", sales: 18 },
  { name: "Tue", sales: 25 },
  { name: "Wed", sales: 21 },
  { name: "Thu", sales: 35 },
  { name: "Fri", sales: 45 },
  { name: "Sat", sales: 40 },
  { name: "Sun", sales: 30 },
];

export const SalesChart = memo(() => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mounted, setMounted] = useState(false);
  
  // Use useMemo to create a stable throttle function reference
  const handleResize = useMemo(() => 
    throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 250),
    []
  );
  
  // Add mounted state to prevent chart re-renders during window resizing
  useEffect(() => {
    setMounted(true);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  
  // Don't render until mounted to prevent hydration issues
  if (!mounted) return null;
  
  return (
    <ErrorBoundary>
      <div className="h-[300px]">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart
            data={mockSalesData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} width={30} />
            <Tooltip 
              formatter={(value) => [`${value} sales`, 'Sales']} 
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Bar 
              dataKey="sales"
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              barSize={windowWidth < 640 ? 20 : 30}
              animationDuration={300}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ErrorBoundary>
  );
});

SalesChart.displayName = 'SalesChart';
