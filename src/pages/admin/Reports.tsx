
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Printer, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  
  const handleDownload = (reportType: string) => {
    toast({
      title: "Downloading report",
      description: `${reportType} report is being prepared for download.`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reports & Exports</h1>
          <p className="text-muted-foreground">Generate and download reports</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
          <TabsTrigger value="users">User Reports</TabsTrigger>
          <TabsTrigger value="stores">Store Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">Daily Sales</h3>
                    <p className="text-sm text-muted-foreground">Sales data for the current day</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload("Daily Sales")}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Card>
                
                <Card className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">Weekly Sales</h3>
                    <p className="text-sm text-muted-foreground">Sales data for the current week</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload("Weekly Sales")}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Card>
                
                <Card className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">Monthly Sales</h3>
                    <p className="text-sm text-muted-foreground">Sales data for the current month</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload("Monthly Sales")}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">Current Stock</h3>
                    <p className="text-sm text-muted-foreground">Current inventory levels</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload("Current Stock")}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Card>
                
                <Card className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">Low Stock</h3>
                    <p className="text-sm text-muted-foreground">Items with low inventory</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload("Low Stock")}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Card>
                
                <Card className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">Out of Stock</h3>
                    <p className="text-sm text-muted-foreground">Items that are out of stock</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload("Out of Stock")}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground py-12">User reports will be available soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground py-12">Store reports will be available soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
