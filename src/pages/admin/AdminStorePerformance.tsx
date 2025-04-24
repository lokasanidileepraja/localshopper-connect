
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { Clock, ShieldAlert, TrendingUp, AlertOctagon } from "lucide-react";

const AdminStorePerformance = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <Breadcrumbs />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Store Performance</h1>
        <Button 
          onClick={() => {
            toast({
              title: "SLA Report Generated",
              description: "Store SLA performance report has been generated.",
            });
          }}
        >
          Generate SLA Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              SLA Compliance
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              Average SLA compliance across stores
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Fraud Alerts
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active fraud alerts to investigate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Growth Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5.8%</div>
            <p className="text-xs text-muted-foreground">
              Average store growth this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Issues
            </CardTitle>
            <AlertOctagon className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Stores with critical performance issues
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sla" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="sla">SLA Performance</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Management</TabsTrigger>
          <TabsTrigger value="comparison">Store Comparison</TabsTrigger>
          <TabsTrigger value="issues">Performance Issues</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sla">
          <Card>
            <CardHeader>
              <CardTitle>SLA Performance</CardTitle>
              <CardDescription>Service Level Agreement performance metrics for all stores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>SLA performance metrics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fraud">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Management</CardTitle>
              <CardDescription>Suspicious activities and potential fraud cases to investigate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Fraud alerts and management tools will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Store Comparison</CardTitle>
              <CardDescription>Compare performance metrics across different stores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Store comparison data will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Performance Issues</CardTitle>
              <CardDescription>Stores with performance issues that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Store performance issues will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminStorePerformance;
