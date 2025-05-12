
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Activity, TrendingUp, BarChart, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function AnalyticsDashboard() {
  const { toast } = useToast();
  
  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Analytics data is being prepared for download."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Analytics</h2>
        <Button onClick={handleExportData}>Export Data</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">3.42%</div>
            <p className="text-xs flex items-center text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +0.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">₹4,280</div>
            <p className="text-xs flex items-center text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +₹320 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs flex items-center text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +3% from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">18.7%</div>
            <p className="text-xs flex items-center text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +2.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Sales trends across different product categories</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md mt-2">
              <BarChart className="h-12 w-12 text-muted-foreground" />
              <div className="ml-4 text-muted-foreground">Interactive sales charts would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traffic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Analysis</CardTitle>
              <CardDescription>User acquisition channels and visitor demographics</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md mt-2">
              <PieChart className="h-12 w-12 text-muted-foreground" />
              <div className="ml-4 text-muted-foreground">Traffic source distribution charts would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="behavior" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Behavior</CardTitle>
              <CardDescription>Detailed user interaction patterns</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md mt-2">
              <Activity className="h-12 w-12 text-muted-foreground" />
              <div className="ml-4 text-muted-foreground">User behavior heat maps and path analysis would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funnel" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Step-by-step conversion path analysis</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md mt-2">
              <div className="ml-4 text-muted-foreground">Conversion funnel visualization would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
