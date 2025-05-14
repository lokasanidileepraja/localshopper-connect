
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { memo, useEffect, useState, useCallback } from "react";
import { throttle } from "@/lib/performance";

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
  
  // Use throttle to prevent excessive resize event handlers
  const handleResize = useCallback(
    throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 200),
    []
  );
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Weekly Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockSalesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} sales`, 'Sales']} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
});

SalesChart.displayName = 'SalesChart';
