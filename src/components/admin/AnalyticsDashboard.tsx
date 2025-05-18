
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Activity, TrendingUp, BarChart, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { memo, useState, useMemo, useCallback } from "react";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Memoized metric card component to prevent unnecessary rerenders
const MetricCard = memo(({ 
  title, 
  value, 
  trend 
}: { 
  title: string; 
  value: string; 
  trend: string;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-1">
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs flex items-center text-green-500">
        <TrendingUp className="mr-1 h-3 w-3" />
        {trend}
      </p>
    </CardContent>
  </Card>
));

MetricCard.displayName = 'MetricCard';

// Memoized chart placeholder component
const ChartPlaceholder = memo(({ 
  icon, 
  text 
}: { 
  icon: React.ReactNode; 
  text: string;
}) => (
  <div className="h-96 flex items-center justify-center bg-muted/50 rounded-md mt-2">
    {icon}
    <div className="ml-4 text-muted-foreground">{text}</div>
  </div>
));

ChartPlaceholder.displayName = 'ChartPlaceholder';

export function AnalyticsDashboard() {
  // Monitor component performance
  usePerformanceMonitor('AnalyticsDashboard');
  
  const { toast } = useToast();
  const [activeChartTab, setActiveChartTab] = useState('sales');
  
  const handleExportData = useCallback(() => {
    toast({
      title: "Export Started",
      description: "Analytics data is being prepared for download."
    });
  }, [toast]);
  
  // Memoize metric cards to prevent recreation on each render
  const metricCards = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Conversion Rate" 
        value="3.42%" 
        trend="+0.5% from last month" 
      />
      <MetricCard 
        title="Avg. Order Value" 
        value="₹4,280" 
        trend="+₹320 from last month" 
      />
      <MetricCard 
        title="Customer Retention" 
        value="76%" 
        trend="+3% from last quarter" 
      />
      <MetricCard 
        title="Monthly Growth" 
        value="18.7%" 
        trend="+2.3% from last month" 
      />
    </div>
  ), []);
  
  // Memoize tabs list to prevent recreation on each render
  const tabsList = useMemo(() => (
    <TabsList>
      <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
      <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
      <TabsTrigger value="behavior">User Behavior</TabsTrigger>
      <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
    </TabsList>
  ), []);
  
  // Handle tab change
  const handleTabChange = useCallback((value: string) => {
    setActiveChartTab(value);
    console.log(`Chart tab changed to: ${value}`);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Analytics</h2>
        <Button onClick={handleExportData}>Export Data</Button>
      </div>
      
      {metricCards}
      
      <Tabs value={activeChartTab} onValueChange={handleTabChange}>
        {tabsList}
        
        <ErrorBoundary>
          <TabsContent value="sales" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Sales trends across different product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder 
                  icon={<BarChart className="h-12 w-12 text-muted-foreground" />}
                  text="Interactive sales charts would appear here"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <TabsContent value="traffic" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Analysis</CardTitle>
                <CardDescription>User acquisition channels and visitor demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder 
                  icon={<PieChart className="h-12 w-12 text-muted-foreground" />}
                  text="Traffic source distribution charts would appear here"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <TabsContent value="behavior" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Behavior</CardTitle>
                <CardDescription>Detailed user interaction patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder 
                  icon={<Activity className="h-12 w-12 text-muted-foreground" />}
                  text="User behavior heat maps and path analysis would appear here"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <TabsContent value="funnel" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Step-by-step conversion path analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder 
                  icon={<PieChart className="h-12 w-12 text-muted-foreground" />}
                  text="Conversion funnel visualization would appear here"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </ErrorBoundary>
      </Tabs>
    </div>
  );
}
